// ===== COUNTDOWN =====
const countdownDate = new Date("June 15, 2026 23:59:59").getTime();

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const pad = (num) => String(num).padStart(2, '0');

    if (distance >= 0) {
        document.getElementById("days").innerText = pad(Math.floor(distance / (1000 * 60 * 60 * 24)));
        document.getElementById("hours").innerText = pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        document.getElementById("minutes").innerText = pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        document.getElementById("seconds").innerText = pad(Math.floor((distance % (1000 * 60)) / 1000));
    } else {
        clearInterval(timer);
        document.querySelector('.nova-vystava h2').textContent = "VÝSTAVA ZAHÁJENA!";
    }
}, 1000);

// ===== BURGER MENU =====
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

if (burger) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Zavřít menu při kliknutí na odkaz
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ===== PREHLED EXPOZIC - DATA =====
const prehledExhibitions = [
    {
        title: "Antické amfory",
        description: "Unikátní sbírka nádob z antiky",
        image: "images/Antické amfory.jpg"
    },
    {
        title: "Mechanický lis 1890",
        description: "Historický stroj na lisování vína",
        image: "images/Mechanický lis 1890.jpg"
    },
    {
        title: "Víno a Umění",
        description: "Jak víno inspirovalo umělce",
        image: "images/redwine.jpg"
    }
];

// ===== AKTUALNI EXPOZICE - DATA =====
const currentExhibitions = [
    {
        title: "Zlatý výběr 2026",
        description: "Nejlepší vína letošní sklizně. Sběr nejkvalitnějších vín ze vinařství po celé Moravě.",
        image: "images/Antické amfory.jpg"
    },
    {
        title: "Historie vinařství",
        description: "Od středověku do moderny. Fascinující cesta vývojem vinařství skrze staletí.",
        image: "images/Mechanický lis 1890.jpg"
    }
];

// ===== NACITANI PREHLEDU =====
function loadPrehledExhibitions() {
    const container = document.getElementById('prehled-grid');
    if (!container) return;

    prehledExhibitions.forEach(expo => {
        const card = document.createElement('div');
        card.className = 'expo-card';
        card.innerHTML = `
            <div class="expo-card-img" style="background-image: url('${expo.image}');"></div>
            <div class="expo-card-content">
                <h3>${expo.title}</h3>
                <p>${expo.description}</p>
                <a href="#" class="expo-card-link">Více →</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// ===== NACITANI AKTUALNICH =====
function loadCurrentExhibitions() {
    const container = document.getElementById('current-grid');
    if (!container) return;

    currentExhibitions.forEach(expo => {
        const card = document.createElement('div');
        card.className = 'current-expo';
        card.innerHTML = `
            <div class="current-expo-img" style="background-image: url('${expo.image}');"></div>
            <div class="current-expo-content">
                <h3>${expo.title}</h3>
                <p>${expo.description}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// ===== CAROUSEL =====
let currentSlide = 0;

function showCarouselSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length === 0) return;

    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentSlide--;
        showCarouselSlide(currentSlide);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentSlide++;
        showCarouselSlide(currentSlide);
    });
}

// Kliknutí na tečky
document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => {
        currentSlide = parseInt(dot.getAttribute('data-slide'));
        showCarouselSlide(currentSlide);
    });
});

// ===== VSTUPENKY - INTERAKTIVNI SYSTEM =====
const ticketData = {
    zahrady: {
        title: "PROHLÍDKA ZAHRAD",
        name: "GARDEN TOUR 2026",
        price: "250 Kč",
        image: "images/ticket-gardens.jpg",
        bgColor: "#90c695"
    },
    sklepy: {
        title: "SKLEPY & DŮM",
        name: "CHÂTEAU CLASSIC",
        price: "350 Kč",
        image: "images/ticket-cellar.jpg",
        bgColor: "#8b6f47"
    },
    degustace: {
        title: "DEGUSTACE & TVORBA",
        name: "WINE MASTER 2026",
        price: "590 Kč",
        image: "images/ticket-wine.jpg",
        bgColor: "#c5a059"
    },
    bonus: {
        title: "VŠE + BONUS PROGRAM",
        name: "PREMIUM EXPERIENCE",
        price: "890 Kč",
        image: "images/ticket-premium.jpg",
        bgColor: "#4a5d4e"
    }
};

function updateTicket() {
    const selectedType = document.getElementById('ticket-type')?.value || 'zahrady';
    const data = ticketData[selectedType];

    const ticketImg = document.getElementById('ticket-img');
    if (ticketImg) {
        ticketImg.style.backgroundImage = `url('${data.image}')`;
    }

    const title = document.getElementById('ticket-title');
    const name = document.getElementById('ticket-name');
    const price = document.getElementById('ticket-price');
    const card = document.querySelector('.ticket-card');

    if (title) title.textContent = data.title;
    if (name) name.textContent = data.name;
    if (price) price.textContent = data.price;
    if (card) card.style.backgroundColor = data.bgColor;
}

const ticketTypeSelect = document.getElementById('ticket-type');
if (ticketTypeSelect) {
    ticketTypeSelect.addEventListener('change', updateTicket);
    document.addEventListener('DOMContentLoaded', updateTicket);
}

// ===== FORMULÁŘ =====
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        console.log('Form data:', Object.fromEntries(formData));
        alert('Vaše rezervace byla úspěšně odeslána! Děkujeme.');
        this.reset();
        updateTicket();
    });
}

// ===== NACITANI PRI STARTU =====
document.addEventListener('DOMContentLoaded', () => {
    loadPrehledExhibitions();
    loadCurrentExhibitions();
    showCarouselSlide(0);
    updateTicket();
});
