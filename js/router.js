// js/router.js

document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("main-content");
  const links = document.querySelectorAll('a[data-page]');

  // Fonction pour charger une page
  const loadPage = async (pageName, updateHash = true) => {
    try {
      const response = await fetch(`pages/${pageName}`);
      if (!response.ok) throw new Error("Page non trouvée");
      const html = await response.text();
      main.innerHTML = html;


    // ✅ Ré-initialiser la galerie si présente
    if (main.querySelector(".galerie")) {
      window.initGalerie?.(main);
    }

      // Mettre à jour le hash dans l'URL
      if (updateHash) {
        window.location.hash = pageName.replace('.html', '');
      }

      updateActiveLink(pageName);
    } catch (error) {
      main.innerHTML = `<p role="alert">Erreur lors du chargement de la page.</p>`;
      console.error(error);
    }
  };

  // Fonction pour mettre à jour le lien actif dans la navigation
  const updateActiveLink = (pageName) => {
    links.forEach(link => {
      if (link.getAttribute('data-page') === pageName) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  // Gestion des clics sur les liens
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pageName = link.getAttribute("data-page");
      loadPage(pageName);
    });
  });

  // Gestion du hash (navigation manuelle ou rechargement)
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.replace('#', '');
    const page = hash ? `${hash}.html` : "accueil.html";
    loadPage(page, false);
  });

  // Chargement initial (basé sur le hash si présent)
  const initialHash = window.location.hash.replace('#', '');
  const initialPage = initialHash ? `${initialHash}.html` : "accueil.html";
  loadPage(initialPage);
});
