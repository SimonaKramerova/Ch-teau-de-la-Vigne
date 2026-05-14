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

// ===== CSV DATA (rozšířené o modal info) =====
const exhibitionsData = [
    {
        title: "Antické amfory",
        description: "Unikátní sbírka nádob na víno z dob Římské říše.",
        category: "Historie",
        image: "images/Antické amfory.jpg",
        dates: "1. 3. 2026 – 31. 8. 2026",
        price: "Zahrnuto ve vstupném",
        fullDesc: "Prozkoumejte fascinující sbírku amfor a nádob z dob antického Říma a Řecka. Exponáty pocházejí z vykopávek ve středomoří a dokumentují, jak víno hrálo klíčovou roli v každodenním životě starověkých civilizací — od náboženských rituálů po obchod.",
        includes: ["Komentovaná prohlídka s průvodcem", "Interaktivní mapa obchodních cest", "Repliky nádob k prohlédnutí", "Vzdělávací panel pro děti"]
    },
    {
        title: "Mechanický lis 1890",
        description: "Plně funkční stroj z konce 19. století.",
        category: "Technika",
        image: "images/Mechanický lis 1890.jpg",
        dates: "Stálá expozice",
        price: "Zahrnuto ve vstupném",
        fullDesc: "Unikátní dřevěný šroubový lis na víno z roku 1890 je jedním z mála plně funkčních exemplářů svého druhu v Evropě. Jednou měsíčně probíhá živá ukázka lisování hroznů, při níž si návštěvníci mohou celý proces vyzkoušet na vlastní kůži.",
        includes: ["Živá ukázka lisování (1× měsíčně)", "Výklad o historii vinařské techniky", "Fotografie v dobovém kostýmu", "Ochutnávka historicky lisovaného vína"]
    },
    {
        title: "Víno a Umění",
        description: "Jak víno inspirovalo malíře baroka.",
        category: "Kultura",
        image: "images/redwine.jpg",
        dates: "15. 4. 2026 – 15. 9. 2026",
        price: "Zahrnuto ve vstupném",
        fullDesc: "Výstava představuje díla barokních mistrů, kteří nacházeli inspiraci ve víně, hostinách a slavnostech. Originály i reprodukce z evropských sbírek jsou doplněny o odborný komentář k symbolice vína v malířství 17. a 18. století.",
        includes: ["Průvodce výstavou v češtině a angličtině", "Audioprůvodce zdarma", "Workshop malby pro skupiny (na objednávku)", "Katalog výstavy v ceně vstupu"]
    },
    {
        title: "Zlatý výběr 2026",
        description: "Nejlepší vína letošní sklizně z celé Moravy.",
        category: "Aktuální",
        image: "images/sber.jpg",
        dates: "15. 6. 2026 – 30. 9. 2026",
        price: "Zahrnuto ve vstupném",
        fullDesc: "Prestižní přehlídka vín letošní sklizně přináší to nejlepší z moravských vinařství. Odborná porota vybrala přes 80 vzorků z více než 200 přihlášených. Každé víno je opatřeno degustační kartou s popisem aroma, chuti a doporučeného párování s jídlem.",
        includes: ["Přístup ke všem 80 vybraným vínům", "Degustační sklenička s sebou", "Katalog s hodnocením porotců", "Setkání s vinaři každou sobotu 15:00"]
    },
    {
        title: "Sklepy a jejich tajemství",
        description: "Podzemní svět, kde zraje víno po staletí.",
        category: "Architektura",
        image: "images/uvnitr.jpg",
        dates: "Stálá expozice",
        price: "Zahrnuto ve vstupném od 350 Kč",
        fullDesc: "Historické sklepy châteaux skrývají stovky let starou architekturu a desítky tisíc lahví zrajícího vína. Tato expozice vás provede podzemními chodbami, odhalí tajemství správné teploty a vlhkosti a přiblíží umění šambrování i etiketování prémiových vín.",
        includes: ["Průchod historickými sklepními chodbami", "Ukázka šambrování vína", "Přístup k archivním ročníkům (bez degustace)", "Fotografování povoleno"]
    },
    {
        title: "Cesta hroznu",
        description: "Od révy po sklenku — celý výrobní cyklus.",
        category: "Vzdělávání",
        image: "images/crushinginoldtimes.jpg",
        dates: "1. 5. 2026 – 31. 10. 2026",
        price: "Zahrnuto ve vstupném",
        fullDesc: "Interaktivní expozice pro celou rodinu mapuje cestu hroznu od vinohradů přes lis, fermentaci a zrání až po hotovou lahev. Každá zastávka nabízí hands-on aktivitu — od třídění hroznů po nasazování korku. Ideální pro školy a rodinné návštěvy.",
        includes: ["10 interaktivních stanovišť", "Pracovní listy pro děti zdarma", "Ochutnávka hroznové šťávy", "Skupinové kvízy s cenami"]
    }
];

