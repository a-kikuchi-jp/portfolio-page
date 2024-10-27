let tiles = document.getElementsByClassName("tile");
let timer = document.getElementById("timer");
let containers = document.getElementsByClassName("container");
let time = 300;
let clear_flag;

function init() {
  for (let index =0; index < tiles.length; index++) {
    tiles[index].addEventListener("click", function (e) {
      let i = Number(e.target.id);
      click_tile(i);
      complete()
    });
  }
}

function click_tile(i) {
  if (i - 3 >= 0 && tiles[i - 3].dataset.index == 0) { //上と比較（0,1,2の否定）
    swap(i, i - 3);
  } 
  else if (i + 3 < 9 && tiles[i + 3].dataset.index == 0) { //下と比較（6,7,8の否定）
    swap(i, i + 3);
  }
  else if (i % 3 != 0 && tiles[i - 1].dataset.index == 0) { //左と比較（0,3,6の否定）
    swap(i, i - 1);
  }
  else if (i % 3 != 2 && tiles[i + 1].dataset.index == 0) { //右と比較（2,5,8の否定）
    swap(i, i + 1);
  }
}

function swap(i,j) {
  [tiles[i].dataset.index, tiles[j].dataset.index]
  = [tiles[j].dataset.index, tiles[i].dataset.index];
}

function shuffle(arr) {
  let i = 0
  while (30 + i) {
    let j = Math.floor(Math.random() * arr.length);
    click_tile(j);
    i -= 1;
  }
}

function count_down() {
  let count = setInterval(() => {
    time -= 1
    timer.textContent = time;
    if (time <= 0) {
      clearInterval(count)
      timer.textContent = "ゲームオーバー";
    }
    if (clear_flag && time > 0) {
      clearInterval(count)
      timer.textContent = "ゲームクリア";
    }
  }, 1000)
}

function complete() {
  let result = [];
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].dataset.index == tiles[i].id) {
      result.push(true);
    } else {
      result = [];
    }
  }
  if (result.length == 9) {
    clear_flag = true;
    setTimeout(() => {
      for (let i = 0; i < containers.length; i++) {
        containers[i].style.backgroundColor = "pink";      
      }
    }, 200);
  }
}
init();
shuffle(tiles);
count_down();
