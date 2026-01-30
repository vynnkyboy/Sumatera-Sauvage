import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

/* =========================
   MOBILE MENU
========================= */
const mobileMenu = document.getElementById("mobileMenu");
const menuToggleBtn = document.getElementById("mobileMenuToggle");

menuToggleBtn?.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
});

window.closeMobileMenu = function () {
    mobileMenu.classList.add("hidden");
};

/* =========================
   HERO SLIDER
========================= */
const slides = document.querySelectorAll(".hero-slide");
let currentSlide = 0;

setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
}, 5000);

/* =========================
   DATE PICKER
========================= */
flatpickr("#date", {
    minDate: "today",
    dateFormat: "d-m-Y"
});

/* =========================
   FORM EMAIL
========================= */
document.getElementById("contactForm")
?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        email: e.target.email.value,
        name: e.target.subject.value,
        message: e.target.message.value
    };

    try {
        const res = await fetch("http://localhost:3000/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (result.success) {
            alert("Pesan berhasil dikirim ke email ✉️");
            e.target.reset();
        } else {
            alert("Gagal mengirim pesan");
        }
    } catch (err) {
        alert("Server email tidak aktif");
        console.error(err);
    }
});
