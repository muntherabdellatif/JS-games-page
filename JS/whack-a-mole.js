const square =document.querySelectorAll(".square");
const mole =document.querySelectorAll(".mole");
const timeLeft =document.querySelector("#time");
const score =document.querySelector("#score");
const GamePage =document.querySelector(".game-page");
const scoreCard =document.querySelector(".Total-score-card");
const TotalScore =document.querySelector("#Total-score");
const replayBtn =document.querySelector("#replay");
let counter=60;
let  result = 0;
let hitPosition;
console.log(GamePage);
console.log(scoreCard);
replayBtn.addEventListener("click", function() {
    window.location = window.location.href;
});
function randomSquare () {
    if (counter>0){
        counter--;
        timeLeft.textContent =counter ;
    }else{
        GamePage.classList.add("finished");
        scoreCard.classList.add("finished");
        TotalScore.textContent=score.textContent;
    }
    square.forEach( className => {
        className.classList.remove("mole");
    });
    let randomPosition = square[Math.floor(Math.random()*9)];
    randomPosition.classList.add("mole");
    hitPosition = randomPosition.id ;
}
randomSquare ();
square.forEach (id=>{
    id.addEventListener("mouseup",()=>{
        if (id.id === hitPosition){
            result++;
            score.textContent=result;
        }
    })
})
function moveMole () {
    let timeId= null ;
    timeId = setInterval( randomSquare ,1000);
 }
 moveMole ();