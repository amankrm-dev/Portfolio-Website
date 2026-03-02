/* ============================================================
   PORTFOLIO v2 — script.js
   ============================================================ */

/* ---- Hamburger Menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

function setMenuOpen(open) {
    navLinks.classList.toggle('active', open);
    hamburger.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', String(open));
}

hamburger.addEventListener('click', () => {
    setMenuOpen(!navLinks.classList.contains('active'));
});

document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        setMenuOpen(false);
    }
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
});

/* ---- Typing Effect ---- */
const words    = ['Websites.', 'Apps.', 'Experiences.'];
let wordIndex  = 0;
let charIndex  = 0;
const typingEl = document.getElementById('typing-effect');

function typeWord() {
    if (charIndex < words[wordIndex].length) {
        typingEl.textContent += words[wordIndex][charIndex++];
        setTimeout(typeWord, 140);
    } else {
        setTimeout(eraseWord, 1600);
    }
}

function eraseWord() {
    if (charIndex > 0) {
        typingEl.textContent = words[wordIndex].slice(0, --charIndex);
        setTimeout(eraseWord, 70);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeWord, 350);
    }
}

/* ---- Scroll Reveal ---- */
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---- Active Nav Highlight ---- */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
                });
            }
        });
    },
    { threshold: 0.35 }
);

sections.forEach(section => navObserver.observe(section));

/* ---- Back to Top ---- */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
    typeWord();
});
