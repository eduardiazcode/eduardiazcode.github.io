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