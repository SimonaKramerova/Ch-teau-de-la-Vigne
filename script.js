// ===== COUNTDOWN =====
const countdownDate = new Date("June 15, 2026 23:59:59").getTime();

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    const pad = (n) => String(Math.max(0, n)).padStart(2, '0');

    document.getElementById("days").innerText    = pad(Math.floor(distance / (1000 * 60 * 60 * 24)));
    document.getElementById("hours").innerText   = pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    document.getElementById("minutes").innerText = pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    document.getElementById("seconds").innerText = pad(Math.floor((distance % (1000 * 60)) / 1000));

    if (distance < 0) {
        clearInterval(timer);
        document.querySelector('.nova-vystava').innerHTML = "<h2>VÝSTAVA ZAHÁJENA!</h2>";
    }
}, 1000);

// ===== CSV PARSER =====
// Parses the expozice.csv content (tab-separated)
const csvText = `Název\tPopis\tKategorie\tObrázek
Antické amfory\tUnikátní sbírka nádob na víno z dob Římské říše.\tHistorie\timg/amfory.jpg
Mechanický lis 1890\tPlně funkční stroj z konce 19. století.\tTechnika\timg/lis.jpg
Víno a Umění\tJak víno inspirovalo malíře baroka.\tKultura\timg/art.jpg`;

function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split('\t').map(h => h.trim());
    return lines.slice(1).map(line => {
        const values = line.split('\t').map(v => v.trim());
        const obj = {};
        headers.forEach((h, i) => { obj[h] = values[i] || ''; });
        return obj;
    });
}

const exhibitionsData = parseCSV(csvText);

// ===== VÝSTAVY =====
function loadPrehledExhibitions() {
    const container = document.getElementById('prehled-grid');
    if (!container) return;
    exhibitionsData.forEach(expo => {
        const card = document.createElement('div');
        card.className = 'expo-card';
        card.innerHTML = `
            <div class="expo-card-img" style="background-image:url('${expo['Obrázek']}'); background-size:cover; background-position:center;"></div>
            <div class="expo-card-content">
                <h3>${expo['Název']}</h3>
                <p>${expo['Popis']}</p>
                <a href="#" class="expo-card-link">Více →</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// Current exhibitions (hardcoded subset, could be extended)
const currentExhibitions = [
    { title: "Zlatý výběr 2026",   description: "Nejlepší vína letošní sklizně.",      image: "img/amfory.jpg" },
    { title: "Historie vinařství",  description: "Od středověku do moderny.",            image: "img/lis.jpg" }
];

function loadCurrentExhibitions() {
    const container = document.getElementById('current-grid');
    if (!container) return;
    currentExhibitions.forEach(expo => {
        const card = document.createElement('div');
        card.className = 'current-expo';
        card.innerHTML = `
            <div class="current-expo-img" style="background-image:url('${expo.image}'); background-size:cover; background-position:center;"></div>
            <div class="current-expo-content">
                <h3>${expo.title}</h3>
                <p>${expo.description}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// ===== CAROUSEL =====
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.getElementById('carousel-dots');
    if (!slides.length || !dotsContainer) return;

    let current = 0;

    // Build dots
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });

    function goTo(index) {
        slides[current].classList.remove('active');
        dotsContainer.children[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dotsContainer.children[current].classList.add('active');
    }

    document.getElementById('carousel-prev')?.addEventListener('click', () => goTo(current - 1));
    document.getElementById('carousel-next')?.addEventListener('click', () => goTo(current + 1));

    // Auto-advance every 5s
    setInterval(() => goTo(current + 1), 5000);
}

// ===== VSTUPENKY =====
const ticketData = {
    zahrady:  { title: "PROHLÍDKA ZAHRAD",   name: "GARDEN TOUR 2026",    price: "250 Kč", image: "img/ticket-gardens.jpg", bgColor: "#5a7a5e" },
    sklepy:   { title: "SKLEPY & DŮM",        name: "CHÂTEAU CLASSIC",     price: "350 Kč", image: "img/ticket-cellar.jpg",  bgColor: "#6b4f30" },
    degustace:{ title: "DEGUSTACE & TVORBA",  name: "WINE MASTER 2026",    price: "590 Kč", image: "img/ticket-wine.jpg",    bgColor: "#8a6b2a" },
    bonus:    { title: "VŠE + BONUS PROGRAM", name: "PREMIUM EXPERIENCE",  price: "890 Kč", image: "img/ticket-premium.jpg", bgColor: "#3a4a3e" }
};

function updateTicket() {
    const sel = document.getElementById('ticket-type');
    if (!sel) return;
    const data = ticketData[sel.value];
    const ticketImg = document.getElementById('ticket-img');
    if (ticketImg) {
        ticketImg.style.backgroundImage = `url('${data.image}')`;
        ticketImg.style.backgroundSize = 'cover';
        ticketImg.style.backgroundPosition = 'center';
    }
    const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setTxt('ticket-title', data.title);
    setTxt('ticket-name', data.name);
    setTxt('ticket-price', data.price);

    const card = document.querySelector('.ticket-card');
    if (card) card.style.backgroundColor = data.bgColor;
}

// ===== BURGER MENU =====
function initBurger() {
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('nav-links');
    if (!burger || !navLinks) return;

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
}

// ===== DATE PICKER: set today as min =====
function initDatePicker() {
    const dateInput = document.querySelector('input[type="date"]');
    if (!dateInput) return;
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // Update ticket date display when changed
    dateInput.addEventListener('change', () => {
        const parts = dateInput.value.split('-');
        if (parts.length === 3) {
            document.getElementById('ticket-date').textContent = `${parts[2]} / ${parts[1]} / ${parts[0]}`;
        }
    });
}

// ===== FORM SUBMIT =====
function initForm() {
    const form = document.getElementById('booking-form');
    if (!form) return;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Vstupenky byly odeslány! Děkujeme za rezervaci.');
        this.reset();
        updateTicket();
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    loadPrehledExhibitions();
    loadCurrentExhibitions();
    initCarousel();
    initBurger();
    initDatePicker();
    initForm();

    const ticketTypeSelect = document.getElementById('ticket-type');
    if (ticketTypeSelect) {
        ticketTypeSelect.addEventListener('change', updateTicket);
        updateTicket();
    }
});
