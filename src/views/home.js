export default class Home {
  getHtml() {
    return `
      <section class="home">
        <div class="homeContainer">

          <h1 class="homeTitle">🚀 Bienvenido a la SPA</h1>

          <p class="homeText">
            Este es un proyecto tipo Single Page Application (SPA) con routing sin recargar la página.
          </p>

          <div class="homeCard">
            <h2>📌 ¿Qué puedes hacer?</h2>
            <ul>
              <li>Navegar entre páginas sin recargar</li>
              <li>Usar Chat interactivo</li>
              <li>Simular una app real moderna</li>
            </ul>
          </div>

          <a href="/chat" data-link class="homeButton">
            Ir al Chat 💬
          </a>

        </div>
      </section>
    `;
  }
}