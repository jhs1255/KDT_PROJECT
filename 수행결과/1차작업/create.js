/*------------------------------------변수 선언---------------------------------------*/
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");

//위치 조정
var x = canvas.width / 2;
var y = canvas.height -20;

//공 속도 조정
let dx = 3;
let dy = -3;

//공 크기 조정
const ballRadius = 10;

//바 크기 조정
const paddleHeight = 10; // 바의 세로 길이
const paddleWidth = 150; //바의 가로 길이
let paddleX = (canvas.width - paddleWidth) / 2; //바가 중앙으로 오도록 조정


//조작키 버튼 변수정의
let rightPressed = false;
let leftPressed = false;

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
drawBall();
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//바 그리기
drawPaddle();
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

/*--------------------------------------------스와이프 공 생성------------------------------------*/



/*--------------------------------------------벽돌 생성-------------------------------------------*/
var brickRowCount = 13; //벽돌 가로 개수
var brickColumnCount = 10; // 벽돌 세로 개수
var brickWidth = 75; // 벽돌 1개의 가로 길이
var brickHeight = 20; // 벽돌 1개의 세로 길이
var brickPadding = 12.5; //벽돌 간 간격
var brickOffsetTop = 50; // 벽돌과 화면 상단 사이의 간격 
var brickOffsetLeft = 30; // 벽돌과 화면 좌측 사이의 간격

var bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0,status:1};
  }
}

function collider() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
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
drawBricks();
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status === 1) {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#352461";
                ctx.fill();
                ctx.closePath();
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
        paddleX += 5;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 5;
    }

    x += dx;
    y += dy;
}


//버튼 동작시 실행
function start(){
    setInterval(draw,10);
    this.disabled = true;
}

document.querySelector("#start").addEventListener("click",function(){
    intervalid =  setInterval(draw,10);
    this.disabled = true;
});

document.querySelector("#stop").addEventListener("click",function(){
    document.location.reload();
    clearInterval(intervalid);
});