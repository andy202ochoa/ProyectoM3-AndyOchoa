export default class About {
  getHtml() {
    return `
      <section class="about">
        <div class="aboutContainer">

          <h1 class="aboutTitle">📖 Acerca de este proyecto</h1>

          <p class="aboutText">
            Mi nombre es <strong>Andy Ochoa</strong>, soy desarrollador <strong>Full Stack Junior</strong>.
            Este proyecto fue creado para desarrollar un chat interactivo utilizando Vercel,
            aplicando un diseño <strong>mobile-first</strong> y poniendo en práctica mis nuevos conocimientos
            en desarrollo web.
          </p>

          <div class="aboutCard">
            <h2>⚙️ Tecnologías usadas</h2>
            <ul>
              <li>HTML5 semántico</li>
              <li>CSS3 (Flexbox + responsive)</li>
              <li>JavaScript (ES Modules)</li>
              <li>History API para routing</li>
              <li>Vercel Functions</li>
            </ul>
          </div>

          <div class="aboutCard">
            <h2>🚀 Funcionalidades</h2>
            <ul>
              <li>Navegación sin recarga (SPA)</li>
              <li>Chat interactivo tipo aplicación</li>
              <li>Arquitectura modular (views)</li>
              <li>Diseño responsive mobile-first</li>
            </ul>
          </div>

          <div class="aboutCard">
            <h2>📞 Contacto</h2>
            <ul>
              <li>
                GitHub: 
                <a href="https://github.com/andy202ochoa" target="_blank">
                  github.com/andy202ochoa
                </a>
              </li>
              <li>
                Instagram: 
                <a href="https://www.instagram.com/andy0xy/" target="_blank">
                  @andy0xy
                </a>
              </li>
              <li>
                WhatsApp: 
                <a href="https://wa.me/593961122401" target="_blank">
                  +593 961 122 401
                </a>
              </li>
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