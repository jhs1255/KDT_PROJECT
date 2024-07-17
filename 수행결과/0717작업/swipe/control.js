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

//버튼 동작시 실행

document.querySelector("#start").addEventListener("click",function(){
    intervalid =  setInterval(draw,10);
    this.disabled = true;
});

document.querySelector("#stop").addEventListener("click",function(){
    document.location.reload();
    clearInterval(intervalid);
});

document.addEventListener("keydown",function(e){
    if(e.key === ' '){ 
        intervalid =  setInterval(draw,10);
        e.target.disabled = true;
        document.removeEventListener("keydown",arguments.callee);
    }
});

document.querySelector("#home").addEventListener('click',function(){
    location.href="./title.html";
});