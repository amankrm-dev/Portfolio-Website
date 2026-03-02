/* ============================================================
   PORTFOLIO v5 — script.js
   Animations: scroll progress, header shadow, counters,
                stagger reveal, typing, back-to-top, nav
   ============================================================ */

/* ---- Scroll Progress Bar (injected) ---- */
const progressBar = document.createElement('div');
progressBar.id = 'progress-bar';
document.body.prepend(progressBar);

/* ---- Header reference ---- */
const headerEl = document.querySelector('header');

/* ---- Back to Top ---- */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    /* Progress bar */
    const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    progressBar.style.width = (scrolled * 100).toFixed(2) + '%';

    /* Header shadow */
    headerEl.classList.toggle('scrolled', window.scrollY > 20);

    /* Back to top */
    backToTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
}, { passive: true });

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

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

/* ---- Counter Animation (hero stats) ---- */
function animateCounter(el, target, delay = 0) {
    const textNode = el.childNodes[0];
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;

    const duration  = 1300;
    let   startTime = null;

    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

    const run = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed  = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value    = Math.floor(easeOutCubic(progress) * target);
        textNode.textContent = String(value).padStart(2, '0');
        if (progress < 1) requestAnimationFrame(run);
    };

    setTimeout(() => requestAnimationFrame(run), delay);
}

function initCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const textNode = el.childNodes[0];
        if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;
        const num = parseInt(textNode.textContent.trim());
        if (isNaN(num)) return;

        const obs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounter(el, num);
                obs.disconnect();
            }
        }, { threshold: 0.6 });
        obs.observe(el);
    });
}

/* ---- Stagger Reveal for Grid Children ---- */
function initStagger() {
    const staggerTargets = document.querySelectorAll(
        '.skills-grid, .awards-grid, .about-facts, .experience-list'
    );

    const staggerObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const children = entry.target.querySelectorAll(
                '.skill-group, .award-card, .fact-item, .experience-entry'
            );

            children.forEach((child, i) => {
                child.style.opacity   = '0';
                child.style.transform = 'translateY(20px)';
                child.style.transitionDelay = `${i * 0.12}s`;

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        child.style.opacity   = '1';
                        child.style.transform = 'translateY(0)';
                    });
                });
            });

            staggerObs.unobserve(entry.target);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    staggerTargets.forEach(el => staggerObs.observe(el));
}

/* ---- Scroll Reveal (sections) ---- */
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    },
    { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
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

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
    typeWord();
    initCounters();
    initStagger();
});
