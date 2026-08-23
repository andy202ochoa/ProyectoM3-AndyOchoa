import { routes } from "./routes.js";

const app = document.getElementById("app");

// navegación sin recargar
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

// interceptar clicks SPA
document.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigateTo(e.target.href);
  }
});

// router principal
const router = async () => {
  const potentialMatches = routes.map(route => ({
    route,
    isMatch: location.pathname === route.path
  }));

  let match = potentialMatches.find(p => p.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true
    };
  }

  const view = new match.route.view();

  app.innerHTML = await view.getHtml();

  // 🔥 IMPORTANTE: activar lógica del chat u otras vistas
  if (view.afterRender) {
    view.afterRender();
  }
};

// back/forward
window.addEventListener("popstate", router);

// iniciar app
router();