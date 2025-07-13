const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = parseInt(((window.innerWidth * window.innerHeight) / (1920 * 1080)) * 300);
console.log(numStars);

// Генерация звёзд с разными "глубинами"
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
    });
}

// Базовая скорость
let velocity = { x: -0.2, y: 0.2 };
let targetVelocity = { x: -0.2, y: 0.2 };

// Ускорение движения в заданную сторону
function accelerate(ax, ay) {
    targetVelocity.x = ax;
    targetVelocity.y = ay;
}

// Обновление положения звёзд с параллаксом
function updateStars() {
    for (const star of stars) {
        star.x += velocity.x * star.r;
        star.y += velocity.y * star.r;

        // Зацикливание
        if (star.x > canvas.width) star.x = 0;
        if (star.x < 0) star.x = canvas.width;
        if (star.y > canvas.height) star.y = 0;
        if (star.y < 0) star.y = canvas.height;
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
    }
}

function smoothVelocityUpdate() {
    const smoothing = 0.025; // чем меньше — тем медленнее смена направления
    velocity.x += (targetVelocity.x - velocity.x) * smoothing;
    velocity.y += (targetVelocity.y - velocity.y) * smoothing;
}

function animate() {
    smoothVelocityUpdate();
    updateStars();
    drawStars();
    requestAnimationFrame(animate);
}

animate();

// Пример: ускорять движение в случайную сторону при клике

function move(velX = 0, velY = 0, time = 1) {
    accelerate(velX, velY)
    setTimeout(() => {
        targetVelocity = { x: -0.2, y: 0.2 }
    }, time * 1000);
}





move(-2, -10, 1)
document.querySelector("main").style.transform = "translate(0,0)"


document.querySelector("#gallery").onclick = () => {
    move(-10, .2, 1)
    document.querySelector("main").style.transform = `translate(-${window.innerWidth * 2}px,0)`
    document.querySelector(".gallery").style.transform = `translate(0,0)`
}
document.querySelector("#gallery-back").onclick = () => {
    move(10, .2, 1)
    document.querySelector("main").style.transform = `translate(0,0)`
    document.querySelector(".gallery").style.transform = `translate(300%,0)`
}


document.querySelectorAll(".gallery__wrapper img").forEach(img => {
    img.onclick = () => {
        document.querySelector(".overlay").style = `pointer-events: all; opacity: 1;`
        document.querySelector(".overlay-img").style = `transform: scale(1)`
        document.querySelector(".overlay-img").src = img.src
    }
});
document.querySelector("#overlay-close").onclick = () => {
    document.querySelector(".overlay").style = `pointer-events: none; opacity: 0;`
    document.querySelector(".overlay-img").style = `transform: scale(0)`
}


document.querySelector("#letter").onclick = () => {
    move(-.2, -10, 1)
    document.querySelector("main").style.transform = `translate(0,-${window.innerHeight * 2}px)`
    document.querySelector(".letter").style.transform = `translate(0,0)`
}
document.querySelector("#letter-back").onclick = () => {
    move(-.2, 10, 1)
    document.querySelector("main").style.transform = `translate(0,0)`
    document.querySelector(".letter").style.transform = `translate(0,300%)`
}


document.querySelector("#hug").onclick = () => {
    move(10, .2, 1)
    document.querySelector("main").style.transform = `translate(${window.innerWidth * 2}px,0)`
    document.querySelector(".hug").style.transform = `translate(0,0)`
}
document.querySelector("#hug-back").onclick = () => {
    move(-10, .2, 1)
    document.querySelector("main").style.transform = `translate(0,0)`
    document.querySelector(".hug").style.transform = `translate(-300%,0)`
    document.querySelector(".hug-circle").style = `border-radius: 100%;
    transform: scale(1);
    `
    document.querySelector(".hug-text").style = `opacity:0;`
}

document.querySelector(".hug-circle").onclick = () => {
    document.querySelector(".hug-circle").style = `border-radius: 5px;
    transform: scale(${window.innerWidth/80*1.2},${window.innerHeight/80*1.2});
    `
    document.querySelector(".hug-text").style = `opacity:1;`
}



// Адаптация к размеру окна
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});