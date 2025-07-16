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
