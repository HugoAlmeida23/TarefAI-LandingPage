document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation Toggle ---
  const menuButton = document.querySelector('.menu-button');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
      // The 'w--open' class is used by the template's CSS for the open state.
      menuButton.classList.toggle('w--open');
      navMenu.classList.toggle('w--open');
    });

    // Close mobile menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (menuButton.classList.contains('w--open')) {
            menuButton.classList.remove('w--open');
            navMenu.classList.remove('w--open');
        }
      });
    });
  }

  // --- Smooth Scrolling for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      // Ensure the target is not just a standalone "#"
      if (targetId.length > 1) {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Calculate position, accounting for the sticky navbar height
          const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // --- Scroll Animations using Intersection Observer ---
  // This is a modern, performant way to handle "on-scroll" animations.
  const animatedElements = document.querySelectorAll(
    '.fade-in-on-scroll, .fade-in-move-on-scroll, .card-background, .logo-small-container'
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Once the animation fires, we don't need to watch it anymore.
          observerInstance.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px', // Trigger a little before it's fully in view
      threshold: 0.1
    });

    animatedElements.forEach(el => {
      observer.observe(el);
    });
  } else {
    // If the browser doesn't support IntersectionObserver, just show the elements.
    animatedElements.forEach(el => {
      el.classList.add('is-visible');
    });
  }

});

// --- Inject CSS for Animations & Custom Styles ---
// This avoids needing to modify the main CSS file and keeps the logic self-contained.
(function() {
  const style = document.createElement('style');
  style.textContent = `
    /* Initial state for elements to be animated */
    .fade-in-on-scroll,
    .fade-in-move-on-scroll,
    .card-background,
    .logo-small-container {
      opacity: 0;
      transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    .fade-in-move-on-scroll,
    .card-background {
      transform: translateY(30px);
    }
    
    /* Visible state after intersecting */
    .fade-in-on-scroll.is-visible,
    .fade-in-move-on-scroll.is-visible,
    .card-background.is-visible,
    .logo-small-container.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Custom styles for TarefAI branding */
    .brand-text-logo {
      margin: 0;
      font-size: 1.5rem; /* 24px */
      font-family: 'Manrope', sans-serif;
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1;
    }

    .footer-logo {
      font-size: 1.25rem; /* 20px */
      color: #000;
    }

    .experience-paragraph-holder.feature-list p {
      color: #B4BCD0;
      font-weight: 500;
      font-size: 1.125rem; /* 18px */
      line-height: 1.8;
      text-align: left;
      width: 100%;
      padding-left: 20px;
    }

    .button.cta-button {
      background-color: #3b82f6; /* Blue color for primary CTA */
      color: #ffffff;
      padding: 16px 32px;
      font-size: 18px;
    }

    .button.cta-button:hover {
      background-color: #2563eb; /* Darker blue on hover */
    }

    .trusted-no.trusted-green {
      background-image: linear-gradient(128deg, #a8e063, #56ab2f);
    }
  `;
  document.head.appendChild(style);
})();