function removeActiveClass() {
    document.querySelectorAll('.btn').forEach(button => {
        button.classList.remove('active');
    });
}
function changeMarvel() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    const marvel = document.querySelector('#marvel-page');
    marvel.classList.remove('hidden');
    removeActiveClass();
    const marvelButton = document.querySelector('#marvel-button');
    marvelButton.classList.add('active');
}
function changeDC() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    const dc = document.querySelector('#dc-page');
    dc.classList.remove('hidden');
    removeActiveClass();
    const dcButton = document.querySelector('#dc-button');
    dcButton.classList.add('active');
}

function changeArena() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    const arena = document.querySelector('#arena-page');
    arena.classList.remove('hidden');
    removeActiveClass();
}
const input = document.querySelector('.search-bar');
    input.addEventListener('input', () => {
    const searchTerm = input.value.toLowerCase();

    const cards = document.querySelectorAll('hero-card');

    cards.forEach(card => {
        const alias = card.getAttribute('alias').toLowerCase();
        const visible = alias.includes(searchTerm);
        card.style.display = visible ? 'block' : 'none';
    });
});

const input2 = document.querySelector('.search-bar2');
    input2.addEventListener('input', () => {
    const searchTerm = input2.value.toLowerCase();

    const cards = document.querySelectorAll('hero-card2');

    cards.forEach(card => {
        const alias = card.getAttribute('alias').toLowerCase();
        const visible = alias.includes(searchTerm);
        card.style.display = visible ? 'block' : 'none';
    });
});

async function fetchHeroes() {
  try {
    const response = await fetch('http://localhost:3000/heroes');
    const heroes = await response.json();
    displayHeroCards(heroes);
  } catch (error) {
    console.error("Error al obtener los héroes: ", error);
  }
}

function displayHeroCards(heroes) {
  const container = document.getElementById('hero-selection');
  container.innerHTML = '';

  heroes.forEach(hero => {
    const card = document.createElement('div');
    card.classList.add('hero-card');
    card.innerHTML = `
      <img src="${hero.imagen}" alt="${hero.alias}">
      <h3>${hero.alias}</h3>
      <p>${hero.nombre}</p>
      <button onclick="selectHero(${hero.id})">Seleccionar</button>
    `;
    container.appendChild(card);
  });
}

function selectHero(id) {
  fetch(`http://localhost:3000/heroes/${id}`)
    .then(response => response.json())
    .then(hero => {
      const selectedHero = document.getElementById('selected-hero');
      selectedHero.innerHTML = `
        <img src="${hero.imagen}" alt="${hero.alias}">
        <h2>${hero.alias} (${hero.nombre})</h2>
        <p><strong>Vida:</strong> ${hero.vida}</p>
        <p><strong>Habilidades:</strong></p>
        <ul>
          <li>${hero.habilidades["ataque-1"]}</li>
          <li>${hero.habilidades["ataque-2"]}</li>
        </ul>
      `;
    });
}

function selectRandomHero() {
  fetch('http://localhost:3000/heroes')
    .then(response => response.json())
    .then(heroes => {
      const randomIndex = Math.floor(Math.random() * heroes.length);
      selectHero(heroes[randomIndex].id);
    });
}

let player1Hero = null;
let player2Hero = null;
let currentGameMode = null;

function startBattle(mode) {
    currentGameMode = mode;
    document.getElementById('hero-selection').innerHTML = '';
    document.getElementById('selected-hero').innerHTML = '';
    

    if (mode === 'player-vs-player') {
        fetchHeroes('Select Player 1 Hero');
    } else if (mode === 'player-vs-computer') {
        fetchHeroes('Select Your Hero');
    } else if (mode === 'computer-vs-computer') {

        selectRandomHeroForBattle(1);
        selectRandomHeroForBattle(2);
    }
}

function selectRandomHeroForBattle(playerNumber) {
    fetch('http://localhost:3000/heroes')
        .then(response => response.json())
        .then(heroes => {
            const randomIndex = Math.floor(Math.random() * heroes.length);
            const hero = heroes[randomIndex];
            
            if (playerNumber === 1) {
                player1Hero = hero;
                displaySelectedHero(hero, 'player1');
            } else {
                player2Hero = hero;
                displaySelectedHero(hero, 'player2');
            }
            
            if (player1Hero && player2Hero) {
                setupBattle();
            }
        });
}

function displaySelectedHero(hero, player) {
    const container = document.createElement('div');
    container.className = 'selected-hero-container';
    container.id = `${player}-container`;
    container.innerHTML = `
        <h2>${player === 'player1' ? 'Player 1' : 'Player 2'}</h2>
        <img src="${hero.imagen}" alt="${hero.alias}">
        <h3>${hero.alias} (${hero.nombre})</h3>
        <p><strong>Vida:</strong> <span id="${player}-health">${hero.vida}</span></p>
        <div class="abilities">
            <button onclick="useAbility('${player}', 'ataque-1')">${hero.habilidades["ataque-1"]}</button>
            <button onclick="useAbility('${player}', 'ataque-2')">${hero.habilidades["ataque-2"]}</button>
        </div>
    `;
    
    document.getElementById('hero-selection').appendChild(container);
}

