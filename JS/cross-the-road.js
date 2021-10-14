document.addEventListener('DOMContentLoaded',()=> {
    const squares =document.querySelectorAll(".grid div");
    let resultText = document.querySelector("#result");
    let gameArea=document.querySelector(".game-area");
    let resultBox=document.querySelector(".result-box");
    let resultBoxMass=document.querySelector(".result-box h1");
    let replayBtn =document.querySelector('#replay');
    let leftBtn =document.querySelector(".left");
    let rightBtn =document.querySelector(".right");
    let width = 15 ;
    let direction =1;
    let result =0 ;
    let gameTimer = setInterval (moveInvaders,400);
    replayBtn.addEventListener("click", function() {
        window.location = window.location.href;
    });
})  