// Scroll smooth sur la navbar
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      if (href === '#Services') {
        e.preventDefault();
        const target = document.querySelector('.devis-section');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
      if (href === '#Realisation') {
        e.preventDefault();
        const target = document.querySelector('.services');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
      if (href === '.nav-center') {
        e.preventDefault();
        const target = document.querySelector('.services');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
      if (href === 'contact.html') {
        e.preventDefault();
        scrollToContact();
      }
    });
  });
});

// Function to scroll to contact form
function scrollToContact() {
  const contactSection = document.querySelector('.contact-section');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Add scroll to contact functionality to all CTA buttons
document.addEventListener('DOMContentLoaded', function() {
  const ctaButtons = document.querySelectorAll('.cta-button');
  ctaButtons.forEach(button => {
    const buttonText = button.textContent.trim().toLowerCase();
    // Target buttons with specific text content
    if (buttonText.includes('demander un devis') || 
        buttonText.includes('nous contacter') || 
        buttonText.includes('voir le site')) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        scrollToContact();
      });
    }
  });
});
// Burger menu JS
document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', !expanded);
    });
  }
});
const questions = document.querySelectorAll('.faq-question');

  questions.forEach((question) => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      item.classList.toggle('active');
    });
  });

function fadeText(element, newText) {
  element.style.animation = 'none';         // reset animation
  void element.offsetWidth;                 // force reflow
  element.textContent = newText;            // change text
  element.style.animation = 'fadeIn 2s ease-in'; // reapply
}

function startTextRotation(element, texts, delay = 5000) {
  if (!element) return;
  let index = 0;
  setInterval(() => {
    index = (index + 1) % texts.length;
    fadeText(element, texts[index]);
  }, delay);
}

const devisTitle = document.querySelector('.devis-section .title-devis');
const devisTexts = [
  'Création de site web',
  'Site e-commerce',
  'Refonte de site web'
];

const textService = document.querySelector('.devis-section .text-devis');
const devisTextsChange = [
  'Un site élégant et sur-mesure qui valorise votre activité.',
  'Des boutiques en ligne optimisées pour séduire et convertir vos visiteurs.',
  'Modernisez votre présence digitale avec un design actuel et performant.'
];




// Lance l'animation
startTextRotation(devisTitle, devisTexts);
startTextRotation(textService, devisTextsChange);

// Rotate images: change the <img> src inside the container and replay fadeIn
function startImageRotation(container, imgs, delay = 5000) {
  if (!container || !imgs || imgs.length === 0) return;
  // accept either the img element itself or a container holding an <img>
  let imgEl = container.tagName === 'IMG' ? container : container.querySelector('img');
  // if container has no <img>, create one
  if (!imgEl) {
    imgEl = document.createElement('img');
    imgEl.className = 'image-grid';
    // make sure it fills the container; CSS handles sizing (object-fit)
    imgEl.alt = '';
    container.appendChild(imgEl);
  }
  // set an initial src so there's something visible
  if (!imgEl.src) imgEl.src = imgs[0];
  let index = 0;
  setInterval(() => {
    index = (index + 1) % imgs.length;
    // reset animation so it can replay
    imgEl.style.animation = 'none';
    void imgEl.offsetWidth;
    imgEl.src = imgs[index];
    imgEl.style.animation = 'fadeIn 2s ease-in';
  }, delay);
}

const imageElementMobile = document.querySelector('.parent-mobile .div5');
const imagesMobile = [
  "./images/nutrition-antifragile.png",
  "./images/portefolio.png",
  "./images/saveurdumonde.png"
];

// Fonction pour faire tourner les images avec fadeIn (mobile)
function startImageRotationMobile(container, imgs, delay = 5000) {
  if (!container || !imgs || imgs.length === 0) return;

  // Récupérer ou créer un <img> dans le container
  let imgEl = container.querySelector('img.image-grid');
  if (!imgEl) {
    imgEl = document.createElement('img');
    imgEl.className = 'image-grid';
    imgEl.alt = '';
    container.appendChild(imgEl);
  }

  // Initialisation
  let index = 0;
  imgEl.src = imgs[index];

  setInterval(() => {
    index = (index + 1) % imgs.length;
    imgEl.src = imgs[index];

    // Relancer l'animation fadeIn
    imgEl.classList.remove('fadeIn');
    void imgEl.offsetWidth; // force reflow
    imgEl.classList.add('fadeIn');
  }, delay);
}

// Lancer la rotation pour mobile
startImageRotationMobile(imageElementMobile, imagesMobile, 5000);


