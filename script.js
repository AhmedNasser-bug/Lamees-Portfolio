// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Throttled scroll event listener
    let throttleTimer = null;
    window.addEventListener('scroll', () => {
        if (throttleTimer !== null) return;
        throttleTimer = setTimeout(() => {
            highlightActiveSection();
            throttleTimer = null;
        }, 100);
    });
    
    // Initialize active section on load
    highlightActiveSection();
});

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}


const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);


// Skills Section Interactive Enhancements
document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.getElementById('skills');
    const skillCards = document.querySelectorAll('.skill-group-card');
    const skillBadges = document.querySelectorAll('.skill-badge');
    
    // Intersection Observer for animation triggers
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Stagger card animations
                skillCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            }
        });
    }, observerOptions);
    
    // Initialize card animations
    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Enhanced badge interactions
    skillBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            // Subtle highlight effect for related badges
            const parentCard = this.closest('.skill-group-card');
            const siblingBadges = parentCard.querySelectorAll('.skill-badge');
            
            siblingBadges.forEach(sibling => {
                if (sibling !== this) {
                    sibling.style.opacity = '0.7';
                }
            });
        });
        
        badge.addEventListener('mouseleave', function() {
            const parentCard = this.closest('.skill-group-card');
            const siblingBadges = parentCard.querySelectorAll('.skill-badge');
            
            siblingBadges.forEach(sibling => {
                sibling.style.opacity = '1';
            });
        });
        
        // Accessibility: Add keyboard support
        badge.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--color-accent-deep)';
            this.style.outlineOffset = '2px';
        });
        
        badge.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Card tilt effect on hover (subtle 3D enhancement)
    skillCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
    
    // Performance: Debounce resize events
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Recalculate any position-dependent animations
            skillCards.forEach(card => {
                card.style.transform = '';
            });
        }, 250);
    });
});

// Skills highlighting based on scroll position
function initSkillsHighlighting() {
    const skillsSection = document.getElementById('skills');
    
    if (!skillsSection) return;
    
    const highlightSkills = () => {
        const rect = skillsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate visibility percentage
        const visibilityPercent = Math.max(0, Math.min(1, 
            (windowHeight - rect.top) / (windowHeight + rect.height)
        ));
        
        // Apply dynamic highlighting based on scroll position
        if (visibilityPercent > 0.3) {
            skillsSection.classList.add('skills-active');
        } else {
            skillsSection.classList.remove('skills-active');
        }
    };
    
    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                highlightSkills();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial check
    highlightSkills();
}

// Initialize skills highlighting
document.addEventListener('DOMContentLoaded', initSkillsHighlighting);


