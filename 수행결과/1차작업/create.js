/*------------------------------------변수 선언---------------------------------------*/
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");
const ctxBrick = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function init() {
    // ball.radius = canvas.width / 100;
    ball.posX = ball.posX / canvas.width *  window.innerWidth;
    paddleX = paddleX / canvas.width *  window.innerWidth;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    paddleWidth = canvas.width / 5;

    brickRowCount = stages[currentStage].brickRowCount; //벽돌 가로 개수
    brickColumnCount = stages[currentStage].brickColumnCount; // 벽돌 세로 개수
    brickWidth = Math.floor(canvas.width / (brickColumnCount+1) + 0.5) ; // 벽돌 1개의 가로 길이
    brickHeight = 20; // 벽돌 1개의 세로 길이
    brickPadding = 0; //벽돌 간 간격
    brickOffsetTop = 5; // 벽돌과 화면 상단 사이의 간격 
    brickOffsetLeft = (canvas.width - (((brickPadding + brickWidth) * (brickColumnCount - 1)) + brickWidth)) / 2; // 벽돌과 화면 좌측 사이의 간격
    
    drawBall();
    drawPaddle();
    drawBricks();
}

window.onload = function () {
    initBall();
    init();
}
window.onresize = function () {
    initBall();
    init();
}

let ball = {
    posX: 0,
    posY: 0,
    speedX: 0,
    speedY: 0,
    speed: 0,
    radius: Math.round(canvas.width / 100),
}

function initBall() {
    //위치 조정
    ball.posX = canvas.width / 2;
    ball.posY = canvas.height -20;
    
    //공 속도 조정
    ball.speedX = 0 ;//canvas.width / 300;
    ball.speedY = 1 ;//-canvas.width / 300;

    ball.speed = 4;

    //공 크기 조정
    ball.radius = Math.round(canvas.width / 100);

    console.log(ball);
}

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
    ctx.arc(ball.posX, ball.posY, ball.radius, 0, Math.PI * 2);
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

// 공과 벽돌 충돌시 처리하는 함수.
function collider() {
    for(var r=0; r<brickRowCount; r++) {
        for(var c=0; c<brickColumnCount; c++) {
            var b = bricks[r][c];
            if(b.status == 1) {
                // 공이 벽돌에 충돌한 경우, 
                if (collideBrick(b) === true) {
                    b.status = 0;   // 상태를 0으로 하여, 해당 벽돌을 파괴한다.
                }
            }
        }
    }
}

// 공이 벽돌에 충돌했는지 감지하는 함수. 충돌 시 true 리턴.
function collideBrick(brick) {
    let brickHalfWidth = brickWidth/2;
    let brickHalfHeight = brickHeight/2;

    let distX = Math.abs(ball.posX - (brick.x + brickHalfWidth));
    let distY = Math.abs(ball.posY - (brick.y + brickHalfHeight));

    // 충돌 X 경우,
    if (distX > (brickHalfWidth + ball.radius) || distY > (brickHalfHeight + ball.radius)) {
        return false;
    }
    
    // 벽면에 충돌한 경우,
    let isReflected = false;
    if (distX <= brickHalfWidth || distY <= brickHalfHeight) {
        let direction = getCollisionDirection(brick);
        
        if (direction == "left") {
            if (ball.speedX > 0) {
                ball.speedX = -ball.speedX;
                console.log("left");
                isReflected = true;
            }
        }
        else if (direction == "right") {
            if (ball.speedX < 0) {
                ball.speedX = -ball.speedX;
                console.log("right");
                isReflected = true;
            }
        }
        else if (direction == "top") {
            if (ball.speedY > 0) {
                ball.speedY = -ball.speedY;
                console.log("top");
                isReflected = true;
            }
        }
        else if (direction == "bottom") {
            if (ball.speedY < 0) {
                ball.speedY = -ball.speedY;
                console.log("bottom");
                isReflected = true;
            }
        }
    }
    if (isReflected === true) {
        return true;
    }

    let dx = distX - brickHalfWidth;
    let dy = distY - brickHalfHeight;
    // 모서리에 충돌한 경우,
    if (dx*dx+dy*dy<=(ball.radius*ball.radius)) {
        // 원이 벽돌에 닿은 경우,
        reflectBall(brick);
        console.log("edge true");
        return true;
    } else {
        // 원이 벽돌에 닿지 않는 경우,
        console.log("edge false");
        return false;
    }
}

