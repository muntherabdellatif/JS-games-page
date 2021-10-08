document.addEventListener('DOMContentLoaded',()=> {
    const squares =document.querySelectorAll(".grid div");
    const resultBox =document.querySelector("#result");
    const result =document.querySelector("#result h1");
    const currentPlayer =document.querySelector("#player");
    const gameContainer =document.querySelector(".game-containt");
    let replayBtn =document.querySelector("#replay")
    let currentPlayerNumber =1;

    for(let i=0; i<squares.length ;i++){
        ( function(index){
            squares[i].onclick = function () {
                if (squares[index+7]){ // upper row
                       /*check square bellow*/
                    if (squares[index+7].classList.contains("taken") && !squares[index].classList.contains("taken")){
                        if(currentPlayerNumber===1) {
                            squares[index].classList.add("taken");
                            squares[index].classList.add("player-one");
                            /*change the player*/
                            currentPlayerNumber=2;
                            currentPlayer.textContent="2";
                        }else if (currentPlayerNumber===2){
                            squares[index].classList.add("taken");
                            squares[index].classList.add("player-two");
                            /*change the player*/
                            currentPlayerNumber=1;
                            currentPlayer.textContent="1";
                        }
                    }
                }else if(!squares[index+7] && !squares[index].classList.contains("taken") ) { // last row
                    if(currentPlayerNumber===1) {
                        squares[index].classList.add("taken");
                        squares[index].classList.add("player-one");
                        /*change the player*/
                        currentPlayerNumber=2;
                        currentPlayer.textContent="2";
                    }else if (currentPlayerNumber===2){
                        squares[index].classList.add("taken");
                        squares[index].classList.add("player-two");
                        /*change the player*/
                        currentPlayerNumber=1;
                        currentPlayer.textContent="1";
                    }
                }
            } 
        })(i);
        // check board for win or lose 
        function checkBoard() {
            const winningArrays = [
                [41,34,27,20],[40,33,26,19],[39,32,25,18],[38,31,24,17],[37,30,23,16],[36,29,22,15],[35,28,21,14],
                [34,27,20,16],[33,26,19,12],[32,25,18,11],[31,24,17,10],[30,23,16,9],[29,22,15,8],[28,21,14,7],
                [27,20,13,6],[26,19,12,5],[25,18,11,4,],[24,17,10,3],[23,16,9,2],[22,15,8,1],[21,14,7,0],
                [41,40,39,38],[34,33,32,31],[27,26,25,24],[20,19,18,17],[13,12,11,10],[6,5,4,3],
                [40,39,38,37],[33,32,31,30],[26,25,24,23],[19,18,17,16],[12,11,10,9],[5,4,3,2],
                [39,38,37,36],[32,31,30,29],[25,24,23,22],[18,17,16,15],[11,10,9,8],[4,3,2,1],
                [38,37,36,35],[31,30,29,28],[24,23,22,21],[17,16,15,14],[10,9,8,7],[3,2,1,0],
                [38,32,26,20],[37,31,25,19],[36,30,24,18],[35,29,23,17],
                [31,25,19,13],[30,24,18,12],[29,23,17,11],[28,22,16,10],
                [24,18,12,6],[23,17,11,5],[22,16,10,4],[21,15,9,3],
                [38,30,22,14],[39,31,23,15],[40,32,24,16],[41,33,25,17],
                [31,23,15,7],[32,24,16,8],[33,25,17,9],[33,25,17,9],[34,26,18,10],
                [24,16,8,0],[25,17,9,1],[26,18,10,2],[27,19,1,3]
            ]
            // take the 4 value in each winning array 
            for (let y=0;y<winningArrays.length;y++){
                const square1=squares[winningArrays[y][0]];
                const square2=squares[winningArrays[y][1]];
                const square3=squares[winningArrays[y][2]];
                const square4=squares[winningArrays[y][3]];
                if(square1.classList.contains("player-one") &&
                   square2.classList.contains("player-one") && 
                   square3.classList.contains("player-one") &&
                   square4.classList.contains("player-one") ) {
                    resultBox.classList.add("end");
                    gameContainer.classList.add("end");
                    result.textContent="player 1 wins!";
                   }else if ( square1.classList.contains("player-two") &&
                              square2.classList.contains("player-two") && 
                              square3.classList.contains("player-two") &&
                              square4.classList.contains("player-two")){
                    result.textContent="player 2 wins!";  
                    resultBox.classList.add("end");  
                    gameContainer.classList.add("end");
                }

            }
        }
    }
    squares.forEach(square=>square.addEventListener("click",checkBoard))
    replayBtn.addEventListener("click", function() {
        window.location = window.location.href;
    });
});