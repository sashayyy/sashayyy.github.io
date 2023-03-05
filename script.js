const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const boom = document.getElementById("boom");
const button = document.getElementById("button");
let balls = [];
const ballRadius = 10;

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dx = 2;
        this.dy = 2;
    }

    drawBall() {
        const colorR = Math.floor(Math.random() * 176) + 80;
        const colorG = Math.floor(Math.random() * 176) + 80;
        const colorB = Math.floor(Math.random() * 176) + 80;

        ctx.beginPath();
        ctx.arc(this.x, this.y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "rgb(" + String(colorR) + "," + String(colorG) + "," + String(colorB) + ")";
        ctx.fill();
        ctx.closePath();
    }
}

function draw(ball) {
    ball.drawBall();

    if (ball.x - ballRadius + ball.dx < 0 | ball.x + ball.dx > canvas.width - ballRadius) {
        ball.dx = -ball.dx;
        canvas.classList.add("boom");
        setTimeout(() => {
            canvas.classList.remove("boom");
        }, 100);
    }
    if (ball.y + ball.dy - ballRadius < 0 | ball.y + ball.dy > canvas.height - ballRadius) {
        ball.dy = -ball.dy;
        canvas.classList.add("boom");
        setTimeout(() => {
            canvas.classList.remove("boom");
        }, 100);
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
}

function drawBalls() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach( (item) => {
        draw(item);
    });
}

function addNewBall() {
    let leftVsUp = Math.random();
    if (leftVsUp > 0.5) {
        let x = Math.random() * (canvas.width - 20) + 10;
        balls.push(new Ball(x, 10));
    } else {
        let y = Math.random() * (canvas.height - 20) + 10;
        balls.push(new Ball(10, y));
    }
}

const btn = document.querySelector('.button');
btn.addEventListener('click', addNewBall);

//setInterval(addNewBall, 400);
setInterval(drawBalls, 15);