// Work Experience Section Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    const experienceSection = document.getElementById('experience');
    const experienceCards = document.querySelectorAll('.experience-card');
    const skillTags = document.querySelectorAll('.skill-tag');
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const experienceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.experience-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-in');
                    }, index * 200);
                });
            }
        });
    }, observerOptions);
    
    if (experienceSection) {
        experienceObserver.observe(experienceSection);
    }
    
    // Enhanced card interactions
    experienceCards.forEach((card, index) => {
        // Add staggered animation classes
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        // Parallax effect on scroll
        const addParallaxEffect = () => {
            const rect = card.getBoundingClientRect();
            const speed = 0.1;
            const yPos = -(window.scrollY * speed);
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                card.style.transform = `translateY(${yPos}px)`;
            }
        };
        
        // Progressive content reveal
        card.addEventListener('mouseenter', function() {
            const tags = this.querySelectorAll('.skill-tag');
            tags.forEach((tag, tagIndex) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.05)';
                    tag.style.boxShadow = 'var(--shadow-soft)';
                }, tagIndex * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const tags = this.querySelectorAll('.skill-tag');
            tags.forEach(tag => {
                tag.style.transform = '';
                tag.style.boxShadow = '';
            });
        });
        
        // Keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--color-accent-deep)';
            this.style.outlineOffset = '4px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Skill tag filtering interaction
    let activeFilters = new Set();
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            
            const skill = this.textContent.trim();
            
            if (activeFilters.has(skill)) {
                activeFilters.delete(skill);
                this.classList.remove('active-filter');
            } else {
                activeFilters.add(skill);
                this.classList.add('active-filter');
            }
            
                        filterExperienceItems();
        });
    });
    
    // Filter experience items based on selected skills
    function filterExperienceItems() {
        const experienceItems = document.querySelectorAll('.experience-item');
        
        if (activeFilters.size === 0) {
            // Show all items when no filters active
            experienceItems.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
                item.style.pointerEvents = 'auto';
            });
            return;
        }
        
        experienceItems.forEach(item => {
            const itemTags = Array.from(item.querySelectorAll('.skill-tag'))
                .map(tag => tag.textContent.trim());
            
            const hasMatchingSkill = Array.from(activeFilters)
                .some(filter => itemTags.includes(filter));
            
            if (hasMatchingSkill) {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
                item.style.pointerEvents = 'auto';
            } else {
                item.style.opacity = '0.3';
                item.style.transform = 'scale(0.95)';
                item.style.pointerEvents = 'none';
            }
        });
    }
    
    // Timeline animation on scroll
    function animateTimeline() {
        const timeline = document.querySelector('.experience-timeline::before');
        const timelineItems = document.querySelectorAll('.experience-item');
        
        let maxScroll = 0;
        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                maxScroll = Math.max(maxScroll, item.offsetTop);
            }
        });
        
        // Update CSS custom property for timeline progress
        document.documentElement.style.setProperty('--timeline-progress', 
            Math.min(100, (maxScroll / document.body.scrollHeight) * 100) + '%');
    }
    
    // Smooth reveal animation for experience items
    const revealExperience = () => {
        experienceCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Throttled scroll event listener
    let scrollTimer = null;
    window.addEventListener('scroll', () => {
        if (scrollTimer !== null) return;
        scrollTimer = setTimeout(() => {
            animateTimeline();
            revealExperience();
            scrollTimer = null;
        }, 16); // ~60fps
    });
    
    // Initialize on load
    revealExperience();
    animateTimeline();
    
    // Company logo lazy loading enhancement
    const logoImages = document.querySelectorAll('.logo-image');
    logoImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            // Fallback for broken images
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjQzQ4Qjk0Ii8+Cjx0ZXh0IHg9IjMwIiB5PSIzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCI+QzwvdGV4dD4KPC9zdmc+';
            this.alt = 'Company';
        });
    });
    
    // Add CSS for active filter state
    const filterCSS = `
    .skill-tag.active-filter {
        background: var(--color-accent-deep) !important;
        color: white !important;
        transform: scale(1.05);
        box-shadow: var(--shadow-medium);
    }
    
    .experience-item {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    `;
    
    const filterStyle = document.createElement('style');
    filterStyle.textContent = filterCSS;
    document.head.appendChild(filterStyle);
});

// Enhanced timeline progress indicator
function initTimelineProgress() {
    const style = document.createElement('style');
    style.textContent = `
    .experience-timeline::before {
        background: linear-gradient(to bottom, 
            var(--color-accent-deep) 0%,
            var(--color-accent-deep) var(--timeline-progress, 0%),
            var(--color-accent-medium) var(--timeline-progress, 0%),
            transparent 100%);
        transition: background 0.3s ease;
    }
    `;
    document.head.appendChild(style);
}

// Initialize timeline progress on DOM ready
document.addEventListener('DOMContentLoaded', initTimelineProgress);

