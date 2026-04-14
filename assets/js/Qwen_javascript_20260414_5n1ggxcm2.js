/**
 * Kigali Web Design - Main JavaScript
 * Modern animations, interactions, and form handling
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ===== PRELOADER =====
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 1500);

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.querySelector('.navbar');
  const backToTop = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
      backToTop.classList.add('show');
    } else {
      navbar.classList.remove('scrolled');
      backToTop.classList.remove('show');
    }
  });

  // ===== MOBILE MENU TOGGLE =====
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== SCROLL ANIMATIONS (Intersection Observer) =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Animate skill bars when visible
        if (entry.target.querySelector('.progress')) {
          const progressBars = entry.target.querySelectorAll('.progress');
          progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
              bar.style.width = width;
            }, 200);
          });
        }
        
        // Animate counter numbers
        if (entry.target.querySelector('.stat-number')) {
          const counters = entry.target.querySelectorAll('.stat-number');
          counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
              current += increment;
              if (current < target) {
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target + '+';
              }
            };
            updateCounter();
          });
        }
      }
    });
  }, observerOptions);

  // Observe animated elements
  document.querySelectorAll('.fade-in-up, .fade-in-right, .fade-in-left').forEach(el => {
    observer.observe(el);
  });

  // ===== PROJECT FILTERING =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ===== CONTACT FORM HANDLING =====
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');
  const submitBtn = contactForm.querySelector('.btn-submit');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    try {
      // Simulate API call (replace with actual backend endpoint)
      await simulateFormSubmission(data);
      
      // Show success message
      contactForm.style.display = 'none';
      formSuccess.classList.add('show');
      
      // Reset form
      contactForm.reset();
      
    } catch (error) {
      console.error('Form submission error:', error);
      formError.classList.add('show');
      
    } finally {
      // Hide loading state
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });

  // Simulate form submission (replace with real API call)
  function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          // In production, send to your backend:
          // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
          
          console.log('Form submitted:', data);
          resolve({ success: true });
        } else {
          reject(new Error('Submission failed'));
        }
      }, 2000);
    });
  }

  // Reset form to show again
  window.resetForm = function() {
    formSuccess.classList.remove('show');
    formError.classList.remove('show');
    contactForm.style.display = 'flex';
  };

  // ===== DYNAMIC YEAR IN FOOTER =====
  document.getElementById('year').textContent = new Date().getFullYear();

  // ===== TYPING EFFECT FOR HERO (Optional Enhancement) =====
  // Uncomment to enable typing animation for hero subtitle
  /*
  const heroSubtitle = document.querySelector('.hero-text p');
  if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < text.length) {
        heroSubtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }
    // Start typing after delay
    setTimeout(typeWriter, 2000);
  }
  */

  // ===== PARALLAX EFFECT FOR HERO BLOBS (Subtle) =====
  document.addEventListener('mousemove', (e) => {
    const blobs = document.querySelectorAll('.blob');
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    
    blobs.forEach((blob, index) => {
      const speed = (index + 1) * 0.3;
      blob.style.transform = `translate(${xAxis * speed}px, ${yAxis * speed}px)`;
    });
  });

  // ===== LAZY LOAD IMAGES (Performance) =====
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ===== CONSOLE WELCOME MESSAGE =====
  console.log(`
  %c🚀 Kigali Web Design %c
  Built with ❤️ in Rwanda
  
  👋 Hello Developer!
  Interested in the code? Let's connect!
  
  📧 olivierolivis2@gmail.com
  📱 +250 791 276 624
  📍 Kibagabaga, Kigali, Rwanda
  `, 
  'background: linear-gradient(135deg, #ff1493, #c71585); color: white; padding: 5px 15px; border-radius: 5px; font-weight: bold;',
  'color: #6c757d;'
  );

});

// ===== UTILITY: Debounce Function =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== UTILITY: Form Validation Helper =====
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Add real-time email validation
document.addEventListener('input', (e) => {
  if (e.target.name === 'email') {
    const email = e.target.value;
    if (email && !validateEmail(email)) {
      e.target.style.borderColor = '#ff6464';
    } else {
      e.target.style.borderColor = '';
    }
  }
});