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

const seeMapSection = document.getElementById('see-map');

const mapMaxWidth = 400;

let playerId = null;
let enemyId = null;
let hipodogeInput;
let capipepoInput;
let ratigueyaInput;
let langostelvisInput;
let pydosInput;
let tucapalmaInput;

let playerAttack = [];
let enemyAttack = [];

let enemyMascotAttacks;

let playerMascot;
let playerMascotObject;
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
let enemyMokepons = [];
let canvasContext = map.getContext('2d');
let interval;
let backgroundMap = new Image();
backgroundMap.src = './assets/mokemap.png';
let soughtHeight;
let mapWidth = window.innerWidth -20;

if(mapWidth > mapMaxWidth) {
    mapWidth = mapMaxWidth -20
}

soughtHeight = mapWidth *600 / 800;

map.width = mapWidth;
map.height = soughtHeight;

class Mascot {
    constructor(name, image, mapImage, id = null) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.attacks = [];
        this.width = 40;
        this.height = 40;
        this.x = random(0, map.width - this.width);
        this.y = random(0, map.height - this.height);
        this.imageMap = new Image();
        this.imageMap.src = mapImage;
        this.xVelocity = 0;
        this.yVelocity = 0;
    };

    paintMascot() {
        canvasContext.drawImage(
            this.imageMap,
            this.x,
            this.y,
            this.width,
            this.height
        );
    };
};

let hipodoge = new Mascot('Hipodoge', './assets/miraculus.png', './assets/miraculus.png');
let capipepo = new Mascot('Capipepo', './assets/cat.png', './assets/cat.png');
let ratigueya = new Mascot('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', './assets/ratigueya.png');
let langostelvis = new Mascot('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', './assets/mokepons_mokepon_langostelvis_attack.png');
let pydos = new Mascot('Pydos', './assets/mokepons_mokepon_pydos_attack.png', './assets/mokepons_mokepon_pydos_attack.png');
let tucapalma = new Mascot('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', './assets/mokepons_mokepon_tucapalma_attack.png');

const HIPODOGE_ATTACKS = [
    { name: 'WATER', symbol: '💧', id: 'water-button' },
    { name: 'WATER', symbol: '💧', id: 'water-button' },
    { name: 'WATER', symbol: '💧', id: 'water-button' },
    { name: 'FIRE', symbol: '🔥', id: 'fire-button' },
    { name: 'EARTH', symbol: '🌱', id: 'earth-button' }
];

const CAPIPEPO_ATTACKS = [
    { name: 'EARTH', symbol: '🌱', id: 'earth-button' },
    { name: 'EARTH', symbol: '🌱', id: 'earth-button' },
    { name: 'EARTH', symbol: '🌱', id: 'earth-button' },
    { name: 'WATER', symbol: '💧', id: 'water-button' },
    { name: 'FIRE', symbol: '🔥', id: 'fire-button' }
];

const RATIGUEYA_ATTACKS = [
    { name: 'FIRE', symbol: '🔥', id: 'fire-button' },
    { name: 'FIRE', symbol: '🔥', id: 'fire-button' },
    { name: 'FIRE', symbol: '🔥', id: 'fire-button' },
    { name: 'WATER', symbol: '💧', id: 'water-button' },
    { name: 'EARTH', symbol: '🌱', id: 'earth-button' }
];

hipodoge.attacks.push(...HIPODOGE_ATTACKS);

capipepo.attacks.push(...CAPIPEPO_ATTACKS);

ratigueya.attacks.push(...RATIGUEYA_ATTACKS);

langostelvis.attacks.push(
    { name: 'FIRE', symbol: '🔥', id: 'fire-button' },
    { name: 'FIRE', symbol: '🔥', id: 'fire-button' },
    { name: 'FIRE', symbol: '🔥', id: 'fire-button' },
    { name: 'WATER', symbol: '💧', id: 'water-button' },
    { name: 'WATER', symbol: '💧', id: 'water-button' },
    { name: 'EARTH', symbol: '🌱', id: 'earth-button' }
);

pydos.attacks.push(
    { name: 'EARTH', symbol: '🌱', id: 'earth-button' },
    { name: 'EARTH', symbol: '🌱', id: 'earth-button' },
    { name: 'EARTH', symbol: '🌱', id: 'earth-button' },
    { name: 'FIRE', symbol: '🔥', id: 'fire-button' },
    { name: 'FIRE', symbol: '🔥', id: 'fire-button' },
    { name: 'WATER', symbol: '💧', id: 'water-button' }
);

