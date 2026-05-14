// Countdown k 15. 6. 2026
const countdownDate = new Date("June 15, 2026 23:59:59").getTime();

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const pad = (num) => String(num).padStart(2, '0');

    document.getElementById("days").innerText = pad(Math.floor(distance / (1000 * 60 * 60 * 24)));
    document.getElementById("hours").innerText = pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    document.getElementById("minutes").innerText = pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    document.getElementById("seconds").innerText = pad(Math.floor((distance % (1000 * 60)) / 1000));

    if (distance < 0) {
        clearInterval(timer);
        document.querySelector('.nova-vystava').innerHTML = "<h2>VÝSTAVA ZAHÁJENA!</h2>";
    }
}, 1000);

// ===== VÝSTAVY DATA =====
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

const currentExhibitions = [
    {
        title: "Zlatý výběr 2026",
        description: "Nejlepší vína letošní sklizně",
        image: "images/Antické amfory.jpg"
    },
    {
        title: "Historie vinařství",
        description: "Od středověku do moderny",
        image: "images/Mechanický lis 1890.jpg"
    }
];

// Funkcionalita - Přehled expozic
function loadPrehledExhibitions() {
    const container = document.getElementById('prehled-grid');
    prehledExhibitions.forEach(expo => {
        const card = document.createElement('div');
        card.className = 'expo-card';
        card.innerHTML = `
            <div class="expo-card-img" style="background-image: url('${expo.image}'); background-size: cover; background-position: center;">
            </div>
            <div class="expo-card-content">
                <h3>${expo.title}</h3>
                <p>${expo.description}</p>
                <a href="#" class="expo-card-link">Více →</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// Funkcionalita - Aktuální expozice
function loadCurrentExhibitions() {
    const container = document.getElementById('current-grid');
    currentExhibitions.forEach(expo => {
        const card = document.createElement('div');
        card.className = 'current-expo';
        card.innerHTML = `
            <div class="current-expo-img" style="background-image: url('${expo.image}'); background-size: cover; background-position: center;"></div>
            <div class="current-expo-content">
                <h3>${expo.title}</h3>
                <p>${expo.description}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Načítání dat při načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    loadPrehledExhibitions();
    loadCurrentExhibitions();
});

// ===== VSTUPENKY - INTERAKTIVNÍ SYSTÉM =====
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
    const selectedType = document.getElementById('ticket-type').value;
    const data = ticketData[selectedType];
    
    const ticketImg = document.getElementById('ticket-img');
    ticketImg.style.backgroundImage = `url('${data.image}')`;
    ticketImg.style.backgroundSize = 'cover';
    ticketImg.style.backgroundPosition = 'center';
    
    document.getElementById('ticket-title').textContent = data.title;
    document.getElementById('ticket-name').textContent = data.name;
    document.getElementById('ticket-price').textContent = data.price;
    
    const ticketCard = document.querySelector('.ticket-card');
    ticketCard.style.backgroundColor = data.bgColor;
}

const ticketTypeSelect = document.getElementById('ticket-type');
if (ticketTypeSelect) {
    ticketTypeSelect.addEventListener('change', updateTicket);
    updateTicket();
}

// Zpracování formuláře
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Vstupenky byly odeslány! Děkujeme za rezervaci.');
        this.reset();
        updateTicket();
    });
}

// Burger menu
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
if (burger) {
    burger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}
