 const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.services-header, .service-card').forEach(el => {
            observer.observe(el);
        });

        // Phone mockup hover effects
        const phoneMockups = document.querySelectorAll('.phone-mockup, .phone-second');
        phoneMockups.forEach(phone => {
            phone.addEventListener('mouseenter', () => {
                phone.style.transform = phone.classList.contains('phone-second') 
                    ? 'rotate(5deg) scale(1.02)' 
                    : 'rotate(-2deg) scale(1.02)';
            });
            
            phone.addEventListener('mouseleave', () => {
                phone.style.transform = phone.classList.contains('phone-second') 
                    ? 'rotate(8deg)' 
                    : 'rotate(-5deg)';
            });
        });

        // Toggle switch interactions
        const toggleSwitches = document.querySelectorAll('.toggle-switch');
        toggleSwitches.forEach(toggle => {
            toggle.addEventListener('click', () => {
                toggle.style.background = toggle.style.background === 'rgb(158, 158, 158)' ? '#4caf50' : '#9e9e9e';
            });
        });

        // Service button hover effect
        const serviceBtn = document.querySelector('.service-btn');
        serviceBtn.addEventListener('mouseenter', () => {
            serviceBtn.style.transform = 'translateY(-2px)';
        });
        
        serviceBtn.addEventListener('mouseleave', () => {
            serviceBtn.style.transform = 'translateY(0)';
        });

        // Add floating animation to phones
        function addFloatingAnimation() {
            const phones = document.querySelectorAll('.phone-mockup, .phone-second');
            phones.forEach((phone, index) => {
                phone.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
            });
        }

        // Add floating keyframes
        const floatingStyle = document.createElement('style');
        floatingStyle.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(var(--rotation, -5deg)); }
                50% { transform: translateY(-10px) rotate(var(--rotation, -5deg)); }
            }
        `;
        document.head.appendChild(floatingStyle);

        // Set CSS custom properties for rotation
        document.querySelector('.phone-mockup').style.setProperty('--rotation', '-5deg');
        document.querySelector('.phone-second').style.setProperty('--rotation', '8deg');

        // Initialize floating animation
        addFloatingAnimation();

        // Parallax effect on scroll
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            const phones = document.querySelectorAll('.phone-mockup, .phone-second');
            phones.forEach(phone => {
                phone.style.transform += ` translateY(${rate * 0.1}px)`;
            });
            
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });