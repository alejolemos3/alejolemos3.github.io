let playerAttack;
let enemyAttack;

let playerHealth = 3;
let enemyHealth = 3;

const gameInit = () => {

    let attackSelectSection = document.getElementById('attack-select');
    attackSelectSection.style.display = 'none';

    let selectMascotButton = document.getElementById('select-mascot-button');
    selectMascotButton.addEventListener('click', playerMascotSelect);
    // selectMascotButton.disabled = true;

    let fireButton = document.getElementById('fire-button');
    fireButton.addEventListener('click', fireAttack);
    let waterButton = document.getElementById('water-button');
    waterButton.addEventListener('click', waterAttack);
    let earthButton = document.getElementById('earth-button');
    earthButton.addEventListener('click', earthAttack);

    let restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', restartGame);
    restartButton.style.display = 'none';
};

const enemyMascotSelect = () => {
    let mascots = ['Hipodoge', 'Capipepo', 'Ratigueya'];
    let enemyMascotSpan = document.getElementById('enemy-mascot');
    enemyMascotSpan.innerHTML = mascots[(random(0,2))];
};

const playerMascotSelect = () => {

    let hipodogeInput = document.getElementById('hipodoge');
    let capipepoInput = document.getElementById('capipepo');
    let ratigueyaInput = document.getElementById('ratigueya');
        
    let playerMascotSpan = document.getElementById('player-mascot');

    let attackSelectSection = document.getElementById('attack-select');
    let mascotSelectSection = document.getElementById('mascot-select');

    if (hipodogeInput.checked) {
        playerMascotSpan.innerHTML = 'Hipodoge';
        attackSelectSection.style.display = 'flex';
        mascotSelectSection.style.display = 'none';
    } else if (capipepoInput.checked) {
        playerMascotSpan.innerHTML = 'Capipepo';
        attackSelectSection.style.display = 'flex';
        mascotSelectSection.style.display = 'none';
    } else if (ratigueyaInput.checked) {
        playerMascotSpan.innerHTML = 'Ratigueya';
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
    let playerHealthSpan = document.getElementById('player-health');
    let enemyHealthSpan = document.getElementById('enemy-health');

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
    let resultMessage = document.getElementById('result');
    let playerAttacks = document.getElementById('player-attacks');
    let enemyAttacks = document.getElementById('enemy-attacks');

    let newPlayerAttack = document.createElement('p');
    let newEnemyAttack = document.createElement('p');

    resultMessage.innerHTML = result;
    newPlayerAttack.innerHTML = playerAttack;
    newEnemyAttack.innerHTML = enemyAttack;

    playerAttacks.appendChild(newPlayerAttack);
    enemyAttacks.appendChild(newEnemyAttack);
};

const finalMessage = winnerMessage => {
    let resultMessage = document.getElementById('result');

    resultMessage.innerHTML = winnerMessage;

    document.getElementById('fire-button').disabled = true;
    document.getElementById('water-button').disabled = true;
    document.getElementById('earth-button').disabled = true;

    let restartButton = document.getElementById('restart-button');
    restartButton.style.display = 'block';
};

const restartGame = () => {
    location.reload();
};

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

window.addEventListener('load', gameInit);