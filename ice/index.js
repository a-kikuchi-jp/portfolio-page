let reset = document.getElementById('reset');
let message = document.getElementById('message');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const blockSize = 60;
const blockCount = 10;

canvas.width = blockSize * blockCount;
canvas.height = blockSize * blockCount;

let human = new Object();
human.img = new Image();
human.img.src = 'images/330733.png';
human.cx = 0;
human.cy = 0;
human.x = 0;
human.y = 0;
human.move = 0;

let goal = new Object();
goal.cx = 0;
goal.cy = 0;
goal.point = 0;
const GOAL_X = 5;
const GOAL_Y = 5;

let key = new Object();
key.up = false;
key.down = false;
key.right = false;
key.left = false;
key.push = '';

window.addEventListener("keydown", keydown);
function keydown(e) {
    let key_code = e.keyCode;
    if (key_code === 37) key.left = true;
    if (key_code === 38) key.up = true;
    if (key_code === 39) key.right = true;
    if (key_code === 40) key.down = true;
    goal.point = 0;
    e.preventDefault();
}

window.addEventListener("keyup", keyup);
function keyup(e) {
    let key_code = e.keyCode;
    if (key_code === 37) key.left = false;
    if (key_code === 38) key.up = false;
    if (key_code === 39) key.right = false;
    if (key_code === 40) key.down = false;
}

let map = [];
for (let i = 0; i < blockCount; i++) {
    map.push("0".repeat(blockCount));
}

makeMap();

window.addEventListener('load',main);
function main() {
    ctx.fillStyle = "powderblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < blockCount; y++) {
        for (let x = 0; x < blockCount; x++) {
            if (map[y][x] == 1) {
                ctx.fillStyle = "black";
                ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
            }
            if (map[y][x] == 2) {
                image = new Image();
                image.src = "images/25634233.png";
                ctx.drawImage(image, x * blockSize, y * blockSize, blockSize, blockSize);
            }
        }
    }

    if (human.move === 0) {
        let dx = 0, dy = 0;
        if (key.left === true) {
            dx = -1;
            key.push = 'left';
            key.left = false;
        } else if (key.up === true) {
            dy = -1;
            key.push = 'up';
            key.up = false;
        } else if (key.right === true) {
            dx = 1;
            key.push = 'right';
            key.right = false;
        } else if (key.down === true) {
            dy = 1;
            key.push = 'down';
            key.down = false;
        }
        if (dx != 0 || dy != 0) {
            human.cx += dx;
            human.cy += dy;
            human.move = blockSize;

            let n = map[human.cy][human.cx];
            if (n == 2) {
                message.innerHTML = '任務完了';
                goal.point = 1;
                human.img.src = 'images/25594012.png';
            } else if (n != 0) {
                human.cx -= dx;
                human.cy -= dy;
                human.move = 0;
                key.push ="";
            }
        }
    }
    if (human.move > 0) {
        let nowMove = 4;
        if (human.move < 4) {
            nowMove = human.move;
        }
        human.move -= nowMove;

        if (key.push === 'left') human.x -= nowMove;
        if (key.push === 'up') human.y -= nowMove;
        if (key.push === 'right') human.x += nowMove;
        if (key.push === 'down') human.y += nowMove;

        if (human.move == 0 && goal.point == 0) {
            let px = human.cx;
            let py = human.cy;
            if (key.push === 'left') {
                px--;
            } else if (key.push === 'up') {
                py--;
            } else if (key.push === 'right') {
                px++;
            } else if (key.push === 'down') {
                py++;
            }
            if (px != human.cx || py != human.cy) {
                if (map[py][px] == 0) {
                    human.cx = px;
                    human.cy = py;
                    human.move = blockSize;
                }
            }
        }
    }
    ctx.drawImage (human.img, human.x, human.y, blockSize, blockSize);

    requestAnimationFrame(main);
}

function makeMap() {
    for (let i = 0; i < blockCount; i++) {
        if (i == 0 || i == blockCount - 1) {
            map[i] = "1".repeat(blockCount);
        } else {
            map[i] = "1" + "0".repeat(blockCount - 2) + "1";

        }
    }

    human.cx = 1;
    human.x = human.cx * blockSize;
    human.cy = 1;
    human.y = human.cy * blockSize;

    map[1] = replaceValue(map[1], 4, 1);
    map[4] = replaceValue(map[4], 4, 1);
    map[3] = replaceValue(map[3], 6, 1);
    map[7] = replaceValue(map[8], 7, 1);
    map[8] = replaceValue(map[8], 3, 1);

    goal.cx = GOAL_X;
    goal.cy = GOAL_Y;
    map[goal.cy] = replaceValue(map[goal.cy], goal.cx, 2);
}

function replaceValue(mapstr, pos, value) {
    let m = mapstr.substr(0, pos) + value + mapstr.substr(pos + 1);
    return m;
}

reset.addEventListener("click", restart);
function restart() {
    if (human.move === 0) {
        human.cx = 1;
        human.cy = 1;
        human.x = blockSize;
        human.y = blockSize;
        message.innerHTML = "";
        makeMap();
        human.img.src = 'images/330733.png';
    }
}