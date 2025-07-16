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
    initMicroInteractions();
});

// Utility Functions
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

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
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle system
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 50 : 100;

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
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
        }
    }

    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

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

    window.addEventListener('resize', debounce(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }));
}

// Theme Toggle
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: newTheme }));
    });
}

// Navigation
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
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
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', debounce(() => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }));
}

// Hero Animations
function initHeroAnimation() {
    // Triggered after preloader
}

function animateHeroContent() {
    const titleLines = document.querySelectorAll('.title-line span');
    const subtitle = document.querySelector('.hero-subtitle');
    const ctas = document.querySelectorAll('.hero-cta button');
    
    gsap.to(titleLines, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    gsap.from(subtitle, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.6,
        ease: 'power2.out'
    });
    
    gsap.from(ctas, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        delay: 1,
        ease: 'back.out'
    });
    
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
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
    });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
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
    
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    camera.position.z = 5;
    
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
    
    function animate() {
        requestAnimationFrame(animate);
        globe.rotation.x += 0.001;
        globe.rotation.y += 0.002;
        dots.rotation.x += 0.001;
        dots.rotation.y += 0.002;
        renderer.render(scene, camera);
    }
    
    animate();
    
    window.addEventListener('resize', debounce(() => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }));
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
        // ... other services ...
    ];
    
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
        card.style.setProperty('--delay', `${index * 0.1}s`);
        servicesGrid.appendChild(card);
    });
    
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

// Work Showcase - Updated to fix scrolling issues
function initWorkShowcase() {
    const workCarousel = document.querySelector('.work-carousel');
    const workDots = document.querySelector('.work-dots');
    const workItems = [
        // ... your project data ...
    ];

    // Create project items
    workItems.forEach((project, index) => {
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

    // Project details modal
    const detailModal = document.querySelector('.work-details');
    const closeBtn = document.querySelector('.detail-close');
    
    closeBtn.addEventListener('click', () => {
        detailModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

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
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        
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
        // ... your team data ...
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
            // ... other tech items ...
        ],
        // ... other categories ...
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
    }, { 
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
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
