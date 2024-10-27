'use strict'

const btn =document.getElementById('omikuji');

btn.addEventListener('click',function() {
    const reslut = ['大吉','中吉','小吉','吉','凶','大凶',]
    const number = Math.floor(Math.random() * reslut.length);
    btn.textContent = reslut[number];
});

// btn.textContent = reslut[Math.floor(Math.random() * reslut.length)];

//Math.randam() * reslut.length
//Mathは大文字　小文字だと動かないので注意
// 0 ~ 0.99999999
// * 6
// 0 ~ 5.99999999
// 小数点をすべて切り捨てる
// 0 ~5