// ===== COUNTDOWN =====
const countdownDate = new Date("June 15, 2026 23:59:59").getTime();

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    const pad = (n) => String(Math.max(0, n)).padStart(2, '0');

    const dEl = document.getElementById("days");
    const hEl = document.getElementById("hours");
    const mEl = document.getElementById("minutes");
    const sEl = document.getElementById("seconds");

    if (dEl && hEl && mEl && sEl) {
        dEl.innerText    = pad(Math.floor(distance / (1000 * 60 * 60 * 24)));
        hEl.innerText   = pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        mEl.innerText = pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        sEl.innerText = pad(Math.floor((distance % (1000 * 60)) / 1000));
    }

    if (distance < 0) {
        clearInterval(timer);
        const countdown = document.querySelector('.countdown-glass');
        if (countdown) {
            countdown.innerHTML = "<h2>VÝSTAVA ZAHÁJENA!</h2>";
        }
    }
}, 1000);

// ===== CSV DATA =====
const exhibitionsData = [
    {
        title: "Antické amfory",
        description: "Unikátní sbírka nádob na víno z dob Římské říše.",
        category: "Historie",
        image: "images/Antické amfory.jpg",
        dates: "1. 3. 2026 – 31. 8. 2026",
        price: "Zahrnuto ve vstupném",
    },
    {
        title: "Mechanický lis 1890",
        description: "Plně funkční stroj z konce 19. století.",
        category: "Technika",
        image: "images/Mechanický lis 1890.jpg",
        dates: "Stálá expozice",
        price: "Zahrnuto ve vstupném",
    },
    {
        title: "Víno a Umění",
        description: "Jak víno inspirovalo malíře baroka.",
        category: "Kultura",
        image: "images/redwine.jpg",
        dates: "15. 4. 2026 – 15. 9. 2026",
        price: "Zahrnuto ve vstupném",
    },
    {
        title: "Zlatý výběr 2026",
        description: "Nejlepší vína letošní sklizně z celé Moravy.",
        category: "Aktuální",
        image: "images/sber.jpg",
        dates: "15. 6. 2026 – 30. 9. 2026",
        price: "Zahrnuto ve vstupném",
    },
    {
        title: "Sklepy a jejich tajemství",
        description: "Podzemní svět, kde zraje víno po staletí.",
        category: "Architektura",
        image: "images/uvnitr.jpg",
        dates: "Stálá expozice",
        price: "Zahrnuto ve vstupném od 350 Kč",
    },
    {
        title: "Cesta hroznu",
        description: "Od révy po sklenku — celý výrobní cyklus.",
        category: "Vzdělávání",
        image: "images/crushinginoldtimes.jpg",
        dates: "1. 5. 2026 – 31. 10. 2026",
        price: "Zahrnuto ve vstupném",
    }
];

// ===== VÝSTAVY =====
function loadPrehledExhibitions() {
    const container = document.getElementById('prehled-grid');
    if (!container) return;
    container.innerHTML = "";

    exhibitionsData.forEach((expo) => {
        const card = document.createElement('div');
        card.className = 'expo-card';
        card.innerHTML = `
            <div class="expo-card-img" style="background-image:url('${expo.image}');"></div>
            <div class="expo-card-content">
                <h3>${expo.title}</h3>
                <p>${expo.description}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

const currentExhibitions = [
    { title: "Zlatý výběr 2026",   description: "Nejlepší vína letošní sklizně.",      image: "images/sber.jpg" },
    { title: "Historie vinařství",  description: "Od středověku do moderny.",            image: "images/crushinginoldtimes.jpg" }
];

function loadCurrentExhibitions() {
    const container = document.getElementById('current-grid');
    if (!container) return;
    container.innerHTML = "";

    currentExhibitions.forEach(expo => {
        const card = document.createElement('div');
        card.className = 'current-expo';
        card.innerHTML = `
            <div class="current-expo-img" style="background-image:url('${expo.image}');"></div>
            <div class="current-expo-content">
                <h3>${expo.title}</h3>
                <p>${expo.description}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// ===== CAROUSEL (SLIDER) =====
const carouselData = [
    { title: "Archivní sklepy králů", desc: "Exkluzivní prohlídka prostor, kam běžný návštěvník nesmí." },
    { title: "Degustace vín",         desc: "Odborné degustace s vinaři v krásném prostředí." }
];

function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.getElementById('carousel-dots');
    const caption = document.getElementById('carousel-caption');
    if (!slides.length || !dotsContainer) return;

    let current = 0;

    function updateCaption(i) {
        if (!caption || !carouselData[i]) return;
        const h3 = caption.querySelector('h3');
        const p = caption.querySelector('p');
        if (h3) h3.textContent = carouselData[i].title;
        if (p) p.textContent  = carouselData[i].desc;
    }

    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });

    function goTo(index) {
        slides[current].classList.remove('active');
        if (dotsContainer.children[current]) {
            dotsContainer.children[current].classList.remove('active');
        }
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        if (dotsContainer.children[current]) {
            dotsContainer.children[current].classList.add('active');
        }
        updateCaption(current);
    }

    document.getElementById('carousel-prev')?.addEventListener('click', () => goTo(current - 1));
    document.getElementById('carousel-next')?.addEventListener('click', () => goTo(current + 1));
    setInterval(() => goTo(current + 1), 5000);
}

// ===== BURGER MENU =====
function initBurger() {
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('nav-links');
    if (!burger || !navLinks) return;

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
}

// ===== DATE PICKER =====
function initDatePicker() {
    const dateInput = document.querySelector('input[type="date"]');
    if (!dateInput) return;
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}

// ===== FORM SUBMIT =====
function initForm() {
    const form = document.getElementById('booking-form');
    if (!form) return;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Vstupenky byly odeslány! Děkujeme za rezervaci.');
        this.reset();
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
});
