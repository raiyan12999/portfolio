// DOM Elements
const header = document.querySelector('.header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

// Skills and algorithm animations
const progressBars = document.querySelectorAll('.progress-fill');
const skillTags = document.querySelectorAll('.skill-tag');
const algoLevels = document.querySelectorAll('.level-fill');

// Add scroll event listener for header
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenuBtn.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Contact form submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate form submission
    setTimeout(() => {
      // Reset form
      contactForm.reset();
      
      // Show success toast
      toast.classList.add('show');
      
      // Hide toast after 5 seconds
      setTimeout(() => {
        toast.classList.remove('show');
      }, 5000);
    }, 1000);
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

// Observer for progress bars
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const width = target.getAttribute('style').match(/width:\s*(\d+)%/)[1];
      target.style.width = '0%';
      
      setTimeout(() => {
        target.style.width = `${width}%`;
      }, 200);
      
      progressObserver.unobserve(target);
    }
  });
}, observerOptions);

// Observer for skills animation
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateItems(entry.target.querySelectorAll('.skill-tag'));
      skillsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observer for projects animation
const projectsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      projectsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observer for algorithm section
const algoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target.querySelector('.level-fill');
      const width = target.getAttribute('style').match(/width:\s*(\d+)%/)[1];
      target.style.width = '0%';
      
      setTimeout(() => {
        target.style.width = `${width}%`;
      }, 200);
      
      algoObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.progress-item').forEach(item => {
  progressObserver.observe(item);
});

document.querySelectorAll('.skill-category').forEach(category => {
  skillsObserver.observe(category);
});

document.querySelectorAll('.project-card').forEach(card => {
  projectsObserver.observe(card);
});

document.querySelectorAll('.algo-item').forEach(item => {
  algoObserver.observe(item);
});

// Helper function to animate items with delay
function animateItems(items) {
  items.forEach((item, index) => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      item.style.transition = 'all 0.4s ease';
      item.style.opacity = 1;
      item.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// Animate research items on scroll
const researchItems = document.querySelectorAll('.research-item');
const researchObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 0;
      entry.target.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        entry.target.style.transition = 'all 0.6s ease';
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }, Array.from(researchItems).indexOf(entry.target) * 150);
      
      researchObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

researchItems.forEach(item => {
  researchObserver.observe(item);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Set initial opacity for elements that will be animated
  document.querySelectorAll('.fade-in').forEach(element => {
    element.style.opacity = 1;
  });
  
  // Initialize any third-party components or libraries here
});