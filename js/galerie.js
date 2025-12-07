(function () {
  window.initGalerie = function initGalerie(root = document) {
    const slidesData = {
  effereyn: [
    "images/effereyn/photo_10.webp",
    "images/effereyn/photo_11.webp",
    "images/effereyn/photo_12.webp",
    "images/effereyn/photo_13.webp",
    "images/effereyn/1.webp",
    "images/effereyn/2.webp",
    "images/effereyn/3.webp",
    "images/effereyn/4.webp",
    "images/effereyn/5.webp",
    "images/effereyn/6.webp",
    "images/effereyn/7.webp",
    "images/effereyn/8.webp",
    "images/effereyn/9.webp",
    "images/effereyn/10.webp",
    "images/effereyn/11.webp",
    "images/effereyn/12.webp",
    "images/effereyn/13.webp",
    "images/effereyn/14.webp",
    "images/effereyn/15.webp",
    "images/effereyn/16.webp",
    "images/effereyn/17.webp",
    "images/effereyn/18.webp",
    "images/effereyn/19.webp",
    "images/effereyn/20.webp",
    "images/effereyn/21.webp",
    "images/effereyn/22.webp",
    "images/effereyn/23.webp",
    "images/effereyn/24.webp",
    "images/effereyn/25.webp",
    "images/effereyn/26.webp",
    "images/effereyn/27.webp",
    "images/effereyn/28.webp",
    "images/effereyn/29.webp",
    "images/effereyn/30.webp",
    "images/effereyn/31.webp",
    "images/effereyn/32.webp",
    "images/effereyn/33.webp",
    "images/effereyn/34.webp",
    "images/effereyn/35.webp",
    "images/effereyn/36.webp",
    "images/effereyn/37.webp",
    "images/effereyn/38.webp",
    "images/effereyn/39.webp",
    "images/effereyn/40.webp",
    "images/effereyn/41.webp",
    "images/effereyn/42.webp",
    "images/effereyn/43.webp",
    "images/effereyn/44.webp",
    "images/effereyn/45.webp",
    "images/effereyn/46.webp",
    "images/effereyn/47.webp",
    "images/effereyn/48.webp",
    "images/effereyn/49.webp",
    "images/effereyn/50.webp",
    "images/effereyn/51.webp",
    "images/effereyn/52.webp",
    "images/effereyn/53.webp",
    "images/effereyn/54.webp",
    "images/effereyn/55.webp",
    "images/effereyn/56.webp",
    "images/effereyn/57.webp",
    "images/effereyn/58.webp",
    "images/effereyn/59.webp",
],
foret: [
    "images/foret/foret.webp",
    "images/foret/1.webp",
    "images/foret/2.webp",
    "images/foret/3.webp",
    "images/foret/4.webp",
    "images/foret/5.webp",
    "images/foret/6.webp",
    "images/foret/7.webp",
    "images/foret/8.webp",
    "images/foret/9.webp",
    "images/foret/10.webp",
    "images/foret/11.webp",
    "images/foret/12.webp",
    "images/foret/13.webp",
    "images/foret/14.webp",
    "images/foret/15.webp",
    "images/foret/16.webp",
    "images/foret/17.webp",
    "images/foret/18.webp",
    "images/foret/19.webp",
    "images/foret/20.webp",
    "images/foret/21.webp",
    "images/foret/22.webp",
    "images/foret/23.webp",
    "images/foret/24.webp",
    "images/foret/25.webp",
],
merendil: [
    "images/merendil/merendil.webp",
],
antika: [
    "images/antika/antika.webp",
    "images/antika/2.webp",
    "images/antika/3.webp",
    "images/antika/4.webp",
    "images/antika/5.webp",
    "images/antika/6.webp",
],
alinor: [
    "images/alinor/alinor.webp",
]

};

    const $  = (sel) => root.querySelector(sel);
    const $$ = (sel) => Array.from(root.querySelectorAll(sel));

    const currentIndex = {};
    const autoSlideIntervals = {};

    function updateSlide(galleryId) {
      const slides = slidesData[galleryId];
      const img = $(`#slide-${galleryId}`);
      if (!slides || !img) return;
      img.src = slides[currentIndex[galleryId]];
    }

    function stopAllSlides() {
      Object.keys(autoSlideIntervals).forEach(id => clearInterval(autoSlideIntervals[id]));
    }

    function startAutoSlide(galleryId) {
      stopAllSlides();
      autoSlideIntervals[galleryId] = setInterval(() => changeSlide(galleryId, 1), 4000);
    }

    function changeSlide(galleryId, direction) {
      const slides = slidesData[galleryId];
      if (!slides) return;
      currentIndex[galleryId] = (currentIndex[galleryId] + direction + slides.length) % slides.length;
      updateSlide(galleryId);
      startAutoSlide(galleryId);
    }

    // Pour tes onclick="changeSlide(...)" dans le HTML
    window.changeSlide = changeSlide;

    // Init images
    Object.keys(slidesData).forEach(id => { currentIndex[id] = 0; updateSlide(id); });

    // Démarrer l'auto-slide sur la galerie active (ou la 1re si aucune)
    let active = $(".gallery-content.active") || $(".gallery-content");
    if (active) {
      active.classList.add("active");
      slidesData[active.id] && startAutoSlide(active.id);
    }

    // Onglets
    const tabs = $$(".tab");
    tabs.forEach(tab => {
      tab.type = "button";
      tab.addEventListener("click", (e) => {
        e.preventDefault();

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        $$(".gallery-content").forEach(g => g.classList.remove("active"));
        const id = tab.dataset.target;
        const target = $(`#${id}`);
        if (!target || !slidesData[id]) return;

        target.classList.add("active");
        currentIndex[id] = 0;
        updateSlide(id);
        startAutoSlide(id);
      });
    });
  };
})();
