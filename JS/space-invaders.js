document.addEventListener('DOMContentLoaded',()=> {
    const squares =document.querySelectorAll(".grid div");
    let resultText = document.querySelector("#result");
    let gameArea=document.querySelector(".game-area");
    let resultBox=document.querySelector(".result-box");
    let resultBoxMass=document.querySelector(".result-box h1");
    let replayBtn =document.querySelector('#replay');
    let leftBtn =document.querySelector(".left");
    let rightBtn =document.querySelector(".right");
    let shootBtn =document.querySelector(".shoot");
    let shootKey=0;
    let width = 15 ;
    let currentShooterIndex = 202 ;
    let direction =1;
    let result =0 ;
    let alienInvaders=[0,1,2,3,4,5,6,7,8,9,10,
                         15,16,17,18,19,20,21,22,23,24,25,
                         30,31,32,33,34,35,36,37,38,39,40];
    // adding invaders 
    alienInvaders.forEach (invader=> squares[invader].classList.add("invader"));
    // adding shooter
    squares[currentShooterIndex].classList.add("shooter");
    // move shooter 
    function moveShooter(e) {
        squares[currentShooterIndex].classList.remove("shooter");
        switch(e.key) {
            case ("ArrowLeft"):
                if (currentShooterIndex%width !==0){
                    currentShooterIndex -=1; 
                }
                break ;
            case  ("ArrowRight"):
                if (currentShooterIndex%width <width-1){
                    currentShooterIndex +=1;
                }
                break ;
        }
        squares[currentShooterIndex].classList.add("shooter");   
    }
    leftBtn.onclick =function() {
        squares[currentShooterIndex].classList.remove("shooter");
        if (currentShooterIndex%width !==0){
            currentShooterIndex -=1; 
        }
        squares[currentShooterIndex].classList.add("shooter");   
    }
    rightBtn.onclick =function() {
        squares[currentShooterIndex].classList.remove("shooter");
        if (currentShooterIndex%width !==0){
            currentShooterIndex +=1; 
        }
        squares[currentShooterIndex].classList.add("shooter");   
    }
    // keydown 
    document.addEventListener("keydown",moveShooter);
    // move invaders
    function moveInvaders () {
        console.log(alienInvaders);
        const leftEdge = alienInvaders[0]%width===1  ;
        const rightEdge = alienInvaders[0]%width===3 ;
        if (direction === 0) { //go left
            removeAll ();
            for (let i=0;i<alienInvaders.length;i++){
                alienInvaders[i]-=1;
                squares[alienInvaders[i]].classList.add("invader");
            }
            if (leftEdge){direction=2;}
        }else if (direction === 1){ //go right
            removeAll ();
            for (let i=0;i<alienInvaders.length;i++){
                alienInvaders[i]+=1;
                squares[alienInvaders[i]].classList.add("invader");
            }
            if (rightEdge){direction=3;}
        }else if (direction === 2 || direction === 3){ //go down
            removeAll ();
            for (let i=0;i<alienInvaders.length;i++){
                alienInvaders[i]+=15;
                squares[alienInvaders[i]].classList.add("invader");
            }
            if (direction==2) direction=1;
            if (direction==3) direction=0;
        }
        // decide a game is over 
        if (squares[currentShooterIndex].classList.contains("invader","shooter")){
            resultBoxMass.innerHTML="game over";
            resultBox.classList.add("end");
            gameArea.classList.add("end");
            squares[currentShooterIndex].classList.add("boom");
            direction=4;
        }
        for (let i=0 ;i<alienInvaders.length ; i++){
            if(alienInvaders[i] >(15*14)){
                resultBoxMass.innerHTML="game over";
                resultBox.classList.add("end");
                gameArea.classList.add("end");
                direction=4;
            }
        }
    }
    // remove all 
    function removeAll () {
        squares.forEach (e=>{
            e.classList.remove("invader")
        })
    }
    let gameTimer = setInterval (moveInvaders,400);
    replayBtn.addEventListener("click", function() {
        window.location = window.location.href;
    });
    //shoot at aliens 
    function shoot(e) {
        let laserId ;
        let currentLaserIndex = currentShooterIndex;
        // move laser 
        function MoveLaser () {
            squares[currentLaserIndex].classList.remove("laser");
            if (currentLaserIndex>width) {
                currentLaserIndex -=width ;
            }else {
                // squares[currentLaserIndex].classList.remove(laser);
                clearInterval(laserId);
            }
            squares[currentLaserIndex].classList.add("laser");
            if (squares[currentLaserIndex].classList.contains("invader")){
                squares[currentLaserIndex].classList.remove("laser");
                squares[currentLaserIndex].classList.remove("invader");
                squares[currentLaserIndex].classList.add("boom");
                setTimeout(()=>squares[currentLaserIndex].classList.remove("boom"),500);
                clearInterval(laserId);
                for ( let i =0 ;i<alienInvaders.length;i++){
                   if (alienInvaders[i]===currentLaserIndex) {
                    alienInvaders.splice(i,1);
                   }
                }
                result++;
                resultText.textContent = result;
                if(alienInvaders.length===0) {
                    resultBoxMass.innerHTML="You win";
                    resultBox.classList.add("end");
                    gameArea.classList.add("end");
                }
            }
        }
        if(shootKey===1 ){ 
            laserId=setInterval(MoveLaser,100);
            shootKey=0;
        }else if(e.key==="Enter") {
            laserId=setInterval(MoveLaser,100);
            shootKey=0;
        }  
    }
    document.addEventListener("keyup",shoot);
    shootBtn.onclick = function () {
        console.log("shoot");
        shootKey=1;
        shoot();
    }
})      