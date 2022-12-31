const mascotSelectSection = document.getElementById('mascot-select');
const cardsContainer = document.getElementById('cards-container');
const selectMascotButton = document.getElementById('select-mascot-button');

const attackSelectSection = document.getElementById('attack-select');
const playerAttacks = document.getElementById('player-attacks');
const enemyAttacks = document.getElementById('enemy-attacks');

const playerMascotSpan = document.getElementById('player-mascot');
const playerVictoriesSpan = document.getElementById('player-victories');

const enemyMascotSpan = document.getElementById('enemy-mascot');
const enemyVictoriesSpan = document.getElementById('enemy-victories');

const resultMessage = document.getElementById('result');
const restartButton = document.getElementById('restart-button');
const attackContainer = document.getElementById('attack-container');

let hipodogeInput;
let capipepoInput;
let ratigueyaInput;

let playerAttack = [];
let enemyAttack = [];

let enemyMascotAttacks;

let playerMascot;
let mascotAttacks;

let fireButton;
let waterButton;
let earthButton;

let buttons = [];
let playerAttackIndex;
let enemyAttackIndex;
let playerVictories = 0;
let enemyVictories = 0;

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
    { name: '💧', id: 'water-button' },
    { name: '💧', id: 'water-button' },
    { name: '💧', id: 'water-button' },
    { name: '🔥', id: 'fire-button' },
    { name: '🌱', id: 'earth-button' }
);

capipepo.attacks.push(
    { name: '🌱', id: 'earth-button' },
    { name: '🌱', id: 'earth-button' },
    { name: '🌱', id: 'earth-button' },
    { name: '💧', id: 'water-button' },
    { name: '🔥', id: 'fire-button' }
);

ratigueya.attacks.push(
    { name: '🔥', id: 'fire-button' },
    { name: '🔥', id: 'fire-button' },
    { name: '🔥', id: 'fire-button' },
    { name: '💧', id: 'water-button' },
    { name: '🌱', id: 'earth-button' }
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

    restartButton.addEventListener('click', restartGame);
    restartButton.style.display = 'none';
};

const playerMascotSelect = () => {

    attackSelectSection.style.display = 'flex';
    mascotSelectSection.style.display = 'none';

    if (hipodogeInput.checked) {
        playerMascotSpan.innerHTML = hipodogeInput.id;
        playerMascot = hipodogeInput.id;
    } else if (capipepoInput.checked) {
        playerMascotSpan.innerHTML = capipepoInput.id;
        playerMascot = capipepoInput.id;
    } else if (ratigueyaInput.checked) {
        playerMascotSpan.innerHTML = ratigueyaInput.id;
        playerMascot = ratigueyaInput.id;
    } else {
        alert('select a mascot')
    }

    extracktAttacks(playerMascot);

    enemyMascotSelect();

};

const enemyMascotSelect = () => {
    enemyMascotSpan.innerHTML = mascots[random(0,mascots.length -1)].name;
    enemyMascotAttacks = mascots[random(0,mascots.length -1)].attacks;
    attackSecuence();
};

const extracktAttacks = () => {
    let attacks;
    mascots.forEach((mascot) => {
        if(mascot.name == playerMascot) {
            attacks = mascot.attacks;
        }
    });
    showAttacks(attacks);
}

const showAttacks = attacks => {
    attacks.forEach((attack) => {
        mascotAttacks = `
        <button id=${attack.id} class="attack-button ab">${attack.name}</button>
        `;
        attackContainer.innerHTML += mascotAttacks;
    });

    fireButton = document.getElementById('fire-button');
    waterButton = document.getElementById('water-button');
    earthButton = document.getElementById('earth-button');
    buttons = document.querySelectorAll('.ab');
};

const attackSecuence = () => {
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥') {
                playerAttack.push('FIRE');
                console.log(playerAttack);
                button.style.background = '#001E6C70';
                button.disabled = true;
            } else if(e.target.textContent === '💧') {
                playerAttack.push('WATER');
                console.log(playerAttack);
                button.style.background = '#001E6C70';
                button.disabled = true;
            } else {
                    playerAttack.push('EARTH');
                    console.log(playerAttack);
                    button.style.background = '#001E6C70';
                    button.disabled = true;
            }
            enemyRandomAttack();
        });
    });
};

const enemyRandomAttack = () => {
    let attacks = ['FIRE', 'FIRE', 'WATER', 'WATER', 'EARTH'];
    enemyAttack.push(attacks[random(0,enemyMascotAttacks.length -1)]);
    console.log(enemyAttack);
    battleInit();
};

const battleInit = () => {
    if(playerAttack.length === 5) {
        battle();
    }
};

const indexOfBothOponents = (player, enemy) => {
    playerAttackIndex = playerAttack[player];
    enemyAttackIndex = enemyAttack[enemy];
}

const battle = () => {

    for (let attack in playerAttack) {
        if(playerAttack[attack] === enemyAttack[attack]) {
            indexOfBothOponents(attack, attack);
            battleMessage('Tie');
        } else if (
            (enemyAttack[attack] == 'EARTH' && playerAttack[attack] == 'FIRE') ||
            (enemyAttack[attack] == 'FIRE' && playerAttack[attack] == 'WATER') || 
            (enemyAttack[attack] == 'WATER' && playerAttack[attack] == 'EARTH')
        ) {
            indexOfBothOponents(attack, attack);
            battleMessage('You Win this battle');
            playerVictories++;
            playerVictoriesSpan.innerHTML = playerVictories;
        } else {
            indexOfBothOponents(attack, attack);
            battleMessage('You Loose this battle');
            enemyVictories++;
            enemyVictoriesSpan.innerHTML = enemyVictories;
        }
    }
    checkVictories();
};

const checkVictories = () => {
    if(playerVictories === enemyVictories) finalMessage('This is a Tie!');
    else if(playerVictories > enemyVictories) finalMessage('You Win!');
    else finalMessage('You Loose!');
};

const battleMessage = result => {

    let newPlayerAttack = document.createElement('p');
    let newEnemyAttack = document.createElement('p');

    resultMessage.innerHTML = result;
    newPlayerAttack.innerHTML = playerAttackIndex;
    newEnemyAttack.innerHTML = enemyAttackIndex;

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