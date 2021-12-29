

const canvas = document.getElementById('canvas');
const ct = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const screenWidth = 500;
const screenHeight = canvas.height;

const screenLeftEdge = 450;
const screenRightEdge = 450 + screenWidth;
const midScreen = screenLeftEdge+(screenWidth /2)

console.log(midScreen)

const pipeDown = new Image();
const pipeUp = new Image();

const pipeHeight = 300;

const gap = 80;
const c = pipeHeight + gap;

var birdYPosition = 350;
var birdXPosition =  600;

var gravity = 1.3;

function checkCollision(){

}

function generateBackground(){

    const bg = new Image();
    bg.src='img/bg.png';
    bg.onload = () =>{
        ct.drawImage(bg,450,0,screenWidth,screenHeight);
    }
}

function generateGround(){
    const ground = new Image();
    ground.src='img/ground.png';
    ground.onload = () =>{
        ct.drawImage(ground,450,canvas.height-120,screenWidth,120);
    }
}

function generateBird(){
    const bird = new Image();
    bird.src='img/bird.png';
    bird.onload = () =>{
        ct.drawImage(bird,birdXPosition,birdYPosition,50,40);
        birdYPosition += gravity;
    }
}

function getRandom(pipeHeight) {
    let random = Math.floor(Math.random() * pipeDown.height);
    return random;
  }

var pipe = [];

pipe[0] = {
    x: screenRightEdge-50,
    y: 0
}
    function generatePipe(){
        for(var i = 0; i < pipe.length; i++){
            pipeDown.src = 'img/pipe-down.png';
            
                ct.drawImage(pipeDown,pipe[i].x,pipe[i].y,50,pipeHeight);
            

            pipeUp.src = 'img/pipe-up.png';
                var pipeUpHeight = screenHeight - (c+120+pipe[i].y);
                ct.drawImage(pipeUp,pipe[i].x,pipe[i].y+c,50,pipeUpHeight);
            

            // Checks if the pipe reaches the edge
            if (pipe[i].x!=screenLeftEdge){
                pipe[i].x--;
            }
            else pipe[i]=-1

            // Adds another pipes 
            if (pipe[i].x == midScreen)
                    pipe.push({
                        x: screenRightEdge-50,
                        y: getRandom(pipeHeight) - pipeDown.height
                    })            
        }
    }

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
      birdYPosition -= 30;

    }
  })

 function generateEverything(){


        generateBackground();
        generateBird();
        generatePipe();
        generateGround();

        requestAnimationFrame(generateEverything);
}

generateEverything();