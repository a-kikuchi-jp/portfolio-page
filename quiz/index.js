const quiz = [
    {
        question: '海物語シリーズのヒロイン、マリンちゃんの妹の名は？',
        answers: [
            'ワリンちゃん',
            'ウリンちゃん',
            'パインちゃん',
            'フワちゃん'
        ],
        correct: 'ウリンちゃん'
    } , {
        question: '必殺仕事人シリーズはどこのメーカー？',
        answers: [
            'SANKYO',
            'サンセイR&D',
            '京楽',
            '平和'
        ],
        correct: '京楽'
    } , {
        question: '北斗の拳シリーズはどこのメーカー？',
        answers: [
               'サミー',
               '三洋',
               'ニューギン',
               'Daiichi'
        ],
        correct: 'サミー'
    } , {
        question: '京楽の激アツ柄と言えば？',
        answers: [
               '虎柄',
               'ピンク豹柄',
               'ゼブラ柄',
               'キリン柄'
        ],
        correct: 'ゼブラ柄'
    }, {
        question: '花の慶次の主人公、前田慶次の愛馬の名は？',
        answers: [
               '黒王',
               '赤兎',
               '松風',
               '汗血'
        ],
        correct: '松風'
    }, {
        question: 'エヴァンゲリオンシリーズで登場すると大当たり濃厚となるキャラは？',
        answers: [
               '加地',
               'ゲンドウ',
               '冬月',
               'カヲル'
        ],
        correct: 'カヲル'
    }, {
        question: '「牙狼」これ何て読む？',
        answers: [
               'キバ',
               'ガロ',
               'ゼロ',
               'ガルム'
        ],
        correct: 'ガロ'
    }, {
        question: '2024年現在、最も店舗数の多いチェーン店はどこ？',
        answers: [
               'ダイナム',
               'マルハン',
               'ガイア',
               'ニラク'
        ],
        correct: 'ダイナム'
    }, {
        question: 'パチンコ玉の直径は？',
        answers: [
               '11mm',
               '11.5mm',
               '12mm',
               '12.5mm'
        ],
        correct: '11mm'
    }, {
        question: '私が20年前に入社試験を受けた企業は次のうちどれ？',
        answers: [
               '仙台観光',
               '扇屋商事',
               'ケイセングループ',
               '株式会社百反'
        ],
        correct: '扇屋商事'
    }
];
const quizLength = quiz.length;
let quizIndex = 0;
let score = 0;

const $button = document.getElementsByTagName('button');
const buttonLength = $button.length;

//クイズの問題文、選択肢を定義
const setupQuiz = () => {
    document.getElementById('js-question').textContent = quiz[quizIndex].question;
    let buttonIndex = 0;
    while(buttonIndex < buttonLength){
        $button[buttonIndex].textContent = quiz[quizIndex].answers[buttonIndex];
        buttonIndex++;
    }
}
setupQuiz();

const clickHandler = (e) => {
    if(quiz[quizIndex].correct === e.target.textContent){
        window.alert('正解！');
        score++;
    } else {
        window.alert('不正解！');
    }

    quizIndex++;

    if(quizIndex < quizLength){
        //問題文があればこちらを実行
        setupQuiz();
    } else if(score === 10){
        //問題文がもう無ければこちらを実行
        window.alert('終了！あなたの正解数は' + score + '/' + quizLength + 'です！ もう何も言う事はありません 共に修羅の道を歩みましょう');
    } else if(score < 10 && 6 < score){
        //問題文がもう無ければこちらを実行
        window.alert('終了！あなたの正解数は' + score + '/' + quizLength + 'です！ ギャンブル依存の傾向が見えますね 少し心配です');
    } else if(score < 7  && 3 < score){
         //問題文がもう無ければこちらを実行
        window.alert('終了！あなたの正解数は' + score + '/' + quizLength + 'です！ 普通ですね 特に言う事はないです');
    } else{
         //問題文がもう無ければこちらを実行
        window.alert('終了！あなたの正解数は' + score + '/' + quizLength + 'です！ もう少し遊びを覚えた方がいいかもしれないですね');
    }

};
//ボタンを押したら正誤判定
let handlerIndex = 0;
while (handlerIndex < buttonLength) {
    $button [handlerIndex].addEventListener('click', (e) => {
        clickHandler(e);
    });
    handlerIndex++;
}