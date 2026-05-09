// Countdown k 15. 6. 2026
const countdownDate = new Date("June 15, 2026 23:59:59").getTime();

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // Přidat vedoucí nuly (05 místo 5)
    const pad = (num) => String(num).padStart(2, '0');

    document.getElementById("days").innerText = pad(Math.floor(distance / (1000 * 60 * 60 * 24)));
    document.getElementById("hours").innerText = pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    document.getElementById("minutes").innerText = pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    document.getElementById("seconds").innerText = pad(Math.floor((distance % (1000 * 60)) / 1000));

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "<h2>VÝSTAVA ZAHÁJENA!</h2>";
    }
}, 1000);

// Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

function showSlide(n) {
    slides.forEach(s => s.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

document.querySelector('.next').addEventListener('click', () => showSlide(currentSlide + 1));
document.querySelector('.prev').addEventListener('click', () => showSlide(currentSlide - 1));

// Automatický posun carouselu
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Burger menu
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
const closeBtn = document.querySelector('.close-menu');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});
closeBtn.addEventListener('click', () => {
    navLinks.classList.remove('show');
});

// Načítání dat do galerie
const expoziceData = [
  ["Antické amfory", "Unikátní sbírka nádob na víno z dob Římské říše.", "Historie", "img/amfory.jpg"],
  ["Mechanický lis 1890", "Plně funkční stroj z konce 19. století.", "Technika", "img/lis.jpg"],
  ["Víno a Umění", "Jak víno inspirovalo malíře baroka.", "Kultura", "img/art.jpg"],
];

function zobrazExpozice() {
  const container = document.getElementById('exhibition-grid');
  if (!container) return; // Bezpečnost - pokud element neexistuje
  
  expoziceData.forEach(item => {
    const [nazev, popis, kategorie, obrazek] = item;
    const div = document.createElement('div');
    div.className = 'ex-card';

    div.innerHTML = `
      <img src="${obrazek}" alt="${nazev}">
      <h3>${nazev}</h3>
      <p class="category">${kategorie}</p>
      <p>${popis}</p>
    `;
    container.appendChild(div);
  });
}

// Zavolat při načtení stránky
document.addEventListener('DOMContentLoaded', zobrazExpozice);

// Zpracování formuláře
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        alert('Vstupenky byly odeslány! Děkujeme.');
        // Vymazat formulář
        this.reset();
    });
}
