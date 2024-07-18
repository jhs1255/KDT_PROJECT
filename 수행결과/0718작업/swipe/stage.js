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
}
const stage2 = {
    board: stage2_board,
    brickRowCount: stage2_board.length,
    brickColumnCount: stage2_board[0].length,
}
const stage3 = {
    board: stage3_board,
    brickRowCount: stage3_board.length,
    brickColumnCount: stage3_board[0].length,
}

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
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0,status:1, type:'brick'};

    // 아이템 블럭 생성
    if (Math.random() < itemPercent.plusball) {
        bricks[c][r].type = 'plusball';
    } else if (Math.random() < itemPercent.plusbar) {
        bricks[c][r].type = 'plusbar';
    } else if (Math.random() < itemPercent.jump) {
        bricks[c][r].type = 'jump';
    } else if (Math.random() < itemPercent.plusheart) {
        bricks[c][r].type = 'plusheart';
    } else if (Math.random() < itemPercent.speed) {
        bricks[c][r].type = 'speed';
    } else if (Math.random() < itemPercent.speed) {
        bricks[c][r].type = 'reshoot';
    }

  }
}


function collider() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                var brickX = b.x;
                var brickY = b.y;
                var brickRight = brickX + brickWidth;
                var brickBottom = brickY + brickHeight;

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

                    if(b.type !== 'brick'){
                        itemfall.push({x:b.x, y:b.y, type:b.type});
                        b.status = 0;
                    }else{
                        b.status = 0; // 벽돌 제거
                        clearBrick();// 벽돌이 모두 제거되었는지 확인
                    }
                    
                }
            }
        }
    }
}

function clearBrick(){
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                return false;
            }
        }
    }
    alert('다음 스테이지로');
    nextstage();
}

function nextstage() {
    if (currentStage < 3) {
        currentStage++;
        ballCount = 0;
        resetBall();
        // 스테이지 정보 업데이트
        brickRowCount = stages[currentStage].brickRowCount;
        brickColumnCount = stages[currentStage].brickColumnCount;

        // 벽돌 배열 초기화
        bricks = [];
        for (let c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: stages[currentStage].board[r][c], type:'brick'};

                // 아이템 블럭 생성
                if (Math.random() < itemPercent.plusball) {
                    bricks[c][r].type = 'plusball';
                } else if (Math.random() < itemPercent.plusbar) {
                    bricks[c][r].type = 'plusbar';
                } else if (Math.random() < itemPercent.jump) {
                    bricks[c][r].type = 'jump';
                } else if (Math.random() < itemPercent.plusheart) {
                    bricks[c][r].type = 'plusheart';
                } else if (Math.random() < itemPercent.speed) {
                    bricks[c][r].type = 'speed';
                } else if (Math.random() < itemPercent.speed) {
                    bricks[c][r].type = 'reshoot';
                }
            }
        }
    } else {
        clearInterval(intervalid);
        alert('end');
        document.location.reload();
    }
}

//-------------------------벽돌 그리기-----------------------

function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (stages[currentStage].board[r][c] === 1 && bricks[c][r].status === 1) { // 벽돌이 존재하고 상태가 1인 경우
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                brickX = canvas.width / 2 - (brickRowCount * (brickWidth + brickPadding)) / 2 + brickX;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.strokeRect(brickX, brickY, brickWidth, brickHeight);
                ctx.strokeStyle = 'orange';
                ctx.fillStyle = "#352461";
                ctx.fill();
                ctx.closePath();

                if (bricks[c][r].type !== 'brick') {
                    var itemImage = new Image();
                    itemImage.src = items.find(item => item.type === bricks[c][r].type).src;
                    ctx.drawImage(itemImage, brickX, brickY, brickWidth, brickHeight);
                }
            }
        }
    }
}

drawBricks();