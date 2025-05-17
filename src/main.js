// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = document.getElementById('mobile-menu');
  const toggleButton = document.getElementById('menu-toggle');

  // Toggle menu when hamburger is clicked
  toggleButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
    mobileMenu.classList.toggle('hidden');
    toggleButton.setAttribute('aria-expanded', !isExpanded);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !toggleButton.contains(e.target)) {
      mobileMenu.classList.add('hidden');
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu when clicking on a mobile menu link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      toggleButton.setAttribute('aria-expanded', 'false');
    });
  });

  // Hero Background Transition
  const heroImage = document.getElementById('hero-image');
  const heroVideo = document.getElementById('hero-video');
  if (window.innerWidth >= 768) {
    setTimeout(() => {
      heroImage.classList.add('opacity-0', 'transition-opacity', 'duration-1000');
      heroVideo.classList.remove('hidden');
      heroVideo.play().catch(error => console.error('Video playback failed:', error));
    }, 2000);
  }
});