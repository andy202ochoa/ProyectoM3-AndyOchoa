import { setActiveChat } from "../chatStore.js";

export default class Home {
  getHtml() {
    return `
      <section class="home">

        <div class="homeContainer">

          <h1 class="homeTitle">🚀 Bienvenido a Night City</h1>

          <p class="homeSubtitle">
            Explora el mundo de Cyberpunk y conoce a algunos de sus personajes más icónicos.
          </p>

          <div class="characters">

            <!-- David -->
            <div class="characterCard" data-chat-id="1" role="button" tabindex="0">
              <div class="characterImg">
                <img src="https://i.pinimg.com/originals/6d/c3/f3/6dc3f398a9e4c27b2d197e424ec6ecf7.jpg" alt="David Martinez">
              </div>
              <h2>David Martinez</h2>
              <p>
                Un joven rebelde que lucha por sobrevivir en Night City. 
                Su ambición lo lleva a convertirse en un edgerunner legendario.
              </p>
            </div>

            <!-- Lucy -->
            <div class="characterCard" data-chat-id="2" role="button" tabindex="0">
              <div class="characterImg">
                <img src="https://cdn.rafled.com/anime-icons/images/6nuiK8b9XPLt.jpg" alt="Lucy">
              </div>
              <h2>Lucy</h2>
              <p>
                Misteriosa y talentosa netrunner con un pasado oculto. 
                Sueña con escapar de Night City y encontrar su libertad.
              </p>
            </div>

            <!-- Rebecca -->
            <div class="characterCard" data-chat-id="3" role="button" tabindex="0">
              <div class="characterImg">
                <img src="https://static0.thegamerimages.com/wordpress/wp-content/uploads/2022/09/cyberpunk-edgerunners-rebecca.jpg?w=1600&h=900&fit=crop" alt="Rebecca">
              </div>
              <h2>Rebecca</h2>
              <p>
                Caótica, leal y peligrosa. Rebecca es una luchadora feroz 
                que siempre está lista para el combate.
              </p>
            </div>

          </div>

          <a href="/chat" data-link class="homeButton">
            Chatear con ellos 💬
          </a>

        </div>

      </section>
    `;
  }

  // Al tocar una tarjeta, se abre el chat con ese personaje
  afterRender() {
    const openChat = (card) => {
      setActiveChat(Number(card.dataset.chatId));
      history.pushState(null, null, "/chat");
      // El router de app.js escucha "popstate", así que lo disparamos para que renderice /chat
      window.dispatchEvent(new PopStateEvent("popstate"));
    };

    document.querySelectorAll(".characterCard[data-chat-id]").forEach((card) => {
      card.addEventListener("click", () => openChat(card));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openChat(card);
        }
      });
    });
  }
}
