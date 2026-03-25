// Smooth scroll for all internal anchor links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Scroll progress bar
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrolled / total) * 100 + '%';
}, { passive: true });

// Intersection observer for fade-in elements
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.card, .stat').forEach((el) => observer.observe(el));

// Animated counters
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target.querySelector('.stat-number');
      if (!el || el.dataset.animated) return;
      el.dataset.animated = '1';
      const target = parseInt(el.dataset.target, 10);
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }
      requestAnimationFrame(tick);
      statObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.stat').forEach((el) => statObserver.observe(el));

// Typewriter effect
const phrases = [
  'fast and lightweight.',
  'built with zero deps.',
  'easy to customize.',
  'responsive by default.',
  'yours to remix.',
];

const typewriterEl = document.getElementById('typewriter');
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
const TYPING_SPEED = 60;
const DELETE_SPEED = 35;
const PAUSE_MS = 1800;

function type() {
  const phrase = phrases[phraseIndex];

  if (!deleting) {
    typewriterEl.textContent = phrase.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === phrase.length) {
      deleting = true;
      setTimeout(type, PAUSE_MS);
      return;
    }
  } else {
    typewriterEl.textContent = phrase.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(type, deleting ? DELETE_SPEED : TYPING_SPEED);
}

type();
