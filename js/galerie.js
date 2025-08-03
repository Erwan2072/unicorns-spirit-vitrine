const slidesData = {
  effereyn: [
    "images/effereyn/photo_10.jpg",
    "images/effereyn/photo_11.jpg",
    "images/effereyn/photo_12.jpg",
    "images/effereyn/photo_13.jpg",
    "images/effereyn/1.jpg",
    "images/effereyn/2.jpg",
    "images/effereyn/3.jpg",
    "images/effereyn/4.jpg",
    "images/effereyn/5.jpg",
    "images/effereyn/6.jpg",
    "images/effereyn/7.jpg",
    "images/effereyn/8.jpg",
    "images/effereyn/9.jpg",
    "images/effereyn/10.jpg",
    "images/effereyn/11.jpg",
    "images/effereyn/12.jpg",
    "images/effereyn/13.jpg",
    "images/effereyn/14.jpg",
    "images/effereyn/15.jpg",
    "images/effereyn/16.jpg",
    "images/effereyn/17.jpg",
    "images/effereyn/18.jpg",
    "images/effereyn/19.jpg",
    "images/effereyn/20.jpg",
    "images/effereyn/21.jpg",
    "images/effereyn/22.jpg",
    "images/effereyn/23.jpg",
    "images/effereyn/24.jpg",
    "images/effereyn/25.jpg",
    "images/effereyn/26.jpg",
    "images/effereyn/27.jpg",
    "images/effereyn/28.jpg",
    "images/effereyn/29.jpg",
    "images/effereyn/30.jpg",
    "images/effereyn/31.jpg",
    "images/effereyn/32.jpg",
    "images/effereyn/33.jpg",
    "images/effereyn/34.jpg",
    "images/effereyn/35.jpg",
    "images/effereyn/36.jpg",
    "images/effereyn/37.jpg",
    "images/effereyn/38.jpg",
    "images/effereyn/39.jpg",
    "images/effereyn/40.jpg",
    "images/effereyn/41.jpg",
    "images/effereyn/42.jpg",
    "images/effereyn/43.jpg",
    "images/effereyn/44.jpg",
    "images/effereyn/45.jpg",
    "images/effereyn/46.jpg",
    "images/effereyn/47.jpg",
    "images/effereyn/48.jpg",
    "images/effereyn/49.jpg",
    "images/effereyn/50.jpg",
    "images/effereyn/51.jpg",
    "images/effereyn/52.jpg",
    "images/effereyn/53.jpg",
    "images/effereyn/54.jpg",
    "images/effereyn/55.jpg",
    "images/effereyn/56.jpg",
    "images/effereyn/57.jpg",
    "images/effereyn/58.jpg",
    "images/effereyn/59.jpg",
  ],

  foret: [
    "images/foret/foret.jpg",
    "images/foret/1.jpg",
    "images/foret/2.jpg",
    "images/foret/3.jpg",
    "images/foret/4.jpg",
    "images/foret/5.jpg",
    "images/foret/6.jpg",
    "images/foret/7.jpg",
    "images/foret/8.jpg",
    "images/foret/9.jpg",
    "images/foret/10.jpg",
    "images/foret/11.jpg",
    "images/foret/12.jpg",
    "images/foret/13.jpg",
    "images/foret/14.jpg",
    "images/foret/15.jpg",
    "images/foret/16.jpg",
    "images/foret/17.jpg",
    "images/foret/18.jpg",
    "images/foret/19.jpg",
    "images/foret/20.jpg",
    "images/foret/21.jpg",
    "images/foret/22.jpg",
    "images/foret/23.jpg",
    "images/foret/24.jpg",
    "images/foret/25.jpg",
  ],
  merendil: [
    "images/merendil/merendil.jpg",
  ],
  antika: [
    "images/antika/antika.jpg",
    "images/antika/1.jpg",
    "images/antika/2.jpg",
    "images/antika/3.jpg",
    "images/antika/4.jpg",
    "images/antika/5.jpg",
    "images/antika/6.jpg",
  ],
  alinor: [
    "images/alinor/alinor.jpg",
  ]
};

const currentIndex = {};
let autoSlideIntervals = {};

// Initialise les galeries
Object.keys(slidesData).forEach((galleryId) => {
  currentIndex[galleryId] = 0;
  updateSlide(galleryId);
  startAutoSlide(galleryId);
});

// Met à jour l’image affichée
function updateSlide(galleryId) {
  const img = document.getElementById(`slide-${galleryId}`);
  if (!img) return;
  img.src = slidesData[galleryId][currentIndex[galleryId]];
}

// Change d’image manuellement
function changeSlide(galleryId, direction) {
  const slides = slidesData[galleryId];
  if (!slides) return;

  currentIndex[galleryId] =
    (currentIndex[galleryId] + direction + slides.length) % slides.length;

  updateSlide(galleryId);

  clearInterval(autoSlideIntervals[galleryId]);
  startAutoSlide(galleryId);
}

// Lance le défilement automatique
function startAutoSlide(galleryId) {
  autoSlideIntervals[galleryId] = setInterval(() => {
    changeSlide(galleryId, 1);
  }, 4000);
}

// Gestion des onglets (changement de galerie)
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    // Désactive tous les onglets
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    this.classList.add("active");

    // Masque toutes les galeries
    document.querySelectorAll(".gallery-content").forEach((gallery) =>
      gallery.classList.remove("active")
    );

    // Affiche la galerie cliquée
    const targetId = this.dataset.target;
    const targetGallery = document.getElementById(targetId);
    if (targetGallery) {
      targetGallery.classList.add("active");

      // Remet la première image
      currentIndex[targetId] = 0;
      updateSlide(targetId);

      // Redémarre le slideshow
      clearInterval(autoSlideIntervals[targetId]);
      startAutoSlide(targetId);
    }
  });
});
