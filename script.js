// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');

    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navLinksContainer.classList.contains('active')
        ? 'rotate(45deg) translate(8px, 8px)'
        : 'none';
    spans[1].style.opacity = navLinksContainer.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navLinksContainer.classList.contains('active')
        ? 'rotate(-45deg) translate(8px, -8px)'
        : 'none';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');

        // Reset hamburger animation
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Active navigation on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animate on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.skill-card, .project-card, .stat');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Progress bar animation
const skillCards = document.querySelectorAll('.skill-card');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress');
            if (progressBar) {
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        }
    });
}, observerOptions);

skillCards.forEach(card => {
    progressObserver.observe(card);
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
    const message = contactForm.querySelector('textarea').value;

    // Show success message
    alert(`Merci ${name}! Votre message a été envoyé avec succès. Nous vous répondrons bientôt à ${email}.`);

    // Reset form
    contactForm.reset();
});

// Smooth reveal animation on page load
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(50px)';
    heroContent.style.transition = 'all 1s ease';

    setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 100);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const heroShape = document.querySelector('.hero-shape');
    const scrolled = window.scrollY;

    if (heroShape) {
        heroShape.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add typing effect for hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = '';

    let charIndex = 0;
    const typingSpeed = 50;

    function typeText() {
        if (charIndex < originalText.length) {
            // Handle HTML tags
            if (originalText[charIndex] === '<') {
                const closingIndex = originalText.indexOf('>', charIndex);
                heroTitle.innerHTML += originalText.substring(charIndex, closingIndex + 1);
                charIndex = closingIndex + 1;
            } else {
                heroTitle.innerHTML += originalText[charIndex];
                charIndex++;
            }
            setTimeout(typeText, typingSpeed);
        }
    }

    // Start typing after a short delay
    setTimeout(typeText, 500);
}

// Cursor effect
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

// Add cursor styles dynamically
const style = document.createElement('style');
style.innerHTML = `
    .cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease, opacity 0.2s ease;
        opacity: 0;
    }

    .cursor.active {
        transform: scale(1.5);
        opacity: 0.5;
    }
`;
document.head.appendChild(style);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursor.style.opacity = '1';
});

// Scale cursor on click
document.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});

// Hide cursor when it leaves the window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

// Lazy load images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.classList.add('scroll-top-btn');
document.body.appendChild(scrollTopBtn);

// Add scroll to top button styles
const scrollTopStyle = document.createElement('style');
scrollTopStyle.innerHTML = `
    .scroll-top-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.25rem;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 999;
    }

    .scroll-top-btn.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .scroll-top-btn:hover {
        transform: translateY(-5px);
    }
`;
document.head.appendChild(scrollTopStyle);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add animation to project cards on hover
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.project-image').style.transform = 'scale(1.05)';
        this.querySelector('.project-image').style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
        this.querySelector('.project-image').style.transform = 'scale(1)';
    });
});

console.log('Portfolio loaded successfully!');
