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

        <!-- SIDEBAR (tablet/desktop) -->
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
    return messages.map(m => `
      <div class="${m.role === "bot" ? "chatBot" : "chatUser"}">
        ${m.text}
      </div>
    `).join("");
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

    // ================= MOBILE SEARCH + SUGGESTIONS =================
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
            this.activeChat = chat;

            document.getElementById("app").innerHTML = this.getHtml();
            this.afterRender();
          });

          resultsContainer.appendChild(div);
        });
      });

      // limpiar sugerencias al salir
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

      this.activeChat = this.chats.find(c => c.id === id);

      document.getElementById("app").innerHTML = this.getHtml();
      this.afterRender();
    });

    // ================= SEND MESSAGE =================
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const mensaje = input.value.trim();
      if (!mensaje) return;

      this.activeChat.messages.push({
        role: "user",
        text: mensaje
      });

      // 👉 mensaje temporal (typing...)
        this.activeChat.messages.push({
          role: "bot",
          text: "..."
        });

        // 👉 render inmediato
        document.getElementById("app").innerHTML = this.getHtml();
        this.afterRender();

        input.value = "";

        // 👉 llamada a Gemini
        fetch("/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: mensaje,
            character: this.activeChat.name
          })
        })
        .then(res => {
          if (!res.ok) {
            throw new Error("Error del servidor");
          }
          return res.json();
        })
        .then(data => {

          const lastIndex = this.activeChat.messages.length - 1;

          this.activeChat.messages[lastIndex] = {
            role: "bot",
            text: data.reply || "⚠️ Sin respuesta"
          };

          document.getElementById("app").innerHTML = this.getHtml();
          this.afterRender();
        })
        .catch((error) => {

          const lastIndex = this.activeChat.messages.length - 1;

          this.activeChat.messages[lastIndex] = {
            role: "bot",
            text: "⚠️ No se pudo conectar con la IA"
          };

          document.getElementById("app").innerHTML = this.getHtml();
          this.afterRender();

          console.error("Error:", error);
        });
    });
    setTimeout(scrollToBottom, 0);
  }
}