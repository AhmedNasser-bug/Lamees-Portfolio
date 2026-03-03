// About Page Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.getElementById('about');
    const contentSections = document.querySelectorAll('.content-section');
    const pullQuotes = document.querySelectorAll('.pull-quote');
    const strengthItems = document.querySelectorAll('.strength-item');
    
    // Ensure about section is visible
    if (aboutSection) {
        aboutSection.style.opacity = '1';
    }
    
    // Intersection Observer for content sections
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const contentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for pull quotes
                if (entry.target.classList.contains('pull-quote-wrapper')) {
                    const quote = entry.target.querySelector('.pull-quote');
                    if (quote) {
                        setTimeout(() => {
                            quote.style.transform = 'translateX(0)';
                            quote.style.opacity = '1';
                        }, 300);
                    }
                }
                
                contentObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all content sections and pull quotes
    contentSections.forEach(section => {
        contentObserver.observe(section);
    });
    
    document.querySelectorAll('.pull-quote-wrapper').forEach(wrapper => {
        contentObserver.observe(wrapper);
    });
    
    // Enhanced pull quote interactions
    pullQuotes.forEach(quote => {
        quote.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(12px) scale(1.02)';
            
            const icon = this.querySelector('.quote-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(15deg)';
                icon.style.opacity = '0.6';
            }
        });
        
        quote.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            
            const icon = this.querySelector('.quote-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.opacity = '0.3';
            }
        });
    });
    
    // Strength items hover effects
    strengthItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            // Highlight current item
            this.style.borderColor = 'var(--color-accent-deep)';
            this.style.backgroundColor = 'var(--bg-soft-rose)';
            
            // Dim other items slightly
            strengthItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.style.opacity = '0.7';
                }
            });
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.borderColor = '';
            this.style.backgroundColor = '';
            
            // Reset all items
            strengthItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
            });
        });
        
        // Keyboard accessibility
        item.setAttribute('tabindex', '0');
        item.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--color-accent-deep)';
            this.style.outlineOffset = '4px';
        });
        
        item.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Progressive text reveal for long content
    function revealTextProgressively() {
        const textElements = document.querySelectorAll('.body-text, .opening-text');
        
        textElements.forEach((element, index) => {
            const text = element.textContent;
            element.textContent = '';
            element.style.opacity = '1';
            
            let charIndex = 0;
            const revealInterval = setInterval(() => {
                if (charIndex < text.length) {
                    element.textContent += text[charIndex];
                    charIndex++;
                } else {
                    clearInterval(revealInterval);
                }
            }, 20); // Adjust speed as needed
        });
    }
    
    // Reading progress indicator
    function createReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        
        // Add CSS for progress bar
        const progressCSS = `
        .reading-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(196, 139, 148, 0.2);
            z-index: 1000;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, 
                var(--color-accent-deep), 
                var(--color-accent-medium));
            width: 0%;
            transition: width 0.3s ease;
        }
        `;
        
        const style = document.createElement('style');
        style.textContent = progressCSS;
        document.head.appendChild(style);
        
        document.body.appendChild(progressBar);
        
        // Update progress on scroll
        window.addEventListener('scroll', () => {
            const aboutRect = aboutSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const documentHeight = aboutSection.offsetHeight;
            
            const scrolled = Math.max(0, -aboutRect.top);
            const progress = Math.min(100, (scrolled / (documentHeight - windowHeight)) * 100);
            
            const progressFill = progressBar.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = progress + '%';
            }
        });
    }
    
    // Initialize reading progress if about section is long enough
    if (aboutSection && aboutSection.offsetHeight > window.innerHeight * 1.5) {
        createReadingProgress();
    }
    
    // Smooth scroll between sections
    function initSmoothScrolling() {
        const headings = document.querySelectorAll('.section-heading, .subsection-heading');
        
        headings.forEach(heading => {
            heading.style.cursor = 'pointer';
            heading.addEventListener('click', function() {
                this.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }
    
    initSmoothScrolling();
    
    // Dynamic quote highlighting
    function highlightQuotesOnScroll() {
        const quotes = document.querySelectorAll('.pull-quote');
        
        window.addEventListener('scroll', () => {
            quotes.forEach(quote => {
                const rect = quote.getBoundingClientRect();
                const windowCenter = window.innerHeight / 2;
                
                if (rect.top < windowCenter && rect.bottom > windowCenter) {
                    quote.style.borderLeftWidth = '8px';
                    quote.style.transform = 'translateX(8px) scale(1.02)';
                } else {
                    quote.style.borderLeftWidth = '6px';
                    quote.style.transform = 'translateX(0) scale(1)';
                }
            });
        });
    }
    
    highlightQuotesOnScroll();
    
    // Content analytics (optional)
    function trackReadingBehavior() {
        const sections = document.querySelectorAll('.content-section');
        const sectionTracking = new Map();
        
        const trackingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionIndex = Array.from(sections).indexOf(entry.target);
                    const startTime = Date.now();
                    
                    sectionTracking.set(entry.target, startTime);
                } else {
                    if (sectionTracking.has(entry.target)) {
                        const startTime = sectionTracking.get(entry.target);
                        const timeSpent = Date.now() - startTime;
                        
                        // Track reading time (could send to analytics)
                        console.log(`Section read for ${timeSpent}ms`);
                        sectionTracking.delete(entry.target);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => {
            trackingObserver.observe(section);
        });
    }
    
    // Uncomment to enable reading behavior tracking
    // trackReadingBehavior();
    
    // Ensure all content is visible as fallback
    setTimeout(() => {
        contentSections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }, 2000);
});

// Add enhanced CSS for animations
const aboutEnhancementCSS = `
.animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

.pull-quote {
    transition: all 0.3s ease;
}

.strength-item {
    transition: all 0.3s ease;
}

.quote-icon {
    transition: all 0.3s ease;
}

/* Loading states */
.content-loading {
    opacity: 0.5;
}

/* Scroll-triggered animations */
@media (prefers-reduced-motion: no-preference) {
    .pull-quote-wrapper {
        opacity: 0;
        transform: translateX(-20px);
        transition: all 0.6s ease;
    }
    
    .pull-quote-wrapper.animate-in {
        opacity: 1;
        transform: translateX(0);
    }
}
`;

// Inject enhancement CSS
const enhancementStyle = document.createElement('style');
enhancementStyle.textContent = aboutEnhancementCSS;
document.head.appendChild(enhancementStyle);

// Add to your about.js file
document.addEventListener('DOMContentLoaded', function() {
    const headshotContainer = document.querySelector('.headshot-container');
    
    if (headshotContainer) {
        // Parallax effect on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.1;
            
            headshotContainer.style.transform = `translateY(${parallax}px)`;
        });
        
        // Mouse tracking for 3D effect
        headshotContainer.addEventListener('mousemove', (e) => {
            const rect = headshotContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            const geometricFrame = headshotContainer.querySelector('.geometric-frame');
            if (geometricFrame) {
                geometricFrame.style.transform = `rotate(5deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
        
        headshotContainer.addEventListener('mouseleave', () => {
            const geometricFrame = headshotContainer.querySelector('.geometric-frame');
            if (geometricFrame) {
                geometricFrame.style.transform = 'rotate(5deg)';
            }
        });
    }
});

// Education Section Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    const educationSection = document.getElementById('education');
    const educationItems = document.querySelectorAll('.education-item');
    const courseTags = document.querySelectorAll('.course-tag');
    const certificationItems = document.querySelectorAll('.certification-item');
    
    // Ensure education section is visible
    if (educationSection) {
        educationSection.style.opacity = '1';
    }
    
    // Intersection Observer for education items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const educationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animation for course tags
                if (entry.target.classList.contains('featured-education')) {
                    const tags = entry.target.querySelectorAll('.course-tag');
                    tags.forEach((tag, index) => {
                        setTimeout(() => {
                            tag.style.opacity = '1';
                            tag.style.transform = 'translateY(0)';
                        }, index * 100 + 500);
                    });
                }
                
                educationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all education items
    educationItems.forEach(item => {
        educationObserver.observe(item);
        
        // Set initial state for course tags
        const tags = item.querySelectorAll('.course-tag');
        tags.forEach(tag => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(10px)';
            tag.style.transition = 'all 0.3s ease';
        });
    });
    
    // Course tag interactions
    courseTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const courseName = this.textContent.trim();
            showCourseDetails(courseName);
            
            // Add clicked state
            this.classList.add('tag-clicked');
            setTimeout(() => {
                this.classList.remove('tag-clicked');
            }, 1000);
            
            // Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'course_interest', {
                    'course_name': courseName,
                    'section': 'education'
                });
            }
        });
        
        // Keyboard accessibility
        tag.setAttribute('tabindex', '0');
        tag.setAttribute('role', 'button');
        tag.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Show course details modal/tooltip
    function showCourseDetails(courseName) {
        const courseDetails = {
            'PR Strategies': 'Strategic public relations planning, campaign development, and stakeholder communication management.',
            'Advertising Management': 'Comprehensive advertising campaign planning, budget management, and cross-platform coordination.',
            'Writing for PR & Advertising': 'Professional writing techniques for press releases, ad copy, and strategic communications.',
            'Online Advertising': 'Digital advertising platforms, programmatic buying, and online campaign optimization.',
            'Marketing Strategies': 'Market analysis, consumer behavior, and integrated marketing campaign development.',
            'Social Media Ads': 'Paid social media advertising across platforms including targeting and optimization.',
            'Branding': 'Brand identity development, brand positioning, and brand management strategies.',
            'Web Content Management': 'Content strategy, SEO optimization, and website content creation and maintenance.',
            'Corporate Reputation Management': 'Crisis communication, reputation monitoring, and corporate image management.'
        };
        
        const detail = courseDetails[courseName];
        if (detail) {
            showTooltip(courseName, detail);
        }
    }
    
    // Simple tooltip system
    function showTooltip(title, content) {
        // Remove existing tooltip
        const existingTooltip = document.querySelector('.course-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        const tooltip = document.createElement('div');
        tooltip.className = 'course-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-header">
                <h6>${title}</h6>
                <button class="tooltip-close" aria-label="Close">&times;</button>
            </div>
            <p>${content}</p>
        `;
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = Math.max(10, rect.left - 100) + 'px';
        tooltip.style.top = (rect.bottom + 10) + 'px';
        
        // Close functionality
        const closeBtn = tooltip.querySelector('.tooltip-close');
        closeBtn.addEventListener('click', () => tooltip.remove());
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (tooltip.parentElement) {
                tooltip.remove();
            }
        }, 5000);
    }
    
    // Certification item hover effects
    certificationItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const provider = this.querySelector('.cert-provider');
            if (provider) {
                provider.style.transform = 'scale(1.05)';
                provider.style.boxShadow = 'var(--shadow-soft)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const provider = this.querySelector('.cert-provider');
            if (provider) {
                provider.style.transform = '';
                provider.style.boxShadow = '';
            }
        });
    });
    
    // Education filtering (optional feature)
    function initEducationFilter() {
        const filterButtons = document.createElement('div');
        filterButtons.className = 'education-filters';
        filterButtons.innerHTML = `
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="degree">Degree</button>
            <button class="filter-btn" data-filter="certification">Certifications</button>
            <button class="filter-btn" data-filter="training">Training</button>
        `;
        
        const sectionHeader = document.querySelector('.section-header');
        if (sectionHeader) {
            sectionHeader.appendChild(filterButtons);
            
            // Filter functionality
            const filterBtns = filterButtons.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const filter = this.dataset.filter;
                    
                    // Update active state
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Filter items
                    filterEducationItems(filter);
                });
            });
        }
    }
    
    function filterEducationItems(filter) {
        educationItems.forEach(item => {
            let show = true;
            
            if (filter === 'degree') {
                show = item.classList.contains('featured-education');
            } else if (filter === 'certification') {
                show = item.closest('.education-group') !== null;
            } else if (filter === 'training') {
                show = !item.classList.contains('featured-education') && 
                       item.closest('.education-group') === null;
            }
            
            if (show) {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                item.style.opacity = '0.3';
                item.style.transform = 'scale(0.95)';
            }
        });
    }
    
    // Uncomment to enable filtering
    // initEducationFilter();
    
    // Progressive content reveal
    setTimeout(() => {
        educationItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        });
    }, 2000);
});

