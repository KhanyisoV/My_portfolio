// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== TYPING ANIMATION ====================
    function createTypingEffect() {
        const nameElement = document.querySelector('#header-section h1');
        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        
        let i = 0;
        const typingSpeed = 100;
        
        function typeWriter() {
            if (i < originalText.length) {
                nameElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Add blinking cursor effect
                nameElement.innerHTML += '<span class="cursor">|</span>';
                // Remove cursor after 3 seconds
                setTimeout(() => {
                    const cursor = nameElement.querySelector('.cursor');
                    if (cursor) cursor.remove();
                }, 3000);
            }
        }
        
        setTimeout(typeWriter, 500);
    }

    // ==================== FLOATING PARTICLES BACKGROUND ====================
    function createFloatingParticles() {
        const header = document.getElementById('header-section');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: float ${Math.random() * 10 + 5}s linear infinite;
                z-index: 1;
            `;
            header.appendChild(particle);
        }
        
        // Add CSS animation for particles
        const style = document.createElement('style');
        style.textContent = `
            #header-section { position: relative; overflow: hidden; }
            
            @keyframes float {
                0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
            }
            
            .cursor {
                animation: blink 1s infinite;
            }
            
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
            
            .glitch {
                animation: glitch 0.3s ease-in-out;
            }
            
            @keyframes glitch {
                0% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
                100% { transform: translate(0); }
            }
            
            .shake {
                animation: shake 0.5s ease-in-out;
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            
            .bounce-in {
                animation: bounceIn 0.6s ease-out;
            }
            
            @keyframes bounceIn {
                0% { transform: scale(0.3); opacity: 0; }
                50% { transform: scale(1.05); }
                70% { transform: scale(0.9); }
                100% { transform: scale(1); opacity: 1; }
            }
            
            .slide-in-left {
                animation: slideInLeft 0.6s ease-out;
            }
            
            @keyframes slideInLeft {
                0% { transform: translateX(-100px); opacity: 0; }
                100% { transform: translateX(0); opacity: 1; }
            }
            
            .slide-in-right {
                animation: slideInRight 0.6s ease-out;
            }
            
            @keyframes slideInRight {
                0% { transform: translateX(100px); opacity: 0; }
                100% { transform: translateX(0); opacity: 1; }
            }
            
            .fade-in-up {
                animation: fadeInUp 0.8s ease-out;
            }
            
            @keyframes fadeInUp {
                0% { transform: translateY(30px); opacity: 0; }
                100% { transform: translateY(0); opacity: 1; }
            }
            
            .pulse {
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7); }
                70% { box-shadow: 0 0 0 10px rgba(0, 0, 0, 0); }
                100% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
            }
            
            .matrix-rain {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
                opacity: 0.1;
            }
        `;
        document.head.appendChild(style);
    }

    // ==================== SCROLL ANIMATIONS ====================
    function createScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    if (element.id === 'about-section') {
                        element.classList.add('slide-in-left');
                    } else if (element.id === 'portfolio-section') {
                        element.classList.add('fade-in-up');
                        // Animate portfolio items with stagger
                        const portfolioItems = element.querySelectorAll('[id^="project-"]');
                        portfolioItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('bounce-in');
                            }, index * 200);
                        });
                    } else if (element.id === 'education-section') {
                        element.classList.add('slide-in-right');
                    } else if (element.id === 'skills-section') {
                        element.classList.add('fade-in-up');
                    } else if (element.id === 'contact-section') {
                        element.classList.add('bounce-in');
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observe all main sections
        const sections = ['about-section', 'portfolio-section', 'education-section', 'skills-section', 'contact-section'];
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) observer.observe(section);
        });
    }

    // ==================== INTERACTIVE HOVER EFFECTS ====================
    function addInteractiveEffects() {
        // Navigation items hover effect
        const navItems = document.querySelectorAll('#main-navigation a');
        navItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(2deg)';
                this.style.transition = 'all 0.3s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        // Download buttons pulse effect
        const downloadBtns = document.querySelectorAll('.download-btn');
        downloadBtns.forEach(btn => {
            btn.classList.add('pulse');
            
            btn.addEventListener('click', function() {
                this.classList.add('shake');
                setTimeout(() => {
                    this.classList.remove('shake');
                }, 500);
            });
        });

        // Portfolio videos hover effect
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) rotate(1deg)';
                this.style.transition = 'all 0.3s ease';
                this.style.filter = 'brightness(1.1)';
            });
            
            video.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.filter = 'brightness(1)';
            });
        });

        // Certificate images hover effect with rotation
        const certImages = document.querySelectorAll('#certifications-section img');
        certImages.forEach(img => {
            img.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2) rotate(5deg)';
                this.style.transition = 'all 0.3s ease';
                this.style.filter = 'saturate(1.2)';
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.filter = 'saturate(1)';
            });
        });
    }

    // ==================== FORM ANIMATIONS ====================
    function addFormAnimations() {
        const form = document.getElementById('contact-form');
        const inputs = form.querySelectorAll('input, textarea');
        const submitBtn = document.getElementById('submit-btn');

        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.2)';
                this.style.transition = 'all 0.3s ease';
            });

            input.addEventListener('blur', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });

            // Add typing effect to inputs
            input.addEventListener('input', function() {
                this.classList.add('glitch');
                setTimeout(() => {
                    this.classList.remove('glitch');
                }, 300);
            });
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            submitBtn.textContent = 'Sending...';
            submitBtn.style.background = 'linear-gradient(45deg, #000, #333)';
            submitBtn.classList.add('pulse');
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent! ✓';
                submitBtn.style.backgroundColor = '#4CAF50';
                submitBtn.classList.remove('pulse');
                
                setTimeout(() => {
                    submitBtn.textContent = 'Send Message';
                    submitBtn.style.backgroundColor = '#000';
                    form.reset();
                }, 3000);
            }, 2000);
        });
    }

    // ==================== MATRIX RAIN EFFECT ====================
    function createMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.className = 'matrix-rain';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const chars = '01';
        const charSize = 14;
        const columns = canvas.width / charSize;
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * canvas.height;
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#000';
            ctx.font = charSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * charSize, drops[i]);
                
                if (drops[i] * charSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 100);
    }

    // ==================== SMOOTH SCROLLING WITH EASING ====================
    function addSmoothScrolling() {
        const navLinks = document.querySelectorAll('#main-navigation a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Add active state animation
                    this.classList.add('glitch');
                    setTimeout(() => {
                        this.classList.remove('glitch');
                    }, 300);
                    
                    // Smooth scroll with custom easing
                    const startPosition = window.pageYOffset;
                    const targetPosition = targetSection.offsetTop - 100;
                    const distance = targetPosition - startPosition;
                    const duration = 1000;
                    let start = null;
                    
                    function animation(currentTime) {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const run = easeInOutQuart(timeElapsed, startPosition, distance, duration);
                        window.scrollTo(0, run);
                        if (timeElapsed < duration) requestAnimationFrame(animation);
                    }
                    
                    function easeInOutQuart(t, b, c, d) {
                        t /= d / 2;
                        if (t < 1) return c / 2 * t * t * t * t + b;
                        t -= 2;
                        return -c / 2 * (t * t * t * t - 2) + b;
                    }
                    
                    requestAnimationFrame(animation);
                }
            });
        });
    }

    // ==================== MOUSE TRAIL EFFECT ====================
    function createMouseTrail() {
        const trail = [];
        const trailLength = 10;
        
        document.addEventListener('mousemove', function(e) {
            trail.push({ x: e.clientX, y: e.clientY });
            
            if (trail.length > trailLength) {
                trail.shift();
            }
            
            updateTrail();
        });
        
        function updateTrail() {
            const existingTrails = document.querySelectorAll('.mouse-trail');
            existingTrails.forEach(t => t.remove());
            
            trail.forEach((point, index) => {
                const trailElement = document.createElement('div');
                trailElement.className = 'mouse-trail';
                trailElement.style.cssText = `
                    position: fixed;
                    left: ${point.x}px;
                    top: ${point.y}px;
                    width: ${10 - index}px;
                    height: ${10 - index}px;
                    background: rgba(0, 0, 0, ${(trailLength - index) / trailLength * 0.5});
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transform: translate(-50%, -50%);
                `;
                document.body.appendChild(trailElement);
                
                setTimeout(() => {
                    trailElement.remove();
                }, 500);
            });
        }
    }

    // ==================== INITIALIZE ALL ANIMATIONS ====================
    function initializeAnimations() {
        createTypingEffect();
        createFloatingParticles();
        createScrollAnimations();
        addInteractiveEffects();
        addFormAnimations();
        createMatrixRain();
        addSmoothScrolling();
        createMouseTrail();
        
        // Add loading animation
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 1s ease-in';
            document.body.style.opacity = '1';
        }, 100);
    }

    // Start all animations
    initializeAnimations();

    // ==================== PERFORMANCE OPTIMIZATION ====================
    // Throttle scroll events for better performance
    let ticking = false;
    
    function updateOnScroll() {
        // Add parallax effect to header
        const scrolled = window.pageYOffset;
        const header = document.getElementById('header-section');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
    
    console.log('🚀 Portfolio animations loaded successfully!');
});

// ==================== ADDITIONAL UTILITY FUNCTIONS ====================

// Function to create random color animations
function randomColorAnimation(element, duration = 2000) {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
    let colorIndex = 0;
    
    setInterval(() => {
        element.style.color = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, duration);
}

// Function to create text scramble effect
function scrambleText(element, finalText, duration = 2000) {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let iterations = 0;
    
    const interval = setInterval(() => {
        element.textContent = finalText
            .split('')
            .map((char, index) => {
                if (index < iterations) {
                    return finalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        
        if (iterations >= finalText.length) {
            clearInterval(interval);
        }
        
        iterations += 1 / 3;
    }, 30);
    // Performance-optimized mobile JavaScript
    class MobilePortfolio {
        constructor() {
            this.isTouch = 'ontouchstart' in window;
            this.isMobile = window.innerWidth <= 768;
            this.animations = new Map();
            this.observers = new Map();
            
            this.init();
        }

        init() {
            this.setupIntersectionObserver();
            this.setupSmoothScrolling();
            this.setupFormHandling();
            this.setupVideoOptimization();
            this.setupPerformanceOptimizations();
            this.setupAccessibility();
        }

        setupIntersectionObserver() {
            const options = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Unobserve after animation to save resources
                        observer.unobserve(entry.target);
                    }
                });
            }, options);

            // Observe all animated elements
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            });

            this.observers.set('scroll', observer);
        }

        setupSmoothScrolling() {
            const navLinks = document.querySelectorAll('#main-navigation a[href^="#"]');
            
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const targetId = link.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const headerOffset = 80;
                        const elementPosition = targetSection.offsetTop;
                        const offsetPosition = elementPosition - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });

                        // Update URL without causing scroll
                        history.pushState(null, null, targetId);
                    }
                });
            });
        }

        setupFormHandling() {
            const form = document.getElementById('contact-form');
            const submitBtn = document.getElementById('submit-btn');
            const originalText = submitBtn.textContent;

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Show loading state
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');

                try {
                    const formData = new FormData(form);
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        submitBtn.textContent = 'Message Sent! ✓';
                        submitBtn.style.backgroundColor = '#4CAF50';
                        form.reset();
                        
                        // Reset button after 3 seconds
                        setTimeout(() => {
                            this.resetSubmitButton(submitBtn, originalText);
                        }, 3000);
                    } else {
                        throw new Error('Form submission failed');
                    }
                } catch (error) {
                    submitBtn.textContent = 'Error - Try Again';
                    submitBtn.style.backgroundColor = '#f44336';
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        this.resetSubmitButton(submitBtn, originalText);
                    }, 3000);
                }

                submitBtn.classList.remove('loading');
            });
        }

        resetSubmitButton(button, originalText) {
            button.textContent = originalText;
            button.style.backgroundColor = '#000';
            button.disabled = false;
        }

        setupVideoOptimization() {
            const videos = document.querySelectorAll('video');
            
            videos.forEach(video => {
                // Optimize for mobile
                video.setAttribute('playsinline', '');
                video.setAttribute('preload', 'metadata');
                
                // Pause video when not in view to save battery
                const videoObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            if (video.paused) {
                                video.play().catch(() => {
                                    // Handle autoplay restrictions
                                });
                            }
                        } else {
                            video.pause();
                        }
                    });
                }, { threshold: 0.5 });
                
                videoObserver.observe(video);
            });
        }

        setupPerformanceOptimizations() {
            // Debounce scroll events
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                if (scrollTimeout) {
                    cancelAnimationFrame(scrollTimeout);
                }
                
                scrollTimeout = requestAnimationFrame(() => {
                    this.handleScroll();
                });
            });

            // Lazy load images
            const images = document.querySelectorAll('img[loading="lazy"]');
            if ('loading' in HTMLImageElement.prototype) {
                // Native lazy loading supported
                images.forEach(img => {
                    img.src = img.src;
                });
            } else {
                // Fallback for browsers without native lazy loading
                this.setupLazyLoading(images);
            }

           
        }

        setupLazyLoading(images) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('loading');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => {
                img.classList.add('loading');
                imageObserver.observe(img);
            });

            this.observers.set('images', imageObserver);
        }

        setupAccessibility() {
            // Add keyboard navigation support
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    document.body.classList.add('keyboard-nav');
                }
            });

            document.addEventListener('mousedown', () => {
                document.body.classList.remove('keyboard-nav');
            });

            // Improve focus management for mobile
            const focusableElements = document.querySelectorAll(
                'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
            );

            focusableElements.forEach(element => {
                element.addEventListener('focus', () => {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                });
            });
        }

        handleScroll() {
            // Implement any scroll-based animations here
            // Keep this minimal for performance
        }

    
    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        new MobilePortfolio();
    });

    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            window.scrollTo(0, window.scrollX);
        }, 100);
    });
}