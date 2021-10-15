document.addEventListener('DOMContentLoaded',()=> {
    const squares =document.querySelectorAll(".grid div");
    let resultText = document.querySelector("#result");
    let gameArea=document.querySelector(".game-area");
    let resultBox=document.querySelector(".result-box");
    let resultBoxMass=document.querySelector(".result-box h1");
    let replayBtn =document.querySelector('#replay');
    let leftBtn =document.querySelector(".left");
    let rightBtn =document.querySelector(".right");
    let RotateBtn =document.querySelector(".rotate");
    let width = 15 ;
    let result =0 ;
    let piece =[ // [shape][direction][element]
            [[-16,-15,15],[14,-1,1],[16,15,-15],[-14,1,-1]],
            [[-14,-15,15],[-16,-1,1],[14,15,-15],[16,1,-1]],
            [[-14,1,-1,-16],[-16,-15,15,14],[-1,14,1,16],[-14,-15,15,16]],
            [[-1,1],[15,-15],[-1,1],[15,-15]],
            [[1],[-15],[-1],[15]],
            [[-1,-16,-15],[-15,-14,1],[1,15,16],[-1,14,15]],
            [[],[],[],[]]
    ];
    let centerPosition =22;
    let pieceShape =0;
    let pieceDirection=3;
    let colors =["green","red","yellow","gray","blue"];
    let colorIndex =0;
    let timer=400;
   function showNewShape(){
    // shape center 
    centerPosition=22;
    squares[centerPosition].classList.add("center");
    // shape elements
    let randShap = Math.floor(Math.random()*(piece.length));
    pieceShape=randShap;
    let randDirection = Math.floor(Math.random()*4);
    pieceDirection=randDirection;
    for (let element =0 ;element<piece[pieceShape][pieceDirection].length;element++){
        squares[piece[pieceShape][pieceDirection][element]+centerPosition].classList.add("element");
    }
   }
   showNewShape();
   function moveLeft() {
        let canMove = 1;
        if (centerPosition%15===0){
            canMove=0;
        }else if (squares[centerPosition-1].classList.contains("stoped-element")) {
            canMove=0;
        }else {
            for (let element =0 ;element<piece[pieceShape][pieceDirection].length;element++){
                let elementPosition =piece[pieceShape][pieceDirection][element]+centerPosition;
                if (elementPosition%15===0){
                    canMove=0;
                }else if (squares[elementPosition-1].classList.contains("stoped-element")){
                    canMove=0;
                }
            }
        }
        if ( canMove===1 ) {
            squares[centerPosition].classList.remove("center");
            for (let element =0 ;element<piece[pieceShape][pieceDirection].length;element++){
                squares[piece[pieceShape][pieceDirection][element]+centerPosition].classList.remove("element");
            }
            centerPosition -=1;
            squares[centerPosition].classList.add("center");
            for (let element =0 ;element<piece[pieceShape][pieceDirection].length;element++){
                squares[piece[pieceShape][pieceDirection][element]+centerPosition].classList.add("element");
            }
        }
    }
    function moveRight() {
        let canMove = 1;
        if (centerPosition%15===14){
            canMove=0;
        }else if (squares[centerPosition+1].classList.contains("stoped-element")){
            canMove=0;
        }else {
            for (let element =0 ;element<piece[pieceShape][pieceDirection].length;element++){
                let elementPosition =piece[pieceShape][pieceDirection][element]+centerPosition;
                if (elementPosition%15===14){
                    canMove=0;
                }else if (squares[elementPosition+1].classList.contains("stoped-element")){
                    canMove=0;
                }
            }
        }
        if ( canMove===1 ) {
            squares[centerPosition].classList.remove("center");
            for (let element =0 ;element<piece[pieceShape][pieceDirection].length;element++){
                squares[piece[pieceShape][pieceDirection][element]+centerPosition].classList.remove("element");
            }
            centerPosition +=1;
            squares[centerPosition].classList.add("center");
            for (let element =0 ;element<piece[pieceShape][pieceDirection].length;element++){
                squares[piece[pieceShape][pieceDirection][element]+centerPosition].classList.add("element");
            }
        }
    }
    function rotate(){
        if (!(centerPosition%15===14) && !(centerPosition%15===0)){
            for (let element =0 ;element<piece[pieceShape][pieceDirection].length;element++){
                squares[piece[pieceShape][pieceDirection][element]+centerPosition].classList.remove("element");
            }
            pieceDirection = (pieceDirection+1)%4;
            for (let element =0 ;element<piece[pieceShape][pieceDirection].length;element++){
                squares[piece[pieceShape][pieceDirection][element]+centerPosition].classList.add("element");
            }
        }
    }
    function moveDown() {
        canMove =1 ;
        if (centerPosition>15*14-1){
            canMove =0 ;
        }else if (squares[centerPosition+15].classList.contains("stoped-element")) {
            canMove =0 
        }else {
            for (let element =0 ;element<piece[pieceShape][pieceDirection].length;element++){
                let elementPosition = piece[pieceShape][pieceDirection][element]+centerPosition;
                if (elementPosition>15*14-1){
                    canMove =0 ;
                }else if (squares[elementPosition+15].classList.contains("stoped-element")){
                    canMove =0 ;
                }
            }
        }
        if (canMove===1){
            squares[centerPosition].classList.remove("center");
            for (let element =0 ;element<piece[pieceShape][pieceDirection].length;element++){
                squares[piece[pieceShape][pieceDirection][element]+centerPosition].classList.remove("element");
            }
            centerPosition +=15;
            squares[centerPosition].classList.add("center");
            for (let element =0 ;element<piece[pieceShape][pieceDirection].length;element++){
                squares[piece[pieceShape][pieceDirection][element]+centerPosition].classList.add("element");
            }
        }else {
            squares[centerPosition].classList.remove("center");
            squares[centerPosition].classList.add("stoped-element");
            for (let element =0 ;element<piece[pieceShape][pieceDirection].length;element++){
                squares[piece[pieceShape][pieceDirection][element]+centerPosition].classList.remove("element");
                squares[piece[pieceShape][pieceDirection][element]+centerPosition].classList.add("stoped-element");
            }
            checkRow();
            checkGameEnd();
            showNewShape();
        }
    }
    leftBtn.onclick = moveLeft ;
    rightBtn.onclick=moveRight;
    RotateBtn.onclick=rotate;
    document.addEventListener("keydown", function(event) {
        if(event.key=="ArrowLeft"){ moveLeft();}
        else if(event.key=="ArrowRight"){moveRight();}
        else if(event.key=="ArrowUp"){rotate();}
        else if(event.key=="ArrowDown"){moveDown();}
    });
    let gameTimer = setInterval (function(){
        moveDown();
        if (timer>50){
            timer=timer-1;
        }
    },timer);
  
    function checkRow () {
        for(let row=0;row<15;row++){
            let fullRow =1;
            for (let col=0;col<15;col++){
                let element=row*15+col ;
                if (!(squares[element].classList.contains("stoped-element"))){
                    fullRow =0;
                    col=15; 
                }
            }
            if (fullRow){
                for (let col=0;col<15;col++){
                    let element=row*15+col ;
                    squares[element].classList.remove("stoped-element")
                }
                for(let startRow=row;startRow>0;startRow--){
                    for (let col=0;col<15;col++){
                        let element=startRow*15+col ;
                        if (squares[element-15].classList.contains("stoped-element")){
                            squares[element-15].classList.remove("stoped-element");
                            squares[element].classList.add("stoped-element");
                        }
                    }
                }
                result++;
                resultText.textContent=result;
            }
        }
    }
    function checkGameEnd(){
        for (let i=0;i<15;i++){
            if (squares[i].classList.contains("stoped-element")){
                gameArea.classList.add("end");
                resultBox.classList.add("end");
                resultBoxMass.innerHTML=`Gameover! <br> <br> Your score:${result}`;
            }
        }
    }
    replayBtn.addEventListener("click", function() {
        window.location = window.location.href;
    });
})      