/*------------------------------------변수 선언---------------------------------------*/
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");
/*--------------------------------------------------------------------------------- */

//위치 조정
var x = canvas.width / 2;
var y = canvas.height -20;

//공 속도 조정
let dx = 3;
let dy = -3;

//공 크기 조정
const ballRadius = 10;

//공이 떨어진 횟수
let ballCount = 0;

let intervalid;

//바 크기 조정
const paddleHeight = 10; // 바의 세로 길이
const paddleWidth = 150; //바의 가로 길이
let paddleX = (canvas.width - paddleWidth) / 2; //바가 중앙으로 오도록 조정



//공 그리기
var color = Math.random() * 0xffffff
color = parseInt(color);
color = color.toString(16);
var colorCode = "#" +color;

function getRandomColor() {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "blue"; //색상 고정
    //ctx.fillStyle = colorCode; //랜덤한 색상 
    ctx.fillStyle = getRandomColor();//계속 색상 변화
    ctx.fill();
    ctx.closePath();
}

// 공 초기화 함수
function resetBall() {
    x = canvas.width / 2;
    y = canvas.height - 20;
    dx = 3;
    dy = -3;
    paddleX = (canvas.width - paddleWidth) / 2;
}


//바 그리기
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}


function draw(){
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
        else {
            ballCount++; // 공이 바닥에 닿을 때마다 카운트 증가
            if (ballCount < 3) {
                resetBall(); // 3번 미만으로 떨어졌을 경우 공 초기화
            } else { 
                clearInterval(intervalid); // 3번 이상으로 떨어졌을 경우 게임 종료
                alert("GAME OVER");
                document.location.reload(); // 페이지 새로고침
            }
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

draw();
