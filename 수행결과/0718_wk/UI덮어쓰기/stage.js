/*-------------------------------------------------stage---------------------------------------- */
// 현재 스테이지 변수
let currentStage = 1;

// 게임판
const stage1_board = [
    [0,0,0,1,0, 1,0,0,0,0, 0,0,0],
    [0,0,1,0,1, 0,1,0,0,0, 0,0,0],
    [0,0,1,0,1, 0,1,0,0,0, 0,0,0],
    [0,0,1,0,1, 0,1,0,0,0, 0,0,0],
    [0,1,0,0,0, 0,1,0,0,0, 0,0,0],

    [1,0,0,1,0, 0,0,1,1,1, 0,1,0],
    [1,0,0,1,0, 0,0,0,0,0, 1,0,1],
    [1,0,0,0,0, 0,0,0,0,0, 0,1,0],
    [1,1,0,0,0, 0,0,0,0,0, 0,1,0],
    [0,1,1,1,0, 0,0,1,1,0, 0,1,0],

    [0,0,1,0,0, 1,1,0,0,0, 1,0,0],
    [0,0,1,1,1, 0,1,1,1,1, 0,0,0],
];
const stage2_board = [
    [0,0,0,0,0, 0,0,1,1,1, 0,0,0,0],
    [0,0,0,0,0, 0,0,0,1,1, 1,0,0,0],
    [0,0,0,0,0, 0,0,1,1,1, 1,1,0,0],
    [0,0,0,0,0, 0,1,1,1,1, 0,1,1,1],
    [0,0,0,0,0, 0,1,1,1,1, 1,1,1,1],

    [0,0,0,0,0, 0,0,1,1,1, 1,1,0,0],
    [0,0,0,0,0, 0,0,0,1,1, 1,0,0,0],
    [0,0,0,0,0, 0,1,1,1,1, 1,1,0,0],
    [1,0,0,0,0, 1,1,1,1,1, 1,1,1,0],
    [1,1,0,1,1, 1,1,1,1,1, 1,1,1,0],

    [1,1,1,1,1, 0,1,1,1,1, 0,1,1,0],
    [0,1,1,1,1, 1,0,1,1,1, 0,1,1,0],
    [0,1,1,1,1, 1,1,0,0,0, 1,1,1,0],
    [0,0,1,1,1, 1,1,1,1,1, 1,1,0,0],
    [0,0,0,0,1, 1,1,1,1,1, 0,0,0,0],
];
const stage3_board = [
    [0,0,0,0,0, 0,0,0,0,1, 1,1,0,0,0, 0,0,0,0,0, 0],
    [0,0,0,0,0, 0,0,0,1,1, 1,1,1,0,0, 0,0,0,0,0, 0],
    [0,0,0,0,1, 1,0,0,1,1, 1,1,1,0,0, 1,1,0,0,0, 0],
    [0,0,0,1,1, 1,1,0,1,1, 1,1,1,0,1, 1,1,1,0,0, 0],

    [0,0,0,1,1, 1,1,1,0,1, 1,1,0,1,1, 1,1,1,0,0, 0],
    [0,0,0,0,1, 1,1,1,0,1, 1,1,0,1,1, 1,1,0,0,0, 0],
    [0,0,0,0,0, 1,1,1,1,1, 1,1,1,1,1, 1,0,0,0,0, 0],
    [0,0,1,1,1, 0,0,1,1,0, 0,0,1,1,0, 0,1,1,1,0, 0],
    [0,1,1,1,1, 1,1,1,0,0, 1,0,0,1,1, 1,1,1,1,1, 0],
    
    [0,1,1,1,1, 1,1,1,0,1, 1,1,0,1,1, 1,1,1,1,1, 0],
    [0,1,1,1,1, 1,1,1,0,0, 1,0,0,1,1, 1,1,1,1,1, 0],
    [0,0,1,1,1, 0,0,1,1,0, 0,0,1,1,0, 0,1,1,1,0, 0],
    [0,0,0,0,0, 1,1,1,1,1, 1,1,1,1,1, 1,0,0,0,0, 0],
    [0,0,0,0,1, 1,1,1,0,1, 1,1,0,1,1, 1,1,0,0,0, 0],

    [0,0,0,1,1, 1,1,1,0,1, 1,1,0,1,1, 1,1,1,0,0, 0],
    [0,0,0,1,1, 1,1,0,1,1, 1,1,1,0,1, 1,1,1,0,0, 0],
    [0,0,0,0,1, 1,0,0,1,1, 1,1,1,0,0, 1,1,0,0,0, 0],
    [0,0,0,0,0, 0,0,0,1,1, 1,1,1,0,0, 0,0,0,0,0, 0],
    [0,0,0,0,0, 0,0,0,0,1, 1,1,0,0,0, 0,0,0,0,0, 0],
];

