let img = document.querySelector(".img-container img");
var downCounter;
let imgName=document.querySelectorAll(".game-text h3");
let gameCount = imgName.length;
let curentGameIndex = 0;
startCounter( );
let currntImgName = imgName[0];
function startCounter( ) {
    downCounter =setInterval(() => {
        curentGameIndex++;
        if(curentGameIndex>= gameCount){
            curentGameIndex=0;
        }
        if (imgName[curentGameIndex].textContent != ""){
            img.src = "img/" + imgName[curentGameIndex].textContent +".PNG";
        }
    }, 1000);
}
for (var i = 0; i < gameCount; i++) {
  document.querySelectorAll(".game-box ")[i].addEventListener("mouseover", function() {
    var thisImg = this.querySelector(".game-text h3").textContent;
    if (thisImg != "") {
        img.src = "img/" + thisImg +".PNG";
    }
  });
}