// Portfolio data
const portfolioData = {
    website: {
        title: "E-Commerce Website Design",
        description: "A modern e-commerce platform with intuitive user experience and seamless checkout process. Built with focus on conversion optimization and mobile-first approach.",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["Website", "E-commerce", "UI/UX", "Responsive"],
        link: "#"
    },
    app: {
        title: "Mobile Banking App",
        description: "Secure and user-friendly mobile banking application with advanced features like biometric authentication, budget tracking, and instant transfers.",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["Mobile App", "Fintech", "iOS", "Android"],
        link: "#"
    },
    uiux: {
        title: "SaaS Dashboard Design",
        description: "Comprehensive dashboard design for a SaaS platform with data visualization, user management, and analytics. Focused on clarity and efficiency.",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["Dashboard", "SaaS", "Data Viz", "B2B"],
        link: "#"
    }
};

// DOM Elements
const portfolioItems = document.querySelectorAll('.portfolio-item');
const modal = document.getElementById('portfolioModal');
const closeModal = document.querySelector('.close-modal');
const modalImage = document.querySelector('.modal-image');
const modalTitle = document.querySelector('.modal-title');
const modalDescription = document.querySelector('.modal-description');
const modalTags = document.querySelector('.modal-tags');
const modalLink = document.querySelector('.modal-link');
const skillTags = document.querySelectorAll('.skill-tag');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initPortfolioModal();
    initSkillTags();
    initScrollAnimations();
    initFloatingElements();
});

// Portfolio Modal Functions
function initPortfolioModal() {
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            openModal(category);
        });
    });

    closeModal.addEventListener('click', closeModalHandler);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalHandler();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalHandler();
        }
    });
}

function openModal(category) {
    const data = portfolioData[category];
    if (!data) return;

    modalImage.src = data.image;
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    modalLink.href = data.link;

    // Clear and populate tags
    modalTags.innerHTML = '';
    data.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'modal-tag';
        tagElement.textContent = tag;
        modalTags.appendChild(tagElement);
    });

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModalHandler() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Skill Tags Interactions
function initSkillTags() {
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const skill = this.getAttribute('data-skill');
            handleSkillClick(skill);
        });

        // Add hover sound effect (optional)
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
}

function handleSkillClick(skill) {
    // Add ripple effect
    const skillElement = document.querySelector(`[data-skill="${skill}"]`);
    createRipple(skillElement);
    
    // You can add more functionality here like filtering portfolio items
    console.log(`Skill clicked: ${skill}`);
}

function createRipple(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const aboutLeft = document.querySelector('.about-left');
    const aboutRight = document.querySelector('.about-right');
    
    if (aboutLeft) observer.observe(aboutLeft);
    if (aboutRight) observer.observe(aboutRight);

    // Animate skill tags on scroll
    const skillTagsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tags = entry.target.querySelectorAll('.skill-tag');
                tags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.opacity = '1';
                        tag.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    const skillsContainer = document.querySelector('.skills-tags');
    if (skillsContainer) skillTagsObserver.observe(skillsContainer);
}

// Floating Elements Animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            
            element.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + (index * 1000));
    });
}

// Portfolio Image Lazy Loading
function initLazyLoading() {
    const images = document.querySelectorAll('.portfolio-img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Smooth scroll to section (if needed)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export functions for external use
window.AboutSection = {
    openModal,
    closeModalHandler,
    scrollToSection
};