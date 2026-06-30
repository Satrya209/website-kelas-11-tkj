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

function toggleAccordion(header) {
    var item = header.parentElement;
    item.classList.toggle("open");
}

var headers = document.querySelectorAll(".accordion-header");

for (var i = 0; i < headers.length; i++) {
    headers[i].addEventListener("click", function() {
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


// Klik kiri foto = foto sebelumnya, kanan foto = foto selanjutnya
galeriItem.addEventListener('click', (e) => {
    const rect = galeriItem.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX < rect.width / 2) {
        prev();
    } else {
        next();
    }
});

galeriItem2.addEventListener('click', (e) => {
    const rect = galeriItem2.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX < rect.width / 2) {
        prev2();
    } else {
        next2();
    }
});

//Swipe for HandPhone (different device)
let touchStartX = 0;
galeriItem.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});
galeriItem.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (diff > 50) {
        prev();
    }
     else if (diff < -50) {
        next();
    }
});


let touchStart2X = 0;
galeriItem2.addEventListener('touchstart', (e) => {
    touchStart2X = e.changedTouches[0].screenX;
});
galeriItem2.addEventListener('touchend', (e) => {
    const diff2 = e.changedTouches[0].screenX - touchStart2X;
    if(diff2 > 50) {
        prev2();
    } else if (diff2 < -50) {
        next2();
    }
});

render();
render2();





