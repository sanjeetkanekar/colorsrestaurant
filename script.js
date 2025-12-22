/* ============================================
   COLORS RESTAURANT & BAR - CUSTOM JAVASCRIPT
   Interactive Features & Animations
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    const body = document.body;

    // Disable scrolling while loading
    body.classList.add('loading');

    // Hide preloader when page is fully loaded
    window.addEventListener('load', function () {
        setTimeout(function () {
            preloader.classList.add('hidden');
            body.classList.remove('loading');

            // Remove preloader from DOM after fade out
            setTimeout(function () {
                preloader.style.display = 'none';
            }, 600);
        }, 800); // Minimum display time for minimal loader
    });

    // ===== INITIALIZE AOS (Animate On Scroll) =====
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        disable: function () {
            return window.innerWidth < 768;
        }
    });

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('mainNav');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        // Add scrolled class when scrolling down
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function setActiveNavLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink);

    // ===== SMOOTH SCROLLING FOR NAV LINKS =====
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    // ===== HERO CAROUSEL AUTO-PLAY =====
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        const carousel = new bootstrap.Carousel(heroCarousel, {
            interval: 5000,
            wrap: true,
            pause: 'hover'
        });

        // Re-initialize AOS on slide change
        heroCarousel.addEventListener('slid.bs.carousel', function () {
            AOS.refresh();
        });
    }

    // ===== GALLERY LIGHTBOX =====
    // ===== Gallery Fullscreen Fix =====
    // Gallery Fullscreen + Navigation
    const galleryItems = document.querySelectorAll(".gallery-item img");
    const galleryModalImg = document.getElementById("galleryModalImg");
    const galleryModalEl = document.getElementById("galleryModal");
    const modal = new bootstrap.Modal(galleryModalEl);

    let currentIndex = 0;

    // Open modal on image click
    galleryItems.forEach((img, index) => {
        img.addEventListener("click", () => {
            currentIndex = index;
            galleryModalImg.src = img.src;
            modal.show();
        });
    });

    // Modal navigation buttons
    const prevBtn = galleryModalEl.querySelector(".modal-nav.prev");
    const nextBtn = galleryModalEl.querySelector(".modal-nav.next");

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        galleryModalImg.src = galleryItems[currentIndex].src;
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        galleryModalImg.src = galleryItems[currentIndex].src;
    });


    // ===== CONTACT FORM HANDLING =====
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic validation
            if (!name || !phone || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // Phone validation (basic)
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
                alert('Please enter a valid phone number.');
                return;
            }

            // Here you would typically send the form data to a server
            // For now, we'll show a success message and open WhatsApp
            const whatsappMessage = `Hello Colors Restaurant,\n\nI would like to make an enquiry:\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
            const whatsappUrl = `https://wa.me/918975944032?text=${encodeURIComponent(whatsappMessage)}`;

            // Show success message
            alert('Thank you for your message! Redirecting to WhatsApp...');

            // Open WhatsApp
            window.open(whatsappUrl, '_blank');

            // Reset form
            contactForm.reset();
        });
    }

    // ===== PARALLAX EFFECT FOR HERO SECTION =====
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');

        if (heroSection && scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // ===== MENU CARD HOVER EFFECTS =====
    const menuCards = document.querySelectorAll('.menu-card');

    menuCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // ===== WHATSAPP BUTTON ANIMATION =====
    const whatsappButton = document.querySelector('.whatsapp-float');

    if (whatsappButton) {
        // Add click animation
        whatsappButton.addEventListener('click', function () {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
            }, 100);
        });
    }

    // ===== SCROLL TO TOP FUNCTIONALITY (Optional Enhancement) =====
    let scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-accent);
        color: #fff;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    `;
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollToTopBtn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
    });

    scrollToTopBtn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    });

    // ===== LAZY LOADING FOR IMAGES (Performance Enhancement) =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== MOBILE MENU CLOSE ON CLICK OUTSIDE =====
    document.addEventListener('click', function (e) {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');

        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });

    // ===== FORM INPUT ANIMATIONS =====
    const formInputs = document.querySelectorAll('.form-control');

    formInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // ===== CONSOLE MESSAGE =====
    console.log('%c🍽️ COLORS Restaurant & Bar', 'color: #ff6b6b; font-size: 20px; font-weight: bold;');
    console.log('%cWelcome to our website!', 'color: #4ecdc4; font-size: 14px;');

});

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimized scroll handler
const optimizedScrollHandler = throttle(function () {
    // Scroll-dependent functions here
    setActiveNavLink();
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

