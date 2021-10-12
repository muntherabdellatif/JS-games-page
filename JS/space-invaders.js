document.addEventListener('DOMContentLoaded',()=> {
    const squares =document.querySelectorAll(".grid div");
    let resultText = document.querySelector("#result");
    let gameArea=document.querySelector(".game-area");
    let resultBox=document.querySelector(".result-box");
    let resultBoxMass=document.querySelector(".result-box h1");
    let replayBtn =document.querySelector('#replay')
    let width = 15 ;
    let currentShooterIndex = 202 ;
    let currentInvadersIndex =4 ;
    let alienInvaderTakenDown = [];
    let direction =0;
    let result =0 ;
    let invaderId ;
    let alienInvaders=[0,1,2,3,4,5,6,7,8,9,10,
                         15,16,17,18,19,20,21,22,23,24,25,
                         30,31,32,33,34,35,36,37,38,39,40];
    // adding invaders 
    alienInvaders.forEach (invader=> squares[currentInvadersIndex+invader].classList.add("invader"));
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
    // keydown 
    document.addEventListener("keydown",moveShooter);
    // move invaders
    function moveInvaders () {
        const leftEdge = currentInvadersIndex%width===1  ;
        const rightEdge = currentInvadersIndex%width===3 ;
        console.log(currentInvadersIndex)
        if (direction === 0) { //go left
            // remove all 
            removeAll ();
            // move index
            currentInvadersIndex--;
            // add alien
            alienInvaders.forEach (invader=> squares[currentInvadersIndex+invader].classList.add("invader"));
            if (leftEdge){direction=2;}
        }else if (direction === 1){ //go right
            // remove all 
            removeAll ();
            // move index
            currentInvadersIndex++;
            // add alien
            alienInvaders.forEach (invader=> squares[currentInvadersIndex+invader].classList.add("invader"));
            if (rightEdge){direction=3;}
        }else if (direction === 2 || direction === 3){ //go down
            // remove all 
            removeAll ();
            // move index
            currentInvadersIndex+=15;
            // add alien
            alienInvaders.forEach (invader=> squares[currentInvadersIndex+invader].classList.add("invader"));
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
        if(currentInvadersIndex >(squares.length-2*(width-1))){
            resultBoxMass.innerHTML="game over";
            resultBox.classList.add("end");
            gameArea.classList.add("end");
            direction=4;
        }
    }
    // remove all 
    function removeAll () {
        squares.forEach (e=>{
            e.classList.remove("invader")
        })
    }
    let gameTimer = setInterval (moveInvaders,200);
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
            currentLaserIndex -=width ;
            squares[currentLaserIndex].classList.add("laser");
            if (squares[currentLaserIndex].classList.contains("invader")){

            }
        }
    }
})