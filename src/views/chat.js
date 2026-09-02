import { chatStore, getActiveChat, setActiveChat } from "../chatStore.js";

export default class Chat {

  constructor() {
    // 👉 Ya NO se define chats aquí. Se lee del chatStore compartido,
    // que persiste mientras la app esté abierta (no se recrea con new Chat()).
    this.chats = chatStore.chats;
    this.filteredChats = chatStore.chats;
  }

  // Getter: siempre lee el chat activo actual desde el store
  get activeChat() {
    return getActiveChat();
  }

  // ================= HTML =================
  getHtml() {
    return `
      <div class="chatLayout cyber">

        <!-- 🔥 MOBILE SEARCH -->
        <input 
          type="text" 
          id="searchMobile"
          placeholder="Buscar en Night City..."
          class="chatSearch mobileSearch"
        />
        <div id="searchResults" class="searchResults"></div>

        <!-- SIDEBAR -->
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

        <!-- CHAT -->
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

  // ================= MESSAGES =================
  renderMessages(messages) {
    if (!messages || messages.length === 0) {
      return this.renderEmptyState();
    }

    return messages.map(m => `
      <div class="${m.role === "bot" ? "chatBot" : "chatUser"}">
        ${m.text === "__typing__" ? this.renderTypingIndicator() : m.text}
      </div>
    `).join("");
  }

  // ================= EMPTY STATE =================
  renderEmptyState() {
    return `
      <div class="chatEmptyState">
        <div class="chatEmptyIcon">💬</div>
        <p class="chatEmptyText">Aún no hay mensajes con ${this.activeChat.name}</p>
        <p class="chatEmptySubtext">Escribe algo para iniciar la conversación</p>
      </div>
    `;
  }

  // ================= TYPING INDICATOR =================
  renderTypingIndicator() {
    const word = "Typing...";
    const letters = word.split("")
      .map(char => `<span>${char === " " ? "&nbsp;" : char}</span>`)
      .join("");
    return `<span class="typingWave">${letters}</span>`;
  }

  // ================= CHAT LIST =================
  renderChatList(chats) {
    return chats.map(chat => `
      <div class="chatItem" data-id="${chat.id}">
        🧑‍🚀 ${chat.name}
      </div>
    `).join("");
  }

  // ================= AFTER RENDER =================
  afterRender() {

    const chatList = document.getElementById("chatList");
    const form = document.getElementById("chatForm");
    const input = document.getElementById("chatInput");

    const searchDesktop = document.getElementById("searchChat");
    const searchMobile = document.getElementById("searchMobile");
    const resultsContainer = document.getElementById("searchResults");

    const scrollToBottom = () => {
      const container = document.querySelector(".chatMessages");
      if (!container) return;
      container.scrollTop = container.scrollHeight;
    };

    const rerender = () => {
      document.getElementById("app").innerHTML = this.getHtml();
      this.afterRender();
    };

    // ================= UTIL =================
    const filterChats = (query) => {
      return this.chats.filter(c =>
        c.name.toLowerCase().includes(query)
      );
    };

    // ================= DESKTOP SEARCH =================
    if (searchDesktop) {
      searchDesktop.addEventListener("input", () => {
        const query = searchDesktop.value.toLowerCase();

        this.filteredChats = filterChats(query);
        chatList.innerHTML = this.renderChatList(this.filteredChats);
      });
    }

    // ================= MOBILE SEARCH =================
    if (searchMobile) {
      searchMobile.addEventListener("input", () => {
        const query = searchMobile.value.toLowerCase();

        resultsContainer.innerHTML = "";

        if (!query) return;

        const filtered = filterChats(query);

        filtered.forEach(chat => {
          const div = document.createElement("div");
          div.classList.add("searchItem");
          div.textContent = chat.name;
          div.dataset.id = chat.id;

          div.addEventListener("click", () => {
            setActiveChat(chat.id);
            rerender();
          });

          resultsContainer.appendChild(div);
        });
      });

      searchMobile.addEventListener("blur", () => {
        setTimeout(() => {
          resultsContainer.innerHTML = "";
        }, 150);
      });
    }

    // ================= CHANGE CHAT =================
    chatList.addEventListener("click", (e) => {
      const item = e.target.closest(".chatItem");
      if (!item) return;

      const id = Number(item.dataset.id);
      setActiveChat(id);
      rerender();
    });

    // ================= SEND MESSAGE =================
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const mensaje = input.value.trim();
      if (!mensaje) return;

      const currentChat = this.activeChat;

      // mensaje usuario
      currentChat.messages.push({
        role: "user",
        text: mensaje
      });

      // typing (animación de ola)
      currentChat.messages.push({
        role: "bot",
        text: "__typing__"
      });

      input.value = "";
      rerender();
      setTimeout(scrollToBottom, 0);

      // ============================================
      // 👉 LLAMADA REAL AL BACKEND (Gemini + personalidad)
      // ============================================
      fetch("/api/functions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: mensaje,
          personality: currentChat.personality
        })
      })
        .then(res => res.json())
        .then(data => {
          const lastIndex = currentChat.messages.length - 1;

          currentChat.messages[lastIndex] = {
            role: "bot",
            text: data.reply || "⚠️ No hubo respuesta del modelo."
          };

          rerender();
          setTimeout(scrollToBottom, 0);
        })
        .catch(err => {
          console.error("❌ Error llamando al backend:", err);

          const lastIndex = currentChat.messages.length - 1;

          currentChat.messages[lastIndex] = {
            role: "bot",
            text: "❌ No se pudo conectar con el backend"
          };

          rerender();
          setTimeout(scrollToBottom, 0);
        });
    });

    setTimeout(scrollToBottom, 0);
  }
}