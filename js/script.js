document.addEventListener('DOMContentLoaded', () => {

  // --- Theme Toggle (Dark/Light) ---
  const themeToggles = document.querySelectorAll('.theme-toggle');
  
  // Check local storage or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      let newTheme = theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  });

  // --- RTL Toggle ---
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  const currentDir = localStorage.getItem('dir') || 'ltr';
  document.documentElement.setAttribute('dir', currentDir);
  
  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      let dir = document.documentElement.getAttribute('dir');
      let newDir = dir === 'ltr' ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('dir', newDir);
    });
  });

  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // --- Password Visibility Toggle ---
  const pwdToggles = document.querySelectorAll('.pwd-toggle');
  pwdToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const input = this.previousElementSibling;
      if (input.type === 'password') {
        input.type = 'text';
        // change icon to eye-off
        this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-sm"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
      } else {
        input.type = 'password';
        // change icon back to eye
        this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-sm"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
      }
    });
  });

  // --- Audio Player Interaction Mock ---
  const playBtns = document.querySelectorAll('.play-btn');
  playBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const isPlaying = this.classList.contains('playing');
      const waveform = this.closest('.audio-track').querySelector('.waveform-mock');
      
      if (isPlaying) {
        this.classList.remove('playing');
        this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
        waveform.style.opacity = '0.5';
        waveform.style.animation = 'none';
      } else {
        // Pause all others first
        playBtns.forEach(b => {
          b.classList.remove('playing');
          b.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
        });
        document.querySelectorAll('.waveform-mock').forEach(w => {
           w.style.opacity = '0.5';
           w.style.animation = 'none';
        });

        this.classList.add('playing');
        this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
        waveform.style.opacity = '1';
        // Add a simple animation for playback simulation
        waveform.style.animation = 'pulse 1s infinite alternate';
      }
    });
  });

  // --- Scroll to Top Button ---
  const scrollTopBtn = document.querySelector('.scroll-top');
  
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});

// Add extra keyframes via JS or global CSS (pulse for audio)
const style = document.createElement('style');
style.innerHTML = `
@keyframes pulse {
  0% { transform: scaleY(1); opacity: 0.8; }
  100% { transform: scaleY(1.2); opacity: 1; }
}
`;
document.head.appendChild(style);
