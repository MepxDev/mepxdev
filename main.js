/**
 * MepxDev Personal Website
 * A cyberpunk-inspired portfolio for a Roblox developer
 * 
 * Features:
 * - Theme switching (light/dark mode)
 * - Smooth scrolling
 * - Typing animations
 * - Scroll-triggered animations
 * - Interactive elements with hover effects
 * - Particle background
 * - Form validation
 * - Responsive navigation
 * - Console greeting
 */

// Console Greeting
console.log("%cWelcome to mepxdev.com", "color: #818cf8; font-size: 18px; font-weight: bold;");
console.log("%cPowered by Chroma Studio", "color: #a78bfa; font-size: 14px;");

// DOM Elements
const themeSwitch = document.querySelectorAll('.theme-switch');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const backToTopBtn = document.querySelector('.back-to-top');
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const modalClose = document.querySelector('.modal-close');

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false,
    mirror: true
});

// Theme Switching
themeSwitch.forEach(switchElement => {
    switchElement.addEventListener('change', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
if (savedTheme === 'light') {
    themeSwitch.forEach(switchElement => {
        switchElement.checked = true;
    });
}

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Typing Animation
class TypingAnimation {
    constructor(element) {
        this.element = element;
        this.text = element.getAttribute('data-text') || '';
        this.speed = parseInt(element.getAttribute('data-speed')) || 100;
        this.delay = parseInt(element.getAttribute('data-delay')) || 0;
        this.loop = element.hasAttribute('data-loop');
        this.cursor = element.nextElementSibling;
        
        this.init();
    }
    
    init() {
        setTimeout(() => {
            this.type();
        }, this.delay);
    }
    
    type() {
        let i = 0;
        const typing = () => {
            if (i < this.text.length) {
                this.element.textContent += this.text.charAt(i);
                i++;
                setTimeout(typing, this.speed);
            } else if (this.loop) {
                setTimeout(() => {
                    this.element.textContent = '';
                    i = 0;
                    typing();
                }, 2000);
            } else if (this.cursor) {
                this.cursor.style.display = 'none';
            }
        };
        
        this.element.textContent = '';
        typing();
    }
}

// Initialize typing animations
document.querySelectorAll('.typing-text').forEach(element => {
    new TypingAnimation(element);
});

// Counter Animation
class CounterAnimation {
    constructor(element) {
        this.element = element;
        this.target = parseInt(element.getAttribute('data-count')) || 0;
        this.speed = parseInt(element.getAttribute('data-speed')) || 2000;
        this.delay = parseInt(element.getAttribute('data-delay')) || 0;
        this.plus = element.nextElementSibling?.textContent === '+';
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(() => {
                    this.count();
                }, this.delay);
                observer.unobserve(this.element);
            }
        });
        
        observer.observe(this.element);
    }
    
    count() {
        const duration = this.speed;
        const start = 0;
        const increment = this.target / (duration / 16); // 60fps
        
        const animate = () => {
            const current = parseInt(this.element.textContent);
            if (current < this.target) {
                this.element.textContent = Math.ceil(current + increment);
                requestAnimationFrame(animate);
            } else {
                this.element.textContent = this.target;
                if (this.plus) {
                    this.element.nextElementSibling.style.opacity = '1';
                }
            }
        };
        
        this.element.textContent = start;
        animate();
    }
}

// Initialize counter animations
document.querySelectorAll('.stat-number').forEach(element => {
    new CounterAnimation(element);
});

// Project Card Tilt Effect
class TiltEffect {
    constructor(element) {
        this.element = element;
        this.width = element.offsetWidth;
        this.height = element.offsetHeight;
        this.perspective = 1000;
        
        element.addEventListener('mousemove', this.handleMouseMove.bind(this));
        element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }
    
    handleMouseMove(e) {
        const x = e.offsetX;
        const y = e.offsetY;
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        
        const rotateY = (x - centerX) / 20;
        const rotateX = (centerY - y) / 20;
        
        this.element.style.transform = `perspective(${this.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        this.element.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(129, 140, 248, 0.3)`;
    }
    
    handleMouseLeave() {
        this.element.style.transform = '';
        this.element.style.boxShadow = '';
    }
}

// Initialize tilt effects
document.querySelectorAll('.project-card').forEach(element => {
    new TiltEffect(element);
});

// Form Validation
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple validation
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;
        
        if (!name.value.trim()) {
            name.style.borderBottomColor = '#ef4444';
            isValid = false;
        } else {
            name.style.borderBottomColor = '';
        }
        
        if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            email.style.borderBottomColor = '#ef4444';
            isValid = false;
        } else {
            email.style.borderBottomColor = '';
        }
        
        if (!message.value.trim()) {
            message.style.borderBottomColor = '#ef4444';
            isValid = false;
        } else {
            message.style.borderBottomColor = '';
        }
        
        if (isValid) {
            // In a real implementation, you would send the form data to a server here
            // For demo purposes, we'll just show the success modal
            successModal.classList.add('active');
        }
    });
}

// Close Modal
modalClose.addEventListener('click', () => {
    successModal.classList.remove('active');
});

// Close modal when clicking outside
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.remove('active');
    }
});

// Particle Background
class ParticleBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = window.innerWidth < 768 ? 30 : 60;
        
        this.init();
        this.bindEvents();
    }
    
    init() {
        this.resizeCanvas();
        this.createParticles();
        this.animate();
    }
    
    bindEvents() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.particles = [];
            this.createParticles();
        });
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5,
                color: `rgba(129, 140, 248, ${Math.random() * 0.5 + 0.1})`
            });
        }
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            // Update position
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Bounce off edges
            if (p.x < 0 || p.x > this.canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.speedY *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const distance = Math.sqrt(
                    Math.pow(p.x - p2.x, 2) + 
                    Math.pow(p.y - p2.y, 2)
                );
                
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(129, 140, 248, ${1 - distance / 150})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

// Initialize particle background
new ParticleBackground('particle-canvas');

// Scroll Reveal Animation (alternative to AOS)
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('[data-scroll]');
        this.init();
    }
    
    init() {
        if (this.elements.length > 0) {
            this.createObserver();
        }
    }
    
    createObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        this.elements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Initialize scroll reveal
new ScrollReveal();
