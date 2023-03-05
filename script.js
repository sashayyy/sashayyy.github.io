let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const background = new Image();
background.src = "img/background.png";

function drawBackground() {
    ctx.drawImage(background, 0, 0, 500, 500);
}

let chuchelX = 235;
let chuchelY = 423;

let chDX = 3;

let setIntDraw = 5;
let setIntAddFood = 1300;

let score = 0;
let lives = 3;
let bestScore = 0;

let leftPressed = false;
let rightPressed = false;

let chuchelRight1 = new Image();  
chuchelRight1.src = "img/chuchel_right_1.png";

let chuchelRight2 = new Image(); 
chuchelRight2.src = "img/chuchel_right_2.png";

let chuchelLeft1 = new Image();
chuchelLeft1.src = "img/chuchel_left_1.png";

let chuchelLeft2 = new Image();
chuchelLeft2.src = "img/chuchel_left_2.png";

let dirRight = [];
dirRight.push(chuchelRight1);
dirRight.push(chuchelRight2);

let dirLeft = [];
dirRight.push(chuchelLeft1);
dirRight.push(chuchelLeft2);

let diraction = 0;
let cadr = 0;
let cadrTimeout;

let dir = [[chuchelLeft1, chuchelLeft2], [chuchelRight1, chuchelRight2]];

function drawChuchel() {
    ctx.drawImage(dir[diraction][cadr], chuchelX, chuchelY, 50, 68);
}

let heart = new Image();
heart.src = "img/life.png";

let burger = new Image();
burger.src = "img/burgerkinggovno.png";

let dinamit = new Image();
dinamit.src = "img/dinamit.png";

let beer = new Image();
beer.src = "img/beer.png";

let muhomor = new Image();
muhomor.src = "img/muhomor.png";

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = true;
    }
}
  
function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = false;
    }
}

let dy = 1;

class Burger {
    constructor(burgerX) {
        this.x = burgerX;
        this.y = 0;
        this.width = 32;
        this.height = 25;
    }

    draw() {
        ctx.drawImage(burger, this.x, this.y, this.width, this.height);
    }

    down() {
        this.y += dy;
    }
}

class Pivo {
    constructor(pivoX) {
        this.x = pivoX;
        this.y = 0;
        this.width = 30;
        this.height = 33;
    }

    draw() {
        ctx.drawImage(beer, this.x, this.y, this.width, this.height);
    }

    down() {
        this.y += dy;
    }
}

class Burn {
    constructor(burnX) {
        this.x = burnX;
        this.y = 0;
        this.width = 25;
        this.height = 45;
    }

    draw() {
        ctx.drawImage(dinamit, this.x, this.y, this.width, this.height);
    }

    down() {
        this.y += dy;
    }
}

class Heart {
    constructor(X) {
        this.x = X;
        this.y = 0;
        this.width = 30;
        this.height = 24;
    }

    draw() {
        ctx.drawImage(heart, this.x, this.y, this.width, this.height);
    }

    down() {
        this.y += dy;
    }
}

class Muhomor {
    constructor(X) {
        this.x = X;
        this.y = 0;
        this.width = 28;
        this.height = 26;
    }

    draw() {
        ctx.drawImage(muhomor, this.x, this.y, this.width, this.height);
    }

    down() {
        this.y += dy;
    }
}

let food = [];

function addFood() {
    let rand = Math.random();
    if (rand < 0.1) {
        newFood = new Pivo(Math.floor(Math.random() * 470));
    } else if (rand < 0.2) {
        newFood = new Burn(Math.floor(Math.random() * 475));
    } else if (rand < 0.3 ) {
        newFood = new Muhomor(Math.floor(Math.random() * 472));
    } else if (rand < 0.4 && lives < 3) {
        newFood = new Heart(Math.floor(Math.random() * 470));
    }
    else {
        newFood = new Burger(Math.floor(Math.random() * 468));
    }
    food.push(newFood);
}

function restoreChDX() {
    chDX = 3;
}

function restoreBackground() {
    canvas.classList.remove('disco');
    isDisco = false;
}

