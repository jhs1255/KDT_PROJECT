/*------------------------------------변수 선언---------------------------------------*/
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");
const ctxBrick = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function init() {
    // ballRadius = canvas.width / 100;
    x = x / canvas.width *  window.innerWidth;
    paddleX = paddleX / canvas.width *  window.innerWidth;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    paddleWidth = canvas.width / 5;

    brickRowCount = stages[currentStage].brickRowCount; //벽돌 가로 개수
    brickColumnCount = stages[currentStage].brickColumnCount; // 벽돌 세로 개수
    brickWidth = canvas.width/ (brickColumnCount+1); // 벽돌 1개의 가로 길이
    brickHeight = 20; // 벽돌 1개의 세로 길이
    brickPadding = 0; //벽돌 간 간격
    brickOffsetTop = 5; // 벽돌과 화면 상단 사이의 간격 
    brickOffsetLeft = (canvas.width - (((brickPadding + brickWidth) * (brickColumnCount - 1)) + brickWidth)) / 2; // 벽돌과 화면 좌측 사이의 간격
    
    drawBall();
    drawPaddle();
    drawBricks();
}

window.onload = function () {
    init();
}
window.onresize = function () {
    init();
}

//위치 조정
var x = canvas.width / 2;
var y = canvas.height -20;

//공 속도 조정
let dx = canvas.width / 300;
let dy = -canvas.width / 300;

//공 크기 조정
let ballRadius = canvas.width / 100;

//바 크기 조정
const paddleHeight = 10; // 바의 세로 길이
let paddleWidth = canvas.width / 5; //바의 가로 길이
let paddleX = (canvas.width - paddleWidth) / 2; //바가 중앙으로 오도록 조정


//조작키 버튼 변수정의
let rightPressed = false;
let leftPressed = false;

let isBallReleased = false; // 발사 상태 변수

//키보드 조작
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


//키보드 이벤트 등록
function keyDownHandler(e) {
    if (e.key === "d" || e.key === "ArrowRight") {
      rightPressed = true;
    } else if (e.key === "a" || e.key === "ArrowLeft") {
      leftPressed = true;
    }
}
  
function keyUpHandler(e) {
    if (e.key === "d" || e.key === "ArrowRight") {
      rightPressed = false;
    } else if (e.key === "a" || e.key === "ArrowLeft") {
      leftPressed = false;
    }
}


/*-----------------------------------------------게임 요소 생성-----------------------------------------------*/

//공 그리기
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}



//바 그리기
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}


/*--------------------------------------------벽돌 생성-------------------------------------------*/
var brickRowCount = stages[currentStage].brickRowCount; //벽돌 가로 개수
var brickColumnCount = stages[currentStage].brickColumnCount; // 벽돌 세로 개수
var brickWidth; // 벽돌 1개의 가로 길이
var brickHeight; // 벽돌 1개의 세로 길이
var brickPadding; //벽돌 간 간격
var brickOffsetTop; // 벽돌과 화면 상단 사이의 간격 
var brickOffsetLeft; // 벽돌과 화면 좌측 사이의 간격

var bricks = [];
for (let r = 0; r < brickRowCount; r++) {
    bricks[r] = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[r][c] = { x: 0, y: 0, status:stages[currentStage].board[r][c]};
    }
}

function collider() {
    for(var r=0; r<brickRowCount; r++) {
        for(var c=0; c<brickColumnCount; c++) {
            var b = bricks[r][c];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }
}
//-------------------------벽돌 그리기-----------------------
function drawBricks() {
    for(var r=0; r<brickRowCount; r++) {
        for(var c=0; c<brickColumnCount; c++) {
            if(bricks[r][c].status === 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[r][c].x = brickX;
                bricks[r][c].y = brickY;
                ctxBrick.beginPath();
                ctxBrick.rect(brickX, brickY, brickWidth, brickHeight);
                ctxBrick.fillStyle = "#352461";
                ctxBrick.fill();
                ctxBrick.closePath();
                ctxBrick.setLineDash([0,0]);
                ctxBrick.strokeStyle = "orange";
                ctxBrick.stroke();
            }
        }
    }
}

/*---------------------게임 실행---------------------*/

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collider();

    //충돌 감지
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx; //좌우 충돌 감지
    }

    if(y + dy < ballRadius) {
        dy = -dy; //상하 충돌 감지
    }
    else if(y + dy > canvas.height-ballRadius) {  
        if(x > paddleX && x < paddleX + paddleWidth) {//공이 바 가장자리에 닿았는지 확인
            dy = -dy;
        }
        else { // 공이 바닥에 떨어지면 게임 정지
            clearInterval(intervalid);
            document.location.reload();
        }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += canvas.width / 150;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= canvas.width / 150;
    }

    x += dx;
    y += dy;
}

/*--------------------------------------------스와이프 공 생성------------------------------------*/
let aimX = x;
let aimY = y;
let isAiming = false;

document.addEventListener('mousedown',function(){
    if(!isBallReleased){
        isAiming = true;
        document.addEventListener('mousemove', drawline);
    }
});

document.addEventListener('mouseup', function(){
    if(!isBallReleased){
        document.removeEventListener('mousemove', drawline);
        isAiming = false;

        const mouseX = aimX;
        const mouseY = aimY;
        const directionX = mouseX - x;
        const directionY = mouseY - y;
        const length = Math.sqrt(directionX * directionX + directionY * directionY);
        dx = directionX / length * 5; // 발사 속도
        dy = directionY / length * 5;//발사 속도

        //게임 시작
        intervalid = setInterval(draw,10);
        document.querySelector("#start").disabled = true;

        //발사 상태 설정
        isBallReleased = true;
    }
});

//조준선 그리기
function drawline(event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
  
    let directionX = mouseX - x;
    let directionY = mouseY - y;
    const length = Math.sqrt(directionX * directionX + directionY * directionY);
    directionX /= length;
    directionY /= length;
  
    let collisionX = x;
    let collisionY = y;
    while (true) {
      collisionX += directionX * 5;
      collisionY += directionY * 5;
  
      if (collisionX < 0 || collisionX > canvas.width || collisionY < 0 || collisionY > canvas.height) {
        aimX = collisionX;
        aimY = collisionY;
        break;
      }
  
      for (let r = 0; r < brickRowCount; r++) {
      for (let c = 0; c < brickColumnCount; c++) {
          const b = bricks[r][c];
          if (b.status === 1) {
            if (collisionX > b.x && collisionX < b.x + brickWidth && collisionY > b.y && collisionY < b.y + brickHeight) {
              aimX = b.x + brickWidth / 2;
              aimY = b.y + brickHeight / 2;
              break;
            }
          }
        }
      }
    }
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
  
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(aimX, aimY);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.closePath();
  }

/*-----------------------------------------------------------------------------------------------*/

//버튼 동작시 실행

document.querySelector("#start").addEventListener("click",function(){
    intervalid =  setInterval(draw,10);
    this.disabled = true;
});

document.querySelector("#stop").addEventListener("click",function(){
    document.location.reload();
    clearInterval(intervalid);
});

draw();
