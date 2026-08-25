export default class NotFound {
  getHtml() {
    return `
      <section class="notFound">

        <div class="notFoundContainer">

          <h1 class="notFoundTitle">404</h1>

          <h2 class="notFoundSubtitle">Ruta perdida en Night City 🌆</h2>

          <p class="notFoundText">
            Parece que te perdiste en los callejones de la red...
            Esta página no existe o fue eliminada.
          </p>

          <a href="/" data-link class="notFoundButton">
            Volver al inicio 🏠
          </a>

        </div>

      </section>
    `;
  }
}