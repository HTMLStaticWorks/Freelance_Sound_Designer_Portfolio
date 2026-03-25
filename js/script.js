/* Sonic Architect - JavaScript Functionality */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Waveform Animation (Only on Home 1)
    const canvas = document.getElementById('waveform');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;

        function resize() {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        const bars = 80;
        const barWidth = width / bars;
        let offset = 0;

        function draw() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#00E5FF';

            for (let i = 0; i < bars; i++) {
                const x = i * barWidth;
                const h = Math.sin(i * 0.2 + offset) * 100 + 150;
                const h2 = Math.cos(i * 0.1 + offset * 0.5) * 50 + 150;
                
                const finalH = (h + h2) / 2;
                ctx.globalAlpha = 0.5;
                ctx.fillRect(x + 2, height / 2 - finalH / 2, barWidth - 4, finalH);
            }

            offset += 0.05;
            requestAnimationFrame(draw);
        }
        draw();
    }

    // 3. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') themeToggle.textContent = '🌙';

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
    });

    // 4. Active Link Detection
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Highlight logic
        if (linkPath === currentPath) {
            link.classList.add('active');
            
            // If it's a dropdown item, highlight its parent too
            const parentDropdown = link.closest('.has-dropdown');
            if (parentDropdown) {
                const parentLink = parentDropdown.querySelector('a');
                if (parentLink) parentLink.classList.add('active');
            }
        } else if (linkPath === '#' && (currentPath === 'index.html' || currentPath === 'home-2.html' || currentPath === '')) {
            // Specifically highlight "Home" for index or home-2
            link.classList.add('active');
        } else if (linkPath !== '#') {
            link.classList.remove('active');
        }
    });

    // 5. Scroll Animations (Intersection Observer)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .portfolio-card, .service-item, .about-grid, .gear-card').forEach(el => {
        el.classList.add('hide-for-reveal');
        observer.observe(el);
    });

    // 6. RTL Toggle Logic
    const rtlToggle = document.getElementById('rtl-toggle');
    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
            document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr'); // Default is ltr
            if (isRTL) {
                document.documentElement.removeAttribute('dir');
                rtlToggle.textContent = 'RTL';
            } else {
                document.documentElement.setAttribute('dir', 'rtl');
                rtlToggle.textContent = 'LTR';
            }
        });
    }

    // 7. Hamburger Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksList = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinksList) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            mobileMenuBtn.textContent = navLinksList.classList.contains('active') ? '✕' : '☰';
        });

        // Toggle dropdowns on click in mobile view
        const hasDropdownLinks = document.querySelectorAll('.has-dropdown > a');
        hasDropdownLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    link.parentElement.classList.toggle('active');
                }
            });
        });
    }

    // 8. Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const isSearch = form.classList.contains('search-form');
            if (isSearch) return; // Skip validation for search form if simple

            e.preventDefault();
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                const parent = input.parentElement;
                let error = parent.querySelector('.error-msg');
                
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--accent)';
                    if (!error) {
                        error = document.createElement('span');
                        error.className = 'error-msg';
                        error.style.color = 'var(--accent)';
                        error.style.fontSize = '0.7rem';
                        error.style.marginTop = '0.3rem';
                        error.style.display = 'block';
                        error.textContent = 'This field is required';
                        parent.appendChild(error);
                    }
                } else {
                    input.style.borderColor = 'var(--glass-border)';
                    if (error) error.remove();
                }
            });

            if (isValid) {
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.textContent;
                btn.textContent = 'SUCCESS!';
                btn.style.background = '#00ff00';
                btn.style.color = '#000';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                    form.reset();
                }, 3000);
            }
        });
    });
});
