// Smooth scroll when the "Learn More" button is clicked
document.querySelector('.btn').addEventListener('click', function (e) {
  e.preventDefault();
  const target = document.querySelector('#features');
  target.scrollIntoView({ behavior: 'smooth' });
});

// Fade-in cards as they scroll into view
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // only animate once
      }
    });
  },
  { threshold: 0.2 }
);

cards.forEach((card) => observer.observe(card));
