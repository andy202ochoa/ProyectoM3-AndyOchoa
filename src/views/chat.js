export default class Chat {
  constructor() {
    this.messages = [
      { role: "bot", text: "Hola Morty, ¿cómo andas?" },
      { role: "user", text: "Hola Rick" }
    ];
  }

  getHtml() {
    return `
      <div class="chat">

        <header>
          <h1>Chat</h1>
          <h2>Rick Sanchez</h2>
          <p>Chatea con Rick Sanchez</p>
        </header>

        <main class="chatMessages" id="chatMessages">
          ${this.messages.map(m => `
            <div class="${m.role === "bot" ? "chatBot" : "chatUser"}">
              ${m.text}
            </div>
          `).join("")}
        </main>

        <form class="chatComposer" id="chatForm">
          <input
            id="chatInput"
            class="chatInput"
            type="text"
            placeholder="Escribe un mensaje…"
          />
          <button class="chatSend" type="submit">Enviar</button>
        </form>

      </div>
    `;
  }

  afterRender() {
    const form = document.getElementById("chatForm");
    const input = document.getElementById("chatInput");
    const chat = document.getElementById("chatMessages");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const mensaje = input.value.trim();
      if (!mensaje) return;

      // agregar mensaje usuario
      this.messages.push({ role: "user", text: mensaje });

      // respuesta bot simple
      this.messages.push({
        role: "bot",
        text: "Rick: " + mensaje
      });

      // re-render mensajes
      chat.innerHTML = this.messages.map(m => `
        <div class="${m.role === "bot" ? "chatBot" : "chatUser"}">
          ${m.text}
        </div>
      `).join("");

      input.value = "";
      chat.scrollTop = chat.scrollHeight;
    });
  }
}