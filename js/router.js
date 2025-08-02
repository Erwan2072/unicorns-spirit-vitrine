// js/router.js

document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("main-content");
  const links = document.querySelectorAll('a[data-page]');

  // Fonction pour charger une page
  const loadPage = async (pageName, updateHistory = true) => {
    try {
      const response = await fetch(`pages/${pageName}`);
      if (!response.ok) throw new Error("Page non trouvée");
      const html = await response.text();
      main.innerHTML = html;

      // Mettre à jour l'URL sans recharger la page
      if (updateHistory) {
        history.pushState({ page: pageName }, '', pageName.replace('.html', ''));
      }

      // Mettre à jour le menu actif
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

  // Gestion du bouton "précédent / suivant" du navigateur
  window.addEventListener("popstate", (e) => {
    const page = e.state?.page || "accueil.html";
    loadPage(page, false);
  });

  // Chargement initial : accueil.html
  loadPage("accueil.html");
});
