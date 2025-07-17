/**
 * MepxDev Portfolio Website
 * A modern, responsive portfolio for a Roblox developer
 * 
 * Features:
 * - Dark/Light theme toggle
 * - Smooth scrolling
 * - Form validation
 * - Responsive navigation
 * - Project filtering
 * - Animations and transitions
 * - Preloader
 */

document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    //              Preloader
    // =============================================
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        // Add fade-out class to preloader
        preloader.classList.add('fade-out');
        
        // Remove preloader from DOM after animation
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
    
    // =============================================
    //              Theme Toggle
    // =============================================
    const themeSwitch = document.getElementById('theme-switch');
    const currentTheme = localStorage.getItem('theme');
    
    // Check for saved theme preference
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (currentTheme === 'light') {
            themeSwitch.checked = true;
        }
    }
    
    // Theme switch event listener
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // =============================================
    //              Navigation
    // =============================================
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.navbar-hamburger');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navbarLinks = document.querySelectorAll('.navbar-link');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navbarLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navbarMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // =============================================
    //              Smooth Scrolling
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =============================================
    //              Back to Top Button
    // =============================================
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // =============================================
    //              Skills Animation
    // =============================================
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    // Animate skill bars when section is in view
    const animateSkills = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillProgressBars.forEach(bar => {
                    const level = bar.getAttribute('data-level');
                    bar.style.width = `${level}%`;
                });
                observer.unobserve(entry.target);
            }
        });
    };
    
    const skillsObserver = new IntersectionObserver(animateSkills, {
        threshold: 0.2
    });
    
    const skillsSection = document.querySelector('.skills-container');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // =============================================
    //              Projects Filter
    // =============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // =============================================
    //              Contact Form Validation
    // =============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate name
            const nameInput = document.getElementById('name');
            const nameError = nameInput.nextElementSibling.nextElementSibling;
            
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Name is required';
                isValid = false;
            } else if (nameInput.value.trim().length < 2) {
                nameError.textContent = 'Name must be at least 2 characters';
                isValid = false;
            } else {
                nameError.textContent = '';
            }
            
            // Validate email
            const emailInput = document.getElementById('email');
            const emailError = emailInput.nextElementSibling.nextElementSibling;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email';
                isValid = false;
            } else {
                emailError.textContent = '';
            }
            
            // Validate subject
            const subjectInput = document.getElementById('subject');
            const subjectError = subjectInput.nextElementSibling.nextElementSibling;
            
            if (subjectInput.value.trim() === '') {
                subjectError.textContent = 'Subject is required';
                isValid = false;
            } else if (subjectInput.value.trim().length < 5) {
                subjectError.textContent = 'Subject must be at least 5 characters';
                isValid = false;
            } else {
                subjectError.textContent = '';
            }
            
            // Validate message
            const messageInput = document.getElementById('message');
            const messageError = messageInput.nextElementSibling.nextElementSibling;
            
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Message is required';
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                messageError.textContent = 'Message must be at least 10 characters';
                isValid = false;
            } else {
                messageError.textContent = '';
            }
            
            // If form is valid, submit it
            if (isValid) {
                // In a real application, you would send the form data to a server here
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
            }
        });
    }
    
    // =============================================
    //              Current Year
    // =============================================
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // =============================================
    //              Scroll Reveal Animation
    // =============================================
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });
    
    scrollReveal.reveal('.hero-content, .hero-image', { origin: 'left' });
    scrollReveal.reveal('.section-header', { origin: 'top' });
    scrollReveal.reveal('.about-image, .about-text', { interval: 200 });
    scrollReveal.reveal('.project-card', { interval: 200 });
    scrollReveal.reveal('.contact-info, .contact-form', { origin: 'left', interval: 200 });
    
    // =============================================
    //              Initialize Animation on Skills
    // =============================================
    // Trigger the skills animation on page load if skills are already in view
    const checkSkillsInView = () => {
        const skillsRect = skillsSection.getBoundingClientRect();
        if (
            skillsRect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            skillsRect.bottom >= 0
        ) {
            skillProgressBars.forEach(bar => {
                const level = bar.getAttribute('data-level');
                bar.style.width = `${level}%`;
            });
            window.removeEventListener('scroll', checkSkillsInView);
        }
    };
    
    window.addEventListener('scroll', checkSkillsInView);
    checkSkillsInView(); // Check immediately in case skills are already in view
});