// Performance optimization: Intersection Observer for individual cards
function initCardObserver() {
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-visible');
                // Unobserve after animation to improve performance
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    experienceCards.forEach(card => {
        cardObserver.observe(card);
    });
    
    // Add visibility animation CSS
    const visibilityCSS = `
    .experience-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .experience-card.card-visible {
        opacity: 1;
        transform: translateY(0);
    }
    `;
    
    const visibilityStyle = document.createElement('style');
    visibilityStyle.textContent = visibilityCSS;
    document.head.appendChild(visibilityStyle);
}

// Initialize card observer when DOM is ready
document.addEventListener('DOMContentLoaded', initCardObserver);

// Services Section Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    const servicesSection = document.getElementById('services');
    const serviceCards = document.querySelectorAll('.service-card');
    const ctaButtons = document.querySelectorAll('.service-cta-btn');
    const keywordTags = document.querySelectorAll('.keyword-tag');
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const servicesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('services-visible');
                animateServiceFeatures(entry.target);
            }
        });
    }, observerOptions);
    
    if (servicesSection) {
        servicesObserver.observe(servicesSection);
    }
    
    // Animate service features on card hover
    serviceCards.forEach(card => {
        const features = card.querySelectorAll('.feature-item');
        
        card.addEventListener('mouseenter', function() {
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(8px)';
                    feature.style.background = 'var(--bg-soft-rose)';
                                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            features.forEach(feature => {
                feature.style.transform = '';
                feature.style.background = '';
            });
        });
        
        // Progressive content reveal
        card.addEventListener('scroll', function() {
            const rect = this.getBoundingClientRect();
            const visibility = Math.max(0, Math.min(1, 
                (window.innerHeight - rect.top) / window.innerHeight
            ));
            
            if (visibility > 0.3) {
                this.classList.add('card-active');
            }
        });
    });
    
    // Enhanced CTA button interactions
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const service = this.dataset.service;
            const serviceTitle = this.closest('.service-card').querySelector('.service-title').textContent;
            
            // Add loading state
            const originalContent = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
            this.disabled = true;
            
            // Simulate quote request processing
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check me-2"></i>Request Sent!';
                this.classList.remove('btn-primary-rose');
                this.classList.add('btn-success');
                
                // Show quote modal or redirect
                showQuoteModal(service, serviceTitle);
                
                // Reset button after delay
                setTimeout(() => {
                    this.innerHTML = originalContent;
                    this.disabled = false;
                    this.classList.remove('btn-success');
                    this.classList.add('btn-primary-rose');
                }, 3000);
            }, 1500);
        });
        
        // Add ripple effect
        button.addEventListener('mousedown', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Keyword tag interactions
    keywordTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const keyword = this.textContent.trim();
            highlightRelatedServices(keyword);
            
            // Add selected state
            this.classList.toggle('keyword-selected');
            
            // Analytics tracking (if implemented)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'keyword_click', {
                    'keyword': keyword,
                    'section': 'services'
                });
            }
        });
        
        // Accessibility: keyboard support
        tag.setAttribute('tabindex', '0');
        tag.setAttribute('role', 'button');
        tag.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Animate service features when visible
    function animateServiceFeatures(section) {
        const features = section.querySelectorAll('.feature-item');
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.opacity = '1';
                feature.style.transform = 'translateX(0)';
            }, index * 150);
        });
    }
    
    // Highlight related services based on keyword
    function highlightRelatedServices(keyword) {
        const allCards = document.querySelectorAll('.service-card');
        let hasMatches = false;
        
        allCards.forEach(card => {
            const keywords = Array.from(card.querySelectorAll('.keyword-tag'))
                .map(tag => tag.textContent.trim().toLowerCase());
            
            if (keywords.includes(keyword.toLowerCase())) {
                card.classList.add('service-highlighted');
                hasMatches = true;
            } else {
                card.classList.add('service-dimmed');
            }
        });
        
        // Clear highlighting after 3 seconds
        setTimeout(() => {
            allCards.forEach(card => {
                card.classList.remove('service-highlighted', 'service-dimmed');
            });
            keywordTags.forEach(tag => {
                tag.classList.remove('keyword-selected');
            });
        }, 3000);
    }
    
    // Show quote modal
    function showQuoteModal(service, serviceTitle) {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'quote-modal-overlay';
        modalOverlay.innerHTML = `
            <div class="quote-modal">
                <div class="quote-modal-header">
                    <h3>Request Quote: ${serviceTitle}</h3>
                    <button class="quote-modal-close">&times;</button>
                </div>
                <div class="quote-modal-body">
                    <p>Thank you for your interest! I'll get back to you within 24 hours with a custom quote.</p>
                    <div class="quote-next-steps">
                        <h4>What happens next?</h4>
                        <ul>
                            <li>I'll review your requirements</li>
                            <li>Prepare a detailed proposal</li>
                            <li>Schedule a consultation call</li>
                        </ul>
                    </div>
                </div>
                <div class="quote-modal-footer">
                    <button class="btn btn-primary-rose">Contact Me Directly</button>
                    <button class="btn btn-outline-rose quote-modal-close">Close</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modalOverlay);
        
        // Add modal event listeners
        const closeButtons = modalOverlay.querySelectorAll('.quote-modal-close');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modalOverlay.remove();
            });
        });
        
        // Close on overlay click
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.remove();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                modalOverlay.remove();
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }
    
    // Service comparison feature
    let selectedServices = new Set();
    
    function initServiceComparison() {
        serviceCards.forEach(card => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'service-compare-checkbox';
            checkbox.addEventListener('change', function() {
                const serviceTitle = card.querySelector('.service-title').textContent;
                
                if (this.checked) {
                    selectedServices.add(serviceTitle);
                    card.classList.add('service-selected');
                } else {
                    selectedServices.delete(serviceTitle);
                    card.classList.remove('service-selected');
                }
                
                updateCompareButton();
            });
            
            // Add checkbox to card header
            const serviceHeader = card.querySelector('.service-header');
            const compareLabel = document.createElement('label');
            compareLabel.className = 'service-compare-label';
            compareLabel.innerHTML = `
                <span>Compare</span>
            `;
            compareLabel.prepend(checkbox);
            serviceHeader.appendChild(compareLabel);
        });
    }
    
    function updateCompareButton() {
        let compareButton = document.getElementById('compare-services-btn');
        
        if (selectedServices.size > 1) {
            if (!compareButton) {
                compareButton = document.createElement('button');
                compareButton.id = 'compare-services-btn';
                compareButton.className = 'btn btn-secondary-outline fixed-compare-btn';
                compareButton.innerHTML = '<i class="fas fa-balance-scale me-2"></i>Compare Services';
                document.body.appendChild(compareButton);
                
                compareButton.addEventListener('click', showServiceComparison);
            }
            compareButton.textContent = `Compare ${selectedServices.size} Services`;
            compareButton.style.display = 'block';
        } else {
            if (compareButton) {
                compareButton.style.display = 'none';
            }
        }
    }
    
    function showServiceComparison() {
        console.log('Comparing services:', Array.from(selectedServices));
        // Implementation for service comparison modal
    }
    
    // Initialize features
    // initServiceComparison(); // Uncomment to enable service comparison
    
    // Performance optimization
    const debouncedScroll = debounce(() => {
        serviceCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                card.classList.add('card-in-view');
            }
        });
    }, 16);
    
    window.addEventListener('scroll', debouncedScroll);
    
    // Utility function for debouncing
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
});

// Add CSS for additional interactive features
const additionalCSS = `
.keyword-selected {
    background: var(--color-accent-deep) !important;
    color: white !important;
    transform: scale(1.05);
}

.service-highlighted {
    transform: scale(1.02);
    box-shadow: 0 8px 25px rgba(196, 139, 148, 0.3);
    border-color: var(--color-accent-deep);
}

.service-dimmed {
    opacity: 0.4;
    transform: scale(0.98);
}

.quote-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
    backdrop-filter: blur(5px);
}

