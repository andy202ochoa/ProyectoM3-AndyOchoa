export default class {
  async getHtml() {
    return `
      <h1>Chat</h1>
      <div class="chatMessages" id="chatMessages"></div>

      <form id="chatForm">
        <input id="chatInput" type="text" placeholder="Escribe..." />
        <button>Enviar</button>
      </form>
    `;
  }
}