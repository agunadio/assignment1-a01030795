var arrayOfTiles = [];
var arrayOfDivs = [];
var score = 0;
var numberOfTiles = 6;
var widthBoard = 5;
var heightBoard = 5;
var turns = numberOfTiles;


$(document).ready(function () {  
        createTiles();
        createAnswers();
        playMusic();
    
})

function playMusic(){
    var source = "bensound-happiness.mp3"
    var audio = document.createElement("audio");
    //
    audio.autoplay = true;
    //
    audio.load()
    audio.addEventListener("load", function() { 
        audio.play(); 
    }, true);
    audio.src = source;
}

function goSummary(){
    console.log("hi in button");
    let x = confirm("Are you sure you want to terminate?");

    if (x == true){
        location.href = "summary.html";
    }else{
        ;
    }
    
}

function score1(){  
    turns--;

    clickSound = document.getElementById("audio");
    clickSound.play();

    if (this.classList.contains('correct')){
        score++;
        console.log(score);
        this.classList.remove('tiles');
        this.classList.remove('correct');
        this.classList.add("clickCorrect");
    }
    
    if (this.classList.contains('incorrect')){
        score--;
        console.log(score); 
        this.classList.remove('tiles');
        this.classList.add("clickIncorrect");
    }
    
    if (score <= 0){
        if(!alert('You lose! Try again!')){location.href = "summary.html";}
    }
    

    if (turns == 0){
        if (checkAnswers() == false){
            alert("you lose this round, i will lower the difficulty for you...");
            lessDifficulty();
            createTiles();
            createAnswers();
        }else{
            alert("you won this round, next round its going to be harder!!!!");
            moreDifficulty();
            createTiles();
            createAnswers();
        }
    }

    scorePoints = document.getElementById("score");
    scorePoints.innerHTML = "Score: " + score;

    turnsQuantity = document.getElementById('description');
    turnsQuantity.innerHTML = "You have " + turns + " turns left";
}   


function createTiles(){
    board = document.getElementById("board");
    board.innerHTML = '';

    turns = numberOfTiles;

    arrayOfDivs = [];
    arrayOfTiles = [];

    console.log("turns: " + turns);
    console.log("width: " + widthBoard);
    console.log("height" + heightBoard);

    scorePoints = document.getElementById("score");
    scorePoints.innerHTML = "Score: " + score;

    if (board.classList.contains('rotate')){
        board.classList.remove('rotate');
    }
            
    for (let height = 0 ; height < heightBoard; height++){
        arrayOfTiles[height] = [];       
        arrayOfDivs[height] = [];
        for (let width = 0; width < widthBoard; width++){
            arrayOfTiles[height][width] = 0;
            tile = document.createElement("div");
            tile.onclick = score1;
            //flipCardFront = document.createElement("div");
            //flipCardBack = document.createElement("div");
            tile.classList.add("tiles");
            tile.innerHTML = "&nbsp";
            //tile.append(flipCardFront);
            //tile.append(flipCardBack);
            //tile.onclick = score1;
            
            board.append(tile);
            arrayOfDivs[height][width] = tile;
            //x = document.getElementsByClassName("tiles");
            
        }
        br = document.createElement("br");
        board.append(br);
    }
    
}

function randomTiles(sizeOfBoard){
    return Math.round(Math.random() * sizeOfBoard);
}


function createAnswers(){
    for (let i = 0; i < numberOfTiles; i++){
        let x = Math.round(Math.random() * (arrayOfTiles.length - 1));
        let y = Math.round(Math.random() * (arrayOfTiles.length - 1));
        if (arrayOfTiles[x][y] == 0){
            arrayOfTiles[x][y] = 1;
        }else{
            i--;
        }
    }
   
    for (let j = 0; j < heightBoard; j++){
        for (let k = 0; k < widthBoard; k++){
            if (arrayOfTiles[j][k] == 1){
                
                //arrayOfDivs[j][k].classList.add("answer");
                window.setTimeout(function(){
                    arrayOfDivs[j][k].classList.add("answer");
                }, 500);
                window.setTimeout(function(){
                    arrayOfDivs[j][k].classList.remove("answer");
                }, 3000);

                window.setTimeout(function(){
                    document.getElementById("board").classList.remove("boardClass");
                    document.getElementById("board").classList.add("rotate");
                }, 3000);
                arrayOfDivs[j][k].classList.add('correct');
                //arrayOfDivs[j][k].onclick = score;

            }
            
            if (arrayOfTiles[j][k]==0){
                arrayOfDivs[j][k].classList.add('incorrect');
                //arrayOfDivs[j][k].onclick = score;
            }
        }
    }
    
}

function checkAnswers(){
    
    let allAnswerGone = true;
    for (let i = 0; i < arrayOfTiles.length; i++){
        var arrayOfTilesWidth = arrayOfTiles[i];
        for (let j = 0; j < arrayOfTilesWidth.length; j++){
            if (arrayOfDivs[i][j].classList.contains('correct')){
                allAnswerGone = false;
            }
       
        }
    }
    return allAnswerGone;
}

/*
function checkTilesforMoreDifficulty(){
    let isClickIncorrect = false;
    for (let i = 0; i < arrayOfTiles.length; i++){
        var arrayOfTilesWidth = arrayOfTiles[i];
        for (let j = 0; j < arrayOfTilesWidth.length; j++){
            if (arrayOfDivs[i][j].classList.contains('clickIncorrect')){
                isClickIncorrect = true;
            }
        }
    }
    return isClickIncorrect;
}


function checkTilesForLessDifficulty(){
    let isAnswer = false;
    let clickIncorrectQuantity = 0;
    for (let i = 0; i < arrayOfTiles.length; i++){
        var arrayOfTilesWidth = arrayOfTiles[i];
        for (let j = 0; j < arrayOfTilesWidth.length; j++){
            if (arrayOfDivs[i][j].classList.contains('answer')){
                isAnswer = true;
            }
        }
    }
    if (isAnswer == true && turns == 0){
        console.log("TRUEEEEEEEE");
        return true;
    }
} 
*/
function moreDifficulty(){
    let m = Math.round(Math.random() * 3);
    switch(m){
        case 0:
            numberOfTiles++;
            break;
        case 1:
            widthBoard++;
            break;
        case 2:
            heightBoard++;
            break;
    }
}

function lessDifficulty(){
    if (widthBoard == 5 && heightBoard == 5 && numberOfTiles == 5){
        console.log("lowest difficulty");
        return false;
    }
    if (widthBoard == 5 && heightBoard == 5){
        numberOfTiles--;
    }else if (widthBoard == 5){
        let m = Math.round(Math.random() * 2);
        switch(m){
            case 0:
                numberOfTiles--;
                break;
            case 1:
                heightBoard--;
                break;

    }
    }else if (heightBoard == 5){
        let m = Math.round(Math.random() * 2);
        switch(m){
            case 0:
                numberOfTiles--;
                break;
            case 1:
                widthBoard--;
                break;   
    }
    }else{
        let m = Math.round(Math.random() * 3);
        switch(m){
            case 0:
                numberOfTiles--;
                break;
            case 1:
                widthBoard--;
                break;
            case 2:
                heightBoard--;
                break;
        }
    }

}
