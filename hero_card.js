class HeroCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      this.shadowRoot.innerHTML = `
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&family=Cal+Sans&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: url('') no-repeat center center/cover;
            color: white;
        }
        .arena-btn {
            height: 100%;
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, #dab904, #ceb007);
            color: #000000;
            padding: 35px 65px;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 40px;
            text-decoration: none;
            clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
            box-shadow: 0 0 10px rgba(66, 66, 66, 0.6), 0 0 20px rgba(65, 65, 65, 0.6);
            transition: transform 0.3s, box-shadow 0.3s, color 0.3s;
            }

            .arena-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 0 15px rgba(58, 57, 57, 0.9), 0 0 30px rgba(39, 39, 39, 0.9);
            color: #000;
            }

        /* Navbar */
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(90deg, #000000 0%, #1b1b1b 100%);
            padding: 0 30px;
            height: 125px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.7);
        }

        .logo img {
            width: 245px;
            height: auto;
            filter: drop-shadow(0 0 10px #000);
        }

        .menu {
            display: flex;
            align-items: center;
            gap: 30px;
        }

        @keyframes clash {
            0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
            }
            50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
            }
            100% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
            }
        }
        .navbar {
        position: relative; /* stays above video & overlay */
        z-index: 10;
        }
        .background-overlay {
        background-image: url('img/marvel background.jpg');
        background-size: cover;
        background-position: center;
        position: relative;
        }

        .background-overlay::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.6); /* Overlay oscuro */
        z-index: 1;
        }

        /* Logo grande centrado */
        .marvel-header {
        position: relative;
        z-index: 2;
        text-align: center;
        padding-top: 4rem;
        }

        .logo-marvel {
        width: 500px;
        max-width: 100%;
        }

        /* Barra de búsqueda estilo cómic */
        .search-section {
        position: relative;
        z-index: 2;
        text-align: center;
        margin-top: 3rem;
        }

        .search-bar {
        padding: 0.8rem 1.5rem;
        width: 100%;
        max-width: 700px;
        font-size: 1.2rem;
        border: 3px solid white;
        border-radius: 10px;
        background-color: #a52525;
        color: white;
        font-family: "Roboto", sans-serif;
        box-shadow: 0 0 10px #c20d0d;
        outline: none;
        transition: 0.3s;
        }

        .search-bar::placeholder {
        color: #fff;
        font-family: "Roboto", sans-serif;
        }

        .search-bar:focus {
        background-color: #c00000;
        box-shadow: 0 0 15px #ff4c4c;
        }
        .card-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 2rem;
        padding: 3rem;
        z-index: 2;
        position: relative;
        }

        .card {
        width: 380px;
        height: 550px;
        perspective: 1000px;
        }
        .card:hover {
        transform: translateY(-5px);
        }

        .card-inner {
        width: 100%;
        height: 100%;
        position: relative;
        transition: transform 0.8s;
        transform-style: preserve-3d;
        }

        .card.flipped .card-inner {
        transform: rotateY(180deg);
        }

        .card-front,
        .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 2px solid white;
        border-radius: 15px;
        overflow: hidden;
        background-color: rgba(2, 2, 2, 0.692);
        color: white;
        backface-visibility: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: "Roboto", sans-serif;
        padding: 1rem;
        }

        .card-front img {
        width: 100%;
        height: 70%;
        object-fit: cover;
        object-position: top;
        }

        .alias {
        margin-top: 0.5rem;
        font-family: "Roboto", sans-serif;
        font-size: 2.2rem;
        color: white;
        }
        .info-btn, -close-btn {
        border radius: 10px;
        }

        .card-front .info-btn,
        .card-back .close-btn {
        margin-top: 1rem;
        background-color:rgba(168, 0, 0, 0.75);
        color: white;
        border: none;
        padding: 0.6rem 8rem;
        border-radius: 5px;
        font-size: 20px;
        font-weight: bold;
        font-family: "Roboto", sans-serif;
        cursor: pointer;
        transition: background 0.3s;
        }

        .card-front .info-btn:hover,
        .card-back .close-btn:hover {
        background-color: #a80000;
        }

        .card-back {
        transform: rotateY(180deg);
        text-align: center;
        font-size: 0.9rem;
        background-color: black;
        }
    
        .nombre{
        font-size: 2.5rem;
        }
        .alias-atras{
        font-size: 1.6rem;
        margin-bottom: 20px;
        }

        .descripcion{
        margin-bottom: 18px;
        }
        .trajes{
        margin-bottom: 18px;
        }
          }
        </style>
  
        <div class="card">
            <div class="card-inner">
            
            <!-- Cara frontal -->
            <div class="card-front">
            <img id="imagen">
            <h3 class="alias"></h3>
            <button class="info-btn">Info</button>
            </div>

            <!-- Cara trasera -->
            <div class="card-back">
                <h2 class="nombre"></h2>
                <p class="alias-atras"></p>
                <p class="descripcion"></p>
                <p class= "trajes"></p>
                <button class="close-btn">Cerrar</button>
            </div>

            </div>
        </div>
      `;
    }
  
    connectedCallback() {
    const shadow = this.shadowRoot;

    // Obtener elementos
    const img = shadow.getElementById('imagen');
    const aliasFront = shadow.querySelector('.alias');
    const nombreBack = shadow.querySelector('.nombre');
    const aliasBack = shadow.querySelector('.alias-atras');
    const descripcion = shadow.querySelector('.descripcion');
    const trajes = shadow.querySelector('.trajes');

    // Asignar atributos del componente
    img.src = this.getAttribute('imagen') || '';
    aliasFront.textContent = this.getAttribute('alias') || '';
    nombreBack.textContent = this.getAttribute('nombre') || '';
    aliasBack.textContent = this.getAttribute('alias') || '';
    descripcion.textContent = this.getAttribute('descripcion') || '';
    trajes.textContent = this.getAttribute('trajes') || '';

    // Manejo del volteo de tarjeta
    const card = shadow.querySelector('.card');
    const infoBtn = shadow.querySelector('.info-btn');
    const closeBtn = shadow.querySelector('.close-btn');

    infoBtn.addEventListener('click', () => {
    card.classList.add('flipped');
    });

    closeBtn.addEventListener('click', () => {
    card.classList.remove('flipped');
    });
    }

}
  
customElements.define('hero-card', HeroCard);