tucapalma.attacks.push(
    
    { name: 'EARTH', symbol: '🌱', id: 'earth-button' },
    { name: 'EARTH', symbol: '🌱', id: 'earth-button' },
    { name: 'EARTH', symbol: '🌱', id: 'earth-button' },
    { name: 'WATER', symbol: '💧', id: 'water-button' },
    { name: 'WATER', symbol: '💧', id: 'water-button' },
    { name: 'FIRE', symbol: '🔥', id: 'fire-button' }
);

// enemyHipodoge.attacks.push(...HIPODOGE_ATTACKS);

// enemyCapipepo.attacks.push(...CAPIPEPO_ATTACKS);

// enemyRatigueya.attacks.push(...RATIGUEYA_ATTACKS);

mascots.push(hipodoge, capipepo, ratigueya, langostelvis, pydos, tucapalma);

const gameInit = () => {
    attackSelectSection.style.display = 'none';

    seeMapSection.style.display = 'none';

    mascots.forEach((mascot) => {
        mascotsOption = `
            <input type="radio" name="mascot-radio" id=${mascot.name} class="mascot-input">
            <label class="mascot-card" for=${mascot.name}>
                <p>${mascot.name}</p>
                <img src=${mascot.image} alt=${mascot.name}>
            </label>
    
        `;
        cardsContainer.innerHTML += mascotsOption;

        hipodogeInput = document.getElementById('Hipodoge');
        capipepoInput = document.getElementById('Capipepo');
        ratigueyaInput = document.getElementById('Ratigueya');
        langostelvisInput = document.getElementById('Langostelvis');
        pydosInput = document.getElementById('Pydos');
        tucapalmaInput = document.getElementById('Tucapalma');
    });

    selectMascotButton.addEventListener('click', playerMascotSelect);
    // selectMascotButton.disabled = true;

    restartButton.addEventListener('click', restartGame);
    restartButton.style.display = 'none';

    joinTheGame();
};

const joinTheGame = () => {
    fetch('http://192.168.0.161:8080/join')
        .then(res => {
            if(res.ok) {
                res.text()
                    .then(function (response) {
                        console.log(response);
                        playerId = response;
                    });
            };
        });
};

const playerMascotSelect = () => {
    if (hipodogeInput.checked) {
        playerMascotSpan.innerHTML = hipodogeInput.id;
        playerMascot = hipodogeInput.id;
    } else if (capipepoInput.checked) {
        playerMascotSpan.innerHTML = capipepoInput.id;
        playerMascot = capipepoInput.id;
    } else if (ratigueyaInput.checked) {
        playerMascotSpan.innerHTML = ratigueyaInput.id;
        playerMascot = ratigueyaInput.id;
    } else if (langostelvisInput.checked) {
        playerMascotSpan.innerHTML = langostelvisInput.id;
        playerMascot = langostelvisInput.id;
    } else if (pydosInput.checked) {
        playerMascotSpan.innerHTML = pydosInput.id;
        playerMascot = pydosInput.id;
    } else if (tucapalmaInput.checked) {
        playerMascotSpan.innerHTML = tucapalmaInput.id;
        playerMascot = tucapalmaInput.id;
    } else {
        alert('select a mascot');
        return;
    };

    mascotSelectSection.style.display = 'none';


    selectMokepon(playerMascot);

    extracktAttacks(playerMascot);

    seeMapSection.style.display = 'flex';
    mapInit();
};

function selectMokepon(playerMascot) {
    fetch(`http://192.168.0.161:8080/mokepon/${playerId}`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: playerMascot
        })
    });
};

const enemyMascotSelect = enemy => {
    enemyMascotSpan.innerHTML = enemy.name;
    enemyMascotAttacks = enemy.attacks;
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
};

const showAttacks = attacks => {
    attacks.forEach((attack) => {
        mascotAttacks = `
        <button id=${attack.id} class="attack-button ab">${attack.symbol}</button>
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
            if (playerAttack.length === 5) {
                sendAttacks();
            }
        });
    });
};

const sendAttacks = () => {
    fetch(`http://192.168.0.161:8080/mokepon/${playerId}/attacks`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            attacks: playerAttack
        })
    });
    interval = setInterval(getAttacks, 50);
};

