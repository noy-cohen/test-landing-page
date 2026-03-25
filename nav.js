(function () {
  // Inject nav HTML
  const navEl = document.createElement('nav');
  navEl.className = 'nav';
  navEl.id = 'nav';
  navEl.innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">✦ MyPage</a>
      <div class="nav-links" id="navLinks">
        <a href="index.html"     class="nav-link" data-page="index">Home</a>
        <a href="about.html"    class="nav-link" data-page="about">About</a>
        <a href="features.html" class="nav-link" data-page="features">Features</a>
        <a href="contact.html"  class="nav-link" data-page="contact">Contact</a>
      </div>
      <div class="nav-right">
        <a href="contact.html" class="btn nav-cta">Get in touch</a>
        <button class="nav-hamburger" id="navHamburger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="nav-mobile-menu" id="navMobileMenu">
      <a href="index.html"     class="nav-mobile-link" data-page="index">Home</a>
      <a href="about.html"    class="nav-mobile-link" data-page="about">About</a>
      <a href="features.html" class="nav-mobile-link" data-page="features">Features</a>
      <a href="contact.html"  class="nav-mobile-link" data-page="contact">Contact</a>
      <a href="contact.html" class="btn nav-mobile-cta">Get in touch</a>
    </div>
  `;
  document.body.insertBefore(navEl, document.body.firstChild);

  // Mark active link based on current page
  const page = (window.location.pathname.split('/').pop().replace('.html', '') || 'index');
  navEl.querySelectorAll('[data-page]').forEach((link) => {
    if (link.dataset.page === page) link.classList.add('active');
  });

  // Frosted glass on scroll
  window.addEventListener('scroll', () => {
    navEl.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });

  // Mobile hamburger toggle
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('navMobileMenu');
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
})();