function setupBattle() {
    document.getElementById('hero-selection').innerHTML = `
        <div class="battle-arena">
            <div id="player1-container" class="hero-battle-container"></div>
            <div class="vs-container">VS</div>
            <div id="player2-container" class="hero-battle-container"></div>
        </div>
        <div id="battle-log" class="battle-log"></div>
    `;
    
    displaySelectedHero(player1Hero, 'player1');
    displaySelectedHero(player2Hero, 'player2');
    
    if (currentGameMode === 'computer-vs-computer') {
        startComputerBattle();
    } else if (currentGameMode === 'player-vs-computer') {

        document.querySelector('#player2-container .abilities').style.display = 'none';
    }
}

function useAbility(player, ability) {
    if (player === 'player1' && currentGameMode === 'player-vs-player') {

        performAttack(player1Hero, player2Hero, ability, 'player1', 'player2');
    } else if (player === 'player1' && currentGameMode === 'player-vs-computer') {

        performAttack(player1Hero, player2Hero, ability, 'player1', 'player2');

        setTimeout(computerTurn, 1500);
    }
}

function performAttack(attacker, defender, ability, attackerId, defenderId) {
    const damage = calculateDamage(ability);
    defender.vida -= damage;

    document.getElementById(`${defenderId}-health`).textContent = Math.max(0, defender.vida);

    const battleLog = document.getElementById('battle-log');
    const logEntry = document.createElement('p');
    logEntry.textContent = `${attacker.alias} uses ${attacker.habilidades[ability]} and deals ${damage} damage to ${defender.alias}!`;
    battleLog.appendChild(logEntry);
    
    if (defender.vida <= 0) {
        const winnerLog = document.createElement('h3');
        winnerLog.textContent = `${attacker.alias} wins the battle!`;
        battleLog.appendChild(winnerLog);
        
        document.querySelectorAll('.abilities button').forEach(btn => {
            btn.disabled = true;
        });
    }
}

function calculateDamage(ability) {
    return ability === 'ataque-1' ? Math.floor(Math.random() * 20) + 10 : Math.floor(Math.random() * 30) + 15;
}

function computerTurn() {
    if (player2Hero.vida <= 0) return;
    
    const abilities = ['ataque-1', 'ataque-2'];
    const randomAbility = abilities[Math.floor(Math.random() * abilities.length)];
    
    performAttack(player2Hero, player1Hero, randomAbility, 'player2', 'player1');
}

function startComputerBattle() {
    const battleInterval = setInterval(() => {
        if (player1Hero.vida <= 0 || player2Hero.vida <= 0) {
            clearInterval(battleInterval);
            return;
        }
        
        const p1Abilities = ['ataque-1', 'ataque-2'];
        const p1Ability = p1Abilities[Math.floor(Math.random() * p1Abilities.length)];
        performAttack(player1Hero, player2Hero, p1Ability, 'player1', 'player2');
        
        if (player2Hero.vida > 0) {
            setTimeout(() => {
                const p2Abilities = ['ataque-1', 'ataque-2'];
                const p2Ability = p2Abilities[Math.floor(Math.random() * p2Abilities.length)];
                performAttack(player2Hero, player1Hero, p2Ability, 'player2', 'player1');
            }, 1500);
        }
    }, 3000);
}

async function fetchHeroes(title = 'Select Hero') {
    try {
        const response = await fetch('http://localhost:3000/heroes');
        const heroes = await response.json();
        displayHeroCards(heroes, title);
    } catch (error) {
        console.error("Error al obtener los héroes: ", error);
    }
}

function displayHeroCards(heroes, title = 'Select Hero') {
    const container = document.getElementById('hero-selection');
    container.innerHTML = `<h2>${title}</h2>`;
    
    const cardContainer = document.createElement('div');
    cardContainer.className = 'hero-card-container';
    
    heroes.forEach(hero => {
        const card = document.createElement('div');
        card.classList.add('hero-card');
        card.innerHTML = `
            <img src="${hero.imagen}" alt="${hero.alias}">
            <h3>${hero.alias}</h3>
            <p>${hero.nombre}</p>
            <button onclick="selectHeroForBattle(${hero.id})">Select</button>
        `;
        cardContainer.appendChild(card);
    });
    
    container.appendChild(cardContainer);
}

function selectHeroForBattle(id) {
    fetch(`http://localhost:3000/heroes/${id}`)
        .then(response => response.json())
        .then(hero => {
            if (!player1Hero) {
                player1Hero = hero;
                displaySelectedHero(hero, 'player1');
                
                if (currentGameMode === 'player-vs-player') {
                    fetchHeroes('Select Player 2 Hero');
                } else if (currentGameMode === 'player-vs-computer') {
                    selectRandomHeroForBattle(2);
                }
            } else if (!player2Hero) {
                player2Hero = hero;
                displaySelectedHero(hero, 'player2');
                setupBattle();
            }
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const gameButtons = document.querySelectorAll('.game-button');
    gameButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (index === 0) {
                startBattle('player-vs-player');
            } else if (index === 1) {
                startBattle('player-vs-computer');
            } else if (index === 2) {
                startBattle('computer-vs-computer');
            }
        });
    });
});