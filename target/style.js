const container = document.querySelector(".container");
const bloodSpot = document.querySelector(".bloodSpot");
const startBtn = document.querySelector(".startBtn");
const cursor = document.querySelector(".cursor");
const enemy = document.getElementById("enemy");
const enemySize = parseInt(window.getComputedStyle(enemy).getPropertyValue("height"));
const contHeight = container.offsetHeight;
const contWidth = container.offsetWidth;

let score = 0;
const winScore = 10;
let displayTimer = document.getElementById("timer");
let timer = 20;

function showTimer() {
    timer--;
    displayTimer.innerText = `残り時間： ${timer}`;
    if (timer === 0){
        alert("ゲームオーバー");
        location.reload();
    }
}
window.addEventListener("mousemove", (e) => {
    cursor.style.top = e.pageY + "px";
    cursor.style.left = e.pageX + "px";
});

window.addEventListener("click", (e) => {
    bloodSpot.style.top = e.pageY + "px";
    bloodSpot.style.left = e.pageX + "px";

    if (e.target === enemy) score++;
    startBtn.innerText = "SCORE: " + score;
    if (score === winScore) {
        alert("ゲームクリア");
        location.reload();
    }
});

startBtn.addEventListener("click", () => {
    startBtn.disabled = "true";
    enemy.style.display = "block";

    startBtn.innerText = "SCORE: " + score;
    setInterval(showTimer, 1000);
});

setInterval(() => {
    const randTop = Math.random() * (contHeight - enemySize);
    const randLeft = Math.random() * (contWidth - enemySize);
    enemy.style.top = randTop + "px";
    enemy.style.left = randLeft + "px";
}, 600);