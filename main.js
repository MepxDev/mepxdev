// Main Application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initPreloader();
    initParticles();
    initTheme();
    initNavigation();
    initHeroAnimation();
    initGlobe();
    initServices();
    initWorkShowcase();
    initAboutSection();
    initTechStack();
    initContactForm();
    initFooter();
    initScrollAnimations();
    initPageTransitions();
    initMicroInteractions();
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.progress');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Animate out
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                
                // Start other animations after preloader is gone
                animateHeroContent();
            }, 500);
        }
        progressBar.style.width = `${progress}%`;
    }, 100);
}

// Particle Background
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Particle system
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 50 : 100;
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.density = Math.random() * 30 + 1;
            this.color = `hsla(${Math.random() * 60 + 180}, 100%, 50%, ${Math.random() * 0.5 + 0.1})`;
            this.velocityX = Math.random() * 2 - 1;
            this.velocityY = Math.random() * 2 - 1;
        }
        
        update() {
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) {
                this.velocityX = -this.velocityX;
            }
            if (this.y < 0 || this.y > canvas.height) {
                this.velocityY = -this.velocityY;
            }
            
            // Move particle
            this.x += this.velocityX;
            this.y += this.velocityY;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
            
            // Add glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
        }
    }
    
    // Create particles
    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Connect particles
    function connect() {
        let opacity = 1;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const distance = Math.sqrt(
                    Math.pow(particles[a].x - particles[b].x, 2) + 
                    Math.pow(particles[a].y - particles[b].y, 2)
                );
                
                if (distance < 150) {
                    opacity = 1 - (distance / 150);
                    ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        connect();
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Theme Toggle
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Trigger theme change event
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: newTheme }));
    });
}

// Navigation
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Hero Animations
function initHeroAnimation() {
    // This will be triggered after preloader finishes
}

function animateHeroContent() {
    const titleLines = document.querySelectorAll('.title-line span');
    const subtitle = document.querySelector('.hero-subtitle');
    const ctas = document.querySelectorAll('.hero-cta button');
    
    // Animate title lines
    gsap.to(titleLines, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    // Animate subtitle
    gsap.from(subtitle, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.6,
        ease: 'power2.out'
    });
    
    // Animate CTAs
    gsap.from(ctas, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        delay: 1,
        ease: 'back.out'
    });
    
    // Animate floating cube
    const cube = document.querySelector('.floating-cube');
    gsap.from(cube, {
        rotationY: 180,
        rotationX: 45,
        duration: 3,
        ease: 'elastic.out(1, 0.5)'
    });
}

// 3D Globe
function initGlobe() {
    const canvas = document.getElementById('globeCanvas');
    if (!canvas) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
    });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create globe
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.MeshPhongMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.8,
        shininess: 100,
        emissive: 0x00aaff,
        emissiveIntensity: 0.2,
        wireframe: true
    });
    
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Position camera
    camera.position.z = 5;
    
    // Add glowing dots for cities
    const dotGeometry = new THREE.BufferGeometry();
    const dotMaterial = new THREE.PointsMaterial({
        color: 0x00ff9d,
        size: 0.1,
        sizeAttenuation: true
    });
    
    const dotPositions = [];
    const dotCount = 100;
    
    for (let i = 0; i < dotCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 2.05;
        
        dotPositions.push(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
        );
    }
    
    dotGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    const dots = new THREE.Points(dotGeometry, dotMaterial);
    scene.add(dots);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        globe.rotation.x += 0.001;
        globe.rotation.y += 0.002;
        
        dots.rotation.x += 0.001;
        dots.rotation.y += 0.002;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// Services Section
function initServices() {
    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid) return;
    
    const services = [
        {
            title: 'Web Development',
            icon: 'code',
            description: 'Custom, high-performance websites and web applications built with modern technologies.',
            color: '#00f0ff'
        },
        {
            title: 'UI/UX Design',
            icon: 'paint-brush',
            description: 'Beautiful, intuitive interfaces designed for optimal user experience and engagement.',
            color: '#ff00e4'
        },
        {
            title: 'Mobile Apps',
            icon: 'mobile-alt',
            description: 'Cross-platform mobile applications that deliver seamless experiences on any device.',
            color: '#00ff9d'
        },
        {
            title: 'E-Commerce',
            icon: 'shopping-cart',
            description: 'Powerful online stores with secure payment systems and intuitive product management.',
            color: '#ffcc00'
        },
        {
            title: 'SEO Optimization',
            icon: 'search',
            description: 'Increase your visibility and ranking on search engines with our proven strategies.',
            color: '#ff3860'
        },
        {
            title: 'Cloud Solutions',
            icon: 'cloud',
            description: 'Scalable cloud infrastructure and services to grow with your business needs.',
            color: '#00aaff'
        }
    ];
    
    // Generate service cards
    services.forEach((service, index) => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <div class="service-icon" style="color: ${service.color}">
                <i class="fas fa-${service.icon}"></i>
            </div>
            <h3 class="service-title">${service.title}</h3>
            <p class="service-description">${service.description}</p>
            <div class="service-hover" style="background: radial-gradient(circle at center, ${service.color}33, transparent 70%)"></div>
        `;
        
        // Add animation delay based on index
        card.style.setProperty('--delay', `${index * 0.1}s`);
        
        servicesGrid.appendChild(card);
    });
    
    // Animate cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
}

// Other sections would follow with similar detailed implementations
// Work Showcase, About Section, Tech Stack, Contact Form, etc.

// Scroll Animations
function initScrollAnimations() {
    // Initialize Intersection Observers for various elements
}

// Page Transitions
function initPageTransitions() {
    // Smooth transitions between pages (for when the site has multiple pages)
}

// Micro-interactions
function initMicroInteractions() {
    // Hover effects, click animations, etc.
}

// Footer
function initFooter() {
    // Footer animations and interactions
}
