    // Navbar shadow saat scroll
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
}

// Reveal animasi saat scroll
const reveals = document.querySelectorAll('.reveal');
if (typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    reveals.forEach((el) => observer.observe(el));
} else {
    reveals.forEach((el) => el.classList.add('visible'));
}

// Smooth scroll untuk nav links
const offset = 90;
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// Get modal and buttons
const modal = document.getElementById('profileModal');
const closeBtn = document.getElementById('closeModalBtn');

// Get all murid cards and add click handlers
const muridCards = document.querySelectorAll('.murid-card');
muridCards.forEach(card => {
    const trigger = card.querySelector('.murid-card-link') || card;
    trigger.addEventListener('click', function(e) {
        if (!modal) return; // Guard against missing modal
        e.preventDefault();
        // Extract data from the card
        const img = card.querySelector('img').src;
        const nama = card.querySelector('.nama').textContent;
        const peran = card.dataset.peran || '';
        const status = card.querySelector('.status') ? card.querySelector('.status').textContent : 'Aktif';
        
        // Populate modal
        const modalImage = document.getElementById('modalImage');
        const modalNama = document.getElementById('modalNama');
        const modalPeran = document.getElementById('modalPeran');
        const modalStatus = document.getElementById('modalStatus');
        
        if (modalImage) modalImage.src = img;
        if (modalNama) modalNama.textContent = nama;
        if (modalPeran) modalPeran.textContent = peran;
        if (modalStatus) modalStatus.textContent = status;
        
        // Open modal
        modal.classList.add('active');
    });
});

// Close modal when X button is clicked
if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        if (modal) modal.classList.remove('active');
    });
}

// Close modal when clicking outside the modal content
window.addEventListener('click', function(event) {
    if (modal && event.target === modal) {
        modal.classList.remove('active');
    }
});

function toggleAccordion(header) {
    var item = header.parentElement;
    if (!item) return;

    var shouldOpen = !item.classList.contains('open');

    document.querySelectorAll('.accordion-item').forEach(function (accordionItem) {
        accordionItem.classList.remove('open');
    });

    if (shouldOpen) {
        item.classList.add('open');
    }
}

var headers = document.querySelectorAll('.accordion-header');

for (var i = 0; i < headers.length; i++) {
    headers[i].addEventListener('click', function () {
        toggleAccordion(this);
    });
}


// Galery Settings
const photos = [
    {src: "assets/11semester2-1.jpeg", caption: "Foto Kelas 11 Akhir Semester"},
    {src: "assets/semester1-1.jpeg", caption: "Foto Kelas 10 - Batik"},
    {src: "assets/semester1-2.jpeg", caption: "Foto Kelas 10 - Batik"},
    {src: "assets/semester1-3.jpeg", caption: "Foto Kelas 10"}
];

const photos2 = [
    {src: "assets/foto1.jpeg", caption: "kunjungan Industri"},
    {src: "assets/foto2.jpeg", caption: "kunjungan Industri"},
    {src: "assets/foto3.jpeg", caption: "kunjungan Industri"},
    {src: "assets/foto4.jpeg", caption: "kunjungan Industri"},
    {src: "assets/foto5.jpeg", caption: "kunjungan Industri"},
    {src: "assets/foto6.jpeg", caption: "kunjungan Industri"},
    {src: "assets/foto7.jpeg", caption: "kunjungan Industri"},
    {src: "assets/foto8.jpeg", caption: "kunjungan Industri"},
    {src: "assets/foto9.jpeg", caption: "kunjungan Industri"},
    {src: "assets/foto10.jpeg", caption: "kunjungan Industri"}
];

const photos3 = [
    {src: "assets/photo_upacara.jpeg", caption: "Petugas Upacara"},
    {src: "assets/photo_upacara-2.jpeg", caption: "Petugas Upacara"},
    {src: "assets/photo_upacara-3.jpeg", caption: "Petugas Upacara"}
];

