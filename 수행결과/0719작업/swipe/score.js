// 점수 출력할 span 객체
let scoreDisplay = document.querySelector("#score");

// 점수.
let score = 0;

// 점수 더하는 함수.
function addScore(value) {
    score += value;
}

// 점수 출력 함수.
function printScore() {
    scoreDisplay.innerText = score;
}