const getAttacks = () => {
    fetch(`http://192.168.0.161:8080/mokepon/${enemyId}/attacks`)
        .then(res => {
            if (res.ok) {
                res.json()
                    .then(({ attacks }) => {
                        if(attacks.length === 5) {
                            enemyAttack = attacks;
                            battle();
                        };
                    });
            };
        });
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
    clearInterval(interval);

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

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const paintCanvas = () => {
    playerMascotObject.x += playerMascotObject.xVelocity;
    playerMascotObject.y += playerMascotObject.yVelocity;
    canvasContext.clearRect(0, 0, map.width, map.height);
    canvasContext.drawImage(
        backgroundMap,
        0,
        0,
        map.width,
        map.height
    );
    playerMascotObject.paintMascot();
    sendPosition(playerMascotObject.x, playerMascotObject.y);
    
    enemyMokepons.forEach(mokepon => {
        if (mokepon != undefined) {
            mokepon.paintMascot();
            checkCollision(mokepon);
        }
    });

};

const sendPosition = (x, y) => {
    fetch(`http://192.168.0.161:8080/mokepon/${playerId}/position`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(res => {
        if (res.ok) {
            res.json()
                .then(({ enemies }) => {
                    enemyMokepons = enemies.map(enemy => {
                        if (enemy.mokepon != undefined) {
                            let enemyMokepon = null;
                            const mokeponName = enemy.mokepon.name || "";
                            if (mokeponName === 'Hipodoge') {
                                enemyMokepon = new Mascot('Hipodoge', './assets/miraculus.png', './assets/miraculus.png', enemy.id);
                            } else if (mokeponName === 'Capipepo') {
                                enemyMokepon = new Mascot('Capipepo', './assets/cat.png', './assets/cat.png', enemy.id);
                            } else if (mokeponName === 'Ratigueya') {
                                enemyMokepon = new Mascot('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', './assets/ratigueya.png', enemy.id);
                            }
                            enemyMokepon.x = enemy.x;
                            enemyMokepon.y = enemy.y;
                            return enemyMokepon;
                        };
                    });
                });
        };
    });
};

const moveUp = () => {
    playerMascotObject.yVelocity = -5;
};

const moveDown = () => {
    playerMascotObject.yVelocity = 5;
};

const moveRight = () => {
    playerMascotObject.xVelocity = 5;
};

const moveLeft = () => {
    playerMascotObject.xVelocity = -5;
};

const stopMotion = () => {
    playerMascotObject.xVelocity = 0;
    playerMascotObject.yVelocity = 0;
};

const keyPressed = e => {
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
            moveUp();
            break;
        case 'ArrowDown':
        case 's':
            moveDown();
            break;
        case 'ArrowLeft':
        case 'a':
            moveLeft();
            break;
        case 'ArrowRight':
        case 'd':
            moveRight();
            break;
        default:
            break;
    }
};

const mapInit = () => {
    playerMascotObject = getMascotObject();
    interval = setInterval(paintCanvas, 50);
    window.addEventListener('keydown', keyPressed);
    window.addEventListener('keyup', stopMotion);
};

const getMascotObject = () => {
    for (let mascot of mascots) {
        if(playerMascot === mascot.name) {
            return mascot;
        }
    }
};

const checkCollision = enemy => {
    const enemyTop = enemy.y;
    const enemyBottom = enemy.y + enemy.height;
    const enemyLeft = enemy.x;
    const enemyRight = enemy.x + enemy.width;

    const mascotTop = playerMascotObject.y;
    const mascotBottom = playerMascotObject.y + playerMascotObject.height;
    const mascotLeft = playerMascotObject.x;
    const mascotRight = playerMascotObject.x + playerMascotObject.width;

    if(
        mascotBottom < enemyTop ||
        mascotTop > enemyBottom ||
        mascotRight < enemyLeft ||
        mascotLeft > enemyRight
    ) {
        return;
    };

    stopMotion();
    clearInterval(interval);
    enemyId = enemy.id;
    attackSelectSection.style.display = 'flex';
    seeMapSection.style.display = 'none';
    enemyMascotSelect(enemy);
};

window.addEventListener('load', gameInit);