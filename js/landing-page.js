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

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') { 
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.checked = false;
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Modal

function openModal(e) {
    if (e) e.preventDefault();

    const loginModal = document.getElementById('login');
    if (loginModal) {
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    document.getElementById('alert-success').hidden = true;
    document.getElementById('alert-danger').hidden = true;
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

// Sign-in Array

let loginUser = [];
let usersLoadFailed = false;

async function loadUsers() {
    try {
        const response = await fetch('data/users.json');
        if (!response.ok) throw new Error ('Gagal Memuat Data User');
        loginUser = await response.json();
    } catch (error) {
        console.error('Error memuat user.json:', error);
        usersLoadFailed = true;
    }
}

loadUsers();

function handleLogin() {
    const inputUsername = document.getElementById('username').value.trim();
    const inputPassword = document.getElementById('password').value.trim();
    const inputGender = document.getElementById('gender').value;
    const successAlert = document.getElementById('alert-success');
    const dangerAlert = document.getElementById('alert-danger');
    const warningAlert = document.getElementById('alert-warning');

    successAlert.hidden = true;
    dangerAlert.hidden = true;
    warningAlert.hidden = true;

    if (!inputUsername || !inputPassword || !inputGender) {
        warningAlert.textContent = 'Harap isi semua field terlebih dahulu!';
        warningAlert.hidden = false;
        return;
    }

    if (usersLoadFailed) {
        dangerAlert.textContent = 'Gagal memuat data user. Cek koneksi atau hubungi pembuat Website. IG: @prambudisat_';
        dangerAlert.hidden = false;
        return;
    }

    if (loginUser.length === 0) {
        warningAlert.textContent = 'Data user belum siap, coba beberapa saat lagi.';
        warningAlert.hidden = false;
        return;
    }

    const userFound = loginUser.find(function(user) {
        return user.username === inputUsername && user.password === inputPassword;
    });

    if (userFound) {
        successAlert.textContent = 'Login Berhasil! Selamat Datang, ' + userFound.username;
        successAlert.hidden = false;
        setTimeout(() => {
            window.location.href = 'pages/website.html';
        }, 1200);
    } else {
        dangerAlert.textContent = 'Username atau Password tidak ditemukan. Silahkan coba lagi.';
        dangerAlert.hidden = false;
    }
}
