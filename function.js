// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== TYPING ANIMATION ====================
    function createTypingEffect() {
        const nameElement = document.querySelector('#header-section h1');
        if (!nameElement) return;
        
        const originalText = nameElement.textContent || '';
        nameElement.textContent = '';
        
        let i = 0;
        const typingSpeed = 100;
        
        function typeWriter() {
            if (i < originalText.length) {
                nameElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Add blinking cursor effect without removing text
                const cursor = document.createElement('span');
                cursor.className = 'cursor';
                cursor.textContent = '|';
                nameElement.appendChild(cursor);
                
                // Remove cursor after 3 seconds but keep text
                setTimeout(() => {
                    if (cursor.parentNode === nameElement) {
                        nameElement.removeChild(cursor);
                    }
                }, 3000);
            }
        }
        
        setTimeout(typeWriter, 500);
    }

    // ==================== FLOATING PARTICLES BACKGROUND ====================
    function createFloatingParticles() {
        const header = document.getElementById('header-section');
        if (!header) return;
        
        // Reduced particle count for performance
        const particleCount = 30;
        
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
            @keyframes float {
                0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
            }
            
            .cursor {
                animation: blink 1s infinite;
                display: inline-block;
                width: 2px;
            }
            
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
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
                    
                    // Apply appropriate animation class
                    if (element.id === 'about-section') {
                        element.classList.add('slide-in-left', 'visible');
                    } else if (element.id === 'portfolio-section') {
                        element.classList.add('fade-in-up', 'visible');
                    } else if (element.id === 'education-section') {
                        element.classList.add('slide-in-right', 'visible');
                    } else if (element.id === 'skills-section') {
                        element.classList.add('fade-in-up', 'visible');
                    } else if (element.id === 'contact-section') {
                        element.classList.add('bounce-in', 'visible');
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observe all main sections
        document.querySelectorAll('.animate-on-scroll').forEach(section => {
            observer.observe(section);
        });
    }

    // ==================== INITIALIZE ALL ANIMATIONS ====================
    function initializeAnimations() {
        createTypingEffect();
        createFloatingParticles();
        createScrollAnimations();
        
        // Ensure body is visible
        document.body.style.opacity = '1';
    }

    // Start all animations
    initializeAnimations();

    // ==================== PERFORMANCE OPTIMIZATION ====================
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                // Add any scroll effects here if needed
                ticking = false;
            });
            ticking = true;
        }
    });
    
    console.log('Portfolio animations loaded successfully!');
});

// Mobile-optimized class
class MobilePortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupFormHandling();
        this.setupVideoOptimization();
    }

    setupFormHandling() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        const submitBtn = document.getElementById('submit-btn');
        if (!submitBtn) return;
        
        const originalText = submitBtn.textContent;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

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
                    form.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                submitBtn.textContent = 'Error - Try Again';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }

    setupVideoOptimization() {
        const videos = document.querySelectorAll('video');
        
        videos.forEach(video => {
            // Optimize for mobile
            video.setAttribute('playsinline', '');
            video.setAttribute('preload', 'metadata');
            video.setAttribute('muted', '');
            
            // Ensure videos are visible even if autoplay is blocked
            video.addEventListener('click', function() {
                if (video.paused) {
                    video.play().catch(e => console.log('Video play prevented:', e));
                } else {
                    video.pause();
                }
            });
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MobilePortfolio();
});