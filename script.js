const ticTacToe = (() => {
    let gameEnebled = true;
    window.onload = function () {
        if(players.computer.active === "yes" && players.computer.start === "yes") {
           computer.modes();
        }
    }
    const Gameboard = {
        gameboard: Array.from(document.getElementsByClassName("cell")),
        remainingCellId: (() => { 
            let allCells = []
            for (let i = 1; document.querySelectorAll(".cell").length + 1 > i; i++) {
                        allCells.push(`cell${i}`);                        
                    }
                    return {allCells}
                })(),
        cellsClickedNr: [],
        XandOhistory: [],
        cellsClickedId: [],
        lastClickedCellNr: []
    };
    const players = new function () {        
        this.start = "player1";
        this.computer = {
            active: "yes",
            start: "yes",
            mode: "easy"
        };
        this.player1 = "o";
        this.player2 = (() => {
            if (this.player1 === "x") {
                return "o";
            } else {
                return "x";
            }          
        })();
    
    };
    
    clickableSquares = {
        squares: Gameboard.gameboard.forEach((element) => {
            element.addEventListener("click", () => {
                 if (gameEnebled === true) {
                 gameFlow.XandO(element);
                                     
                 }
            })
        }) 
    }
    const computer = {
            modes: function() {
                
                if (players.computer.active === "yes") {                
                    let remainingCells = (() => { 
                    let lastClickedId  = Gameboard.cellsClickedId[Gameboard.cellsClickedId.length - 1]                
                    for (let j = 0; Gameboard.remainingCellId.allCells.length > j; j++) {
                                if(lastClickedId == Gameboard.remainingCellId.allCells[j])
                                Gameboard.remainingCellId.allCells.splice(j, 1);                            
                            }
                })();
                easy = (() => {
                    if (players.computer.mode === "easy" && players.computer.start === "yes") {
                        let leftChoices = Gameboard.remainingCellId.allCells.length;                    
                        let randomNr = Math.floor(Math.random()*leftChoices);
                        let randomChoice = Gameboard.remainingCellId.allCells[randomNr];
                        let randomChoiceArr = Gameboard.gameboard.find(x => x.id === randomChoice)
                        if(Gameboard.XandOhistory.length === 0 || Gameboard.XandOhistory.length % 2 === 0 && gameEnebled === true) {
                            gameFlow.XandO(randomChoiceArr);
                            
                        }

                    }
                    })()
                }
            }
        }



    const gameFlow = {
        XandO: function (element) {
            const startingInput = players[players.start];                      
            let history = Gameboard.XandOhistory;            
            const x = "\u2718";
            const o = "\u2D54";
            if (startingInput === "x" && history.length === 0) {
                element.innerHTML = x;  
                Gameboard.XandOhistory.push("x");                
            } else if (startingInput === "o" && history.length === 0) {
                element.innerHTML = o;           
                element.style.color= "red";
                Gameboard.XandOhistory.push("o");              
            };
            if (element.innerText === "" && history[history.length -1] === "o"
            && gameEnebled === true) {
                element.innerHTML = x;
                Gameboard.XandOhistory.push("x");                  
              
            } else if (element.innerText === "" && history[history.length -1] === "x"
            && gameEnebled === true) {
                element.innerHTML = o;
                element.style.color= "red";                            
                Gameboard.XandOhistory.push("o");
            }
            Gameboard.cellsClickedId.push(element.getAttribute("id"));
            lastClickedCellNrSquare();
            victory();  
            computer.modes();
                    
            
        }
        
    };
    
    const lastClickedCellNrSquare = () => {
        let lastCell = Gameboard.cellsClickedId[Gameboard.cellsClickedId.length - 1]
                let i = 0;
                Gameboard.lastClickedCellNr = (() => {
                for (i; Gameboard.gameboard.length > i; i++) {
                    if(Gameboard.gameboard[i].id === lastCell) {
                        Gameboard.cellsClickedNr.push(i)
                        return i        
                    } 
                }
                })();                         
    };
    let WinningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3 ,6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
        
    const victory = () => {
        let win = (() => {
            for (let i = 0; WinningCombinations.length > i; i++) {
                for (let j = 0; WinningCombinations[i].length > j; j++){
                    if (WinningCombinations[i][j] === Gameboard.lastClickedCellNr) {
                        WinningCombinations[i].splice(j, 1);
                        WinningCombinations[i].push(Gameboard.XandOhistory[Gameboard.XandOhistory.length -1])
                    }              
                    if (WinningCombinations[i].toString() === `o,o,o` || WinningCombinations[i].toString() === `x,x,x`) {
                        console.log ("win");   
                        gameEnebled = false;   
                        break;                                  
                    }  
                };  
              
                        
            }
            if (Gameboard.XandOhistory.length === 9 && gameEnebled === true)  {  
                    console.log("draw");
                    gameEnebled = false;
            } 
        })();
    }; 
    const buttons = {
        reset: document.getElementById("reset").addEventListener("click", () => {
            gameEnebled = true;
            WinningCombinations = [
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8],
                    [0, 3 ,6],
                    [1, 4, 7],
                    [2, 5, 8],
                    [0, 4, 8],
                    [2, 4, 6]
                ];
            Gameboard.cellsClickedNr = [];
            Gameboard.XandOhistory.splice(0);
            Gameboard.gameboard.forEach((element) => {
                element.innerHTML = "";
                element.style.color = "black";                           
            });
            Gameboard.cellsClickedId = [];
            Gameboard.lastClickedCellNr = []
            Gameboard.remainingCellId = (() => { 
                let allCells = []
                for (let i = 1; document.querySelectorAll(".cell").length + 1 > i; i++) {
                            allCells.push(`cell${i}`);                        
                        }
                        return {allCells}
                    })();
            window.onload ()

           
        })
    }  
    return {Gameboard, players}
})();
        