// Add CSS for interactive enhancements
const educationEnhancementCSS = `
.tag-clicked {
    background: var(--color-accent-deep) !important;
    color: white !important;
    transform: scale(1.1) !important;
}

.course-tooltip {
    position: fixed;
    background: white;
    border: 2px solid var(--color-accent-medium);
    border-radius: var(--radius-md);
    padding: var(--comfort-md);
    max-width: 300px;
    box-shadow: var(--shadow-strong);
    z-index: 1000;
    animation: tooltipFadeIn 0.3s ease;
}

.tooltip-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-sm);
    padding-bottom: var(--spacing-sm);
    border-bottom: 1px solid var(--color-primary-medium);
}

.tooltip-header h6 {
    margin: 0;
    color: var(--text-deep-rose);
    font-weight: var(--font-weight-semibold);
}

.tooltip-close {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: var(--text-muted-rose);
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tooltip-close:hover {
    color: var(--color-accent-deep);
}

.course-tooltip p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--text-muted-rose);
}

@keyframes tooltipFadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.education-filters {
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
    margin-top: var(--comfort-lg);
}

.filter-btn {
    background: transparent;
    border: 2px solid var(--color-accent-medium);
    color: var(--color-accent-deep);
    padding: var(--spacing-sm) var(--spacing-lg);
    border-radius: var(--radius-sm);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: all 0.3s ease;
}

.filter-btn:hover,
.filter-btn.active {
    background: var(--color-accent-deep);
    color: white;
}

.animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
}
`;