// =============================================
//              Helper Functions
// =============================================

/**
 * Debounce function to limit how often a function is called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @returns {Function} - The debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

/**
 * Throttle function to limit how often a function is called
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} - The throttled function
 */
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// =============================================
//              ScrollReveal Initialization
// =============================================
// This is a simplified version of ScrollReveal for demonstration purposes
// In a real project, you would use the actual ScrollReveal library
const ScrollReveal = (function() {
    function ScrollReveal(options) {
        this.options = options || {};
        this.defaults = {
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            delay: 200,
            reset: false
        };
        this.settings = Object.assign({}, this.defaults, this.options);
        this.elements = [];
    }
    
    ScrollReveal.prototype.reveal = function(selector, config) {
        const elements = document.querySelectorAll(selector);
        const settings = config ? Object.assign({}, this.settings, config) : this.settings;
        
        elements.forEach((el, index) => {
            this.elements.push({
                element: el,
                settings: settings,
                revealed: false
            });
            
            // Set initial styles
            el.style.transition = `all ${settings.duration}ms ease ${settings.delay + (index * (settings.interval || 0))}ms`;
            el.style.opacity = '0';
            
            switch(settings.origin) {
                case 'top':
                    el.style.transform = `translateY(-${settings.distance})`;
                    break;
                case 'bottom':
                    el.style.transform = `translateY(${settings.distance})`;
                    break;
                case 'left':
                    el.style.transform = `translateX(-${settings.distance})`;
                    break;
                case 'right':
                    el.style.transform = `translateX(${settings.distance})`;
                    break;
                default:
                    el.style.transform = `translateY(${settings.distance})`;
            }
        });
        
        this.checkReveal();
        window.addEventListener('scroll', throttle(() => this.checkReveal(), 100));
        window.addEventListener('resize', debounce(() => this.checkReveal(), 100));
    };
    
    ScrollReveal.prototype.checkReveal = function() {
        const windowHeight = window.innerHeight;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + windowHeight;
        
        this.elements.forEach(item => {
            if (!item.revealed) {
                const element = item.element;
                const elementTop = element.getBoundingClientRect().top + windowTop;
                const elementBottom = elementTop + element.offsetHeight;
                
                if (elementBottom >= windowTop && elementTop <= windowBottom) {
                    element.style.opacity = '1';
                    element.style.transform = 'translate(0, 0)';
                    item.revealed = true;
                    
                    if (!item.settings.reset) {
                        this.elements = this.elements.filter(el => el !== item);
                    }
                }
            } else if (item.settings.reset && item.revealed) {
                const element = item.element;
                const elementTop = element.getBoundingClientRect().top + windowTop;
                const elementBottom = elementTop + element.offsetHeight;
                
                if (elementBottom < windowTop || elementTop > windowBottom) {
                    element.style.opacity = '0';
                    
                    switch(item.settings.origin) {
                        case 'top':
                            element.style.transform = `translateY(-${item.settings.distance})`;
                            break;
                        case 'bottom':
                            element.style.transform = `translateY(${item.settings.distance})`;
                            break;
                        case 'left':
                            element.style.transform = `translateX(-${item.settings.distance})`;
                            break;
                        case 'right':
                            element.style.transform = `translateX(${item.settings.distance})`;
                            break;
                        default:
                            element.style.transform = `translateY(${item.settings.distance})`;
                    }
                    
                    item.revealed = false;
                }
            }
        });
    };
    
    return ScrollReveal;
})();
