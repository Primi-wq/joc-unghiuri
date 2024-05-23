const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Poziția bărcii și a țintei
let boat = { x: 400, y: 550, angle: 0 };
let target = { x: Math.random() * 700 + 50, y: Math.random() * 400 + 50 };

function drawBoat() {
    ctx.save();
    ctx.translate(boat.x, boat.y);
    ctx.rotate((boat.angle * Math.PI) / 180);
    ctx.fillStyle = 'blue';
    ctx.fillRect(-25, -50, 50, 100);
    ctx.restore();
}

function drawTarget() {
    ctx.beginPath();
    ctx.arc(target.x, target.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoat();
    drawTarget();
}

function shoot() {
    const angleInput = document.getElementById('angle').value;
    boat.angle = parseFloat(angleInput);
    const radians = (boat.angle * Math.PI) / 180;
    const dx = Math.cos(radians) * 500;
    const dy = Math.sin(radians) * 500;

    boat.x += dx;
    boat.y -= dy;

    if (Math.hypot(boat.x - target.x, boat.y - target.y) < 20) {
        alert('Ai nimerit barca!');
        resetGame();
    } else {
        alert('Mai încearcă!');
        boat.x = 400;
        boat.y = 550;
    }

    draw();
}

function resetGame() {
    boat.x = 400;
    boat.y = 550;
    boat.angle = 0;
    target.x = Math.random() * 700 + 50;
    target.y = Math.random() * 400 + 50;
    draw();
}

draw();
