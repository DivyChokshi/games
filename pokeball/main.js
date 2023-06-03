
const Numbushes=45;
const pokeball=5;
const player=document.querySelector('.player');
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
    if(touchedkey.key=="ArrowUp"){
        player_vel.y=3;
        player.style.backgroundImage='url("imagepoke/player_front.png")';
    }
    if(touchedkey.key=="ArrowDown"){
        player_vel.y=-3;
        console.log(player.style.backgroundImage);
        player.style.backgroundImage='url("imagepoke/player_back.png")';
    }
    if(touchedkey.key=="ArrowLeft"){
        player_vel.x=-3;
        player.style.backgroundImage='url("imagepoke/player_left.png")';
    }
    if(touchedkey.key=="ArrowRight"){
        player_vel.x=3;
        player.style.backgroundImage='url("imagepoke/player_right.png")';
    }
    player.classList.add('active');
})
window.addEventListener('keyup',function(){
    player_vel.x=0;
    player_vel.y=0;
    player.classList.remove('active');
})