.quote-modal {
    background: white;
    border-radius: var(--radius-elegant);
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: var(--shadow-strong);
    animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: translateY(-30px) scale(0.9);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.quote-modal-header {
    padding: var(--comfort-lg);
    border-bottom: 1px solid var(--color-primary-medium);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.quote-modal-header h3 {
    margin: 0;
    color: var(--text-deep-rose);
    font-family: var(--font-heading);
}

.quote-modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-muted-rose);
}

.quote-modal-body {
    padding: var(--comfort-lg);
}

.quote-next-steps h4 {
    color: var(--text-deep-rose);
    margin-bottom: var(--comfort-sm);
}

.quote-next-steps ul {
    list-style: none;
    padding: 0;
}

.quote-next-steps li {
    padding: var(--spacing-sm) 0;
    position: relative;
    padding-left: var(--comfort-lg);
}

.quote-next-steps li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--color-accent-deep);
    font-weight: bold;
}

.quote-modal-footer {
    padding: var(--comfort-lg);
    border-top: 1px solid var(--color-primary-medium);
    display: flex;
    gap: var(--comfort-md);
    justify-content: flex-end;
}

.service-compare-label {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 0.875rem;
    color: var(--text-muted-rose);
    cursor: pointer;
}

.service-compare-checkbox {
    accent-color: var(--color-accent-deep);
}

