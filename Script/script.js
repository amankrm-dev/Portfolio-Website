function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    const body = document.body;

    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    body.classList.toggle('menu-open'); // Toggle body scroll
}

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

// Update the certificate swipe functionality
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.certificates-gallery');
    const certificates = Array.from(document.querySelectorAll('.certificate-item'));
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let currentIndex = 0;

    // Add event listeners for both touch and mouse events
    gallery.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
    });

    gallery.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
        const diff = startX - currentX;

        if (Math.abs(diff) > 30) {
            if (diff > 0) {
                animateSwipe('left');
            } else {
                animateSwipe('right');
            }
            isDragging = false;
        }
    });

    gallery.addEventListener('mouseup', () => {
        isDragging = false;
    });

    gallery.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    gallery.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
    }, { passive: true });

    gallery.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = startX - currentX;

        if (Math.abs(diff) > 30) {
            if (diff > 0) {
                animateSwipe('left');
            } else {
                animateSwipe('right');
            }
            isDragging = false;
        }
    }, { passive: true });

    gallery.addEventListener('touchend', () => {
        isDragging = false;
    });

    function animateSwipe(direction) {
        const positions = [
            { x: 100, scale: 1, z: 4 },
            { x: 30, scale: 0.95, z: 3 },
            { x: -30, scale: 0.9, z: 2 },
            { x: -100, scale: 0.85, z: 1 }
        ];

        if (direction === 'left') {
            currentIndex = (currentIndex + 1) % certificates.length;
        } else if (direction === 'right') {
            currentIndex = (currentIndex - 1 + certificates.length) % certificates.length;
        }

        certificates.forEach((cert, index) => {
            const position = (index - currentIndex + certificates.length) % certificates.length;
            const pos = positions[position] || positions[positions.length - 1];

            cert.style.transform = `translateX(-50%) translateX(${pos.x}px) scale(${pos.scale})`;
            cert.style.zIndex = pos.z;
        });
    }

    // Initialize positions
    animateSwipe('none');
});