// 스테이지 정보 객체
const stage1 = {
    board: stage1_board,
    brickRowCount: stage1_board.length,
    brickColumnCount: stage1_board[0].length,
    clearScore: 5000,
}
const stage2 = {
    board: stage2_board,
    brickRowCount: stage2_board.length,
    brickColumnCount: stage2_board[0].length,
    clearScore: 10000,
}
const stage3 = {
    board: stage3_board,
    brickRowCount: stage3_board.length,
    brickColumnCount: stage3_board[0].length,
    clearScore: 20000,
}
//////////////////////////// ★ 스테이지 정보 객체들에 스테이지 클리어 점수(clearScore) 추가.

// 스테이지들 객체
const stages = {
    1: stage1,
    2: stage2,
    3: stage3,
};


/*--------------------------------------------벽돌 생성-------------------------------------------*/
var brickRowCount = stages[currentStage].brickRowCount;
var brickColumnCount = stages[currentStage].brickColumnCount;
var brickPadding = 0; // 벽돌 간 간격
var brickWidth =55;
//var brickWidth = (canvas.width - (brickRowCount - 1) * brickPadding) / brickRowCount; // 캔버스 너비에 맞게
//var brickWidth = canvas.width / brickRowCount; // 벽돌 1개의 가로 길이
//var brickHeight = canvas.height / brickColumnCount;
var brickHeight = 35; // 벽돌 1개의 세로 길이
var brickOffsetTop = 0; // 벽돌과 화면 상단 사이의 간격 
var brickOffsetLeft = 0; // 벽돌과 화면 좌측 사이의 간격


var bricks = [];
initBricks();

//////////////////////////// ★ draw()를 initBricks()와 draw()로 분리.
//////////////////////////// ★ draw()의 벽돌을 그리는 부분만 draw()로 남기고, 
//////////////////////////// ★ 값을 설정하는 부분은 initBricks()로 분리.
// 벽돌 설정 초기화 함수.
function initBricks() {  
    // 벽돌의 가로 및 세로 개수 계산.
    brickRowCount = stages[currentStage].brickRowCount;
    brickColumnCount = stages[currentStage].brickColumnCount;

    // bricks 초기화. // [r][c] 순으로 초기화하고, [r][c] 순으로 사용해야 함.
    for (let r = 0; r < brickRowCount; r++) {
        bricks[r] = [];
        for (let c = 0; c < brickColumnCount; c++) {
            // x좌표, y좌표, 상태, 벽돌파괴점수. // ★ 벽돌파괴점수 추가.
            bricks[r][c] = { x: 0, y: 0, status: 0, brickScore: 0 };

            // stage에 맞게 초기화.
            if (stages[currentStage].board[r][c] === 1){
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                brickX = canvas.width / 2 - (brickRowCount * (brickWidth + brickPadding)) / 2 + brickX;
                bricks[r][c].x = brickX;
                bricks[r][c].y = brickY;
                bricks[r][c].status = 1;
                bricks[r][c].brickScore = 100;
            }
        }
    }
}

