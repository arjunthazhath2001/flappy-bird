/////// THE BELOW ARE THE VARIABLES NEEDED FOR THE BACKGROUND//////

let board; //to get hold of the canvas dom element
let boardWidth =360;  //once the canvas dom element is captured we can set height and width for it
let boardHeight =540;
let context;    //this context variable is used to draw things on the board


///NOW LETS SET VARIABLES FOR OUR BIRD ///////
//WHENEVER PLACING AN OBJECT IN THE SCREEN YOU HAVE TO MENTION 4 THINGS-  WIDTH, HEIGHT, X, Y COORDINATES
let birdImage;
let birdWidth= 40;
let birdHeight= 40;
let birdX= boardWidth/8;
let birdY= boardHeight/2;


//lets convert the above variables into an object for ease of use

let bird= {
    x:birdX,
    y:birdY,
    width:birdWidth,
    height:birdHeight
}


///NOW LETS SET VARIABLES FOR THE PIPES. Mind u we had only one bird and one background. But now we have multiple pipes and we should show them in an array  ///////

let pipeArray=[];
let pipeWidth= 64;
let pipeHeight= 460;
let pipeX = boardWidth; //starting from 360, at the top right, since y is 0. so pipe will be outside of the canvas box
let pipeY = 0


//to draw the pipe we need to load the images first. We will have 2 pipes. one at the top and the other at the bottom.

let topPipeImg;
let bottomPipeImg;


//physics
let velocityX= -2 ;//pipes moving left speed
let velocityY= 0 ;//bird jump speed
let gravity = 0.4;



////////// BELOW IS THE SETTINGS/FUNCTION FOR THE BOARD //////////
window.onload = function(){
    board= document.getElementById('board');
    board.height = boardHeight;
    board.width = boardWidth;
    context= board.getContext("2d");  // this allows u to draw on the board. if this was not there, then only the background image will exist u cant draw any box or lines or images on top of the background 

    //now the bird context --this is just to get an idea of where we are going to place the image. once the image is plaved the below 2 lines of code is not necessary. u can comment it out.

    // context.fillStyle= "green";
    // context.fillRect(bird.x,bird.y,bird.width,bird.height)


    //now lets fill in the green box with the actual image
    birdImage= new Image();     //create a new image object
    birdImage.src="./angrybird.png";   //this is like an async operation. so only once its loaded we can drawImage on the canvas
    birdImage.onload= function(){
        context.drawImage(birdImage,bird.x,bird.y,bird.width,bird.height);
    }


    topPipeImg= new Image();
    topPipeImg.src= "./toppipe.png"

    bottomPipeImg = new Image();
    bottomPipeImg.src="./bottompipe.png"


    requestAnimationFrame(update)
    setInterval(placePipes,1500)        //every 1.5 seconds this places a new pipe

    document.addEventListener("keydown",moveBird)


}



//this is gonna redraw the canvas over and over again. its our main game loop
function update(){
    
    requestAnimationFrame(update);      
    context.clearRect(0,0, boardWidth, boardHeight); //everytime when we redraw on canvas, we have to clear the previous frame to prevent stacking of frames

    //as user input comes the bird image has to be redrawn again and again based on the new y-axis. INFACT THE PIPES IS WHAT THE MOVES. Not the bird.

    //bird updation
    velocityY += gravity
    bird.y = Math.max(bird.y + velocityY, 0);    
    context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height)

    //pipe updation
    for (let i=0; i<pipeArray.length; i++){
        let pipe= pipeArray[i]
        pipe.x += velocityX
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height) //we need to keep changing the x-axis of the pipe.
    }
}


//every 1.5 seconds a new pipe will be generated 
function placePipes(){
    let randomPipeY = pipeY - (pipeHeight/4) - Math.random()*(pipeHeight/2) ;
    let openingSpace = boardHeight/4
    let topPipe={
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    pipeArray.push(topPipe)

    let bottomPipe={
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight+ openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false,
    }

    pipeArray.push(bottomPipe)
}



function moveBird(e){
    if(e.code=="Space" || e.code== "ArrowUp" || e.code== "KeyX"){

        velocityY= -6
    }
}