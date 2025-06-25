document.addEventListener('DOMContentLoaded', () => {

  // --- Initialize EmailJS ---
  // Substitua 'YOUR_PUBLIC_KEY' pela sua chave pública do EmailJS
  emailjs.init('YOUR_PUBLIC_KEY');

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

  // --- Plan Form Submission ---
  const planForm = document.getElementById('planForm');
  if (planForm) {
    planForm.addEventListener('submit', function(e) {
      e.preventDefault();
      submitPlanForm();
    });
  }

});

// --- Plan Modal Functions ---
function openPlanModal(planName, planPrice) {
  const modal = document.getElementById('planModal');
  const modalTitle = document.getElementById('modalTitle');
  const selectedPlan = document.getElementById('selectedPlan');
  const form = document.getElementById('planForm');
  const successMessage = document.getElementById('formSuccess');
  const errorMessage = document.getElementById('formError');
  
  // Reset modal state
  form.style.display = 'block';
  successMessage.style.display = 'none';
  errorMessage.style.display = 'none';
  form.reset();
  
  // Set plan information
  modalTitle.textContent = `Subscrever Plano ${planName}`;
  selectedPlan.value = `${planName} - ${planPrice}`;
  
  // Show modal
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closePlanModal() {
  const modal = document.getElementById('planModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
  const modal = document.getElementById('planModal');
  if (e.target === modal) {
    closePlanModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closePlanModal();
  }
});

function submitPlanForm() {
  const form = document.getElementById('planForm');
  const submitButton = form.querySelector('button[type="submit"]');
  const successMessage = document.getElementById('formSuccess');
  const errorMessage = document.getElementById('formError');
  
  // Show loading state
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'A Enviar...';
  submitButton.disabled = true;
  
  // Collect form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    company: document.getElementById('company').value,
    phone: document.getElementById('phone').value,
    employees: document.getElementById('employees').value,
    clients: document.getElementById('clients').value,
    message: document.getElementById('message').value,
    selectedPlan: document.getElementById('selectedPlan').value,
    date: new Date().toLocaleString('pt-PT')
  };
  
  // Send email using EmailJS
  emailjs.send('service_1j10qer', 'template_c33apy7', formData)
    .then(function(response) {
      console.log('Email sent successfully:', response);
      
      // Hide form and show success message
      form.style.display = 'none';
      successMessage.style.display = 'block';
      errorMessage.style.display = 'none';
      
      // Auto-close modal after 3 seconds
      setTimeout(() => {
        closePlanModal();
      }, 3000);
      
    }, function(error) {
      console.error('Email sending failed:', error);
      
      // Show error message
      form.style.display = 'none';
      successMessage.style.display = 'none';
      errorMessage.style.display = 'block';
      
      // Reset button state
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
      
      // Auto-show form again after 3 seconds
      setTimeout(() => {
        form.style.display = 'block';
        errorMessage.style.display = 'none';
      }, 3000);
    });
}