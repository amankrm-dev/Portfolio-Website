function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    const body = document.body;

    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    body.classList.toggle('menu-open');
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    const body = document.body;

    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav_right a').forEach(link => {
    link.addEventListener('click', () => {
        const mobileMenu = document.getElementById('mobileMenu');
        const hamburger = document.querySelector('.hamburger');
        const body = document.body;

        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        body.classList.remove('menu-open'); // Remove body scroll lock
    });
});

//  -----------------------------Landing Page Script---------------------------------
const words = ["Programmer!", "Developer!", "Student!"];
let wordIndex = 0;
let charIndex = 0;
const typingSpeed = 150;
const erasingSpeed = 100;
const delayBetweenWords = 1000;

const typingEffectElement = document.getElementById("typing-effect");

function typeWord() {
    if (charIndex < words[wordIndex].length) {
        typingEffectElement.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeWord, typingSpeed);
    } else {
        setTimeout(eraseWord, delayBetweenWords);
    }
}

function eraseWord() {
    if (charIndex > 0) {
        typingEffectElement.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseWord, erasingSpeed);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeWord, typingSpeed);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    typeWord();
});

document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#navLinks a');

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index].classList.add('active');
        }
    });
});

// Remove unused profile picture animation observer
document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.querySelector("#about");
    const profilePicture = document.querySelector(".profile-picture img");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Add the 3D rotation animation when the section is in view
                    profilePicture.style.animation = "rotate3D 1s ease-in-out";
                    profilePicture.addEventListener("animationend", () => {
                        profilePicture.style.animation = ""; // Reset animation
                    });
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    observer.observe(aboutSection);
});

// Remove unused sections observer
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Remove the slider functionality
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelector('.project-cards');
    if (projectCards) {
        // No slider functionality needed
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const aboutImage = document.querySelector('.about-image img');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutImage.classList.add('animate');
                // Remove the animation class after it completes
                aboutImage.addEventListener('animationend', () => {
                    aboutImage.classList.remove('animate');
                });
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    if (aboutImage) {
        observer.observe(document.querySelector('#about'));
    }
});