// ===== VÝSTAVY S MODALY =====
function loadPrehledExhibitions() {
    const container = document.getElementById('prehled-grid');
    if (!container) return;
    exhibitionsData.forEach((expo, index) => {
        const card = document.createElement('div');
        card.className = 'expo-card';
        card.innerHTML = `
            <div class="expo-card-img" style="background-image:url('${expo.image}'); background-size:cover; background-position:center;"></div>
            <div class="expo-card-content">
                <h3>${expo.title}</h3>
                <p>${expo.description}</p>
                <a href="#" class="expo-card-link" data-index="${index}">Více →</a>
            </div>
        `;
        container.appendChild(card);
    });

    // Attach modal triggers
    container.querySelectorAll('.expo-card-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openExpoModal(parseInt(link.dataset.index));
        });
    });
}

// Current exhibitions (hardcoded subset, could be extended)
const currentExhibitions = [
    { title: "Zlatý výběr 2026",   description: "Nejlepší vína letošní sklizně.",      image: "images/sber.jpg" },
    { title: "Historie vinařství",  description: "Od středověku do moderny.",            image: "images/crushinginoldtimes.jpg" }
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
    zahrady:  { title: "PROHLÍDKA ZAHRAD",   name: "GARDEN TOUR 2026",    price: "250 Kč", image: "images/vilarnau.jpg",           bgColor: "#5a7a5e" },
    sklepy:   { title: "SKLEPY & DŮM",        name: "CHÂTEAU CLASSIC",     price: "350 Kč", image: "images/uvnitr.jpg",             bgColor: "#6b4f30" },
    degustace:{ title: "DEGUSTACE & TVORBA",  name: "WINE MASTER 2026",    price: "590 Kč", image: "images/makingwine.jpg",         bgColor: "#8a6b2a" },
    bonus:    { title: "VŠE + BONUS PROGRAM", name: "PREMIUM EXPERIENCE",  price: "890 Kč", image: "images/crushinginoldtimes.jpg", bgColor: "#3a4a3e" }
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

// ===== EXPO MODAL =====
function openExpoModal(index) {
    const expo = exhibitionsData[index];
    const overlay = document.getElementById('expo-modal-overlay');

    document.getElementById('expo-modal-img').style.backgroundImage = `url('${expo.image}')`;
    document.getElementById('expo-modal-category').textContent = expo.category;
    document.getElementById('expo-modal-title').textContent = expo.title;
    document.getElementById('expo-modal-dates').textContent = expo.dates;
    document.getElementById('expo-modal-price').textContent = expo.price;
    document.getElementById('expo-modal-desc').textContent = expo.fullDesc;

    const ul = document.getElementById('expo-modal-includes');
    ul.innerHTML = expo.includes.map(item => `<li>${item}</li>`).join('');

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeExpoModal() {
    document.getElementById('expo-modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

function initModal() {
    document.getElementById('expo-modal-close')?.addEventListener('click', closeExpoModal);
    document.getElementById('expo-modal-overlay')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeExpoModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeExpoModal();
    });
    // Close modal when reservation button clicked
    document.getElementById('expo-modal-reserve')?.addEventListener('click', closeExpoModal);
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
    initModal();
    initBurger();
    initDatePicker();
    initForm();

    const ticketTypeSelect = document.getElementById('ticket-type');
    if (ticketTypeSelect) {
        ticketTypeSelect.addEventListener('change', updateTicket);
        updateTicket();
    }
});
