// Main Application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initWebGLBackground();
    initParticleNetwork();
    initNeonEffects();
    initTerminal();
    initCustomCursor();
    initAnimations();
    initVoiceInteraction();
    initDynamicContent();
    initShaderEffects();
    initPerformanceMonitor();
});

// WebGL Background
function initWebGLBackground() {
    const canvas = document.getElementById('webgl-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create complex geometry
    const geometry = new THREE.IcosahedronGeometry(2, 5);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x00f0ff,
        emissive: 0x00aaff,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Particle Network
function initParticleNetwork() {
    const container = document.getElementById('particle-network');
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    
    const particles = [];
    const particleCount = Math.floor(window.innerWidth / 10);
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            color: `rgba(0, 240, 255, ${Math.random() * 0.5 + 0.1})`
        });
    }
    
    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Boundary check
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            
            // Draw particle
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw connections
            particles.forEach(p2 => {
                const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
                if (distance < 150) {
                    ctx.strokeStyle = `rgba(0, 240, 255, ${1 - distance / 150})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    });
}

// Interactive Terminal
function initTerminal() {
    const terminal = document.querySelector('.terminal-container');
    const toggleBtn = document.getElementById('terminal-toggle');
    const terminalBody = document.querySelector('.terminal-body');
    const terminalOutput = document.querySelector('.terminal-output');
    
    // Toggle terminal
    toggleBtn.addEventListener('click', () => {
        terminal.classList.toggle('active');
        toggleBtn.classList.toggle('active');
    });
    
    // Terminal commands
    const commands = {
        help: () => `
            Available commands:<br>
            - help: Show this help message<br>
            - about: Learn about MEPXDEV<br>
            - projects: List current projects<br>
            - contact: Show contact information<br>
            - clear: Clear the terminal<br>
            - theme [color]: Change terminal theme<br>
        `,
        about: () => `
            MEPXDEV is a cutting-edge development studio specializing in:<br>
            - WebGL & 3D web applications<br>
            - Interactive experiences<br>
            - AI integration<br>
            - Performance optimization<br>
        `,
        // More commands would be added
    };
    
    // Process input
    function processCommand(cmd) {
        const parts = cmd.split(' ');
        const baseCmd = parts[0].toLowerCase();
        
        if (commands[baseCmd]) {
            return commands[baseCmd]();
        } else {
            return `Command not found: ${baseCmd}. Type 'help' for available commands.`;
        }
    }
    
    // More terminal functionality would be added
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Scale effect on hover
        const target = e.target;
        if (target.closest('a, button')) {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.backgroundColor = 'var(--accent)';
        } else {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--primary)';
        }
    });
    
    // Click effect
    document.addEventListener('click', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
        setTimeout(() => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);
    });
}

// More initialization functions would follow

// Enhanced Terminal Functionality
const terminalCommands = {
    // ... existing commands ...
    
    theme: (args) => {
        const color = args[0];
        const validThemes = {
            cyber: ['#00f0ff', '#ff00f0', '#f0ff00'],
            matrix: ['#00ff00', '#009900', '#003300'],
            synth: ['#ff0099', '#9900ff', '#00ffcc'],
            solar: ['#ff5500', '#ffaa00', '#ffee00']
        };
        
        if (!color || !validThemes[color]) {
            return `Invalid theme. Available: ${Object.keys(validThemes).join(', ')}`;
        }
        
        document.documentElement.style.setProperty('--primary', validThemes[color][0]);
        document.documentElement.style.setProperty('--secondary', validThemes[color][1]);
        document.documentElement.style.setProperty('--accent', validThemes[color][2]);
        
        return `Theme set to ${color}`;
    },
    
    deploy: () => {
        simulateDeployment();
        return 'Initiating quantum deployment sequence...';
    },
    
    scan: () => {
        const threats = ['None', 'Low', 'Moderate', 'Critical'];
        const randomThreat = threats[Math.floor(Math.random() * threats.length)];
        return `System scan complete. Threat level: ${randomThreat}`;
    }
};

function simulateDeployment() {
    const output = document.querySelector('.terminal-output');
    const lines = [
        'Compiling quantum modules...',
        'Optimizing neural pathways...',
        'Initializing blockchain verification...',
        'Deploying to edge nodes...',
        'Validating AI consensus...',
        'Deployment complete!'
    ];
    
    let i = 0;
    const interval = setInterval(() => {
        if (i < lines.length) {
            output.innerHTML += `<p>> ${lines[i]}</p>`;
            output.scrollTop = output.scrollHeight;
            i++;
        } else {
            clearInterval(interval);
            output.innerHTML += `<p>> Deployment successful. System nominal.</p>`;
            output.scrollTop = output.scrollHeight;
        }
    }, 1000);
}

// Holographic Project Carousel
function initProjectShowcase() {
    const projects = document.querySelectorAll('.project-card');
    const dots = document.querySelectorAll('.project-dots .dot');
    let currentIndex = 0;
    
    function showProject(index) {
        projects.forEach((project, i) => {
            project.classList.toggle('active', i === index);
            
            if (i < index) {
                project.style.transform = 'translateX(-100%) rotateY(-30deg)';
            } else if (i > index) {
                project.style.transform = 'translateX(100%) rotateY(30deg)';
            } else {
                project.style.transform = 'translateX(0) rotateY(0)';
            }
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    document.querySelector('.nav-arrow.next').addEventListener('click', () => {
        showProject((currentIndex + 1) % projects.length);
    });
    
    document.querySelector('.nav-arrow.prev').addEventListener('click', () => {
        showProject((currentIndex - 1 + projects.length) % projects.length);
    });
    
    // Auto-rotate every 8 seconds
    setInterval(() => {
        showProject((currentIndex + 1) % projects.length);
    }, 8000);
    
    // Create dots dynamically
    const dotsContainer = document.querySelector('.project-dots');
    projects.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showProject(i));
        dotsContainer.appendChild(dot);
    });
}

// Quantum Stats Animation
function animateQuantumStats() {
    const gauges = document.querySelectorAll('.stat-gauge');
    
    gauges.forEach(gauge => {
        const value = parseInt(gauge.getAttribute('data-value'));
        const fill = gauge.querySelector('.gauge-fill');
        const max = parseInt(gauge.getAttribute('data-max')) || 300;
        const percentage = Math.min(value / max * 100, 100);
        
        setTimeout(() => {
            fill.style.width = `${percentage}%`;
        }, 500);
    });
    
    // Animate globe points
    const globe = document.querySelector('.stat-globe');
    for (let i = 0; i < 30; i++) {
        const point = document.createElement('div');
        point.className = 'globe-point';
        
        // Random position on globe
        const lat = Math.random() * 180 - 90;
        const lng = Math.random() * 360 - 180;
        
        // Convert to 3D coordinates
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 90) * (Math.PI / 180);
        const radius = 200;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        
        point.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
        
        // Random animation
        const delay = Math.random() * 5;
        const duration = 2 + Math.random() * 3;
        point.style.animation = `pulsePoint ${duration}s ${delay}s infinite alternate`;
        
        globe.querySelector('.globe-points').appendChild(point);
    }
}

// Matrix Connection Animation
function initMatrixConnections() {
    const container = document.querySelector('.matrix-connections');
    const nodes = container.querySelectorAll('.connection-node');
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    const ctx = canvas.getContext('2d');
    
    // Position nodes randomly
    nodes.forEach(node => {
        node.style.left = `${Math.random() * 100}%`;
        node.style.top = `${Math.random() * 100}%`;
    });
    
    function drawConnections() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = `rgba(0, 240, 255, 0.3)`;
        ctx.lineWidth = 1;
        
        nodes.forEach(node1 => {
            const rect1 = node1.getBoundingClientRect();
            const x1 = rect1.left + rect1.width/2 - container.getBoundingClientRect().left;
            const y1 = rect1.top + rect1.height/2 - container.getBoundingClientRect().top;
            
            nodes.forEach(node2 => {
                if (node1 === node2) return;
                
                const rect2 = node2.getBoundingClientRect();
                const x2 = rect2.left + rect2.width/2 - container.getBoundingClientRect().left;
                const y2 = rect2.top + rect2.height/2 - container.getBoundingClientRect().top;
                
                const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                
                if (distance < 300) {
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(drawConnections);
    }
    
    drawConnections();
    
    // Make nodes interactive
    nodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            node.style.transform = 'scale(1.5)';
            node.style.boxShadow = '0 0 20px var(--primary)';
        });
        
        node.addEventListener('mouseleave', () => {
            node.style.transform = 'scale(1)';
            node.style.boxShadow = '0 0 10px var(--primary)';
        });
    });
}

// Initialize all new components
document.addEventListener('DOMContentLoaded', () => {
    // ... existing initializations ...
    
    initProjectShowcase();
    animateQuantumStats();
    initMatrixConnections();
    
    // Activate gauge animations when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateQuantumStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.quantum-stats'));
});
