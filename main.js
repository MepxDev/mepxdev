/**
 * MepxDev Portfolio Website
 * Main JavaScript File
 * 
 * This file contains all the interactive functionality for the portfolio website
 * including theme switching, form validation, animations, and more.
 */

// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ===== Preloader =====
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader when page is loaded
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
    
    // ===== Theme Toggle =====
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
    
    // ===== Mobile Navigation =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a nav item
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // ===== Smooth Scrolling =====
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
    
    // ===== Header Scroll Effect =====
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ===== Active Nav Link on Scroll =====
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // ===== Back to Top Button =====
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // ===== Skills Animation =====
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = `${width}%`;
            }, 100);
        });
    }
    
    // Animate skills when section is in view
    const observerOptions = {
        threshold: 0.2
    };
    
    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const skillsSection = document.querySelector('.about-skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // ===== Counter Animation =====
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Animate counters when section is in view
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // ===== Projects Filter =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        });
    });
    
    // ===== Contact Form Validation =====
    const form = document.getElementById('form');
    const formSuccess = document.getElementById('form-success');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.form-submit');
            submitBtn.classList.add('sending');
            
            // Simulate form submission
            setTimeout(() => {
                form.style.display = 'none';
                formSuccess.style.display = 'block';
                submitBtn.classList.remove('sending');
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    form.reset();
                    form.style.display = 'block';
                    formSuccess.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }
    
    // ===== Current Year in Footer =====
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // ===== Animate Elements on Scroll =====
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.hero-text, .hero-image, .about-text, .about-skills, .project-card, .contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // ===== Typing Animation for Hero Text =====
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    let i = 0;
    
    function typeWriter() {
        if (i < originalText.length) {
            heroTitle.textContent = originalText.substring(0, i + 1);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing animation after 1 second
    setTimeout(() => {
        heroTitle.textContent = '';
        typeWriter();
    }, 1000);
    
    // ===== Tooltip for Tech Icons =====
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach(icon => {
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        
        if (icon.querySelector('.fa-roblox')) {
            tooltip.textContent = 'Roblox Studio';
        } else if (icon.querySelector('.fa-lua')) {
            tooltip.textContent = 'Lua Scripting';
        } else if (icon.querySelector('.fa-gamepad')) {
            tooltip.textContent = 'Game Design';
        } else if (icon.querySelector('.fa-code')) {
            tooltip.textContent = 'Programming';
        }
        
        icon.appendChild(tooltip);
        
        icon.addEventListener('mouseenter', function() {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        });
        
        icon.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(10px)';
        });
    });
    
    // ===== Project Card Hover Effect =====
    projectCards.forEach(card => {
        const image = card.querySelector('.project-image img');
        const overlay = card.querySelector('.project-overlay');
        
        card.addEventListener('mousemove', function(e) {
            const x = e.offsetX;
            const y = e.offsetY;
            const rotateY = (-1/5 * x + 20);
            const rotateX = (1/5 * y - 20);
            
            image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            overlay.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            overlay.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // ===== Scroll Reveal Animation =====
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        delay: 200,
        reset: true
    });
    
    scrollReveal.reveal('.hero-text, .hero-image', { origin: 'left' });
    scrollReveal.reveal('.about-text, .about-skills', { interval: 200 });
    scrollReveal.reveal('.project-card', { interval: 200 });
    scrollReveal.reveal('.contact-info, .contact-form', { origin: 'left', interval: 200 });
    
    // ===== Particle Background for Hero Section =====
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const canvas = document.createElement('canvas');
        canvas.className = 'particles-background';
        heroSection.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
        
        const particles = [];
        const particleCount = 50;
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.color = `rgba(108, 92, 231, ${Math.random() * 0.5 + 0.1})`;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        function initParticles() {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(108, 92, 231, ${1 - distance / 100})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(animateParticles);
        }
        
        initParticles();
        animateParticles();
        
        window.addEventListener('resize', function() {
            canvas.width = heroSection.offsetWidth;
            canvas.height = heroSection.offsetHeight;
        });
    }
});