let current = 0;
const img = document.getElementById('galeriImg');
const captionText = document.getElementById('captionText');
const label = document.getElementById('indexLabel');
const galeriItem = document.getElementById('galeriItem');

let current2 = 0;
const img2 = document.getElementById('galeriImg2');
const captionText2 = document.getElementById('captionText2');
const label2 = document.getElementById('indexLabel2');
const galeriItem2 = document.getElementById('galeriItem2')

let current3 = 0;
const img3 = document.getElementById('galeriImg3');
const captionText3 = document.getElementById('captionText3');
const label3 = document.getElementById('indexLabel3');
const galeriItem3 = document.getElementById('galeriItem3')


//Rendering and Navigations
function render() {
    img.src = photos[current].src;
    img.alt = photos[current].caption;
    captionText.textContent = photos[current].caption;
    label.textContent = `${current + 1} / ${photos.length}`;
}

function prev() {
    current = (current - 1 + photos.length) % photos.length;
    render();
}

function next() {
    current = (current + 1) % photos.length;
    render();
}

function render2() {
    img2.src = photos2[current2].src; 
    img2.alt = photos2[current2].caption;
    captionText2.textContent = photos2[current2].caption;
    label2.textContent = `${current2 + 1} / ${photos2.length}`;
}

function prev2() {
    current2 = (current2 - 1 + photos2.length) % photos2.length;
    render2();
}

function next2() {
    current2 = (current2 + 1) % photos2.length;
    render2();
}

function render3() {
    img3.src = photos3[current3].src;
    img3.alt = photos3[current3].caption;
    captionText3.textContent = photos3[current3].caption;
    label3.textContent = `${current3 + 1} / ${photos3.length}`;
}

function prev3() {
    current3 = (current3 - 1 + photos3.length) % photos3.length;
    render3();
}

function next3() {
    current3 = (current3 + 1) % photos3.length;
    render3();
}


// Klik kiri foto = foto sebelumnya, kanan foto = foto selanjutnya
if (galeriItem) {
    galeriItem.addEventListener('click', (e) => {
        const rect = galeriItem.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        if (clickX < rect.width / 2) {
            prev();
        } else {
            next();
        }
    });
}

if (galeriItem2) {
    galeriItem2.addEventListener('click', (e) => {
        const rect = galeriItem2.getBoundingClientRect();
        const clickX = e.clientX - rect.left;

        if (clickX < rect.width / 2) {
            prev2();
        } else {
            next2();
        }
    });
}

if (galeriItem3) {
    galeriItem3.addEventListener('click', (e) => {
        const rect = galeriItem3.getBoundingClientRect();
        const clickX = e.clientX - rect.left;

        if (clickX < rect.width / 2) {
            prev3();
        } else {
            next3();
        }
    });
}

//Swipe for HandPhone (different device)
let touchStartX = 0;
if (galeriItem) {
    galeriItem.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    galeriItem.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].screenX - touchStartX;
        if (diff > 50) {
            prev();
        } else if (diff < -50) {
            next();
        }
    });
}

let touchStart2X = 0;
if (galeriItem2) {
    galeriItem2.addEventListener('touchstart', (e) => {
        touchStart2X = e.changedTouches[0].screenX;
    });
    galeriItem2.addEventListener('touchend', (e) => {
        const diff2 = e.changedTouches[0].screenX - touchStart2X;
        if (diff2 > 50) {
            prev2();
        } else if (diff2 < -50) {
            next2();
        }
    });
}

let touchStart3X = 0;
if (galeriItem3) {
    galeriItem3.addEventListener('touchstart', (e) => {
        touchStart3X = e.changedTouches[0].screenX;
    });
    galeriItem3.addEventListener('touchend', (e) => {
        const diff3 = e.changedTouches[0].screenX - touchStart3X;
        if (diff3 > 50) {
            prev3();
        } else if (diff3 < -50) {
            next3();
        }
    });
}

render();
render2();
render3();





