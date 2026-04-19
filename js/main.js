// Initialize AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
} else {
    // Fallback: keep text/content visible when CDN-loaded AOS script is unavailable.
    document.querySelectorAll('[data-aos]').forEach((element) => {
        element.classList.add('aos-animate');
        element.style.opacity = '1';
        element.style.transform = 'none';
    });
}

// Header Background Change on Scroll
const header = document.getElementById('header');
let lastScrollY = window.scrollY;
let isMenuOpen = false;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (isMenuOpen) return;

    // Add background to header when scrolling down
    if (currentScrollY > 100) {
        header.classList.add('bg-sumi', 'bg-opacity-95', 'backdrop-blur-md', 'shadow-lg');
    } else {
        header.classList.remove('bg-sumi', 'bg-opacity-95', 'backdrop-blur-md', 'shadow-lg');
    }

    // Hide/show header based on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 500) {
        header.classList.add('-translate-y-full');
    } else {
        header.classList.remove('-translate-y-full');
    }

    lastScrollY = currentScrollY;
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        header.classList.remove('-translate-y-full');
        mobileMenu.classList.add('block');
        document.body.classList.add('overflow-hidden');

        // Change button icon
        mobileMenuBtn.innerHTML = '<i class="fas fa-times text-2xl"></i>';
    } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('block');
        document.body.classList.remove('overflow-hidden');

        // Change button icon
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
    }
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('block');
        document.body.classList.remove('overflow-hidden');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
    });
});

// Parallax Effect for Hero Background
const heroSection = document.querySelector('.parallax-bg');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallaxSpeed = 0.5;

        if (scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// FAQ Accordion
const faqToggles = document.querySelectorAll('.faq-toggle');

faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const faqId = toggle.getAttribute('data-faq');
        const content = document.getElementById(`faq-content-${faqId}`);
        const icon = document.getElementById(`faq-icon-${faqId}`);

        // Toggle content visibility
        if (content.classList.contains('hidden')) {
            // Close all other FAQs
            document.querySelectorAll('[id^="faq-content-"]').forEach(otherContent => {
                otherContent.classList.add('hidden');
            });
            document.querySelectorAll('[id^="faq-icon-"]').forEach(otherIcon => {
                otherIcon.classList.remove('rotate-180');
            });

            // Open this FAQ
            content.classList.remove('hidden');
            icon.classList.add('rotate-180');
        } else {
            // Close this FAQ
            content.classList.add('hidden');
            icon.classList.remove('rotate-180');
        }
    });
});

// Usage recipe modal
const recipeButtons = document.querySelectorAll('.usage-recipe-btn');
const recipeModal = document.getElementById('usage-recipe-modal');
const recipeCloseButton = document.getElementById('usage-recipe-close');
const recipeTitle = document.getElementById('usage-recipe-title');
const recipeSteps = document.getElementById('usage-recipe-steps');

const recipeContents = {
    yogurt: {
        title: 'ヨーグルトにひとさじ',
        steps: [
            'プレーンヨーグルトを器に盛ります（約150g）。',
            '米飴を小さじ1〜2かけて、全体に広げます。',
            'お好みでバナナやベリーをのせて完成です。'
        ]
    },
    pancake: {
        title: 'パンケーキ×きな粉',
        steps: [
            '焼き上げたパンケーキをお皿に盛りつけます。',
            '米飴を小さじ2ほど、円を描くようにかけます。',
            '最後にきな粉をひとふりして完成です。'
        ]
    },
    teriyaki: {
        title: '照り焼きの仕上げに',
        steps: [
            'フライパンでしょう油・酒・みりんを温めます。',
            '火を弱めて米飴小さじ1〜2を加え、溶かします。',
            '具材に絡め、つやが出たら火を止めて完成です。'
        ]
    }
};

function openRecipeModal(recipeId) {
    if (!recipeModal || !recipeTitle || !recipeSteps) return;
    const recipe = recipeContents[recipeId];
    if (!recipe) return;

    recipeTitle.textContent = recipe.title;
    recipeSteps.innerHTML = recipe.steps
        .map((step, index) => `<li><span class="font-semibold text-indigo-blue mr-2">${index + 1}.</span>${step}</li>`)
        .join('');

    recipeModal.classList.remove('hidden');
    recipeModal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
}

function closeRecipeModal() {
    if (!recipeModal) return;
    recipeModal.classList.add('hidden');
    recipeModal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
}

recipeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        openRecipeModal(button.getAttribute('data-recipe-id'));
    });
});

if (recipeCloseButton) {
    recipeCloseButton.addEventListener('click', closeRecipeModal);
}

if (recipeModal) {
    recipeModal.addEventListener('click', (event) => {
        if (event.target === recipeModal) {
            closeRecipeModal();
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && recipeModal && !recipeModal.classList.contains('hidden')) {
        closeRecipeModal();
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Lazy Loading for Images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;

            // Check if image has data-src attribute for lazy loading
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        }
    });
}, {
    rootMargin: '50px'
});

// Observe all images
document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// Add subtle animation to product cards on hover
const productCards = document.querySelectorAll('[data-aos]');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Performance: Throttle scroll events
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
    }
}

// Apply throttle to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations here
}, 100));

// Initialize page animations
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animations
    document.body.classList.add('loaded');

    // Animate hero text sequentially
    const heroElements = document.querySelectorAll('[data-aos]');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('aos-animate');
        }, index * 100);
    });
});

// Add loading state management
window.addEventListener('load', () => {
    // Remove loading spinner if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 300);
    }

    // Trigger initial animations
    document.body.classList.add('page-loaded');
});

// Handle external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Track external link clicks (if analytics is set up)
        console.log('External link clicked:', link.href);
    });
});

// Form submission handling (for future contact form)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submitted');
        // Add form handling logic here
    });
});

// Add subtle cursor effect for premium feel
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Initialize Swiper for Customer Voices
function initializeSwiper() {
    if (typeof Swiper !== 'undefined') {
        const customerSwiper = new Swiper('.customer-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            }
        });
        console.log('Swiper initialized successfully');
    } else {
        console.error('Swiper library not loaded');
    }
}

// Initialize Swiper when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSwiper);
} else {
    initializeSwiper();
}

// Console Easter Egg
console.log('%c🍯 ゆめの飴 - 斑鳩の米飴', 'font-size: 20px; font-weight: bold; color: #2C3E50;');
console.log('%c今日の砂糖を、ひとさじだけ。', 'font-size: 14px; color: #666;');
console.log('%cMade with ❤️ in Nara, Japan', 'font-size: 12px; color: #999;');
