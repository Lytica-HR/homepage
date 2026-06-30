/*=========================================================
    LYTICA V2 - SCRIPT
=========================================================*/

/*========================
NAVBAR SCROLL EFFECT
========================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/*========================
REVEAL ANIMATIONS
========================*/

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

        }

    });

}, {

    threshold: 0.12

});

revealElements.forEach(el => revealObserver.observe(el));


/*========================
SMOOTH SCROLL
========================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", (e) => {

        const target = document.querySelector(anchor.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    });

});


/*========================
SPOTLIGHT CURSOR EFFECT
========================*/

const spotlight = document.createElement("div");

spotlight.style.position = "fixed";

spotlight.style.width = "600px";

spotlight.style.height = "600px";

spotlight.style.borderRadius = "50%";

spotlight.style.pointerEvents = "none";

spotlight.style.zIndex = "-1";

spotlight.style.filter = "blur(120px)";

spotlight.style.background = "radial-gradient(circle, rgba(111,124,255,.10), transparent 60%)";

spotlight.style.transform = "translate(-50%, -50%)";

spotlight.style.transition = "opacity .2s ease";

document.body.appendChild(spotlight);

window.addEventListener("mousemove", (e) => {

    spotlight.style.left = e.clientX + "px";

    spotlight.style.top = e.clientY + "px";

});


/*========================
HERO PARALLAX
========================*/

const hero = document.querySelector(".hero");

const heroContent = document.querySelector(".hero-container");

window.addEventListener("mousemove", (e) => {

    if (window.innerWidth < 900) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 10;

    const y = (e.clientY / window.innerHeight - 0.5) * 10;

    if (heroContent) {

        heroContent.style.transform = `translate(${x}px, ${y}px)`;

    }

});


/*========================
REDUCED MOTION SUPPORT
========================*/

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

    document.querySelectorAll("*").forEach(el => {

        el.style.animation = "none";

        el.style.transition = "none";

    });

}

/*=========================================================
LYTICA V2 - SCRIPT PART 2
Dashboard interactions + micro UX
=========================================================*/

/*=========================================================
DASHBOARD 3D HOVER (CARDS + PANELS)
=========================================================*/

const cards = document.querySelectorAll(".panel, .feature-card, .kpi-card");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / 18) * -1;
        const rotateY = (x - centerX) / 18;

        card.style.transform = `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-6px)
        `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/*=========================================================
MAGNETIC BUTTONS
=========================================================*/

const buttons = document.querySelectorAll(
    ".primary-button, .secondary-button, .dashboard-header button"
);

buttons.forEach(btn => {

    btn.addEventListener("mousemove", (e) => {

        const rect = btn.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `
            translate(${x * 0.12}px, ${y * 0.12}px)
        `;

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform = "";

    });

});


/*=========================================================
COUNTERS (STATS ANIMATION)
=========================================================*/

const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const el = entry.target;

        const target = parseInt(el.getAttribute("data-count"));

        let current = 0;

        const step = target / 80;

        const interval = setInterval(() => {

            current += step;

            if (current >= target) {

                el.innerText = target;

                clearInterval(interval);

            } else {

                el.innerText = Math.floor(current);

            }

        }, 20);

        counterObserver.unobserve(el);

    });

}, { threshold: 0.6 });

counters.forEach(c => counterObserver.observe(c));


/*=========================================================
FADE HERO PARALLAX
(reuses the same `hero` and `spotlight` declared above)
=========================================================*/

window.addEventListener("scroll", () => {

    const value = window.scrollY;

    const heroContent = document.querySelector(".hero-container");

    if (!heroContent) return;

    heroContent.style.transform = `translateY(${value * 0.15}px)`;

    heroContent.style.opacity = 1 - value / 900;

});


/*=========================================================
SIDEBAR ACTIVE STATE SIMULATION
=========================================================*/

const sidebarLinks = document.querySelectorAll(".sidebar a");

sidebarLinks.forEach(link => {

    link.addEventListener("click", () => {

        sidebarLinks.forEach(l => l.classList.remove("active"));

        link.classList.add("active");

    });

});


/*=========================================================
LOADING POLISH (SMOOTH ENTRY)
=========================================================*/

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

    document.body.style.transition = "opacity 0.6s ease";

});


/*=========================================================
REDUCED MOTION SUPPORT
=========================================================*/

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

    document.querySelectorAll("*").forEach(el => {

        el.style.animation = "none";
        el.style.transition = "none";

    });

}
