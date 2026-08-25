import { routes } from "./routes.js";
import NotFound from "./views/notFound.js";

const app = document.getElementById("app");

// 🔧 normalizar rutas (CLAVE)
const normalizePath = (path) => {
  if (
    path === "/" ||
    path === "/index.html" ||
    path === "/src/index.html"
  ) return "/";

  return path.replace(/\/+$/, "") || "/";
};

// navegación sin recargar
const navigateTo = (url) => {
  const path = new URL(url).pathname;
  history.pushState(null, null, path);
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

  const path = normalizePath(location.pathname);

  const potentialMatches = routes.map(route => ({
    route,
    isMatch: path === route.path
  }));

  let match = potentialMatches.find(p => p.isMatch);

  // 🔥 404
  if (!match) {
    const view = new NotFound();
    app.innerHTML = view.getHtml();

    if (view.afterRender) view.afterRender();
    return;
  }

  // vista válida
  const view = new match.route.view();
  app.innerHTML = await view.getHtml();

  if (view.afterRender) {
    view.afterRender();
  }
};

// back / forward
window.addEventListener("popstate", router);

// iniciar app
router();