let isDisco = false;
function drawDisco() {
    if(isDisco) {
        let color = Math.random();

        if (color < 0.2) {
            ctx.beginPath();
            ctx.rect(0, 0, 500, 480);
            ctx.fillStyle = "rgba(255, 94, 35, 0.2)";
            ctx.fill();
            ctx.closePath();
        } else if (color < 0.4) {
            ctx.beginPath();
            ctx.rect(0, 0, 500, 480);
            ctx.fillStyle = "rgba(102, 250, 3, 0.2)";
            ctx.fill();
            ctx.closePath();
        } else if (color < 0.6) {
            ctx.beginPath();
            ctx.rect(0, 0, 500, 480);
            ctx.fillStyle = "rgba(3, 85, 250, 0.2)";
            ctx.fill();
            ctx.closePath();
        } else if (color < 0.8) {
            ctx.beginPath();
            ctx.rect(0, 0, 500, 480);
            ctx.fillStyle = "rgba(252, 24, 43, 0.2)";
            ctx.fill();
            ctx.closePath();
        } else {
            ctx.beginPath();
            ctx.rect(0, 0, 500, 480);
            ctx.fillStyle = "rgba(252, 241, 24, 0.2)";
            ctx.fill();
            ctx.closePath();
        }
    }
    
}

function drawFood() {
    food.forEach((elem) => {
        elem.draw();
        elem.down();
        if (elem.y > chuchelY && elem.y < 480 && Math.abs(elem.x + elem.width - chuchelX - 25) / 2 < 25) {
            if (elem instanceof Pivo) {
                chDX -= 2;
                setTimeout(() => {
                    chDX += 2;
                }, 6000);
            } else if (elem instanceof Burn) {
                chDX += 2;
                setTimeout(() => {
                    chDX -= 2;
                }, 6000);
            } else if (elem instanceof Heart && lives < 3) {
                ++lives;
            } else if (elem instanceof Muhomor) {
                canvas.classList.add('disco');
                isDisco = true;
                chDX += 2;
                setTimeout(() => { 
                    restoreBackground();
                    chDX -= 2;
                }, 6000);
            }
            ++score;
            food.shift();
            ++count;
        } else if (elem.y >= 480 && elem instanceof Burger) {
            lives -= 1;
            food.shift();
        } 
    });
}


function drawLives() {
    for (let i = 0; i < lives; ++i) {
        ctx.drawImage(heart, 10 + i * 40, 10, 30, 30);
    }
}

function drawScore() {
    ctx.beginPath();
    ctx.font = "40px VT323";
    ctx.fillStyle = "#fbd6fd";
    ctx.fillText(`Score: ${score}`, 350, 35);
    ctx.closePath();
}

let level = 0;
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, 500, 500);
    drawDisco();
    drawChuchel();
    drawFood();
    drawLives();
    drawScore();

    if (!lives) {
        endGame();
    }

    if (rightPressed) {
        chuchelX = Math.min(chuchelX + chDX, canvas.width - 50);
        diraction = 1;
    } else if (leftPressed) {
        chuchelX = Math.max(chuchelX - chDX, 0);
        diraction = 0;
    }

}

let drawing;
let addingFood;
let starterPage;

function startPage() {
    drawBackground();
    drawChuchel();
    drawLives();
    drawScore();
    
}

starterPage = setInterval(startPage, 10);

cadrTimeout = setInterval(() => {
    cadr = (cadr + 1) % 2; 
}, 200);

function startGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lives = 3;
    food.lenth = 0;
    clearInterval(starterPage);
    clearInterval(drawing);
    clearInterval(addingFood);
    setIntAddFood = 1500;
    setIntDraw = 10;
    food.length = 0;
    count = 0;
    score = 0;
    level = 0;
    drawing = setInterval(draw, setIntDraw);
    addingFood = setInterval(addFood, setIntAddFood);
}

const startBtn = document.querySelector(".startButton");

startBtn.addEventListener('click', startGame);

function drawEndGame() {
    ctx.font = "60px VT323";
    ctx.fillStyle = "#fbd6fd";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!!!", 250, 180);
    ctx.font = "35px VT323";
    ctx.textAlign = "center"
    ctx.fillText(`Your score: ${score}`, 250, 250);
    ctx.textAlign = "center";
    ctx.font = "25px VT323";
    ctx.fillText(`Best score: ${bestScore}`, 250, 300);
}

function endGame() {
    if (bestScore < score) {
        bestScore = score;
    }
    lives = 3;
    food.lenth = 0;
    clearInterval(drawing);
    clearInterval(addingFood);
    setIntAddFood = 1300;
    setIntDraw = 5;
    food = [];
    count = 0;
    level = 0;
    chDX = 3;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawChuchel();
    drawEndGame();
    score = 0;    
}











