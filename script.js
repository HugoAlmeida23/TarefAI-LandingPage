document.addEventListener('DOMContentLoaded', () => {


  emailjs.init('zEddizgky_BEOSytv');

  // --- Mobile Navigation Toggle ---
  const menuButton = document.querySelector('.menu-button');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
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
      if (targetId.length > 1) {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
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
  const animatedElements = document.querySelectorAll(
    '.fade-in-on-scroll, .fade-in-move-on-scroll, .card-background, .logo-small-container'
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observerInstance.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    animatedElements.forEach(el => {
      observer.observe(el);
    });
  } else {
    animatedElements.forEach(el => {
      el.classList.add('is-visible');
    });
  }

  // --- Scroll Indicator Functionality ---
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    let hasScrolled = false;

    function updateScrollIndicator() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 100) {
        if (!hasScrolled) {
          hasScrolled = true;
          scrollIndicator.classList.add('hidden');
        }
      } else if (hasScrolled && scrollTop < 50) {
        hasScrolled = false;
        scrollIndicator.classList.remove('hidden');
      }
    }

    window.addEventListener('scroll', updateScrollIndicator, { passive: true });

    scrollIndicator.addEventListener('click', function () {
      const vantagens = document.getElementById('vantagens');
      if (vantagens) {
        vantagens.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });

    updateScrollIndicator();
  }

  // --- Main Email Form Submission ---
  const emailForm = document.getElementById('email-form');
  if (emailForm) {
    emailForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email-2').value;
      const submitButton = emailForm.querySelector('input[type="submit"]');
      const successMessage = document.querySelector('.success-message');
      const errorMessage = document.querySelector('.error-message');
      
      if (!email) {
        return;
      }
      
      // Show loading state
      const originalValue = submitButton.value;
      submitButton.value = 'Aguarde...';
      submitButton.disabled = true;
      
      // Simulate submission (replace with actual EmailJS call when configured)
      setTimeout(() => {
        successMessage.style.display = 'block';
        emailForm.style.display = 'none';
        
        // Reset after 3 seconds
        setTimeout(() => {
          successMessage.style.display = 'none';
          emailForm.style.display = 'block';
          submitButton.value = originalValue;
          submitButton.disabled = false;
          emailForm.reset();
        }, 3000);
      }, 1000);
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
  
  if (!modal) return;
  
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
  document.body.style.overflow = 'hidden';
}

function closePlanModal() {
  const modal = document.getElementById('planModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
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
  
  // Validate required fields
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const company = document.getElementById('company').value.trim();
  
  if (!name || !email || !company) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }
  
  // Show loading state
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'A Enviar...';
  submitButton.disabled = true;
  
  // Collect form data
  const formData = {
    name: name,
    email: email,
    company: company,
    phone: document.getElementById('phone').value,
    employees: document.getElementById('employees').value,
    clients: document.getElementById('clients').value,
    message: document.getElementById('message').value,
    selectedPlan: document.getElementById('selectedPlan').value,
    date: new Date().toLocaleString('pt-PT')
  };
  
  // Simulate form submission (replace with actual EmailJS call when configured)
  setTimeout(() => {
    // Hide form and show success message
    form.style.display = 'none';
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    
    // Auto-close modal after 3 seconds
    setTimeout(() => {
      closePlanModal();
    }, 3000);
  }, 1000);
  
  emailjs.send('service_1j10qer', 'template_c33apy7', formData)
    .then(function(response) {
      console.log('Email sent successfully:', response);
      
      form.style.display = 'none';
      successMessage.style.display = 'block';
      errorMessage.style.display = 'none';
      
      setTimeout(() => {
        closePlanModal();
      }, 3000);
      
    }, function(error) {
      console.error('Email sending failed:', error);
      
      form.style.display = 'none';
      successMessage.style.display = 'none';
      errorMessage.style.display = 'block';
      
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
      
      setTimeout(() => {
        form.style.display = 'block';
        errorMessage.style.display = 'none';
      }, 3000);
    });
}