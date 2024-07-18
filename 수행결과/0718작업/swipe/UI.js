// let isBallReleased = false; // 발사 상태 변수
// let isGameRunning = false; // 게임 실행 상태 변수

// // ESC 키 이벤트 등록
// document.addEventListener("keydown", function(e) {
//     if (e.key === "Escape") {
//         if (gamePaused) {
//             resumeGame();
//         } else {
//             pauseGame();
//         }
//     }
// });

// //일시정지 함수
// function pauseGame() {
//     gamePaused = true;
//     $('#pauseModal').modal('show');
// }

// //게임 재개 함수
// function resumeGame() {
//     gamePaused = false;
//     draw();
// }

// //홈화면으로 돌아가기 함수
// function goHome() {
//     window.location.href = "title.html"; // 홈화면으로 돌아가는 경로 설정
// }

// document.addEventListener('DOMContentLoaded', (event) => {
//     const startButton = document.getElementById('start');
//     const stopButton = document.getElementById('stop');
//     const resumeButton = document.getElementById('resumeButton');
//     const homeButton = document.getElementById('homeButton');
//     const settingsButton = document.getElementById('settingsButton');

//     startButton.addEventListener('click', function() {
//         if (gamePaused) {
//             resumeGame();
//         } else {
//             isBallReleased = true;
//             draw();
//         }
//     });

//     stopButton.addEventListener('click', function() {
//         document.location.reload();
//     });

//     resumeButton.addEventListener('click', function() {
//         resumeGame();
//     });

//     homeButton.addEventListener('click', function() {
//         goHome();
//     });

//     settingsButton.addEventListener('click', function() {
//         // 설정 버튼 클릭 시 이벤트 처리 추가
//         alert("설정 화면은 구현되지 않았습니다.");
//     });
// });