// Inject enhancement CSS
const educationStyle = document.createElement('style');
educationStyle.textContent = educationEnhancementCSS;
document.head.appendChild(educationStyle);


// Extended Skills Section Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.getElementById('extended-skills');
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillPills = document.querySelectorAll('.skill-pill');
    const statCards = document.querySelectorAll('.stat-card');
    
    // Ensure skills section is visible
    if (skillsSection) {
        skillsSection.style.opacity = '1';
    }
    
    // Intersection Observer for skill categories
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger pill animations within category
                const pills = entry.target.querySelectorAll('.skill-pill');
                pills.forEach((pill, index) => {
                    setTimeout(() => {
                        pill.style.opacity = '1';
                        pill.style.transform = 'translateY(0)';
                        pill.style.animationDelay = `${index * 0.1}s`;
                    }, index * 150 + 300);
                });
                
                skillsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all skill categories
    skillCategories.forEach(category => {
        skillsObserver.observe(category);
        
        // Set initial state for pills
        const pills = category.querySelectorAll('.skill-pill');
        pills.forEach(pill => {
            pill.style.opacity = '0';
            pill.style.transform = 'translateY(20px)';
            pill.style.transition = 'all 0.4s ease';
        });
    });
    
    // Enhanced skill pill interactions
    skillPills.forEach(pill => {
        pill.addEventListener('click', function() {
            const skillName = this.querySelector('.skill-name').textContent.trim();
            showSkillDetails(skillName, this);
            
            // Add clicked state
            this.classList.add('pill-clicked');
            setTimeout(() => {
                this.classList.remove('pill-clicked');
            }, 1200);
            
            // Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'skill_detail_view', {
                    'skill_name': skillName,
                    'section': 'extended_skills'
                });
            }
        });
        
        pill.addEventListener('mouseenter', function() {
            // Highlight related pills in same category
            const category = this.closest('.skill-category');
            const categoryPills = category.querySelectorAll('.skill-pill');
            
            categoryPills.forEach(otherPill => {
                if (otherPill !== this) {
                    otherPill.style.opacity = '0.7';
                    otherPill.style.transform = 'translateY(0) scale(0.98)';
                }
            });
        });
        
        pill.addEventListener('mouseleave', function() {
            const category = this.closest('.skill-category');
            const categoryPills = category.querySelectorAll('.skill-pill');
            
            categoryPills.forEach(otherPill => {
                otherPill.style.opacity = '1';
                otherPill.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Keyboard accessibility
        pill.setAttribute('tabindex', '0');
        pill.setAttribute('role', 'button');
        pill.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Skill details modal/tooltip system
    function showSkillDetails(skillName, pillElement) {
        const skillDetails = {
            'Strategic Planning': {
                description: 'Long-term communication strategy development, goal-setting, and organizational alignment for maximum impact.',
                applications: ['Campaign Strategy', 'Brand Positioning', 'Stakeholder Mapping']
            },
            'Crisis Communication & Reputation Management': {
                description: 'Proactive and reactive communication strategies to protect and enhance organizational reputation during challenging situations.',
                applications: ['Crisis Response', 'Reputation Monitoring', 'Stakeholder Communication']
            },
            'Corporate Communications': {
                description: 'Internal and external communication strategies that align with organizational objectives and brand values.',
                applications: ['Internal Communications', 'Executive Communications', 'Stakeholder Relations']
            },
            'Brand Development': {
                description: 'Strategic brand positioning, identity creation, and brand architecture development for consistent market presence.',
                applications: ['Brand Strategy', 'Brand Identity', 'Brand Guidelines']
            },
            'Analytics & Performance Tracking': {
                description: 'Data-driven campaign analysis and performance optimization using industry-leading analytics platforms.',
                applications: ['Google Analytics', 'Meta Business Suite', 'Performance Reporting']
            },
            'Social Media Campaigns & Community Engagement': {
                description: 'Strategic social media campaign development and community building across multiple platforms.',
                applications: ['Social Strategy', 'Community Management', 'Engagement Optimization']
            },
            'Content Creation & Editorial Strategy': {
                description: 'Comprehensive content strategy development and editorial calendar management for consistent brand messaging.',
                applications: ['Content Strategy', 'Editorial Planning', 'Content Calendar']
            },
            'Media Relations & Press Outreach': {
                description: 'Strategic media relationship building and press campaign development for maximum coverage and brand visibility.',
                applications: ['Press Releases', 'Media Pitching', 'Journalist Relations']
            },
            'Event Promotion & Influencer Coordination': {
                description: 'Strategic event marketing and influencer partnership management for enhanced brand reach and engagement.',
                applications: ['Event Marketing', 'Influencer Relations', 'Partnership Management']
            },
            'PR Writing': {
                description: 'Professional writing for various PR materials including press releases, media kits, and promotional content.',
                applications: ['Press Releases', 'Media Kits', 'Marketing Copy']
            },
            'Videography': {
                description: 'Video production and editing for marketing campaigns, social media content, and brand storytelling.',
                applications: ['Video Production', 'Content Creation', 'Brand Storytelling']
            },
            'Design Tools': {
                description: 'Professional design and video editing using industry-standard tools for visual content creation.',
                applications: ['Canva', 'CapCut', 'Visual Content']
            }
        };
        
        const detail = skillDetails[skillName];
        if (detail) {
            showSkillModal(skillName, detail, pillElement);
        }
    }
    
    // Enhanced skill modal
    function showSkillModal(skillName, detail, pillElement) {
        // Remove existing modal
        const existingModal = document.querySelector('.skill-detail-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.className = 'skill-detail-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h5>${skillName}</h5>
                    <button class="modal-close" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <p class="skill-description">${detail.description}</p>
                    <div class="skill-applications">
                        <h6>Key Applications:</h6>
                        <div class="applications-list">
                            ${detail.applications.map(app => `<span class="application-tag">${app}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Close functionality
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        [closeBtn, overlay].forEach(element => {
            element.addEventListener('click', () => closeModal(modal));
        });
        
        // Keyboard close
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                closeModal(modal);
                document.removeEventListener('keydown', escapeHandler);
            }
        });
        
        // Auto-close after 10 seconds
        setTimeout(() => {
            if (modal.parentElement) {
                closeModal(modal);
            }
        }, 10000);
    }
    
    function closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    
    // Animated number counting for stats
    function animateStatNumbers() {
        statCards.forEach(card => {
            const number = card.querySelector('.stat-number');
            const finalValue = parseInt(number.textContent);
            let currentValue = 0;
            const increment = finalValue / 30; // 30 frames for smooth animation
            
            const countUp = () => {
                if (currentValue < finalValue) {
                    currentValue += increment;
                    number.textContent = Math.ceil(currentValue);
                    requestAnimationFrame(countUp);
                } else {
                    number.textContent = finalValue;
                }
            };
            
            countUp();
        });
    }
    
    // Stats animation on scroll
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumbers();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.skills-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Category filtering functionality
    function initCategoryFilter() {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'category-filters';
        filterContainer.innerHTML = `
            <div class="filter-buttons">
                <button class="category-filter-btn active" data-category="all">All Skills</button>
                <button class="category-filter-btn" data-category="strategic">Strategic</button>
                <button class="category-filter-btn" data-category="technical">Technical</button>
                <button class="category-filter-btn" data-category="creative">Creative</button>
            </div>
        `;
        
        const sectionHeader = document.querySelector('.section-header');
        if (sectionHeader) {
            sectionHeader.appendChild(filterContainer);
            
            // Filter button functionality
            const filterBtns = filterContainer.querySelectorAll('.category-filter-btn');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const category = this.dataset.category;
                    
                    // Update active state
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Filter categories
                    filterSkillCategories(category);
                });
            });
        }
    }
    
    function filterSkillCategories(filter) {
        skillCategories.forEach((category, index) => {
            let show = true;
            
            if (filter === 'strategic' && index !== 0) show = false;
            if (filter === 'technical' && index !== 1) show = false;
            if (filter === 'creative' && index !== 2) show = false;
            
            if (show) {
                category.style.display = 'block';
                category.style.opacity = '1';
                category.style.transform = 'scale(1)';
            } else {
                category.style.opacity = '0.3';
                category.style.transform = 'scale(0.95)';
            }
        });
    }
    
    // Uncomment to enable category filtering
    // initCategoryFilter();
    
    // Progressive enhancement fallback
    setTimeout(() => {
        skillCategories.forEach(category => {
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
            
            const pills = category.querySelectorAll('.skill-pill');
            pills.forEach(pill => {
                pill.style.opacity = '1';
                pill.style.transform = 'translateY(0)';
            });
        });
    }, 3000);
});

// Add CSS for interactive enhancements
const skillsEnhancementCSS = `
.pill-clicked {
    background: var(--color-accent-deep) !important;
    color: white !important;
    border-color: var(--color-accent-deep) !important;
    transform: scale(1.05) !important;
}

.pill-clicked .skill-name,
.pill-clicked .skill-detail {
    color: white !important;
}

.pill-clicked .skill-icon {
    color: white !important;
}

.skill-detail-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1050;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.skill-detail-modal.show {
    opacity: 1;
    visibility: visible;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
}

.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    background: white;
    border-radius: var(--radius-elegant);
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: var(--shadow-strong);
    transition: transform 0.3s ease;
}

.skill-detail-modal.show .modal-content {
    transform: translate(-50%, -50%) scale(1);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--comfort-lg);
    border-bottom: 1px solid var(--color-primary-medium);
    background: var(--bg-soft-rose);
}

.modal-header h5 {
    margin: 0;
    color: var(--text-deep-rose);
    font-family: var(--font-heading);
    font-weight: var(--font-weight-semibold);
    font-size: 1.25rem;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-muted-rose);
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.modal-close:hover {
    background: var(--color-accent-light);
    color: var(--color-accent-deep);
}

.modal-body {
    padding: var(--comfort-lg);
}

.skill-description {
    font-size: 1.05rem;
    line-height: 1.6;
    color: var(--text-muted-rose);
    margin-bottom: var(--comfort-md);
}

.skill-applications h6 {
    color: var(--text-deep-rose);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--comfort-sm);
    font-size: 1rem;
}

.applications-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
}

.application-tag {
    background: var(--color-accent-light);
    color: var(--color-accent-deep);
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
    font-weight: var(--font-weight-medium);
    border: 1px solid var(--color-accent-medium);
}

.category-filters {
    margin-top: var(--comfort-lg);
}

.filter-buttons {
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
    flex-wrap: wrap;
}

.category-filter-btn {
    background: transparent;
    border: 2px solid var(--color-accent-medium);
    color: var(--color-accent-deep);
    padding: var(--spacing-sm) var(--comfort-md);
    border-radius: var(--radius-md);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.category-filter-btn:hover,
.category-filter-btn.active {
    background: var(--color-accent-deep);
    color: white;
    transform: translateY(-2px);
    box-shadow: var(--shadow-soft);
}

.animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

@media (max-width: 768px) {
    .modal-content {
        width: 95%;
        margin: 20px;
    }
    
    .modal-header,
    .modal-body {
        padding: var(--comfort-md);
    }
    
    .applications-list {
        justify-content: center;
    }
    
    .filter-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .category-filter-btn {
        width: 200px;
    }
}
`;

// Inject enhancement CSS
const skillsStyle = document.createElement('style');
skillsStyle.textContent = skillsEnhancementCSS;
document.head.appendChild(skillsStyle);

// Detailed Contact Section Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    const contactSection = document.getElementById('detailed-contact');
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const contactMethods = document.querySelectorAll('.contact-method-item');
    
    // Ensure contact section is visible
    if (contactSection) {
        contactSection.style.opacity = '1';
    }
    
    // Form validation and submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
    }
    
    // Form validation function
    function validateForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Individual field validation
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Remove previous validation classes
        field.classList.remove('is-valid', 'is-invalid');
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
            }
        } else if (field.type === 'tel' && value) {
            // Basic phone validation (optional field)
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
            }
        }
        
        // Apply validation classes
        if (isValid) {
            if (value) field.classList.add('is-valid');
        } else {
            field.classList.add('is-invalid');
        }
        
        return isValid;
    }
    
   // Form submission to WhatsApp
function submitForm() {
    const formData = new FormData(contactForm);
    const formObject = {};
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        if (value.trim()) { // Only include non-empty fields
            formObject[key] = value.trim();
        }
    }
    
    // Show loading state
    showLoadingState();
    
    // Create WhatsApp message
    setTimeout(() => {
        const whatsappMessage = createWhatsAppMessage(formObject);
        sendToWhatsApp(whatsappMessage);
        
        // Show success message after a short delay
        setTimeout(() => {
            showSuccessMessage();
        }, 1000);
        
        // Track form submission
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit_whatsapp', {
                'form_type': 'contact_whatsapp',
                'project_type': formObject.projectType,
                'timeline': formObject.timeline
            });
        }
    }, 1500);
}

// Create formatted WhatsApp message
function createWhatsAppMessage(formData) {
    const projectTypeLabels = {
        'pr-strategy': 'PR Strategy & Planning',
        'crisis-communication': 'Crisis Communication',
        'social-media': 'Social Media Management',
        'content-creation': 'Content Creation',
        'brand-development': 'Brand Development',
        'event-promotion': 'Event Promotion',
        'media-relations': 'Media Relations',
        'consultation': 'General Consultation',
        'other': 'Other'
    };
    
    const budgetLabels = {
        'under-1000': 'Under $1,000',
        '1000-5000': '$1,000 - $5,000',
        '5000-10000': '$5,000 - $10,000',
        '10000-plus': '$10,000+',
        'discuss': "Let's discuss"
    };
    
    const timelineLabels = {
        'asap': 'ASAP (Rush project)',
        '1-2-weeks': '1-2 weeks',
        '1-month': 'Within 1 month',
        '2-3-months': '2-3 months',
        'flexible': 'Flexible timeline'
    };
    
    let message = `🌟 *New Project Inquiry from Portfolio Website*\n\n`;
    
    // Personal Information
    message += `👤 *Contact Information:*\n`;
    message += `• Name: ${formData.fullName}\n`;
    message += `• Email: ${formData.email}\n`;
    if (formData.phone) {
        message += `• Phone: ${formData.phone}\n`;
    }
    if (formData.company) {
        message += `• Company: ${formData.company}\n`;
    }
    message += `\n`;
    
    // Project Details
    message += `📋 *Project Details:*\n`;
    message += `• Type: ${projectTypeLabels[formData.projectType] || formData.projectType}\n`;
    message += `• Timeline: ${timelineLabels[formData.timeline] || formData.timeline}\n`;
    
    if (formData.budget) {
        message += `• Budget: ${budgetLabels[formData.budget] || formData.budget}\n`;
    }
    message += `\n`;
    
    // Project Description
    message += `💬 *Project Description:*\n`;
    message += `${formData.message}\n\n`;
    
    // Footer
    message += `📱 *Sent from Portfolio Contact Form*\n`;
    message += `🕐 ${new Date().toLocaleString()}`;
    
    return message;
}

// Send message to WhatsApp
function sendToWhatsApp(message) {
    // WhatsApp number (Egyptian format)
    const whatsappNumber = '201100824337'; // Your number without + and spaces
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
}

// Add WhatsApp button as alternative to form submission
function addWhatsAppQuickButton() {
    const quickWhatsAppHTML = `
        <div class="whatsapp-quick-contact mt-comfort-lg">
            <div class="quick-contact-divider">
                <span class="divider-line"></span>
                <span class="divider-text">Or message directly</span>
                <span class="divider-line"></span>
            </div>
            <button type="button" class="btn btn-whatsapp btn-lg" id="quickWhatsAppBtn">
                <i class="fab fa-whatsapp me-2"></i>
                Quick WhatsApp Message
            </button>
            <p class="quick-contact-note">Send a quick message and I'll respond with a detailed consultation form</p>
        </div>
    `;
    
    // Insert before privacy note
    const privacyNote = document.querySelector('.privacy-note');
    if (privacyNote) {
        privacyNote.insertAdjacentHTML('beforebegin', quickWhatsAppHTML);
        
        // Add event listener for quick WhatsApp button
        document.getElementById('quickWhatsAppBtn').addEventListener('click', function() {
            const quickMessage = `Hi! I'm interested in discussing a potential project. I found your portfolio and would like to learn more about your services.

Could we schedule a brief consultation to discuss my needs?

Thank you!`;
            
            sendToWhatsApp(quickMessage);
            
            // Track quick contact
            if (typeof gtag !== 'undefined') {
                gtag('event', 'quick_whatsapp_contact', {
                    'contact_type': 'quick_message'
                });
            }
        });
    }
}

// Initialize WhatsApp functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add quick WhatsApp button
    addWhatsAppQuickButton();
    
    // Update success message for WhatsApp
    const successText = document.querySelector('.success-text');
    if (successText) {
        successText.textContent = "Thank you for reaching out! Your message has been sent via WhatsApp. I've received your inquiry and will respond within 24 hours with detailed next steps.";
    }
});
    
    // Show loading state
    function showLoadingState() {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        submitBtn.disabled = true;
    }
    
    // Show success message
    function showSuccessMessage() {
        const contactMainContent = document.querySelector('.contact-main-content');
        
        // Hide main content and show success
        contactMainContent.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Scroll to success message
        successMessage.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
    
    // Reset form function (global function for success message button)
    window.resetContactForm = function() {
        const contactMainContent = document.querySelector('.contact-main-content');
        
        // Reset form
        contactForm.reset();
        
        // Remove validation classes
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });
        
        // Reset submit button
                // Reset submit button
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        btnText.style.display = 'inline-flex';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
        
        // Show main content and hide success
        contactMainContent.style.display = 'block';
        successMessage.style.display = 'none';
        
        // Scroll back to form
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };
    
    // Contact method interactions
    contactMethods.forEach((method, index) => {
        method.addEventListener('mouseenter', function() {
            // Highlight animation
            this.style.transform = 'translateX(8px) scale(1.02)';
            
            // Dim other methods slightly
            contactMethods.forEach(otherMethod => {
                if (otherMethod !== this) {
                    otherMethod.style.opacity = '0.7';
                }
            });
        });
        
        method.addEventListener('mouseleave', function() {
            this.style.transform = '';
            
            // Reset all methods
            contactMethods.forEach(otherMethod => {
                otherMethod.style.opacity = '1';
            });
        });
        
        // Click tracking
        const methodLink = method.querySelector('.method-link');
        if (methodLink) {
            methodLink.addEventListener('click', function() {
                const methodType = this.href.includes('mailto:') ? 'email' :
                                 this.href.includes('tel:') ? 'phone' : 'linkedin';
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'contact_method_click', {
                        'method': methodType,
                        'section': 'detailed_contact'
                    });
                }
            });
        }
    });
    
    // Progressive form enhancement
    function enhanceFormExperience() {
        // Auto-formatting for phone numbers
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function() {
                let value = this.value.replace(/\D/g, '');
                if (value.length >= 10) {
                    // Format as international number
                    if (value.startsWith('20')) {
                        // Egyptian number
                        value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '+$1 $2 $3 $4');
                    } else {
                        // Generic international format
                        value = value.replace(/(\d{1,3})(\d{3})(\d{3})(\d{4})/, '+$1 $2 $3 $4');
                    }
                }
                this.value = value;
            });
        }
        
        // Dynamic project type suggestions
        const projectTypeSelect = document.getElementById('projectType');
        const messageTextarea = document.getElementById('message');
        
        if (projectTypeSelect && messageTextarea) {
            projectTypeSelect.addEventListener('change', function() {
                const suggestions = {
                    'pr-strategy': 'Please describe your target audience, key messages, and communication goals...',
                    'crisis-communication': 'Please describe the situation, timeline, and key stakeholders involved...',
                    'social-media': 'Please specify platforms, target audience, and content preferences...',
                    'content-creation': 'Please describe content type, frequency, and brand voice preferences...',
                    'brand-development': 'Please describe your brand vision, target market, and positioning goals...',
                    'event-promotion': 'Please provide event details, target audience, and promotional channels...',
                    'media-relations': 'Please describe your news angle, target publications, and key messages...',
                    'consultation': 'Please describe your current challenges and what you\'d like to achieve...'
                };
                
                const placeholder = suggestions[this.value];
                if (placeholder) {
                    messageTextarea.placeholder = placeholder;
                }
            });
        }
    }
    
    // Form analytics and optimization
    function initFormAnalytics() {
        const formFields = contactForm.querySelectorAll('input, select, textarea');
        const fieldInteractions = {};
        
        formFields.forEach(field => {
            const fieldName = field.name || field.id;
            fieldInteractions[fieldName] = {
                focused: 0,
                changed: 0,
                timeSpent: 0,
                lastFocus: null
            };
            
            field.addEventListener('focus', function() {
                fieldInteractions[fieldName].focused++;
                fieldInteractions[fieldName].lastFocus = Date.now();
            });
            
            field.addEventListener('blur', function() {
                if (fieldInteractions[fieldName].lastFocus) {
                    const timeSpent = Date.now() - fieldInteractions[fieldName].lastFocus;
                    fieldInteractions[fieldName].timeSpent += timeSpent;
                }
            });
            
            field.addEventListener('change', function() {
                fieldInteractions[fieldName].changed++;
            });
        });
        
        // Track form abandonment
        window.addEventListener('beforeunload', function() {
            const hasData = Array.from(formFields).some(field => field.value.trim());
            const isComplete = validateForm();
            
            if (hasData && !isComplete && typeof gtag !== 'undefined') {
                gtag('event', 'form_abandon', {
                    'form_type': 'contact',
                    'completion_rate': calculateCompletionRate()
                });
            }
        });
        
        function calculateCompletionRate() {
            const totalRequired = contactForm.querySelectorAll('[required]').length;
            const completed = Array.from(contactForm.querySelectorAll('[required]'))
                .filter(field => field.value.trim()).length;
            return Math.round((completed / totalRequired) * 100);
        }
    }
    
    // Smart form suggestions
    function initSmartSuggestions() {
        const emailInput = document.getElementById('email');
        const companyInput = document.getElementById('company');
        
        if (emailInput && companyInput) {
            emailInput.addEventListener('blur', function() {
                const email = this.value.trim();
                const domain = email.split('@')[1];
                
                // Suggest company name based on email domain
                if (domain && !companyInput.value) {
                    const suggestions = {
                        'gmail.com': '',
                        'yahoo.com': '',
                        'outlook.com': '',
                        'hotmail.com': ''
                    };
                    
                    if (!suggestions.hasOwnProperty(domain)) {
                        // Extract potential company name from domain
                        const companyName = domain.split('.')[0]
                            .split(/[-_]/)
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ');
                        
                        // Show subtle suggestion
                        showCompanySuggestion(companyName);
                    }
                }
            });
        }
    }
    
    function showCompanySuggestion(suggestion) {
        const companyInput = document.getElementById('company');
        const existingSuggestion = document.querySelector('.company-suggestion');
        
        if (existingSuggestion) {
            existingSuggestion.remove();
        }
        
        const suggestionEl = document.createElement('div');
        suggestionEl.className = 'company-suggestion';
        suggestionEl.innerHTML = `
            <small>Is this for <strong>${suggestion}</strong>?</small>
            <button type="button" class="btn-link" onclick="acceptCompanySuggestion('${suggestion}')">Yes</button>
            <button type="button" class="btn-link" onclick="dismissCompanySuggestion()">No</button>
        `;
        
        companyInput.parentNode.appendChild(suggestionEl);
        
        // Auto-dismiss after 10 seconds
        setTimeout(() => {
            if (suggestionEl.parentNode) {
                suggestionEl.remove();
            }
        }, 10000);
    }
    
    // Global functions for company suggestions
    window.acceptCompanySuggestion = function(suggestion) {
        document.getElementById('company').value = suggestion;
        document.querySelector('.company-suggestion').remove();
    };
    
    window.dismissCompanySuggestion = function() {
        document.querySelector('.company-suggestion').remove();
    };
    
    // Initialize enhancements
    enhanceFormExperience();
    initFormAnalytics();
    initSmartSuggestions();
    
    // Intersection Observer for contact methods
    const methodsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                methodsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    contactMethods.forEach(method => {
        method.style.opacity = '0';
        method.style.transform = 'translateX(-30px)';
        method.style.transition = 'all 0.6s ease';
        methodsObserver.observe(method);
    });
    
    // Auto-save draft functionality
    function initAutoSave() {
        const formFields = contactForm.querySelectorAll('input, select, textarea');
        const STORAGE_KEY = 'contact_form_draft';
        
        // Load saved draft
        const savedDraft = localStorage.getItem(STORAGE_KEY);
        if (savedDraft) {
            try {
                const draftData = JSON.parse(savedDraft);
                Object.keys(draftData).forEach(fieldName => {
                    const field = contactForm.querySelector(`[name="${fieldName}"]`);
                    if (field && draftData[fieldName]) {
                        field.value = draftData[fieldName];
                        validateField(field);
                    }
                });
                
                // Show draft loaded message
                showDraftNotification('Draft loaded automatically');
            } catch (e) {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
        
        // Save draft on input
        let saveTimeout;
        formFields.forEach(field => {
            field.addEventListener('input', function() {
                clearTimeout(saveTimeout);
                saveTimeout = setTimeout(() => {
                    saveDraft();
                }, 1000);
            });
        });
        
        function saveDraft() {
            const draftData = {};
            formFields.forEach(field => {
                if (field.value.trim()) {
                    draftData[field.name] = field.value;
                }
            });
            
            if (Object.keys(draftData).length > 0) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(draftData));
            }
        }
        
        // Clear draft on successful submission
        contactForm.addEventListener('submit', function() {
            localStorage.removeItem(STORAGE_KEY);
        });
    }
    
    function showDraftNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'draft-notification';
        notification.innerHTML = `
            <i class="fas fa-save me-2"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Initialize auto-save
    initAutoSave();
    
    // Fallback: ensure all elements are visible
    setTimeout(() => {
        contactMethods.forEach(method => {
            method.style.opacity = '1';
            method.style.transform = 'translateX(0)';
        });
    }, 2000);
    
    console.log('Detailed contact section loaded successfully');
});

// Additional CSS for enhancements
const contactEnhancementCSS = `
.company-suggestion {
    background: var(--color-accent-light);
    border: 1px solid var(--color-accent-medium);
    border-radius: var(--radius-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    margin-top: var(--spacing-sm);
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.company-suggestion .btn-link {
    background: none;
    border: none;
    color: var(--color-accent-deep);
    text-decoration: underline;
    font-size: 0.875rem;
    cursor: pointer;
    padding: 0;
}

.company-suggestion .btn-link:hover {
    color: var(--text-deep-rose);
}

.draft-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--color-accent-deep);
    color: white;
    padding: var(--spacing-md) var(--comfort-md);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-medium);
    z-index: 1100;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
}

.draft-notification.show {
    transform: translateX(0);
}

.animate-in {
    opacity: 1 !important;
    transform: translateX(0) !important;
}

@media (max-width: 768px) {
    .draft-notification {
        top: 10px;
        right: 10px;
        left: 10px;
        transform: translateY(-100%);
        text-align: center;
    }
    
    .draft-notification.show {
        transform: translateY(0);
    }
    
    .company-suggestion {
        flex-direction: column;
        text-align: center;
        gap: var(--spacing-sm);
    }
}
`;

// Inject enhancement CSS
const contactStyle = document.createElement('style');
contactStyle.textContent = contactEnhancementCSS;
document.head.appendChild(contactStyle);

