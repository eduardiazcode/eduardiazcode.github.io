document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initFloatingDots();
  initTypingEffect();
  initNavScroll();
});

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
      }
    });
  }, {
    threshold: 0.08
  });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

function initFloatingDots() {
  const dotsBg = document.getElementById('dotsBg');
  if (!dotsBg) return;

  for (let i = 0; i < 20; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    const size = Math.random() * 5 + 2;
    dot.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 8 + 6}s;
      animation-delay: ${Math.random() * 6}s;
    `;
    dotsBg.appendChild(dot);
  }
}

function initTypingEffect() {
  const tag = document.querySelector('.hero-tag');
  if (!tag) return;

  const text = '// Data Analyst & Renewable Energy Engineer';
  let i = 0;
  const cursor = document.createElement('span');
  cursor.classList.add('cursor');
  tag.appendChild(cursor);

  setTimeout(() => {
    const type = () => {
      if (i < text.length) {
        tag.insertBefore(document.createTextNode(text[i]), cursor);
        i++;
        setTimeout(type, 38);
      }
    };
    type();
  }, 500);
}

function initNavScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) {
        current = s.id;
      }
    });

    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
    });
  });
}

function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    bar.style.width = scrollPercent + '%';
  });
}

// Llámala en DOMContentLoaded:
initScrollProgress();

function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initCardTilt() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg
      const rotateY = ((x - centerX) / centerX) * 5;
      
      card.style.setProperty('--rotate-x', `${rotateX}deg`);
      card.style.setProperty('--rotate-y', `${rotateY}deg`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rotate-x', '0deg');
      card.style.setProperty('--rotate-y', '0deg');
    });
  });
}

// Llámala en DOMContentLoaded:
initCardTilt();

// Llámala en DOMContentLoaded:
initBackToTop();