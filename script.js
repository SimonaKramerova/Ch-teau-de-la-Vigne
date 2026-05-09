// Countdown k 15. 5. 2026
const countdownDate = new Date("May 15, 2026 23:59:59").getTime();

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "VÝSTAVA ZAHÁJENA!";
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

// Automatický posun carouselu (volitelně)
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

// =======================
// Načítání CSV nebo Data do JS
// 1. Pokud máte CSV, načtěte pomocí fetch
/*
fetch('expozice.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n').slice(1); // přeskočit hlavičku
    rows.forEach(row => {
      const columns = row.split(',');
      // Vytvořit HTML s daty, například:
      // document.body.innerHTML += `<div>${columns[0]} - ${columns[1]}</div>`;
    });
  });
*/

// 2. Nebo přímo vložte data do JS jako pole
const expoziceData = [
  ["Název výstavy 1", "Popis 1", "Kategorie 1", "img/image1.jpg"],
  ["Název výstavy 2", "Popis 2", "Kategorie 2", "img/image2.jpg"],
  // další data...
];

// Funkce na zobrazení dat (například v galerii)
function zobrazExpozice() {
  const container = document.getElementById('expozice-container');
  expoziceData.forEach(item => {
    const div = document.createElement('div');
    div.className = 'expozice-item';
    div.innerHTML = `
      <h3>${item[0]}</h3>
      <p>${item[1]}</p>
      <p>Kategorie: ${item[2]}</p>
      <img src="${item[3]}" alt="${item[0]}">
    `;
    container.appendChild(div);
  });
}

// Zavolat při načtení stránky
zobrazExpozice();

// 3. Zpracování formuláře v JS
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault(); // zabránit odeslání na server
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    alert('Vstupenky byly odeslány! Děkujeme.');
    // Můžeš přidat ukládání do localStorage nebo jiný logický tok
});