const logos = [
  './images/figma.svg',
  './images/framer.svg',
  './images/react.svg',
  './images/js.svg',
  './images/python.svg',
  './images/wordpress.svg',
  './images/shopify-color-svgrepo-com (2).svg',
]

const carousel = document.getElementById('carousel');
if (carousel) {
  carousel.innerHTML = `
  <div class="slider">
    <div class="slide-track">
      ${[...logos, ...logos].map(logo => `
        <div class="slide"><img src="${logo}" alt="logo"></div>
      `).join('')}
    </div>
  </div>
`;
} else {
  console.warn('No #carousel element found on this page. Skipping desktop carousel init.');
}

const carouselMobile = document.getElementById('carousel-mobile');
if (carouselMobile) {
  carouselMobile.innerHTML = `
  <div class="slider">
    <div class="slide-track">
      ${[...logos, ...logos].map(logo => `
        <div class="slide"><img src="${logo}" alt="logo"></div>
      `).join('')}
    </div>
  </div>
`;
} else {
  console.warn('No #carousel-mobile element found on this page. Skipping mobile carousel init.');
}

const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Utility to auto-clear the message after a delay
function autoClearMessage(timeout = 5000) {
  if (!formMessage) return;
  setTimeout(() => {
    formMessage.textContent = '';
  }, timeout);
}

if (form && formMessage) {
  form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '' || email === '' || message === '') {
      formMessage.textContent = 'Veuillez remplir tous les champs.';
      formMessage.style.color = 'red';
      autoClearMessage();
      return;
    }

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message
    };

    // Send to serverless endpoint (Vercel) which forwards to EmailJS using env vars
    try {
      formMessage.style.color = 'black';
      formMessage.textContent = 'Envoi en cours...';

      const resp = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      if (!resp.ok) {
        const text = await resp.text();
        console.error('Server send error', resp.status, text);
        formMessage.style.color = 'red';
        formMessage.textContent = 'Erreur lors de l\'envoi du message.';
        autoClearMessage();
        return;
      }

      formMessage.style.color = 'green';
      formMessage.textContent = 'Message envoyé avec succès !';
      form.reset();
      autoClearMessage();
    } catch (err) {
      console.error('Fetch send error', err);
      formMessage.style.color = 'red';
      formMessage.textContent = 'Erreur réseau lors de l\'envoi.';
      autoClearMessage();
    }
  });
} else {
  // Page without contact form - avoid runtime errors
  if (!form) console.warn('No contact form (#contactForm) found on this page.');
  if (!formMessage) console.warn('No formMessage (#formMessage) element found on this page.');
}

// Testimonial Slider - Version robuste
function initTestimonialSlider() {
  const track = document.querySelector('.testimonial-track');
  const items = document.querySelectorAll('.testimonial-item');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  
  console.log('Trying to initialize testimonial slider...');
  console.log('Track found:', !!track);
  console.log('Items found:', items.length);
  console.log('Dots found:', dots.length);
  
  if (!track || items.length === 0 || dots.length === 0) {
    console.log('Testimonial slider elements not found, retrying in 100ms...');
    setTimeout(initTestimonialSlider, 100);
    return;
  }
  
  let currentSlide = 0;
  const totalSlides = items.length;
  
  console.log(`✅ Testimonial slider initialized with ${totalSlides} slides`);
  
  function updateSlider() {
    const translateX = -(currentSlide * 100);
    track.style.transform = `translateX(${translateX}%)`;
    
    console.log(`📍 Moving to slide ${currentSlide}, translateX: ${translateX}%`);
    
    dots.forEach((dot, index) => {
      dot.classList.remove('active');
      if (index === currentSlide) {
        dot.classList.add('active');
      }
    });
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    console.log(`➡️ Auto-advancing to slide ${currentSlide}`);
    updateSlider();
  }
  
  // Auto-slide toutes les 4 secondes
  let autoSlideInterval = setInterval(nextSlide, 4000);
  console.log('🔄 Auto-slide started (4s interval)');
  
  // Navigation par dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      console.log(`🔘 Dot clicked: moving to slide ${index}`);
      currentSlide = index;
      updateSlider();
      
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(nextSlide, 4000);
    });
  });
  
  // Initialiser
  updateSlider();
}

// Démarrer dès que le DOM est prêt
document.addEventListener('DOMContentLoaded', initTestimonialSlider);

// Backup: démarrer après un délai si DOMContentLoaded a déjà été déclenché
setTimeout(initTestimonialSlider, 500);

