const app = document.getElementById("app");

// Vistas (páginas)
const routes = {
  home: `
    <h1>Home</h1>
    <p>Bienvenido al proyecto 🚀</p>
  `,
  chat: `
    <h1>Chat</h1>
    <p>Aquí va tu chat 👀</p>
  `,
  about: `
    <h1>About</h1>
    <p>Proyecto hecho por Andy 😎</p>
  `
};

// función para cambiar vista
function navigate(page) {
  app.innerHTML = routes[page];
}

// escuchar clicks del menú
document.querySelectorAll("[data-page]").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = e.target.dataset.page;
    navigate(page);
  });
});

// cargar home por defecto
navigate("home");