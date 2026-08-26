export default class Chat {

  constructor() {
    this.chats = [
      {
        id: 1,
        name: "David Martinez",
        messages: [
          { role: "bot", text: "Wake the f*** up, samurai." },
          { role: "user", text: "What do you want, Johnny?" }
        ]
      },
      {
        id: 2,
        name: "Luci",
        messages: [
          { role: "bot", text: "I exist beyond your comprehension." }
        ]
      },
      {
        id: 3,
        name: "Rebecca",
        messages: [
          { role: "bot", text: "Got a job for you." }
        ]
      },
    ];

    this.filteredChats = this.chats;
    this.activeChat = this.chats[0];
  }

  getHtml() {
  return `
    <div class="chatLayout cyber">

      <aside class="chatSidebar">
        <input 
          type="text" 
          id="searchChat"
          placeholder="Buscar en Night City..."
          class="chatSearch"
        />

        <div id="chatList">
          ${this.renderChatList(this.filteredChats)}
        </div>
      </aside>

      <section class="chatMain">
        <h2>💬 ${this.activeChat.name}</h2>

        <div class="chatMessages">
          ${this.renderMessages(this.activeChat.messages)}
        </div>

        <form id="chatForm" class="chatComposer">
          <input id="chatInput" type="text" placeholder="Escribe..." />
          <button type="submit">Enviar</button>
        </form>
      </section>

    </div>
  `;
}
renderMessages(messages) {
  return messages.map(m => `
    <div class="${m.role === "bot" ? "chatBot" : "chatUser"}">
      ${m.text}
    </div>
  `).join("");
}

  afterRender() {
  const search = document.getElementById("searchChat");
  const chatList = document.getElementById("chatList");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");

  //  ---------------BUSCAR CHAT
  search.addEventListener("input", () => {
    const query = search.value.toLowerCase();

    this.filteredChats = this.chats.filter(c =>
      c.name.toLowerCase().includes(query)
    );

    chatList.innerHTML = this.renderChatList(this.filteredChats);
  });

  //  -----------------CAMBIAR CHAT
  chatList.addEventListener("click", (e) => {
    if (e.target.classList.contains("chatItem")) {
      const id = Number(e.target.dataset.id);

      this.activeChat = this.chats.find(c => c.id === id);

      document.getElementById("app").innerHTML = this.getHtml();
      this.afterRender();
    }
  });

  //  ---------------ENVIAR MENSAJE
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const mensaje = input.value.trim();
    if (!mensaje) return;

    this.activeChat.messages.push({
      role: "user",
      text: mensaje
    });

    this.activeChat.messages.push({
      role: "bot",
      text: "🔊 Señal recibida..."
    });

    document.getElementById("app").innerHTML = this.getHtml();
    this.afterRender();
  });
}

renderChatList(chats) {
  return chats.map(chat => `
    <div class="chatItem" data-id="${chat.id}">
      🧑‍🚀 ${chat.name}
    </div>
  `).join("");
}}