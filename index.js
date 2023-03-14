const canvas = document.getElementById('game'); 
const ctx = canvas.getContext('2d');

let speed; // The speed of the snake and thus the hardness of the game?
const form = document.querySelector('form');
form.addEventListener('keyup', () => {
    speed = document.querySelector('.speed').value;  
});


let tileCount = 20;
let tileSize = 18;
let headX = 10;
let headY = 10;
// initialize the speed of snake
let xvelocity = 0;
let yvelocity = 0;
// draw apple
let appleX = 5;
let appleY = 5;
// array for snake parts
const snakeParts = [];
let tailLength = 2; // initial parts of snake
// scores
let score = 0;

function clearScreen(){
    ctx.fillStyle = 'black'// make screen black
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    // black color start from 0px left, right to canvas width and canvas height
}

class snakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

function drawSnake(){
    ctx.fillStyle = "green";
    // loop through our snakeparts array
    for(let i = 0; i < snakeParts.length; i++){
        // draw snake parts
        let part = snakeParts[i]
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }
    snakeParts.push(new snakePart(headX, headY)); //put item at the end of list next to the head
}

document.body.addEventListener('keydown', keyDown);
function keyDown(event)

// up
{
    if(event.keyCode == 38){
        if(yvelocity == 1)
        return; // prevent snake from moving in opposite direction
        yvelocity = -1; // move one tile up
        xvelocity = 0;

    }
// down
    if(event.keyCode == 40){
        if(yvelocity == -1)
        return; // prevent snake from moving in opposite direction
        yvelocity = 1; // move one tile down
        xvelocity = 0;
    }

// left
    if(event.keyCode == 37){
        if(xvelocity == 1)
        return; // prevent snake from moving in opposite direction
        yvelocity = 0;
        xvelocity = -1; // move one tile left
    }
    // right
    if(event.keyCode == 39){
        if(xvelocity == -1)
        return; // prevent snake from moving in opposite direcction
        yvelocity = 0;
        xvelocity = 1; // move one tile right
    }
}



function changeSnakePosition(){
    headX = headX + xvelocity;
    headY = headY + yvelocity;
}

function drawApple(){
    ctx.fillStyle = "red"; // make apple red
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize) // position apple within tile count
}

function checkCollision(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++; // increase tail length
        score++; // oncrease our score value
    }
}

// score function
function drawScore(){
    ctx.fillStyle = "white" // set our text color to white
    ctx.font= "10px Verdana" //set font size to 10px of font family verdama
    ctx.fillText("Score: " +score, canvas.clientWidth - 50, 10); // position our score at right hand corner
}

// Game Over function
function isGameOver(){
    let gameOver = false;
    // check whether game has started
    if(yvelocity === 0 && xvelocity === 0){
        return false;
    }
    if(headX < 0){ //if snake hits left wall
        gameOver = true;
    }
    else if(headX === tileCount){ //if snake hits right wall
        gameOver = true;
    }
    else if(headY < 0){ //if snake hits wall at the top
        gameOver = true;
    }
    else if(headY === tileCount){ //if snake hits wall at the bottom
        gameOver = true;
    }

    // stop the game when snake bumps into itself

    for(let i = 0; i < snakeParts.length; i++){
         let part = snakeParts[i];
         if(part.x === headX && part.y === headY){ //check whether any part of snake is occupying the same space
             gameOver = true;
             break; // to break out of for loop
         }
    }
    // display text Game Over
    if(gameOver){
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over! ", canvas.clientWidth / 6.5, canvas.clientHeight / 2); 
        //position our text in center
    }
    return gameOver; // this will stop the execution of the drawgame method
}

function drawGame(){
    changeSnakePosition();
    // game over logic
    let result = isGameOver();
    if(result){ // if result is true stop other following function from executing
        return;
    }
    clearScreen();
    drawSnake();
    checkCollision();
    drawApple();
    drawScore();
    setTimeout(drawGame, 1000/speed); 
}

drawGame();