.fixed-compare-btn {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 1000;
    box-shadow: var(--shadow-strong);
}

.ripple {
    position: absolute;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(2);
        opacity: 0;
    }
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Projects Section Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    const projectsSection = document.getElementById('work');
    const projectShowcases = document.querySelectorAll('.project-showcase');
    const projectImages = document.querySelectorAll('.project-image');
    const highlightNumbers = document.querySelectorAll('.highlight-number');
    
    // Make projects visible immediately as fallback
    projectShowcases.forEach(showcase => {
        showcase.style.opacity = '1';
        showcase.style.transform = 'translateY(0)';
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate highlight numbers
                const numbers = entry.target.querySelectorAll('.highlight-number');
                numbers.forEach((number, index) => {
                    setTimeout(() => {
                        animateNumber(number);
                    }, index * 200 + 500);
                });
                
                // Unobserve after animation
                projectsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add initial animation class and observe
    projectShowcases.forEach((showcase, index) => {
        // Set initial state for animation
        showcase.style.opacity = '0';
        showcase.style.transform = 'translateY(30px)';
        
        // Add animation with delay
        setTimeout(() => {
            showcase.style.transition = 'all 0.8s ease';
            showcase.style.opacity = '1';
            showcase.style.transform = 'translateY(0)';
            showcase.classList.add('animate-in');
        }, index * 200 + 100);
        
        // Still observe for number animations
        projectsObserver.observe(showcase);
    });
    
    // Fallback: ensure all projects are visible after 3 seconds
    setTimeout(() => {
        projectShowcases.forEach(showcase => {
            showcase.style.opacity = '1';
            showcase.style.transform = 'translateY(0)';
            showcase.classList.add('animate-in');
        });
    }, 3000);
    
    // Number animation function
    function animateNumber(element) {
        if (!element.textContent) return;
        
        const finalNumber = parseInt(element.textContent.replace(/[^\d]/g, '')) || 0;
        const duration = 2000;
        const startTime = Date.now();
        const suffix = element.textContent.replace(/\d/g, '');
        
        if (finalNumber === 0) return;
        
        function updateNumber() {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const currentNumber = Math.floor(finalNumber * easeOutCubic(progress));
            
            element.textContent = currentNumber + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }
        
        updateNumber();
    }
    
    // Parallax effect for project images (only on larger screens)
    function addParallaxEffect() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (window.innerWidth < 768) return; // Disable on mobile
        
        const parallaxElements = document.querySelectorAll('.project-image-container');
        
        function updateParallax() {
            parallaxElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const speed = 0.2; // Reduced speed for subtle effect
                
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const yPos = -(rect.top * speed);
                    const image = element.querySelector('.project-image');
                    if (image) {
                        image.style.transform = `translateY(${yPos}px)`;
                    }
                }
            });
        }
        
        // Throttled scroll listener
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Initial call
        updateParallax();
    }
    
    // Initialize parallax effect after a delay
    setTimeout(addParallaxEffect, 1000);
    
    // Enhanced hover effects for project cards
    projectShowcases.forEach((showcase, index) => {
        const image = showcase.querySelector('.project-image');
        const content = showcase.querySelector('.project-content');
        
        showcase.addEventListener('mouseenter', function() {
            // Stagger animation of skill pills or approach steps
            const animatableItems = this.querySelectorAll('.skill-pill, .approach-step, .deliverable-item');
            animatableItems.forEach((item, itemIndex) => {
                setTimeout(() => {
                    item.style.transform = 'translateY(-4px)';
                    item.style.boxShadow = 'var(--shadow-medium)';
                }, itemIndex * 50);
            });
        });
        
        showcase.addEventListener('mouseleave', function() {
            const animatableItems = this.querySelectorAll('.skill-pill, .approach-step, .deliverable-item');
            animatableItems.forEach(item => {
                item.style.transform = '';
                item.style.boxShadow = '';
            });
        });
        
        // Keyboard accessibility
        showcase.setAttribute('tabindex', '0');
        showcase.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--color-accent-deep)';
            this.style.outlineOffset = '8px';
        });
        
        showcase.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Project type badge interactions
    const typeBadges = document.querySelectorAll('.project-type-badge');
    typeBadges.forEach(badge => {
        badge.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Get badge type
            const classList = Array.from(this.classList);
            const badgeType = classList.find(cls => cls.includes('-badge'));
            if (badgeType) {
                const type = badgeType.replace('-badge', '');
                filterProjectsByType(type);
                
                // Add active state
                typeBadges.forEach(b => b.classList.remove('badge-active'));
                this.classList.add('badge-active');
                
                // Analytics tracking
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'project_filter', {
                        'filter_type': type,
                        'section': 'projects'
                    });
                }
            }
        });
    });
    
    // Filter projects by type
    function filterProjectsByType(type) {
        projectShowcases.forEach(showcase => {
            const badge = showcase.querySelector(`.${type}-badge`);
            
            if (type === 'all' || badge) {
                showcase.style.display = 'block';
                showcase.style.opacity = '1';
                showcase.style.transform = 'scale(1)';
            } else {
                showcase.style.opacity = '0.3';
                showcase.style.transform = 'scale(0.95)';
            }
        });
        
        // Clear filter after 5 seconds
        setTimeout(() => {
            projectShowcases.forEach(showcase => {
                showcase.style.display = 'block';
                showcase.style.opacity = '1';
                showcase.style.transform = 'scale(1)';
            });
            typeBadges.forEach(badge => badge.classList.remove('badge-active'));
        }, 5000);
    }
    
    // Smooth scrolling to project sections
    function initProjectNavigation() {
        const projectTitles = document.querySelectorAll('.project-title');
        projectTitles.forEach(title => {
            title.style.cursor = 'pointer';
            title.addEventListener('click', function() {
                const showcase = this.closest('.project-showcase');
                if (showcase) {
                    showcase.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            });
        });
    }
    
    initProjectNavigation();
    
    // Progressive loading for project images
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    }, { threshold: 0.1 });
    
    projectImages.forEach(img => {
        // Don't hide images initially, just add transition
        img.style.transition = 'opacity 0.6s ease';
        imageObserver.observe(img);
    });
    
    // Project statistics animation trigger
    function triggerStatisticsAnimation() {
        const statistics = document.querySelectorAll('.highlight-number, .metric-card');
        statistics.forEach((stat, index) => {
            setTimeout(() => {
                if (stat.style.transform !== undefined) {
                    stat.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        stat.style.transform = 'scale(1)';
                    }, 200);
                }
            }, index * 100);
        });
    }
    
    // Simple scroll-based animation trigger
    function handleScroll() {
        const scrolled = window.scrollY;
        const rate = scrolled * -0.5;
        
        // Simple parallax for hero images
        projectImages.forEach(img => {
            const container = img.closest('.project-image-container');
            if (container) {
                const rect = container.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const speed = 0.1;
                    const yPos = (window.innerHeight - rect.top) * speed;
                    img.style.transform = `translateY(${yPos}px)`;
                }
            }
        });
    }
    
    // Throttled scroll event
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    });
    
    // Trigger initial animations after DOM is fully loaded
    setTimeout(() => {
        const firstProject = document.querySelector('.project-showcase');
        if (firstProject) {
            triggerStatisticsAnimation();
        }
    }, 2000);
});

