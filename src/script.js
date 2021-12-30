const canvas = document.getElementById('canvas');
const ct = canvas.getContext('2d');

canvas.height = window.innerHeight-5;
canvas.width = window.innerWidth;

// Game Screen resolution
const screenWidth = 500;
const screenHeight = canvas.height;

// Game Screen Edges Position
const screenLeftEdge = 450;
const screenRightEdge = 450 + screenWidth;
const midScreen = screenLeftEdge+(screenWidth /2)

// Pipes representations
const pipeDown = new Image();
const pipeUp = new Image();

// pipeDown Height
const pipeHeight = 300;

// Space between two pipes
const space = 120;
const pipeUpPosition = pipeHeight + space;

// Position of Bird
var birdYPosition = 350;
var birdXPosition =  600;

// Game Constants
var freeFall = 1.5;
var spaceSensitivity = 50;

var score = 0;

let gamePaused = true;

// Get Elements from HTML
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const endScreen = document.getElementById("end-screen");

// Onclick function for Start
startBtn.addEventListener('click', () => {
    gamePaused = false;
    startScreen.style.display="none";
    canvas.style.display="initial"
    generateEverything();
  });

  // Onclick function for Re-Start
  restartBtn.addEventListener('click', () => {
    gamePaused = false;
    location.reload();
  });

  // Generate Backgroud 
function generateBackground(){

    const bg = new Image();
    bg.src='img/bg.png';
    bg.onload = () =>{
        ct.drawImage(bg,450,0,screenWidth,screenHeight);
    }
}

    // Generate Ground
function generateGround(){
    const ground = new Image();
    ground.src='img/ground.png';
    ground.onload = () =>{
        ct.drawImage(ground,450,canvas.height-120,screenWidth,120);
    }
}
    // Generate Bird 
function generateBird(){
    const bird = new Image();
    bird.src='img/bird.png';
    bird.onload = () =>{
        ct.drawImage(bird,birdXPosition,birdYPosition,50,40);
        birdYPosition += freeFall;
    }
}

 // Generate Random number for pipe y position
function getRandom(pipeHeight) {
    let random = Math.floor(Math.random() * pipeDown.height);
    return random;
  }

var pipe = [];

pipe[0] = {
    x: screenRightEdge-50,
    y: 0
}
    // Generate Pipes 
    function generatePipe(){
        for(var i = 0; i < pipe.length; i++){
            pipeDown.src = 'img/pipe-down.png';
            
                ct.drawImage(pipeDown,pipe[i].x,pipe[i].y,50,pipeHeight);
            

            pipeUp.src = 'img/pipe-up.png';
                var pipeUpHeight = screenHeight - (pipeUpPosition+120+pipe[i].y);
                ct.drawImage(pipeUp,pipe[i].x,pipe[i].y+pipeUpPosition,50,pipeUpHeight);

            // Checks if the pipe reaches the edge
            if (pipe[i].x!=screenLeftEdge){
                pipe[i].x--;
            }
            else pipe[i]=-1
            
            if (pipe[i].x ==580){
                if (gamePaused!= true){
                    score++;
                }    
            }   

            // Adds another pipes 
            if (pipe[i].x == midScreen){
                    pipe.push({
                        x: screenRightEdge-50,
                        y: getRandom(pipeHeight) - pipeDown.height
                    })  
            }

            const collides = birdXPosition + 50 >= pipe[i].x && birdXPosition <= pipe[i].x + 50 && (birdYPosition <= pipe[i].y + pipeHeight || birdYPosition+40 >= pipe[i].y+pipeUpPosition) || birdYPosition + 40 >= canvas.height-120;
                if (collides){
                    let gamePaused = true;
                    gameOver();
                }                 
        }
    }

    // Displays score during game
    function displayScore(){
        ct.fillStyle = "black";
        ct.font = "50px Verdana"
        ct.fillText(score,midScreen,50);
    }

    // On Space Pressed
document.addEventListener('keyup', e => {
    if (e.code === 'Space') {
      birdYPosition -= spaceSensitivity;
     
    }
  })

  // Starts the game
 function generateEverything(){


        generateBackground();
        generateBird();
        generatePipe();
        generateGround();
        displayScore();
        requestAnimationFrame(generateEverything);
}

const gameScore = document.getElementById("score");

// Ends the game
function gameOver(){
    gamePaused=true;
    startScreen.style.display="none";
    endScreen.style.display="initial";
    canvas.style.display="none";

    gameScore.innerText = score;

    //Resetting everything
    
    birdYPosition = 350;
    birdXPosition =  600;
    x=screenRightEdge-50;
    y=0;
}