// 벽돌의 충돌 방향 구하는 함수.
function getCollisionDirection(brick) {

    let brickHalfWidth = brickWidth/2;
    let brickHalfHeight = brickHeight/2;

    let dx = (ball.posX - (brick.x + brickHalfWidth)) / (brickHalfWidth);
    let dy = (ball.posY - (brick.y + brickHalfHeight)) / (brickHalfHeight);

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) {
            return "left";
        } else {
            return "right";
        }
    } else {
        if (dy < 0) {
            return "top";
        } else {
            return "bottom";
        }
    }
}

// 충돌 지점이 모서리일 때, 반사시키는 함수.
function reflectBall(brick) {
    // 충돌 당시의 직사각형의 중심과 원의 중심 사이의 거리.
    let distX = ball.posX - (brick.x + brickWidth/2);
    let distY = ball.posY - (brick.y + brickHeight/2);
    var distance = Math.sqrt(distX * distX + distY * distY);

    // 충돌 지점에서 직사각형의 중심까지의 단위 벡터.
    var unitX = distX / distance;
    var unitY = distY / distance;

    // 현재 공의 속도.
    var velocityX = ball.speedX;
    var velocityY = ball.speedY;

    // 충돌 시 반사 벡터 계산.
    var dotProduct = unitX * velocityX + unitY * velocityY;
    var reflectX = velocityX - 2 * dotProduct * unitX;
    var reflectY = velocityY - 2 * dotProduct * unitY;

    // 반사된 속도를 원의 속도에 반영
    ball.speedX = reflectX;
    ball.speedY = reflectY;
}

// 현재 공의 속도(방향)을 통해 공의 각도를 구하는 함수.
function convertVectorToDegree(x, y) {
    const radian = Math.atan2(y,x);
    const degree = radian * (180 / Math.PI);

    //// console.log(`convertVectorToDegree - radian: ${radian}`);
    //// console.log(`convertVectorToDegree - degree: ${degree}`);

    return {"radian": radian, "degree": degree};
}
// 현재 공의 각도를 통해 공의 방향(단위 벡터)을 구하는 함수.
function convertDegreeToVector(degree) {
    const radian = degree * (Math.PI / 180);

    const x = Math.cos(radian);
    const y = Math.sin(radian);

    //// console.log(`convertDegreeToVector -radian: ${radian}`);
    //// console.log(`convertDegreeToVector -vector x: ${x} y: ${y}`);
    
    return {"x": x, "y": y};
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

    //충돌 감지 // 벽 좌우단
    if (ball.posX + ball.speedX > canvas.width - ball.radius || ball.posX + ball.speedX < ball.radius) {
        ball.speedX = -ball.speedX; //좌우 충돌 감지
    }
    // 천장
    if(ball.posY + ball.speedY < ball.radius) {
        ball.speedY = -ball.speedY; //상하 충돌 감지
    }
    // 바닥
    else if(ball.posY + ball.speedY > canvas.height - ball.radius) {
        //공이 바 가장자리에 닿았는지 확인
        if(ball.posX > paddleX && ball.posX < paddleX + paddleWidth) {
            // 공을 반사할 각도. // (10′~170′ 인데 y축이 반전이므로 + 180해줌).
            let degree = Math.floor((Math.random() * 1000) % 160 + 10) + 180;
            // 반사할 각도를 단위 벡터로 변환.
            let vector = convertDegreeToVector(degree);
            
            // 반사 방향에 공의 속도를 곱해줌.
            ball.speedX = vector.x * ball.speed;
            ball.speedY = vector.y * ball.speed;
            // console.log(`ball.speed: ${ball.speedX}, ${ball.speedY}`);
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

    ball.posX += ball.speedX;
    ball.posY += ball.speedY;
}

/*--------------------------------------------스와이프 공 생성------------------------------------*/
let aimX = ball.posX;
let aimY = ball.posY;
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
        const directionX = mouseX - ball.posX;
        const directionY = mouseY - ball.posY;
        const length = Math.sqrt(directionX * directionX + directionY * directionY);
        ball.speedX = directionX / length * ball.speed; // 발사 x축 속도
        ball.speedY = directionY / length * ball.speed; // 발사 y축 속도

        // console.warn(`---spdX=${ball.speedX}, spdY=${ball.speedY}`);
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
  
    let directionX = mouseX - ball.posX;
    let directionY = mouseY - ball.posY;
    const length = Math.sqrt(directionX * directionX + directionY * directionY);
    directionX /= length;
    directionY /= length;
  
    let collisionX = ball.posX;
    let collisionY = ball.posY;
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
    ctx.moveTo(ball.posX, ball.posY);
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