// Add CSS for interactive enhancements
const projectsCSS = `
.badge-active {
    background: var(--color-accent-deep) !important;
    color: white !important;
    transform: scale(1.1);
}

.project-showcase {
    transition: opacity 0.8s ease, transform 0.8s ease;
    opacity: 1 !important; /* Force visibility */
    transform: translateY(0) !important; /* Force position */
}

.project-showcase.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.project-showcase:hover {
    transform: translateY(-2px) !important;
}

.project-title {
    transition: color 0.3s ease;
}

.project-title:hover {
    color: var(--color-accent-deep);
    cursor: pointer;
}

/* Ensure images are visible */
.project-image {
    opacity: 1 !important;
}

/* Loading states */
.loading-shimmer {
    background: linear-gradient(90deg, 
        var(--color-primary-light) 25%, 
        var(--color-primary-medium) 50%, 
        var(--color-primary-light) 75%);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
}

@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

/* Focus indicators */
.project-showcase:focus-within .project-title {
    color: var(--color-accent-deep);
}

/* Ensure visibility on all devices */
@media (max-width: 768px) {
    .project-showcase {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
}
`;

// Inject projects CSS
const style = document.createElement('style');
style.textContent = projectsCSS;
document.head.appendChild(style);

// Ensure projects are visible immediately
window.addEventListener('load', function() {
    const showcases = document.querySelectorAll('.project-showcase');
    showcases.forEach(showcase => {
        showcase.style.opacity = '1';
        showcase.style.transform = 'translateY(0)';
        showcase.style.display = 'block';
    });
});

