document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.nav-links a');
  const currentHash = window.location.hash || '#home';

  links.forEach(link => {
    if (link.getAttribute('href') === currentHash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  window.addEventListener('hashchange', () => {
    const updatedHash = window.location.hash;
    links.forEach(link => {
      if (link.getAttribute('href') === updatedHash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });
});
