
const Numbushes=45;
const pokeball=5;
const player=document.querySelector('.player');
var timerDisplay = document.getElementById('timer');
var val= document.getElementById("scorevalue");
console.log(val);
var scoreDisplay=val.getAttribute('value');
console.log(scoreDisplay);
// console.log(timerDisplay);
const player_pos={
    x: parseInt(window.innerWidth/2),
    y: parseInt(window.innerHeight/2),
}
const player_vel={
    x:0,
    y:0,
}
const sound = new Audio('imagepoke/coin.mp3')
const balls=[];
function createBushes(){
    for(let i=0;i<45;i++){
        const div=document.createElement('div');
        div.classList.add('bush');
        div.style.left=Math.random()*100 +'%';
        div.style.top=Math.random()*100 +'%';
        document.body.appendChild(div);
    }
}
function createballs(){
    for(let i=0;i<5;i++){
        const div=document.createElement('div');
        div.classList.add('pokeball');
        let x=Math.random()*100 +'%';
        let y=Math.random()*100 +'%';
        div.style.top=y;
        div.style.left=x;
        balls.push({
            ball: div,
            pos :{
                x,
                y
            }
        })
        document.body.appendChild(div);
    }
}
function generateBall(){
    const div = document.createElement('div')
    div.classList.add('pokeball')
    let x = Math.random() * 100 + '%'
    let y = Math.random() * 100 + '%'
    div.style.left = x
    div.style.top = y
    balls.push({
        ball: div,
        pos: {
            x,
            y
        }
    })
    document.body.appendChild(div)
}
function collision($div1, $div2) {
    var x1 = $div1.getBoundingClientRect().left;
    var y1 = $div1.getBoundingClientRect().top;
    var h1 = $div1.clientHeight;
    var w1 = $div1.clientWidth;
    var b1 = y1 + h1;
    var r1 = x1 + w1;

    var x2 = $div2.getBoundingClientRect().left;
    var y2 = $div2.getBoundingClientRect().top;
    var h2 = $div2.clientHeight;
    var w2 = $div2.clientWidth;
    var b2 = y2 + h2;
    var r2 = x2 + w2;
    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}

function checkcollision(){
    balls.forEach((ball)=>{
        if(collision(ball.ball, player)){
            sound.play()
            console.log(scoreDisplay);
            var score= Number(scoreDisplay);
            console.log(score);
            score++;
            scoreDisplay++;
            val.setAttribute('value',score);
            ball.ball.remove()
            generateBall()
        }
    })
}
function run(){
    player_pos.x+=player_vel.x;
    player_pos.y+=player_vel.y;

    player.style.left=player_pos.x +'px';
    player.style.bottom=player_pos.y +'px';

    checkcollision();
    // if a person hit pokeball or not

    requestAnimationFrame(run);

}
function init(){
    createBushes();
    createballs();
    run();
}
init();
window.addEventListener('keydown',function(touchedkey){
    // --- code for not letting out man out of window-------
    if(touchedkey.key=="ArrowLeft" && player_pos.x<=0){
        player_vel.y=0;
        player_vel.x=0;
        player.style.backgroundImage='url("imagepoke/player_left.png")';
    }
    else if(touchedkey.key=="ArrowRight" && player_pos.x>=(this.window.innerWidth-60)){
        player_vel.y=0;
        player_vel.x=0;
        player.style.backgroundImage='url("imagepoke/player_right.png")';
    }
    else if(touchedkey.key=="ArrowUp" && player_pos.y>=(this.window.innerHeight-60)){
        player_vel.y=0;
        player_vel.x=0;
        player.style.backgroundImage='url("imagepoke/player_front.png")';
    }
    else if(touchedkey.key=="ArrowDown" && player_pos.y<=0){
        player_vel.y=0;
        player_vel.x=0;
        player.style.backgroundImage='url("imagepoke/player_back.png")';
    }


    // ---------------------------------------------------------------------------------
    else{
    if(touchedkey.key=="ArrowUp"){
        player_vel.y=2.2;
        player.style.backgroundImage='url("imagepoke/player_front.png")';
    }
    if(touchedkey.key=="ArrowDown"){
        player_vel.y=-2.2;
        console.log(player.style.backgroundImage);
        player.style.backgroundImage='url("imagepoke/player_back.png")';
    }
    if(touchedkey.key=="ArrowLeft"){
        player_vel.x=-2.2;
        player.style.backgroundImage='url("imagepoke/player_left.png")';
    }
    if(touchedkey.key=="ArrowRight"){
        player_vel.x=2.2;
        player.style.backgroundImage='url("imagepoke/player_right.png")';
    }
    player.classList.add('active');
    console.log(player_pos.x);
    console.log(player_pos.y);
    }
})
window.addEventListener('keyup',function(){
    player_vel.x=0;
    player_vel.y=0;
    player.classList.remove('active');
})
// code for setting interval for 60s
function updateTimer() {
    console.log(timerDisplay.innerText);
   var seconds= Number(timerDisplay.innerText);
    console.log(seconds);
    seconds--;
    timerDisplay.innerText=seconds;
    if (seconds==0) {
      clearInterval(timerInterval);
      document.getElementById('score').submit();
    //   alert("Time's up!");
    }
}

var timerInterval = setInterval(updateTimer, 1000);