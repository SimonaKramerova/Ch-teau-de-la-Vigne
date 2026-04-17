// Nastavení cílového data (Písma, která mluví - 10. června 2026)
const countdownDate = new Date("June 10, 2026 09:00:00").getTime();

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // Výpočet času
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Výpis do HTML
    document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

    // Pokud odpočet vyprší
    if (distance < 0) {
        clearInterval(timer);
        document.querySelector(".timer-box").innerHTML = "VÝSTAVA ZAHÁJENA";
    }
}, 1000);