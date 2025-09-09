// Enhanced Portfolio JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('nav__menu--open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close mobile menu when clicking on links
        navMenu.querySelectorAll('.nav__link').forEach((link) => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('nav__menu--open')) {
                    navMenu.classList.remove('nav__menu--open');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Particle Background Animation
    function createParticles() {
        const particleField = document.querySelector('.particle-field');
        if (!particleField) return;

        const particleCount = window.innerWidth > 768 ? 50 : 25;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(0,245,255,0.5);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleMove ${(5 + Math.random() * 10).toFixed(2)}s linear infinite;
                animation-delay: ${(Math.random() * 5).toFixed(2)}s;
            `;
            particleField.appendChild(particle);
        }
    }

    createParticles();

    // Skills Chart
    const ctx = document.getElementById('skillsChart');
    if (ctx && typeof Chart !== 'undefined') {
        const labels = ['HTML/CSS', 'JavaScript', 'React.js', 'Python', 'C/C++', 'Databases'];
        const dataValues = [85, 80, 75, 70, 65, 70];

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data: dataValues,
                    backgroundColor: [
                        'rgba(0,245,255,0.8)',
                        'rgba(139,92,246,0.8)',
                        'rgba(236,72,153,0.8)',
                        'rgba(16,185,129,0.8)',
                        'rgba(245,158,11,0.8)',
                        'rgba(239,68,68,0.8)'
                    ],
                    borderColor: [
                        'rgba(0,245,255,1)',
                        'rgba(139,92,246,1)',
                        'rgba(236,72,153,1)',
                        'rgba(16,185,129,1)',
                        'rgba(245,158,11,1)',
                        'rgba(239,68,68,1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#f5f5f5',
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                    arc: {
                        borderWidth: 2
                    }
                }
            }
        });
    }

    // Skill Level Bars Animation
    const observeSkills = () => {
        const skillBars = document.querySelectorAll('.skill-level');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const level = entry.target.getAttribute('data-level') || 0;
                    entry.target.style.setProperty('--width', level + '%');
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => skillObserver.observe(bar));
    };

    observeSkills();

    // Typing Effect
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        let i = 0;

        const typeInterval = setInterval(() => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    typingElement.style.borderRight = "none";
                }, 1000);
            }
        }, 80);
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.querySelector('span').textContent;
            
            // Show loading state
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = 'Message Sent!';
                submitBtn.style.background = 'linear-gradient(45deg, #10b981, #059669)';
                
                // Reset form
                contactForm.reset();
                
                // Show success notification
                showNotification('Message sent successfully!', 'success');
                
                // Reset button after 2.5 seconds
                setTimeout(() => {
                    submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 2500);
            }, 2000);
        });
    }

    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: rgba(15,15,15,0.9);
            color: #00f5ff;
            border-radius: 8px;
            border: 1px solid rgba(0,245,255,0.3);
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s;
            backdrop-filter: blur(10px);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Fade in
        setTimeout(() => {
            notification.style.opacity = 1;
        }, 100);

        // Fade out and remove
        setTimeout(() => {
            notification.style.opacity = 0;
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal--visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach((el) => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach((el) => el.classList.add('reveal--visible'));
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Custom Cursor Effect (Desktop only)
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(0,245,255,0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = (e.clientX - 10) + 'px';
            cursor.style.top = (e.clientY - 10) + 'px';
        });

        // Scale cursor on hover
        document.querySelectorAll('a, button, .glass-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    }

    // Optimize animations for performance
    const animatedElements = document.querySelectorAll('.orb');
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.target.style.animationPlayState = 
                    entry.isIntersecting ? 'running' : 'paused';
            });
        });

        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
            animationObserver.observe(el);
        });
    }

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    const highlightNav = () => {
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav);

    // Handle resize for mobile optimization
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('nav__menu--open')) {
            navMenu.classList.remove('nav__menu--open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Set theme
    document.documentElement.setAttribute('data-color-scheme', 'dark');
    
    console.log('🚀 Portfolio loaded successfully!');
});
