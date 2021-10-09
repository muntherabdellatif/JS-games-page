document.addEventListener('DOMContentLoaded',()=> {
    let square =document.querySelectorAll(".square");
    let scoreBox =document.querySelector(".score-box");
    let gameContent =document.querySelector(".game-content");
    let score =document.querySelector("#score");
    let controlUp =document.querySelector(".control .up");
    let controlLeft =document.querySelector(".control .left");
    let controlRight =document.querySelector(".control .right");
    let controlDown =document.querySelector(".control .down");
    const replayBtn =document.querySelector("#replay");
    let sankeArray = [55,65];
    let lastDirection = "up";
    let moveDirection = "up";
    let foodIndex ;
    showFood ();
    // giv squares id 
    for (let i=0 ; i<square.length ; i++){
        square[i].setAttribute("id",i); 
    }
    // timer 
    let timer =setInterval (()=> {
        showSnack();
        snackGrow ();
        if (moveDirection==="left"){moveLeft();}
        else if (moveDirection==="right"){moveRight();}
        else if (moveDirection==="up"){moveUp();}
        else if (moveDirection==="down"){moveDown();}
        chechIfSnackCollide();
    },300) ;
    // show the snack
    function showSnack () {
        for ( let i=0;i<square.length;i++){
            square[i].classList.remove("snake");
        }
        for (let i=0 ;i<sankeArray.length;i++){
            square[sankeArray[i]].classList.add("snake");
        }
    }
    // show food 
    function showFood () {
        let done=0;
        while (!done){
            done=1;
            let randomIndex =Math.floor(Math.random()*100);
            for (let i=0;i<sankeArray.length;i++){
                if (randomIndex === sankeArray[i]){
                    done=0;
                }
            } 
            if (done===1){
                foodIndex=randomIndex;
                square[foodIndex].classList.add("food");
            }
        }
    }
    // move snacks left 
    function moveRight (){
        if (sankeArray[1]-sankeArray[0] !==1){
            lastDirection="right";
            for (let i=sankeArray.length-1; i>0 ;i--){
                sankeArray[i]=sankeArray[i-1];
            }
            let tens = (sankeArray[0])/10;
            sankeArray[0]++;
            if (Math.floor(tens) < Math.floor((sankeArray[0])/10) ) {sankeArray[0] -=10;}
        }else {
            moveDirection=lastDirection;
        }
    }
    // move snacks right 
    function moveLeft (){
        if (sankeArray[0]-sankeArray[1] !==1){
            lastDirection="left";
            for (let i=sankeArray.length-1; i>0 ;i--){
                sankeArray[i]=sankeArray[i-1];
            }
            let tens = (sankeArray[0])/10;
            sankeArray[0]--;
            if (Math.floor(tens) > Math.floor((sankeArray[0])/10) ) {sankeArray[0] +=10;}
        }else {
            moveDirection=lastDirection;
        }
    }
    // move snacks down  
    function moveDown (){
        if (sankeArray[1]-sankeArray[0] !==10){
            lastDirection="down";
            for (let i=sankeArray.length-1; i>0 ;i--){
                sankeArray[i]=sankeArray[i-1];
            }
            sankeArray[0]+=10;
            if (Math.floor(sankeArray[0]/100)===1) {sankeArray[0] -=100;}
        }else {
            moveDirection=lastDirection;
        }
    }
    // move snacks up  
    function moveUp (){
        if (sankeArray[0]-sankeArray[1] !==10){
            lastDirection="up";
            for (let i=sankeArray.length-1; i>0 ;i--){
                sankeArray[i]=sankeArray[i-1];
            }
            sankeArray[0]-=10;
            if (sankeArray[0]<0) {sankeArray[0] +=100;}
        }else {
            moveDirection=lastDirection;
        }
    }
    // keyboard 
    document.addEventListener("keydown", function(event) {
        if(event.key=="ArrowDown"){
            moveDirection="down";
        }else if(event.key=="ArrowUp"){
            moveDirection="up";
        }else if(event.key=="ArrowLeft"){
            moveDirection="left";
        }else if(event.key=="ArrowRight"){
            moveDirection="right";
        }
      });
      function chechIfSnackCollide() {
          for(let i=1;i<sankeArray.length;i++){
            if (sankeArray[i]===sankeArray[0]){
                scoreBox.classList.add("end");
                gameContent.classList.add("end");
                score.textContent=sankeArray.length;
                moveDirection="stop";
            }
          }
      }
      // control button 
      controlUp.onclick = function() {
        moveDirection="up";
      }
      controlLeft.onclick = function() {
        moveDirection="left";
      }
      controlRight.onclick = function() {
        moveDirection="right";
      }
      controlDown.onclick = function() {
        moveDirection="down";
      }
      // check if food was eaten
      function snackGrow () {
        if ((moveDirection==="right" && foodIndex-sankeArray[0]===1 ||
             moveDirection==="left" && sankeArray[0]-foodIndex===1  ||
             moveDirection==="up" && sankeArray[0]-foodIndex===10   ||
             moveDirection==="down" && foodIndex-sankeArray[0]===10 ||
             moveDirection==="up" && foodIndex-sankeArray[0]===90  ||
             moveDirection==="down" && sankeArray[0]-foodIndex===90||
             moveDirection==="right" && sankeArray[0]-foodIndex===9 ||
             moveDirection==="left" && foodIndex-sankeArray[0]===9 )){
            square[foodIndex].classList.remove("food");
            sankeArray.push(foodIndex);
            showFood();
        }
      }
      replayBtn.addEventListener("click", function() {
        window.location = window.location.href;
    });
});