function collider() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            //////////////////////////// ★  [r][c] 로 변경.
            // ★ var b 부분 삭제하고 bricks[r][c]로 직접 비교.
            if (bricks[r][c].status == 1) {
                var brickX = bricks[r][c].x;
                var brickY = bricks[r][c].y;
                var brickRight = brickX + brickWidth;
                var brickBottom = brickY + brickHeight;

                // ★ 충돌 부분 변경 필요.
                // 공이 벽돌에 충돌했는지 확인
                if (x + ballRadius > brickX && x - ballRadius < brickRight && y + ballRadius > brickY && y - ballRadius < brickBottom) {
                    // 공이 벽돌의 왼쪽이나 오른쪽에 충돌했는지 확인
                    if (x - ballRadius < brickRight && x + ballRadius > brickRight) {
                        dx = -dx;
                    } else if (x + ballRadius > brickX && x - ballRadius < brickX) {
                        dx = -dx;
                    }
                    
                    // 공이 벽돌의 위쪽이나 아래쪽에 충돌했는지 확인
                    if (y - ballRadius < brickBottom && y + ballRadius > brickBottom) {
                        dy = -dy;
                    } else if (y + ballRadius > brickY && y - ballRadius < brickY) {
                        dy = -dy;
                    }
                    // ~ 충돌 감지 및 반사?.

                    // 충돌 시 처리~.
                    // //////////////////////////// ★ b 없애고, bricks[r][c]의 값 직접 변경.
                    bricks[r][c].status = 0; // 벽돌 제거

                    // //////////////////////////// ★ 벽돌 충돌 시 벽돌 제거 점수 추가.
                    addScore(bricks[r][c].brickScore);
                    printScore();
                    // console.log(`b.brickScore: ${bricks[r][c].brickScore}`);
                    // console.log(`score: ${score}`);

                    
                    clearBrick(); // 벽돌이 모두 제거되었는지 확인
                }
            }
        }
    }
}

function clearBrick(){
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            // //////////////////////////// ★ [r][c]로 변경.
            if (bricks[r][c].status == 1) {
                return false;
            }
        }
    }

    // //////////////////////////// ★ 스테이지 클리어 시 스테이지 클리어 점수 추가.
    addScore(stages[currentStage].clearScore);
    printScore();
    // console.log(`score: ${score}`);


    alert('다음 스테이지로');
    nextstage();
}

function nextstage() {
    if (currentStage < 3) {
        currentStage++;
        ballCount = 0;
        resetBall();
        
        // //////////////////////////// ★  벽돌 배열 초기화. (스테이지 정보 업데이트 부분은 initBricks()로 이동).
        initBricks();
    } else {
        clearInterval(intervalid);
        alert('end');
        document.location.reload();
    }
}

//-------------------------벽돌 그리기-----------------------

// //////////////////////////// ★ 벽돌 전용 ctx 추가.
const ctxBrick = canvas.getContext("2d");   //벽돌 전용 ctx. 추가.
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            // //////////////////////////// ★ [r][c]로 변경.
            // //////////////////////////// ★ 상태만 비교. stages[].board[r][c] 의 값은 생성할 때만 사용. 
            if (bricks[r][c].status === 1) { // 벽돌 상태가 1인 경우
                let brickX = bricks[r][c].x;
                let brickY = bricks[r][c].y;

                // //////////////////////////// ★ 값 설정 부분은 제거하고 initBricks()로 옮기고, 벽돌을 그리는 부분만 남김.
                ctxBrick.beginPath();
                ctxBrick.rect(brickX, brickY, brickWidth, brickHeight);
                ctxBrick.strokeRect(brickX, brickY, brickWidth, brickHeight);
                ctxBrick.strokeStyle = 'orange';
                ctxBrick.fillStyle = "#352461";
                ctxBrick.fill();
                ctxBrick.closePath();
            }
        }
    }
}

drawBricks();
