export default class About {
  getHtml() {
    return `
      <section class="about">
        <div class="aboutContainer">

          <h1 class="aboutTitle">📖 About este proyecto</h1>

          <p class="aboutText">
            Esta es una Single Page Application (SPA) creada con JavaScript puro, usando un router sin recargar la página.
          </p>

          <div class="aboutCard">
            <h2>⚙️ Tecnologías usadas</h2>
            <ul>
              <li>HTML5 semántico</li>
              <li>CSS3 (Flexbox + responsive)</li>
              <li>JavaScript (ES Modules)</li>
              <li>History API para routing</li>
            </ul>
          </div>

          <div class="aboutCard">
            <h2>🚀 Funcionalidades</h2>
            <ul>
              <li>Navegación sin recarga</li>
              <li>Chat interactivo tipo app</li>
              <li>Arquitectura modular (views)</li>
            </ul>
          </div>

          <a href="/chat" data-link class="aboutButton">
            Probar Chat 💬
          </a>

        </div>
      </section>
    `;
  }
}