// ゲームの設定
const words = [
    "apple", "banana", "cherry", "date", "elephant", "giraffe", "hippopotamus", "kiwi", "lemon", "mango",
    "orange", "pear", "pineapple", "strawberry", "watermelon", "zebra"
];

let currentWord = "";
let score = 0;
let timer = 0;
let gameInterval;
let timerInterval;
let gameStarted = false;

// DOM要素
const wordDisplay = document.getElementById('word-display');
const inputField = document.getElementById('input-field');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-btn');

// ゲームスタート
startButton.addEventListener('click', startGame);

// ゲームのスタート処理
function startGame() {
    if (gameStarted) return; // すでにゲームが開始されている場合は無効

    gameStarted = true;
    score = 0;
    timer = 0;
    inputField.value = '';
    scoreDisplay.textContent = `スコア: ${score}`;
    timerDisplay.textContent = `タイマー: 0秒`;

    startButton.disabled = true;
    inputField.disabled = false;
    inputField.focus();

    generateWord();
    startTimer();
    startGameLoop();
}

// ゲームのタイマー
function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = `タイマー: ${timer}秒`;
    }, 1000);
}

// 単語の生成
function generateWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];
    wordDisplay.textContent = currentWord;
}

// ゲームループ
function startGameLoop() {
    inputField.addEventListener('input', handleInput);
}

// 入力の検証
function handleInput() {
    if (inputField.value === currentWord) {
        score++;
        scoreDisplay.textContent = `スコア: ${score}`;
        inputField.value = ''; // 入力フィールドをクリア
        generateWord();
    }
}

// ゲームの終了
function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    inputField.disabled = true;
    startButton.disabled = false;
    gameStarted = false;
    alert(`ゲーム終了！最終スコア: ${score}`);
}

// タイマーでゲームを終了させる
function startGameLoop() {
    gameInterval = setInterval(() => {
        if (timer >= 30) { // 30秒経過でゲーム終了
            endGame();
        }
    }, 1000);
}