// CTA Section - Simplified and Fixed
document.addEventListener('DOMContentLoaded', function() {
    console.log('CTA Section JavaScript loaded');

    // Get elements
    const bookCallBtn = document.getElementById('bookCallBtn');
    const contactBtns = document.querySelectorAll('.contact-btn');
    const contactFormBtn = document.querySelector('.contact-form-btn');
    const contactCards = document.querySelectorAll('.contact-method-card');

    // Ensure all buttons are clickable
    const allButtons = document.querySelectorAll('.btn, .contact-btn, .contact-form-btn');
    allButtons.forEach(btn => {
        btn.style.pointerEvents = 'auto';
        btn.style.cursor = 'pointer';
        btn.style.zIndex = '10';
    });

    // Primary Book Call Button
    if (bookCallBtn) {
        bookCallBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Book Call button clicked');
            
            // Simple feedback
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Opening Calendar...';
            this.style.pointerEvents = 'none';
            
            // Simulate booking process
            setTimeout(() => {
                // In real implementation, redirect to your calendar booking system
                // window.open('https://calendly.com/your-calendar', '_blank');
                alert('Calendar booking would open here!\n\nIn a real implementation, this would redirect to your booking system (like Calendly, Acuity, etc.)');
                
                // Reset button
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
            }, 2000);
        });
    }

    // Contact Method Buttons
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            console.log('Contact button clicked:', this.textContent);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Track which contact method was used
            const method = this.href.includes('tel:') ? 'phone' : 
                          this.href.includes('mailto:') ? 'email' : 'whatsapp';
            console.log('Contact method:', method);
            
            // Optional: Show confirmation for email/phone
            if (method === 'email' || method === 'phone') {
                setTimeout(() => {
                    const action = method === 'email' ? 'Email client' : 'Phone dialer';
                    console.log(`${action} should be opening...`);
                }, 100);
            }
        });
        
        // Hover effects
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = 'var(--shadow-medium)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Contact Form Link
    if (contactFormBtn) {
        contactFormBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Contact form link clicked');
            
            // Look for contact form on page or navigate
            const contactSection = document.getElementById('contact-form') || 
                                 document.getElementById('contact') ||
                                 document.querySelector('[id*="contact"]');
            
            if (contactSection) {
                // Smooth scroll to contact form
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // Navigate to contact page or show message
                console.log('Would navigate to contact page');
                alert('Contact form would be available on the About/Contact page');
            }
        });
    }

    // Card hover effects
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            const btn = this.querySelector('.contact-btn');
            
            if (icon) icon.style.transform = 'scale(1.1)';
            if (btn) {
                btn.style.transform = 'scale(1.05)';
                btn.style.boxShadow = 'var(--shadow-medium)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            const btn = this.querySelector('.contact-btn');
            
            if (icon) icon.style.transform = '';
            if (btn) {
                btn.style.transform = '';
                btn.style.boxShadow = '';
            }
        });
        
        // Make cards keyboard accessible
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const btn = this.querySelector('.contact-btn');
                if (btn) btn.click();
            }
        });
    });

    // Simple fade-in animation
    const ctaSection = document.getElementById('cta-contact');
    if (ctaSection) {
        ctaSection.style.opacity = '0';
        ctaSection.style.transform = 'translateY(20px)';
        ctaSection.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            ctaSection.style.opacity = '1';
            ctaSection.style.transform = 'translateY(0)';
        }, 200);
    }

    // Trust indicators animation
    const trustItems = document.querySelectorAll('.trust-item');
    
    function animateTrustItems() {
        trustItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(10px)';
                item.style.transition = 'all 0.4s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    }
    
    // Trigger trust items animation after section loads
    setTimeout(animateTrustItems, 1000);

    // Button ripple effect
    function addRippleEffect(button, e) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple to all buttons
    allButtons.forEach(btn => {
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        
        btn.addEventListener('mousedown', function(e) {
            addRippleEffect(this, e);
        });
    });

    // Mobile touch feedback
    if ('ontouchstart' in window) {
        contactCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    // Debug: Log all clickable elements
    console.log('Clickable elements found:', {
        bookCallBtn: !!bookCallBtn,
        contactBtns: contactBtns.length,
        contactFormBtn: !!contactFormBtn,
        contactCards: contactCards.length
    });
});

// Add ripple animation CSS
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

/* Ensure buttons are always clickable */
.btn, .contact-btn, .contact-form-btn {
    position: relative !important;
    z-index: 10 !important;
    pointer-events: auto !important;
    cursor: pointer !important;
}

/* Additional hover states */
.contact-method-card:hover {
    transform: translateY(-4px) !important;
    box-shadow: var(--shadow-medium) !important;
}

.btn-cta-large:hover {
    transform: translateY(-2px) !important;
    box-shadow: var(--shadow-strong) !important;
}

/* Loading state */
.btn-loading {
    pointer-events: none;
    opacity: 0.7;
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Fallback: Ensure section is visible
window.addEventListener('load', function() {
    const ctaSection = document.getElementById('cta-contact');
    if (ctaSection) {
        ctaSection.style.opacity = '1';
        ctaSection.style.transform = 'translateY(0)';
        ctaSection.style.display = 'block';
    }
});