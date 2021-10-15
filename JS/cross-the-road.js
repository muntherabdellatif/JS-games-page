document.addEventListener('DOMContentLoaded',()=> {
    const squares =document.querySelectorAll(".grid div");
    let resultText = document.querySelector("#result");
    let gameArea=document.querySelector(".game-area");
    let resultBox=document.querySelector(".result-box");
    let resultBoxMass=document.querySelector(".result-box h1");
    let replayBtn =document.querySelector('#replay');
    let leftBtn =document.querySelector(".left");
    let rightBtn =document.querySelector(".right");
    let controlUp =document.querySelector(".control .up");
    let controlLeft =document.querySelector(".control .left");
    let controlRight =document.querySelector(".control .right");
    let controlDown =document.querySelector(".control .down");
    let manId=202;
    squares[manId].classList.add("man");
    let width = 15 ;
    let cars=[[0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0] ];
    let direction =1;
    let result =0 ;
    let rowsStart=[15,30,45,60,90,105,120,150,165,180];
    let rowEnd =rowsStart.map((e)=>e+width-1);
    let rowMoveingDirction = [1,1,0,0,1,1,1,0,0,0] ; // 1:right and 0:left
    let gameTimer = setInterval (moveCars,400);
    showCars();
    function showCars () {
        for (let row=0;row<rowsStart.length;row++){
            for (let rand=0;rand<7;rand++){
                cars[row][rand]=Math.floor(Math.random()*(width-1)+rowsStart[row]);
                if (rowMoveingDirction[row]===1){
                    squares[cars[row][rand]].classList.add("car-right");
                }else {
                    squares[cars[row][rand]].classList.add("car-left");
                }
            }
        }
    }
    function moveCars () {
        for (let row=0;row<rowsStart.length;row++){
            for(let car=0;car<7;car++){
                if (rowMoveingDirction[row]===1){
                    squares[cars[row][car]].classList.remove("car-right");
                }else {
                    squares[cars[row][car]].classList.remove("car-left");
                }
                if(rowMoveingDirction[row]===0){ //left
                    if (cars[row][car]>rowsStart[row]){
                        cars[row][car] -=1;
                    }else {
                        cars[row][car] +=14;
                    }
                }else { // right
                    if (cars[row][car]<rowEnd[row]){
                        cars[row][car] +=1;
                    }else {
                        cars[row][car] -=14;
                    }
                }
                if (rowMoveingDirction[row]===1){
                    squares[cars[row][car]].classList.add("car-right");
                }else {
                    squares[cars[row][car]].classList.add("car-left");
                }
            }
        }
        // lose
        if (squares[manId].classList.contains("car-left") || squares[manId].classList.contains("car-right")){
            gameArea.classList.add("end");
            resultBox.classList.add("end");
            squares[manId].classList.add("boom");
            resultBoxMass.textContent="you lose!"
        }
        // win 
        if (manId<15){
            gameArea.classList.add("end");
            resultBox.classList.add("end");
            resultBoxMass.textContent="you win!"
        }
    }
    document.addEventListener("keydown", function(event) {
        squares[manId].classList.remove("man");
        if(event.key=="ArrowDown"){
            if (manId<(15*14)){
                manId +=15;
            }
        }else if(event.key=="ArrowUp"){
            if (manId>14){
                manId -=15;
            }
        }else if(event.key=="ArrowLeft"){
            if (manId%15>0){
                manId -=1;
            }
        }else if(event.key=="ArrowRight"){
            if (manId%15<14){
                manId +=1;
            }
        }
        squares[manId].classList.add("man");
        // win 
        if (manId<15){
            gameArea.classList.add("end");
            resultBox.classList.add("end");
            resultBoxMass.textContent="you win!"
        }
    });
    controlUp.onclick = function() {
        squares[manId].classList.remove("man");
        if (manId>14){
            manId -=15;
        }
        squares[manId].classList.add("man");
    }
    controlLeft.onclick = function() {
        squares[manId].classList.remove("man");
        if (manId%15>0){
            manId -=1;
        }
        squares[manId].classList.add("man");
    }
    controlRight.onclick = function() {
        squares[manId].classList.remove("man");
        if (manId%15<14){
            manId +=1;
        }
        squares[manId].classList.add("man");
    }
    controlDown.onclick = function() {
        squares[manId].classList.remove("man");
        if (manId<(15*14)){
            manId +=15;
        }
        squares[manId].classList.add("man");
    }
    replayBtn.addEventListener("click", function() {
        window.location = window.location.href;
    });
})  