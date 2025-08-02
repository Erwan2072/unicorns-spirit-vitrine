document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.gallery-content');
  const carousels = document.querySelectorAll('.carousel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
        const carousel = targetContent.querySelector('.carousel');
        if (carousel) {
          setupCarousel(carousel);
        }
      }
    });
  });

  function updateActiveImage(carousel) {
    if (!carousel) return;
    const images = carousel.querySelectorAll('img');
    const carouselRect = carousel.getBoundingClientRect();
    const center = carouselRect.left + carouselRect.width / 2;

    let closestImg = null;
    let closestDistance = Infinity;

    images.forEach(img => {
      const rect = img.getBoundingClientRect();
      const imgCenter = rect.left + rect.width / 2;
      const distance = Math.abs(center - imgCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestImg = img;
      }
    });

    images.forEach(img => img.classList.remove('active'));
    if (closestImg) closestImg.classList.add('active');
  }

  function setupCarousel(carousel) {
    const wrapper = carousel.closest('.carousel-wrapper');
    const prevBtn = wrapper.querySelector('.prev');
    const nextBtn = wrapper.querySelector('.next');
    const images = carousel.querySelectorAll('img');
    let currentIndex = 0;
    let autoScroll;

    const scrollToImage = (index) => {
      if (!images[index]) return;
      currentIndex = index;
      carousel.scrollTo({
        left: images[index].offsetLeft - carousel.offsetWidth / 2 + images[index].offsetWidth / 2,
        behavior: 'smooth'
      });
      setTimeout(() => updateActiveImage(carousel), 300); // délai pour attendre le scroll
    };

    const nextImage = () => {
      currentIndex = (currentIndex + 1) % images.length;
      scrollToImage(currentIndex);
    };

    const prevImage = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      scrollToImage(currentIndex);
    };

    const startAutoScroll = () => {
      stopAutoScroll();
      autoScroll = setInterval(nextImage, 3000);
    };

    const stopAutoScroll = () => {
      clearInterval(autoScroll);
    };

    carousel.addEventListener('scroll', () => {
      setTimeout(() => updateActiveImage(carousel), 100);
    });

    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        stopAutoScroll();
        prevImage();
      });

      nextBtn.addEventListener('click', () => {
        stopAutoScroll();
        nextImage();
      });
    }

    // Initialisation
    scrollToImage(currentIndex);
    startAutoScroll();
  }

  // Initialisation de tous les carrousels visibles
  carousels.forEach(setupCarousel);

  // Si un onglet actif par défaut est présent
  const defaultTab = document.querySelector('.tab.active');
  if (defaultTab) {
    const defaultId = defaultTab.getAttribute('data-target');
    const defaultContent = document.getElementById(defaultId);
    const defaultCarousel = defaultContent?.querySelector('.carousel');
    if (defaultCarousel) {
      setupCarousel(defaultCarousel);
    }
  }
});
