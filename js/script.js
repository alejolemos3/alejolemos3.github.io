const mascotSelectSection = document.getElementById('mascot-select');
const cardsContainer = document.getElementById('cards-container');
const selectMascotButton = document.getElementById('select-mascot-button');

const attackSelectSection = document.getElementById('attack-select');
const fireButton = document.getElementById('fire-button');
const waterButton = document.getElementById('water-button');
const earthButton = document.getElementById('earth-button');
const playerAttacks = document.getElementById('player-attacks');
const enemyAttacks = document.getElementById('enemy-attacks');

const playerMascotSpan = document.getElementById('player-mascot');
const playerHealthSpan = document.getElementById('player-health');

const enemyMascotSpan = document.getElementById('enemy-mascot');
const enemyHealthSpan = document.getElementById('enemy-health');

const resultMessage = document.getElementById('result');
const restartButton = document.getElementById('restart-button');

let hipodogeInput;
let capipepoInput;
let ratigueyaInput;

let playerAttack;
let enemyAttack;

let playerHealth = 3;
let enemyHealth = 3;

let mascotsOption;

let mascots = [];

class Mascot {
    constructor(name, image, lives) {
        this.name = name;
        this.image = image;
        this.live = lives
        this.attacks = [];
    }
}

let hipodoge = new Mascot('Hipodoge', '../assets/mokepons_mokepon_hipodoge_attack.png', 3);

let capipepo = new Mascot('Capipepo', '../assets/mokepons_mokepon_capipepo_attack.png', 3);

let ratigueya = new Mascot('Ratigueya', '../assets/mokepons_mokepon_ratigueya_attack.png', 3);

hipodoge.attacks.push(
    { attack: '💧', id: 'water-button' },
    { attack: '💧', id: 'water-button' },
    { attack: '💧', id: 'water-button' },
    { attack: '🔥', id: 'fire-button' },
    { attack: '🌱', id: 'earth-button' }
);

capipepo.attacks.push(
    { attack: '🌱', id: 'earth-button' },
    { attack: '🌱', id: 'earth-button' },
    { attack: '🌱', id: 'earth-button' },
    { attack: '💧', id: 'water-button' },
    { attack: '🔥', id: 'fire-button' }
);

ratigueya.attacks.push(
    { attack: '🔥', id: 'fire-button' },
    { attack: '🔥', id: 'fire-button' },
    { attack: '🔥', id: 'fire-button' },
    { attack: '💧', id: 'water-button' },
    { attack: '🌱', id: 'earth-button' }
);

mascots.push(hipodoge, capipepo, ratigueya);

const gameInit = () => {
    attackSelectSection.style.display = 'none';

    mascots.forEach((mascot) => {
        mascotsOption = `
            <input type="radio" name="mascot-radio" id=${mascot.name} class="mascot-input">
            <label class="mascot-card" for=${mascot.name}>
                <p>${mascot.name}</p>
                <img src=${mascot.image} alt=${mascot.name} >
            </label>
    
        `;
        cardsContainer.innerHTML += mascotsOption;

        hipodogeInput = document.getElementById('Hipodoge');
        capipepoInput = document.getElementById('Capipepo');
        ratigueyaInput = document.getElementById('Ratigueya');
    });

    selectMascotButton.addEventListener('click', playerMascotSelect);
    // selectMascotButton.disabled = true;

    fireButton.addEventListener('click', fireAttack);
    waterButton.addEventListener('click', waterAttack);
    earthButton.addEventListener('click', earthAttack);

    restartButton.addEventListener('click', restartGame);
    restartButton.style.display = 'none';
};

const enemyMascotSelect = () => {
    enemyMascotSpan.innerHTML = mascots[random(0,mascots.length -1)].name;
};

const playerMascotSelect = () => {

        


    if (hipodogeInput.checked) {
        playerMascotSpan.innerHTML = hipodogeInput.id;
        attackSelectSection.style.display = 'flex';
        mascotSelectSection.style.display = 'none';
    } else if (capipepoInput.checked) {
        playerMascotSpan.innerHTML = capipepoInput.id;
        attackSelectSection.style.display = 'flex';
        mascotSelectSection.style.display = 'none';
    } else if (ratigueyaInput.checked) {
        playerMascotSpan.innerHTML = ratigueyaInput.id;
        attackSelectSection.style.display = 'flex';
        mascotSelectSection.style.display = 'none';
    } else {
        alert('select a mascot')
    }

    enemyMascotSelect();

};

const fireAttack = () => {
    playerAttack = 'FIRE';
    enemyRandomAttack();
};

const waterAttack = () => {
    playerAttack = 'WATER';
    enemyRandomAttack();
};

const earthAttack = () => {
    playerAttack = 'EARTH';
    enemyRandomAttack();
};

const enemyRandomAttack = () => {
    let attacks = ['FIRE', 'WATER', 'EARTH'];
    enemyAttack = attacks[random(0,2)];
    battle();
};

const battle = () => {
    if(enemyAttack == playerAttack) battleMessage('Tie');

    else if (
        (enemyAttack == 'EARTH' && playerAttack == 'FIRE') ||
        (enemyAttack == 'FIRE' && playerAttack == 'WATER') || 
        (enemyAttack == 'WATER' && playerAttack == 'EARTH')
    ) {
        battleMessage('You Win this battle');
        enemyHealth--;
        enemyHealthSpan.innerHTML = enemyHealth;
    } else {
        battleMessage('You Loose this battle');
        playerHealth--;
        playerHealthSpan.innerHTML = playerHealth;
    }

    checkHealth();

};

const checkHealth = () => {
    if(playerHealth == 0) finalMessage('You Loose! <br><br>Your mascot has no more lives');
    else if(enemyHealth == 0) finalMessage("You Win! <br><br>The enemy's mascot has no more lives");
};

const battleMessage = result => {

    let newPlayerAttack = document.createElement('p');
    let newEnemyAttack = document.createElement('p');

    resultMessage.innerHTML = result;
    newPlayerAttack.innerHTML = playerAttack;
    newEnemyAttack.innerHTML = enemyAttack;

    playerAttacks.appendChild(newPlayerAttack);
    enemyAttacks.appendChild(newEnemyAttack);
};

const finalMessage = winnerMessage => {
    resultMessage.innerHTML = winnerMessage;

    document.getElementById('fire-button').disabled = true;
    document.getElementById('water-button').disabled = true;
    document.getElementById('earth-button').disabled = true;

    restartButton.style.display = 'block';
};

const restartGame = () => {
    location.reload();
};

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

window.addEventListener('load', gameInit);