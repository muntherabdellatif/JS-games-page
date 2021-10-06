document.addEventListener('DOMContentLoaded',()=> {
    // card icon 
    const cardArray = [
        {
            name : "mask",
            icon :'fas fa-theater-masks'
        },
        {
            name : "car" ,
            icon : 'fas fa-car-side'
        },
        {
            name : "cat",
            icon : 'fas fa-cat'
        },
        {
            name : "home",
            icon :'fas fa-home'
        },
        {
            name : "themeisle",
            icon :'fab fa-themeisle'
        },
        {
            name : "flag",
            icon :'fab fa-font-awesome-flag'
        },
        {
            name : "man",
            icon :'fas fa-user-alt'
        },
        {
            name : "tree",
            icon :'fas fa-tree'
        },
        {
            name : "gem",
            icon :'fas fa-gem'
        },
        {
            name : "ball",
            icon :'fas fa-football-ball'
        },
        {
            name : "plane",
            icon :'fas fa-plane'
        },
        {
            name : "puzzle",
            icon :'fas fa-puzzle-piece'
        },
        {
            name : "mask",
            icon :'fas fa-theater-masks'
        },
        {
            name : "car" ,
            icon : 'fas fa-car-side'
        },
        {
            name : "cat",
            icon : 'fas fa-cat'
        },
        {
            name : "home",
            icon :'fas fa-home'
        },
        {
            name : "themeisle",
            icon :'fab fa-themeisle'
        },
        {
            name : "flag",
            icon :'fab fa-font-awesome-flag'
        },
        {
            name : "man",
            icon :'fas fa-user-alt'
        },
        {
            name : "tree",
            icon :'fas fa-tree'
        },
        {
            name : "gem",
            icon :'fas fa-gem'
        },
        {
            name : "ball",
            icon :'fas fa-football-ball'
        },
        {
            name : "plane",
            icon :'fas fa-plane'
        },
        {
            name : "puzzle",
            icon :'fas fa-puzzle-piece'
        }
    ];
    cardArray.sort(()=>0.5 - Math.random());
    let player =0;
    let playerText =document.querySelector(".player");
    const result1 = document.querySelector("#result1");
    const result2 = document.querySelector("#result2");
    let player1Result =0;
    let player2Result =0;
    const grid =document.querySelector(".grid");
    var cardChoosen = []; 
    var cardChoosenId = []; 
    var cardWon = [] ;

    function creatBoard() {
        for (let i=0 ;i<cardArray.length ; i++){
            var card =document.createElement("div");
            card.setAttribute("class","card blank");
            card.setAttribute("data-id",i);
            card.addEventListener("click",flipCard);
            grid.appendChild(card);
        }
    }
    creatBoard();

    // flip card 
    function flipCard () {
        var cardId =this.getAttribute("data-id");
        cardChoosen.push(cardArray[cardId].name);
        cardChoosenId.push(cardId);
        let lastClass =this.getAttribute("class");
        this.setAttribute("class",cardArray[cardId].icon + " " + lastClass );
        this.classList.remove("blank");
        if (cardChoosen.length === 2){
            setTimeout(checkForMatch,500);
        }
        console.log(cardChoosen) ;
        console.log ("choosen card :",cardChoosen);
    }
    // check For Match
    function checkForMatch () {
        player=!player ;
        if (player==0){
            playerText.innerHTML ="player 1";
        }else {
            playerText.innerHTML ="player 2"; 
        }
        var cards=document.querySelectorAll(".card");
        const optionOneId =cardChoosenId[0];
        const optionTwoId =cardChoosenId[1];
        if (cardChoosen[1] === cardChoosen[0]) {
            alert ("you found a match") ;
            if (player==0){
                cards[optionOneId].classList.add("choosen1");
                cards[optionTwoId].classList.add("choosen1");
                player2Result++;
            }else {
                cards[optionOneId].classList.add("choosen2");
                cards[optionTwoId].classList.add("choosen2");
                player1Result++;
            }
            cardWon.push(cardChoosen);
        }else {
            cards[optionOneId].classList.add("blank");
            cards[optionTwoId].classList.add("blank");
            alert ("Sorry, try again") ;
        }
        cardChoosen= [];
        cardChoosenId=[];
        result1.textContent = "player 1 score " + player1Result;
        result2.textContent = "player 2 score " + player2Result;
    }
})
