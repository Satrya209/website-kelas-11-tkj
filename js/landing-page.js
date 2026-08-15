    // Navbar shadow saat scroll
const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
});

    // Reveal animasi saat scroll
const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

    // Smooth scroll untuk nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

const themeToggle = document.getElementById('checkbox');

function applyTheme(theme) {
    const resolvedTheme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    if (themeToggle) {
        themeToggle.checked = resolvedTheme === 'light';
    }
}

try {
    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
} catch (error) {
    applyTheme('light');
}

if (themeToggle) {
    themeToggle.addEventListener('change', () => {
        const nextTheme = themeToggle.checked ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
        try {
            localStorage.setItem('theme', nextTheme);
        } catch (error) {
            // Ignore storage errors in restricted browsing contexts.
        }
    });
}

function goToWebsite() {
    window.location.href = 'pages/website.html';
}

// Modal

function openModal(e) {
    if (e) e.preventDefault();

    const loginModal = document.getElementById('login');
    if (loginModal) {
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    document.getElementById('alert-success').hidden = true;
}

function closeModal() {
    const loginModal = document.getElementById('login');
    if (loginModal) {
        loginModal.classList.remove('active');
    }
    document.body.style.overflow = '';
}

function closeModalOutside(e) {
    const loginModal = document.getElementById('login');
    if (e.target === loginModal) closeModal();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

document.getElementById('login')?.addEventListener('click', closeModalOutside);

// ================= GOOGLE SIGN-IN =================
const GOOGLE_CLIENT_ID = "125985264757-2jpvvedod41n1gcuh7qjjtrqg6ddgqrs.apps.googleusercontent.com";

function decodeJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
    return JSON.parse(jsonPayload);
}

function handleGoogleCredential(response) {
    const payload = decodeJwt(response.credential);
    const user = {
        name: payload.name,
        email: payload.email,
        picture: payload.picture
    };
    localStorage.setItem('googleUser', JSON.stringify(user));
    showLoggedInUI(user);
    closeModal();

    const successAlert = document.getElementById('alert-success');
    successAlert.textContent = 'Login Berhasil! Selamat Datang, ' + user.name;
    successAlert.hidden = false;
    setTimeout(() => {
        window.location.href = 'pages/website.html';
    }, 1200);
}

function showLoggedInUI(user) {
    document.getElementById('loginNavItem').hidden = true;
    document.getElementById('userNavItem').hidden = false;
    document.getElementById('userAvatar').src = user.picture;
    document.getElementById('userName').textContent = user.name;
}

function showLoggedOutUI() {
    document.getElementById('loginNavItem').hidden = false;
    document.getElementById('userNavItem').hidden = true;
}

function logoutUser() {
    localStorage.removeItem('googleUser');
    if (window.google?.accounts?.id) {
        google.accounts.id.disableAutoSelect();
    }
    showLoggedOutUI();
}

document.getElementById('logoutBtn')?.addEventListener('click', logoutUser);

window.addEventListener('load', () => {
    if (!window.google || !google.accounts || !google.accounts.id) return;

    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredential,
        auto_select: true
    });

    const googleSignInDiv = document.getElementById('googleSignInDiv');
    if (googleSignInDiv) {
        google.accounts.id.renderButton(
            googleSignInDiv,
            { theme: 'outline', size: 'large', shape: 'pill', width: 280 }
        );
    }

    try {
        const saved = localStorage.getItem('googleUser');
        if (saved) {
            showLoggedInUI(JSON.parse(saved));
        } else {
            google.accounts.id.prompt();
        }
    } catch (error) {
        // Ignore storage access issues in restricted environments.
    }
});
