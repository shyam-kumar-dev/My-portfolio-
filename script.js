// Futuristic Portfolio JavaScript

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                mobileMenu.classList.remove('active');
            }
        });
    });

    // Typing animation
    const typingText = document.getElementById('typing-text');
    const phrases = ['Web Developer', 'AI Enthusiast', 'Digital Imaging Artist', 'Tech Innovator','Motion Content Editor'];
    let phraseIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function typeAnimation() {
        const currentPhrase = phrases[phraseIndex];
        
        if (!isDeleting) {
            typingText.textContent = currentPhrase.substring(0, letterIndex + 1);
            letterIndex++;
            
            if (letterIndex === currentPhrase.length) {
                setTimeout(() => isDeleting = true, 2000);
            }
        } else {
            typingText.textContent = currentPhrase.substring(0, letterIndex - 1);
            letterIndex--;
            
            if (letterIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        }
        
        setTimeout(typeAnimation, isDeleting ? 50 : 100);
    }

    typeAnimation();

    // Create floating particles
    function createParticles(container, count = 20) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            container.appendChild(particle);
        }
    }

    // Add particles to hero and footer
    const heroParticles = document.getElementById('particles');
    const footerParticles = document.getElementById('footer-particles');
    
    if (heroParticles) createParticles(heroParticles, 20);
    if (footerParticles) {
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'footer-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (3 + Math.random() * 4) + 's';
            footerParticles.appendChild(particle);
        }
    }

    // Blog filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter blog cards
            blogCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Initialize EmailJS
    (function() {
        // EmailJS user ID
        emailjs.init("TYIBa9hQVwc70H0Za");
    })();

    // Contact form functionality
    const contactForm = document.getElementById('contact-form');
    const chatMessages = document.getElementById('chat-messages');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Add user message to chat
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.style.justifyContent = 'flex-end';
        userMessage.innerHTML = `
            <div class="message-content" style="background: var(--color-neon-cyan); color: var(--color-background); margin-left: auto;">
                ${message}
            </div>
        `;
        chatMessages.appendChild(userMessage);
        
        // Show loading message
        const loadingMessage = document.createElement('div');
        loadingMessage.className = 'message ai-message';
        loadingMessage.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <i class="fas fa-spinner fa-spin"></i> Sending your message...
            </div>
        `;
        chatMessages.appendChild(loadingMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Prepare template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message
        };
        
        // Send email using EmailJS
        emailjs.send('Shyam', 'template_9xao81q', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Remove loading message
                chatMessages.removeChild(loadingMessage);
                
                // Add success message
                const aiResponse = document.createElement('div');
                aiResponse.className = 'message ai-message';
                aiResponse.innerHTML = `
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        Thanks for your message, ${name}! Shyam'll get back to you soon. 🚀
                    </div>
                `;
                chatMessages.appendChild(aiResponse);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Clear form
                contactForm.reset();
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                
                // Remove loading message
                chatMessages.removeChild(loadingMessage);
                
                // Add error message
                const errorResponse = document.createElement('div');
                errorResponse.className = 'message ai-message';
                errorResponse.innerHTML = `
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        Sorry, there was an error sending your message. Please try again later.
                    </div>
                `;
                chatMessages.appendChild(errorResponse);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            });
    });

    // Add random delays to floating animations
    document.querySelectorAll('.tech-logo, .footer-tech-logo').forEach((el, index) => {
        el.style.animationDelay = (index * 0.2) + 's';
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.skill-card, .project-card, .blog-card, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

