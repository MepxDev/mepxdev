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

// Work Showcase
function initWorkShowcase() {
    const workCarousel = document.querySelector('.work-carousel');
    const workDots = document.querySelector('.work-dots');
    const workItems = [
        {
            title: "Neon Finance Dashboard",
            category: "Web Application",
            description: "A cutting-edge financial dashboard with real-time data visualization and predictive analytics.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            year: "2023",
            tech: ["React", "D3.js", "Node.js", "MongoDB"],
            links: {
                demo: "#",
                code: "#"
            },
            details: "This project involved creating a comprehensive financial dashboard for a Fortune 500 company. The interface features real-time stock market data, predictive trend analysis, and customizable portfolio tracking. We implemented advanced data visualization techniques using D3.js and optimized the backend for high-frequency data processing."
        },
        {
            title: "Virtual Reality Museum",
            category: "VR Experience",
            description: "An immersive virtual reality platform for exploring world-class museum exhibits from home.",
            image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
            year: "2022",
            tech: ["Unity", "WebGL", "Three.js", "Blender"],
            links: {
                demo: "#",
                code: "#"
            },
            details: "We developed this VR museum experience in collaboration with several international art institutions. The platform allows users to explore high-resolution 3D scans of artifacts, with interactive educational content and multiplayer functionality for shared tours. The WebGL implementation makes it accessible without specialized VR hardware."
        },
        {
            title: "AI-Powered E-Commerce",
            category: "E-Commerce Platform",
            description: "Next-generation online shopping with personalized AI recommendations and AR try-on features.",
            image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            year: "2023",
            tech: ["Vue.js", "TensorFlow.js", "WebAR", "Node.js"],
            links: {
                demo: "#",
                code: "#"
            },
            details: "This e-commerce platform revolutionizes online shopping with machine learning-powered recommendations and augmented reality product visualization. The AI system learns user preferences over time, while the WebAR implementation allows customers to virtually try products directly in their browser. We achieved a 35% increase in conversion rates compared to traditional platforms."
        },
        {
            title: "Health & Fitness Tracker",
            category: "Mobile Application",
            description: "Comprehensive health monitoring with wearable integration and personalized coaching.",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            year: "2021",
            tech: ["React Native", "GraphQL", "Firebase", "Apple HealthKit"],
            links: {
                demo: "#",
                code: "#"
            },
            details: "Our health tracking app syncs with major wearable devices to provide users with detailed analytics about their fitness and wellness. The app includes AI-powered coaching, meal planning, and integration with healthcare providers. We focused on data privacy and security while maintaining seamless cross-device synchronization."
        },
        {
            title: "Smart City Dashboard",
            category: "Data Visualization",
            description: "Real-time monitoring and analytics platform for urban infrastructure and services.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            year: "2022",
            tech: ["Angular", "Mapbox", "WebSockets", "Python"],
            links: {
                demo: "#",
                code: "#"
            },
            details: "Developed for municipal governments, this dashboard aggregates data from thousands of IoT sensors across city infrastructure. It provides real-time monitoring of traffic patterns, energy usage, public transportation, and emergency services. The map-based interface allows officials to quickly identify and respond to urban challenges."
        }
    ];

    // Create project items
    workItems.forEach((project, index) => {
        // Create carousel item
        const item = document.createElement('div');
        item.className = 'work-item';
        item.style.backgroundImage = `url(${project.image})`;
        item.innerHTML = `
            <div class="work-content">
                <span class="work-category">${project.category}</span>
                <h3 class="work-title">${project.title}</h3>
                <p class="work-description">${project.description}</p>
                <a href="#" class="work-link" data-index="${index}">
                    View Project <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        workCarousel.appendChild(item);

        // Create dot
        const dot = document.createElement('div');
        dot.className = 'work-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            scrollToProject(index);
        });
        workDots.appendChild(dot);
    });

    // Handle project clicks
    document.querySelectorAll('.work-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const index = parseInt(link.getAttribute('data-index'));
            openProjectDetails(index);
        });
    });

    // Carousel navigation
    const prevBtn = document.querySelector('.work-prev');
    const nextBtn = document.querySelector('.work-next');
    
    prevBtn.addEventListener('click', () => {
        const activeDot = document.querySelector('.work-dot.active');
        let prevIndex = parseInt(activeDot.previousElementSibling?.getAttribute('data-index')) || workItems.length - 1;
        scrollToProject(prevIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        const activeDot = document.querySelector('.work-dot.active');
        let nextIndex = parseInt(activeDot.nextElementSibling?.getAttribute('data-index')) || 0;
        scrollToProject(nextIndex);
    });

    // Auto-scroll for carousel
    let autoScrollInterval = setInterval(() => {
        const activeDot = document.querySelector('.work-dot.active');
        let nextIndex = parseInt(activeDot.nextElementSibling?.getAttribute('data-index')) || 0;
        scrollToProject(nextIndex);
    }, 5000);

    // Pause auto-scroll on hover
    workCarousel.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });
    
    workCarousel.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(() => {
            const activeDot = document.querySelector('.work-dot.active');
            let nextIndex = parseInt(activeDot.nextElementSibling?.getAttribute('data-index')) || 0;
            scrollToProject(nextIndex);
        }, 5000);
    });

    // Project details modal
    const detailModal = document.querySelector('.work-details');
    const closeBtn = document.querySelector('.detail-close');
    
    closeBtn.addEventListener('click', () => {
        detailModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Click outside to close
    detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) {
            detailModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    function scrollToProject(index) {
        const items = document.querySelectorAll('.work-item');
        const dots = document.querySelectorAll('.work-dot');
        
        items[index].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
        
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    function openProjectDetails(index) {
        const project = workItems[index];
        const detailModal = document.querySelector('.work-details');
        const detailContent = detailModal.querySelector('.detail-content');
        
        // Update modal content
        detailContent.querySelector('.detail-title').textContent = project.title;
        detailContent.querySelector('.detail-category').textContent = project.category;
        detailContent.querySelector('.detail-date').textContent = project.year;
        detailContent.querySelector('.detail-description').textContent = project.details;
        
        // Update tech tags
        const techContainer = detailContent.querySelector('.detail-tech');
        techContainer.innerHTML = '';
        project.tech.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            techContainer.appendChild(tag);
        });
        
        // Update images
        const imagesContainer = detailContent.querySelector('.detail-images');
        imagesContainer.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const img = document.createElement('div');
            img.className = 'detail-image';
            if (i === 0) img.classList.add('active');
            img.style.backgroundImage = `url(${project.image})`;
            imagesContainer.appendChild(img);
        }
        
        // Update links
        const linksContainer = detailContent.querySelector('.detail-links');
        linksContainer.innerHTML = '';
        if (project.links.demo) {
            const demoLink = document.createElement('a');
            demoLink.href = project.links.demo;
            demoLink.className = 'detail-link';
            demoLink.target = '_blank';
            demoLink.innerHTML = '<i class="fas fa-external-link-alt"></i> Live Demo';
            linksContainer.appendChild(demoLink);
        }
        if (project.links.code) {
            const codeLink = document.createElement('a');
            codeLink.href = project.links.code;
            codeLink.className = 'detail-link';
            codeLink.target = '_blank';
            codeLink.innerHTML = '<i class="fab fa-github"></i> View Code';
            linksContainer.appendChild(codeLink);
        }
        
        // Show modal
        detailModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reset image carousel
        const images = detailModal.querySelectorAll('.detail-image');
        images.forEach((img, i) => {
            img.addEventListener('click', () => {
                images.forEach(img => img.classList.remove('active'));
                img.classList.add('active');
            });
        });
    }
}

// About Section
function initAboutSection() {
    // Animate stats counting
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(number => {
        observer.observe(number);
    });
    
    function startCounting(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // ms
        const start = 0;
        const increment = target / (duration / 16); // Roughly 60fps
        
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.setProperty('--delay', `${index * 0.2}s`);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(item);
    });
    
    // Team members
    const teamMembers = [
        {
            name: "Alex Johnson",
            role: "CEO & Lead Developer",
            bio: "Full-stack developer with 10+ years of experience building scalable web applications.",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            social: {
                twitter: "#",
                linkedin: "#",
                github: "#"
            }
        },
        {
            name: "Sarah Chen",
            role: "Creative Director",
            bio: "UI/UX specialist focused on creating intuitive and beautiful user experiences.",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
            social: {
                dribbble: "#",
                behance: "#",
                linkedin: "#"
            }
        },
        {
            name: "Michael Rodriguez",
            role: "Senior Developer",
            bio: "Backend engineer specializing in high-performance systems and database architecture.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            social: {
                twitter: "#",
                github: "#",
                stackoverflow: "#"
            }
        },
        {
            name: "Emily Wilson",
            role: "Project Manager",
            bio: "Ensures projects are delivered on time and exceed client expectations.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            social: {
                linkedin: "#",
                twitter: "#"
            }
        }
    ];
    
    const teamGrid = document.querySelector('.team-grid');
    
    teamMembers.forEach(member => {
        const memberEl = document.createElement('div');
        memberEl.className = 'team-member';
        
        let socialLinks = '';
        for (const [platform, url] of Object.entries(member.social)) {
            const iconClass = platform === 'github' ? 'fab fa-github' :
                             platform === 'linkedin' ? 'fab fa-linkedin-in' :
                             platform === 'dribbble' ? 'fab fa-dribbble' :
                             platform === 'behance' ? 'fab fa-behance' :
                             platform === 'stackoverflow' ? 'fab fa-stack-overflow' :
                             'fab fa-twitter';
            
            socialLinks += `<a href="${url}" target="_blank"><i class="${iconClass}"></i></a>`;
        }
        
        memberEl.innerHTML = `
            <div class="member-image" style="background-image: url(${member.image})"></div>
            <div class="member-info">
                <h4 class="member-name">${member.name}</h4>
                <span class="member-role">${member.role}</span>
                <p class="member-bio">${member.bio}</p>
                <div class="member-social">${socialLinks}</div>
            </div>
        `;
        
        teamGrid.appendChild(memberEl);
    });
}

// Tech Stack
function initTechStack() {
    const techItems = {
        frontend: [
            { name: "React", icon: "fab fa-react" },
            { name: "Vue.js", icon: "fab fa-vuejs" },
            { name: "Angular", icon: "fab fa-angular" },
            { name: "TypeScript", icon: "fas fa-code" },
            { name: "JavaScript", icon: "fab fa-js" },
            { name: "HTML5", icon: "fab fa-html5" },
            { name: "CSS3", icon: "fab fa-css3-alt" },
            { name: "Sass", icon: "fab fa-sass" },
            { name: "Tailwind", icon: "fas fa-wind" },
            { name: "Three.js", icon: "fas fa-cube" },
            { name: "GSAP", icon: "fas fa-chart-line" },
            { name: "Webpack", icon: "fas fa-box" }
        ],
        backend: [
            { name: "Node.js", icon: "fab fa-node" },
            { name: "Express", icon: "fas fa-server" },
            { name: "Python", icon: "fab fa-python" },
            { name: "Django", icon: "fas fa-database" },
            { name: "Ruby on Rails", icon: "fas fa-gem" },
            { name: "PHP", icon: "fab fa-php" },
            { name: "Laravel", icon: "fas fa-laravel" },
            { name: "GraphQL", icon: "fas fa-project-diagram" },
            { name: "MongoDB", icon: "fas fa-database" },
            { name: "PostgreSQL", icon: "fas fa-database" },
            { name: "Firebase", icon: "fas fa-fire" },
            { name: "Docker", icon: "fab fa-docker" }
        ],
        design: [
            { name: "Figma", icon: "fab fa-figma" },
            { name: "Adobe XD", icon: "fas fa-pencil-ruler" },
            { name: "Sketch", icon: "fas fa-paint-brush" },
            { name: "Photoshop", icon: "fas fa-image" },
            { name: "Illustrator", icon: "fas fa-pen-fancy" },
            { name: "After Effects", icon: "fas fa-film" },
            { name: "Blender", icon: "fas fa-cube" },
            { name: "InVision", icon: "fas fa-mobile-alt" },
            { name: "Zeplin", icon: "fas fa-hand-pointer" }
        ],
        tools: [
            { name: "Git", icon: "fab fa-git-alt" },
            { name: "GitHub", icon: "fab fa-github" },
            { name: "GitLab", icon: "fab fa-gitlab" },
            { name: "VS Code", icon: "fas fa-code" },
            { name: "Jira", icon: "fab fa-jira" },
            { name: "Trello", icon: "fab fa-trello" },
            { name: "Slack", icon: "fab fa-slack" },
            { name: "npm", icon: "fab fa-npm" },
            { name: "Yarn", icon: "fas fa-yarn" },
            { name: "AWS", icon: "fab fa-aws" },
            { name: "Google Cloud", icon: "fab fa-google" },
            { name: "Azure", icon: "fab fa-microsoft" }
        ]
    };
    
    const techContainer = document.querySelector('.tech-items');
    const categoryButtons = document.querySelectorAll('.tech-category');
    
    // Show initial category
    showTechCategory('frontend');
    
    // Category switching
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            showTechCategory(button.getAttribute('data-category'));
        });
    });
    
    function showTechCategory(category) {
        techContainer.innerHTML = '';
        
        techItems[category].forEach((tech, index) => {
            const item = document.createElement('div');
            item.className = 'tech-item';
            item.style.setProperty('--delay', `${index * 0.05}s`);
            item.innerHTML = `
                <div class="tech-icon">
                    <i class="${tech.icon}"></i>
                </div>
                <div class="tech-name">${tech.name}</div>
            `;
            
            techContainer.appendChild(item);
            
            // Animate on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(item);
        });
    }
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('mainContactForm');
    const formSubmit = contactForm.querySelector('.form-submit');
    const formSuccess = document.querySelector('.form-success');
    const successReset = document.querySelector('.success-reset');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state
        formSubmit.classList.add('loading');
        
        // Simulate form submission
        setTimeout(() => {
            formSubmit.classList.remove('loading');
            contactForm.reset();
            formSuccess.classList.add('active');
        }, 2000);
    });
    
    successReset.addEventListener('click', () => {
        formSuccess.classList.remove('active');
    });
}

// Footer
function initFooter() {
    const backToTop = document.querySelector('.back-to-top');
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.service-card, .tech-item, .timeline-item, .team-member');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Page Transitions
function initPageTransitions() {
    // Would be used for multi-page navigation
    // Currently not needed for single-page site
}

// Micro-interactions
function initMicroInteractions() {
    // Hover effects for buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
    
    // Hover effects for links
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateX(3px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateX(0)';
        });
    });
    
    // Form input focus effects
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.querySelector('.form-underline').style.width = '100%';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.querySelector('.form-underline').style.width = '0';
            }
        });
    });
}
