// Fixed JavaScript for Eliteclasis Website
document.addEventListener('DOMContentLoaded', function() {
    
    // SMOOTH SCROLLING FUNCTIONALITY - FIXED
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navHeight = 80; // Fixed navbar height
            const sectionTop = section.offsetTop - navHeight;
            
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        }
    }

    // Make scrollToSection available globally for inline onclick handlers - FIXED
    window.scrollToSection = scrollToSection;

    // NAVIGATION SCROLL BEHAVIOR - FIXED
    const navbar = document.getElementById('navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);

    // NAVIGATION LINK SMOOTH SCROLLING - FIXED
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // FORM SUBMISSION HANDLER - FIXED
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email) {
                alert('Please fill in your name and email address.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Success message - FIXED
            alert(`Thank you, ${name}! Your request has been received. We will contact you at ${email} within 24 hours to schedule your private consultation.`);
            
            // Reset form
            contactForm.reset();
            
            // Visual feedback
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            const originalStyle = submitButton.style.cssText;
            
            submitButton.textContent = 'Request Sent!';
            submitButton.style.background = '#556B2F';
            submitButton.style.borderColor = '#556B2F';
            submitButton.style.color = '#F8F6F0';
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.cssText = originalStyle;
            }, 3000);
        });
    }

    // PRODUCT CARD BUTTON HANDLERS - FIXED
    const productButtons = document.querySelectorAll('.product-card .btn--outline');
    
    productButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product name from the card
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            
            // Show interest message - FIXED
            alert(`Thank you for your interest in the ${productName}. Please fill out the contact form below to schedule a private viewing and learn more about our craftsmanship.`);
            
            // Scroll to contact section
            setTimeout(() => {
                scrollToSection('contact');
            }, 500);
        });
    });

    // LOOKBOOK HOVER EFFECTS
    const lookbookItems = document.querySelectorAll('.lookbook-item');
    
    lookbookItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // SCROLL REVEAL ANIMATIONS
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        return (
            rect.top >= -100 &&
            rect.left >= 0 &&
            rect.bottom <= windowHeight + 100 &&
            rect.right <= windowWidth
        );
    }

    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.product-card, .lookbook-item');
        
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize scroll animations
    const animatedElements = document.querySelectorAll('.product-card, .lookbook-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0.3';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Throttled scroll handler for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        handleNavbarScroll();
        
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(handleScrollAnimations, 10);
    });

    // Run animations on load
    setTimeout(handleScrollAnimations, 100);

    console.log('Eliteclasis website loaded successfully. All interactive elements are ready.');
});

// UTILITY FUNCTIONS
function updateContent(selector, newText) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = newText;
    }
}

function updateImage(selector, newImageUrl) {
    const element = document.querySelector(selector);
    if (element) {
        if (element.tagName === 'IMG') {
            element.src = newImageUrl;
        } else {
            element.style.backgroundImage = `url('${newImageUrl}')`;
        }
    }
}

// Make utility functions available globally
window.updateContent = updateContent;
window.updateImage = updateImage;