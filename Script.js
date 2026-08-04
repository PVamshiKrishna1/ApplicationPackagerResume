
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll to top button functionality
        const scrollTopBtn = document.getElementById('scrollTop');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Animate on scroll logic
        function animateOnScroll() {
            const animatedElems = document.querySelectorAll('.aos-fade, .aos-slide-up, .aos-zoom-in, .aos-flip, .aos-rotate');
            const windowHeight = window.innerHeight;
            animatedElems.forEach(elem => {
                const rect = elem.getBoundingClientRect();
                if (rect.top <= windowHeight - 80 && rect.bottom >= 0) {
                    elem.classList.add('aos-in-view');
                } else {
                    elem.classList.remove('aos-in-view');
                }
            });
        }
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('resize', animateOnScroll);
        window.addEventListener('load', animateOnScroll);

        // Existing IntersectionObserver for fade-in-up on sections
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Mobile menu toggle (if you want to add it later)
        const createMobileMenu = () => {
            const nav = document.querySelector('.nav');
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.createElement('button');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            hamburger.className = 'hamburger';
            hamburger.style.cssText = `
                display: none;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--primary);
                cursor: pointer;
                @media (max-width: 768px) {
                    display: block;
                }
            `;
            nav.appendChild(hamburger);
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        };
        createMobileMenu();

        // Add some interactive effects
        document.querySelectorAll('.project-card, .skill-card, .timeline-item').forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-8px)';
            });
            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0)';
            });
        });

        // Typing effect for hero title (optional enhancement)
        const typeWriter = (element, text, speed = 100) => {
            let i = 0;
            element.innerHTML = '';
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, speed);
        };
        window.addEventListener('load', () => {
            const heroTitle = document.querySelector('.hero-content h1');
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 100);
        });

        // Progress bar functionality
        const progressBar = document.querySelector('.progress-bar');

        function updateProgressBar() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }

        window.addEventListener('scroll', updateProgressBar);
        window.addEventListener('load', updateProgressBar);

        // Dark mode toggle functionality
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;

        // Get saved theme from localStorage or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', savedTheme);

        // Update button icon based on current theme
        function updateThemeIcon() {
            const currentTheme = html.getAttribute('data-theme');
            const icon = themeToggle.querySelector('i');

            if (currentTheme === 'dark') {
                icon.className = 'fas fa-sun';
                themeToggle.setAttribute('aria-label', 'Switch to light mode');
            } else {
                icon.className = 'fas fa-moon';
                themeToggle.setAttribute('aria-label', 'Switch to dark mode');
            }
        }

        // Initialize theme icon
        updateThemeIcon();

        // Toggle theme on button click
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon();
        });

        // Dynamic background shapes animation
        class DynamicShape {
            constructor(element) {
                this.element = element;
                this.initialX = parseFloat(getComputedStyle(element).left) || 0;
                this.initialY = parseFloat(getComputedStyle(element).top) || 0;
                this.currentX = this.initialX;
                this.currentY = this.initialY;
                this.targetX = this.initialX;
                this.targetY = this.initialY;
                this.rotation = 0;
                this.scale = 1;
                this.speed = 0.02 + Math.random() * 0.03; // Random speed between 0.02 and 0.05
                this.updateInterval = 3000 + Math.random() * 4000; // Update every 3-7 seconds
                this.lastUpdate = Date.now();

                this.animate();
            }

            animate() {
                const now = Date.now();
                const deltaTime = now - this.lastUpdate;

                // Smooth interpolation towards target
                this.currentX += (this.targetX - this.currentX) * this.speed;
                this.currentY += (this.targetY - this.currentY) * this.speed;

                // Update rotation and scale
                this.rotation += 0.5;
                this.scale = 0.8 + Math.sin(now * 0.001) * 0.3; // Breathing effect

                // Apply transforms
                this.element.style.transform = `translate(${this.currentX - this.initialX}px, ${this.currentY - this.initialY}px) rotate(${this.rotation}deg) scale(${this.scale})`;

                // Set new random target periodically
                if (deltaTime > this.updateInterval) {
                    this.setNewTarget();
                    this.lastUpdate = now;
                    this.updateInterval = 3000 + Math.random() * 4000;
                }

                requestAnimationFrame(() => this.animate());
            }

            setNewTarget() {
                const maxOffset = 100; // Maximum movement range
                this.targetX = this.initialX + (Math.random() - 0.5) * maxOffset * 2;
                this.targetY = this.initialY + (Math.random() - 0.5) * maxOffset * 2;

                // Keep shapes within viewport bounds
                const rect = this.element.getBoundingClientRect();
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                if (this.targetX < 0) this.targetX = Math.max(0, this.targetX + maxOffset);
                if (this.targetX + rect.width > viewportWidth) this.targetX = Math.min(viewportWidth - rect.width, this.targetX - maxOffset);
                if (this.targetY < 0) this.targetY = Math.max(0, this.targetY + maxOffset);
                if (this.targetY + rect.height > viewportHeight) this.targetY = Math.min(viewportHeight - rect.height, this.targetY - maxOffset);
            }
        }

        // Initialize dynamic shapes
        function initDynamicShapes() {
            const shapes = document.querySelectorAll('.bg-shape');
            shapes.forEach(shape => {
                new DynamicShape(shape);
            });
        }

        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', initDynamicShapes);

        // Reinitialize on window resize
        window.addEventListener('resize', () => {
            // Small delay to avoid excessive reinitialization
            setTimeout(initDynamicShapes, 100);
        });

        // Neural Network Elements
        class NeuralNetwork {
            constructor() {
                this.nodes = [];
                this.connections = [];
                this.canvas = null;
                this.ctx = null;
                this.animationId = null;
                this.nodeCount = 15;
                this.connectionCount = 25;
                this.createCanvas();
                this.createNodes();
                this.createConnections();
                this.animate();
            }

            createCanvas() {
                this.canvas = document.createElement('canvas');
                this.canvas.className = 'neural-network-canvas';
                this.canvas.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -2;
                    pointer-events: none;
                    opacity: 0.6;
                `;
                document.body.appendChild(this.canvas);
                this.ctx = this.canvas.getContext('2d');
                this.resizeCanvas();
            }

            resizeCanvas() {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            }

            createNodes() {
                for (let i = 0; i < this.nodeCount; i++) {
                    this.nodes.push({
                        x: Math.random() * this.canvas.width,
                        y: Math.random() * this.canvas.height,
                        vx: (Math.random() - 0.5) * 0.5,
                        vy: (Math.random() - 0.5) * 0.5,
                        radius: 2 + Math.random() * 3,
                        opacity: 0.3 + Math.random() * 0.4,
                        pulse: Math.random() * Math.PI * 2
                    });
                }
            }

            createConnections() {
                for (let i = 0; i < this.connectionCount; i++) {
                    const node1 = this.nodes[Math.floor(Math.random() * this.nodes.length)];
                    const node2 = this.nodes[Math.floor(Math.random() * this.nodes.length)];
                    if (node1 !== node2) {
                        this.connections.push({
                            node1: node1,
                            node2: node2,
                            opacity: 0.1 + Math.random() * 0.2,
                            active: false
                        });
                    }
                }
            }

            updateNodes() {
                this.nodes.forEach(node => {
                    node.x += node.vx;
                    node.y += node.vy;
                    node.pulse += 0.02;

                    // Bounce off edges
                    if (node.x <= 0 || node.x >= this.canvas.width) node.vx *= -1;
                    if (node.y <= 0 || node.y >= this.canvas.height) node.vy *= -1;

                    // Keep nodes in bounds
                    node.x = Math.max(0, Math.min(this.canvas.width, node.x));
                    node.y = Math.max(0, Math.min(this.canvas.height, node.y));
                });
            }

            draw() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

                // Draw connections
                this.connections.forEach(connection => {
                    const dx = connection.node1.x - connection.node2.x;
                    const dy = connection.node1.y - connection.node2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 200) { // Only draw connections within range
                        const opacity = connection.opacity * (1 - distance / 200);
                        this.ctx.strokeStyle = `rgba(102, 126, 234, ${opacity})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.beginPath();
                        this.ctx.moveTo(connection.node1.x, connection.node1.y);
                        this.ctx.lineTo(connection.node2.x, connection.node2.y);
                        this.ctx.stroke();
                    }
                });

                // Draw nodes
                this.nodes.forEach(node => {
                    const pulseScale = 1 + Math.sin(node.pulse) * 0.3;
                    const currentRadius = node.radius * pulseScale;

                    // Outer glow
                    const gradient = this.ctx.createRadialGradient(
                        node.x, node.y, 0,
                        node.x, node.y, currentRadius * 2
                    );
                    gradient.addColorStop(0, `rgba(102, 126, 234, ${node.opacity})`);
                    gradient.addColorStop(1, 'rgba(102, 126, 234, 0)');

                    this.ctx.fillStyle = gradient;
                    this.ctx.beginPath();
                    this.ctx.arc(node.x, node.y, currentRadius * 2, 0, Math.PI * 2);
                    this.ctx.fill();

                    // Inner node
                    this.ctx.fillStyle = `rgba(102, 126, 234, ${node.opacity * 1.5})`;
                    this.ctx.beginPath();
                    this.ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
                    this.ctx.fill();
                });
            }

            animate() {
                this.updateNodes();
                this.draw();
                this.animationId = requestAnimationFrame(() => this.animate());
            }

            destroy() {
                if (this.animationId) {
                    cancelAnimationFrame(this.animationId);
                }
                if (this.canvas && this.canvas.parentNode) {
                    this.canvas.parentNode.removeChild(this.canvas);
                }
            }
        }

        // Initialize neural network
        let neuralNetwork = null;

        function initNeuralNetwork() {
            if (neuralNetwork) {
                neuralNetwork.destroy();
            }
            neuralNetwork = new NeuralNetwork();
        }

        // Initialize neural network when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initNeuralNetwork, 1000); // Delay to ensure page is fully loaded
        });

        // Handle theme changes for neural network
        const themeObserver = new MutationObserver(() => {
            if (neuralNetwork) {
                // Update colors based on theme
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                // Neural network colors are handled in the draw method
            }
        });
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        // Reinitialize on window resize
        window.addEventListener('resize', () => {
            if (neuralNetwork) {
                neuralNetwork.resizeCanvas();
            }
        });

    