let user = document.getElementById("user");
let comp = document.getElementById("comp");
let ball = document.getElementById("ball");
let user_score = document.getElementById("user-score");
let comp_score = document.getElementById("comp-score");
let game_setting;
let complevel = 0.15;
const TABLE_HEIGHT = 544; //テーブルの高さ
const TABLE_WEIGHT = 1088;
const IMG_SIZE = 80;
const BALL_SIZE = 20;
const WINNER_SCORE = 3;
comp.style.marginLeft = `${TABLE_WEIGHT - IMG_SIZE}px`;
ball.style.marginLeft = `${TABLE_WEIGHT/2-BALL_SIZE/2}px`;
ball.style.marginTop = `${TABLE_HEIGHT/2-BALL_SIZE/2}px`;

let keys = { ArrowUp: false, ArrowDown: false};

document.addEventListener("keydown", keyDown);
function keyDown(e) {
    keys[e.key] = true;
}
document.addEventListener("keyup", keyup);
function keyup(e) {
    keys[e.key] = false;
}

let Vx = -1;
let Vy = -1;
let V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2));

gameLoop();

function reset() {
    clearInterval(game_setting)
    Vx = -1;
    Vy = -1;
    let V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2));
    comp.style.marginLeft = `${TABLE_WEIGHT - IMG_SIZE}px`;
    ball.style.marginLeft = `${TABLE_WEIGHT/2-BALL_SIZE/2}px`;
    ball.style.marginTop = `${TABLE_HEIGHT/2-BALL_SIZE/2}px`;
    gameLoop();
}

function gameLoop() {
    setTimeout(() => {
        game_setting = setInterval(() => {
            if (marginLeft(ball) < 0) {
                comp_score.innerHTML = Number(comp_score.innerHTML) +1;
                return reset();
            }
            if (marginLeft(ball) + BALL_SIZE > TABLE_WEIGHT){
                user_score.innerHTML = Number(user_score.innerHTML) +1;
                return reset();
            }
            if (Number(comp_score.innerHTML) == WINNER_SCORE) {
                alert("YOU LOSE");
                comp_score.innerHTML = 0;
                user_score.innerHTML = 0;
                return reset();
            }   else if (Number(user_score.innerHTML) == WINNER_SCORE) {
                alert("YOU WIN")
                comp_score.innerHTML = 0;
                user_score.innerHTML = 0;
                return reset();

            }

            if (marginTop(ball) < 0 || (marginTop(ball) + BALL_SIZE) > TABLE_HEIGHT){
                Vy = -Vy
            }

            let chara = (marginLeft(ball) + BALL_SIZE/2 < TABLE_WEIGHT/2) ? user : comp
            if (collisionDetected(chara)) {
                let angle;
                let type = (marginLeft(chara) == 0) ? "user" : "comp";
                    if (ball.centerY < chara.centerY){
                    angle = (type == "user" ? -Math.PI/4 : (-3 * Math.PI)/4)

                    } else if (ball.centerY > chara.centerY){
                        angle = (type == "user" ? Math.PI/4 : (3 * Math.PI)/4)

                    } else if (ball.centerY == chara.centerY){
                        angle = (type == "user" ? 0 : Math.PI)    
                }
                V += 0.5
                Vx = V * Math.cos(angle);
                Vy = V * Math.sin(angle);
            }
            
            comp.style.marginTop = `${marginTop(comp) + ((ball.centerY-(marginTop(comp) + IMG_SIZE/2))) * complevel}px`
            ball.style.marginLeft = `${marginLeft(ball) + Vx}px`;
            ball.style.marginTop = `${marginTop(ball) + Vy}px`;

            if (keys.ArrowUp && marginTop(user) > 0) {
                user.style.marginTop = `${marginTop(user) - 2}px`;
            } else if (keys.ArrowDown && marginTop(user) < TABLE_HEIGHT - IMG_SIZE) {
                user.style.marginTop = `${marginTop(user) + 2}px`;
            }

            if (marginTop(comp) < 0) {
                comp.style.marginTop = `0px` ;
            } else if (marginTop(comp) > TABLE_HEIGHT - IMG_SIZE) {
                comp.style.marginTop = `${TABLE_HEIGHT - IMG_SIZE}px`;
            }

        }, 5)
    }, 500)
}

function marginTop(elem) {
    return Number(elem.style.marginTop.split("p") [0])
}
function marginLeft(elem) {
    return Number(elem.style.marginLeft.split("p") [0])
}
function collisionDetected(chara) {
    ball.top = marginTop(ball);
    ball.bottom = marginTop(ball) + BALL_SIZE;
    ball.left = marginLeft(ball);
    ball.right = marginLeft(ball) + BALL_SIZE;
    ball.centerX = marginLeft(ball) + BALL_SIZE/2;
    ball.centerY = marginTop(ball) + BALL_SIZE/2;

    chara.top = marginTop(chara);
    chara.bottom = marginTop(chara) + IMG_SIZE;
    chara.left = marginLeft(chara);
    chara.right = marginLeft(chara) + IMG_SIZE;
    chara.centerX = marginLeft(chara) + IMG_SIZE/2;
    chara.centerY = marginTop(chara) + IMG_SIZE/2;

    let type = (marginLeft(chara) == 0) ? "user" : "comp";
    let boolean = false;
    if (type == "user" && Vx < 0) {
        boolean = true;
    } else if (type == "comp" && Vx > 0) {
        boolean = true;
    }

    return ball.left < chara.right && ball.top < chara.bottom && ball.right > chara.left && ball.bottom > chara.top && boolean
}