import { routes } from "./routes.js";

const app = document.getElementById("app");

// navegar sin recargar
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

// detectar clicks en links
document.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigateTo(e.target.href);
  }
});

// router principal
const router = async () => {
  const potentialMatches = routes.map(route => {
    return {
      route,
      isMatch: location.pathname === route.path
    };
  });

  let match = potentialMatches.find(p => p.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true
    };
  }

  const view = new match.route.view();
  app.innerHTML = await view.getHtml();
};

// manejar botón atrás/adelante
window.addEventListener("popstate", router);

// cargar inicial
router();