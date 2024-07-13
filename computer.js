let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('#reset-btn');
let newGameButton = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let player1 = document.querySelector('#player1');
let player2 = document.querySelector('#player2');
let startbtn = document.querySelector('#start-btn');
let input = document.querySelector('input');

let userTurn = document.querySelector('#user');
let multiplayer = document.querySelector('#start-btn0');
let computer = document.querySelector('#start-btn1');
let userInfo0 = document.querySelector('.user-info0');
let userInfo1 = document.querySelector('.user-info1');
let backBtn = document.querySelector('.homeBtn');
let backBtn1 = document.querySelector('#back-btn');

let Score1 = document.querySelector("#player");
let Score2 = document.querySelector("#comp");

window.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('playPauseBtn');
  
    playPauseBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = 'Pause';
      } else {
        audio.pause();
        playPauseBtn.textContent = 'Play';
      }
    });
  
    audio.addEventListener('pause', () => {
      playPauseBtn.textContent = 'Play';
    });
  
    audio.addEventListener('play', () => {
      playPauseBtn.textContent = 'Pause';
    });

    audio.addEventListener('ended', () => {
        audio.currentTime = 0; 
        audio.play();
      });
  });

let playerScore = 0;
let computerScore = 0;

if(backBtn){
backBtn.addEventListener('click', () => {
if(userInfo0){
    userInfo0.classList.remove("hide0");
    userInfo1.classList.add("hide1");
}
    window.location.href = "index.html";
    
});
}

if(backBtn1){
    backBtn1.addEventListener('click', () => {
    if(userInfo0){
        userInfo0.classList.remove("hide0");
        userInfo1.classList.add("hide1");
    }
        window.location.href = "index.html";
        
    });
    }


let name1 = "";
let name2 = "";

if(startbtn){
startbtn.addEventListener('click', () => {
    if (player1.value === "" || player2.value === "") {
        alert("Please enter your names");
    } else {
        name1 = localStorage.setItem("player1", player1.value);
        name2 = localStorage.setItem("player2", player2.value);

        window.location.href = "index2.html";

    }
});
}

let player1Name = localStorage.getItem("player1");
let player2Name = localStorage.getItem("player2");

console.log(player1Name, player2Name);

if(userInfo0){
userInfo0.classList.add("hide0");
userInfo1.classList.remove("hide1");

multiplayer.addEventListener('click', () => {
    console.log("clicked");
    userInfo0.classList.remove("hide0");
    userInfo1.classList.add("hide1");
});
}


if(computer){    
    computer.addEventListener('click', () => {
        window.location.href = "computer.html";
    });
    }


    let counter = 0;
    let turnO = true;
    let isGameOver = false;
    let winningCombinations = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ];
    
    const enableBoxes = () => {
        for (let box of boxes) {
            box.disabled = false;
            box.innerText = "";
        }
    };
    
    const showtie = () => {
        if (counter === 9 && !isGameOver) {
            msg.innerText = "It's a tie!";
            msgContainer.classList.remove("hide");
            isGameOver = true;
        }
    };


    const showWinner = (winner, pattern) => {
        if (winner === "O") {
            playerScore++;
            msg.innerText = "Player Wins!";
        } else {
            computerScore++;
            msg.innerText = "Computer Wins!";
        }
        Score1.innerText = playerScore;
        Score2.innerText = computerScore;
        msgContainer.classList.remove("hide");

        for (let box of boxes) {
            box.disabled = true;
        }
        isGameOver = true;
    };
    

    
    const checkWinner = () => {
        for (let pattern of winningCombinations) {
            let pos1 = boxes[pattern[0]].innerText;
            let pos2 = boxes[pattern[1]].innerText;
            let pos3 = boxes[pattern[2]].innerText;
    
            if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1, pattern);
                return;
            }
        }
        showtie();
    };
    
    
    const playerMove = (box) => {
        if (!isGameOver && box.innerText === "") {
            if (turnO) {
                box.innerText = "O";
                box.style.color = "red";
                turnO = false;
            }
            counter++;
            checkWinner();
            if (!isGameOver) {
                computerMove();
                
            }
        }
    };
    
    const computerMove = () => {
        if (!isGameOver) {
            let bestScore = -Infinity;
            let move;
    

            for (let i = 0; i < winningCombinations.length; i++) {
                let [a, b, c] = winningCombinations[i];
                
                if (boxes[a].innerText === "" && boxes[b].innerText === "O" && boxes[c].innerText === "O") {
                    boxes[a].innerText = "X"; 
                    turnO = true;
                    counter++;
                    checkWinner();
                    return; 
                }
                if (boxes[b].innerText === "" && boxes[a].innerText === "O" && boxes[c].innerText === "O") {
                    boxes[b].innerText = "X";
                    
                    turnO = true;
                    counter++;
                    checkWinner();
                    return; 
                }
                if (boxes[c].innerText === "" && boxes[a].innerText === "O" && boxes[b].innerText === "O") {
                    boxes[c].innerText = "X"; 
                    
                    turnO = true;
                    counter++;
                    checkWinner();
                    return; 
                }
            }
    
            
            for (let i = 0; i < winningCombinations.length; i++) {
                let [a, b, c] = winningCombinations[i];
                if (boxes[a].innerText === "" && boxes[b].innerText === "X" && boxes[c].innerText === "X") {
                    boxes[a].innerText = "X"; 
                    
                    turnO = true;
                    counter++;
                    checkWinner();
                    return; 
                }
                if (boxes[b].innerText === "" && boxes[a].innerText === "X" && boxes[c].innerText === "X") {
                    boxes[b].innerText = "X"; 
                    
                    turnO = true;
                    counter++;
                    checkWinner();
                    return; 
                }
                if (boxes[c].innerText === "" && boxes[a].innerText === "X" && boxes[b].innerText === "X") {
                    boxes[c].innerText = "X"; 
                    
                    turnO = true;
                    counter++;
                    checkWinner();
                    return; 
                }
            }
    
            do {
                move = Math.floor(Math.random() * 9);
            } while (boxes[move].innerText !== "");
    
            boxes[move].innerText = "X";
            turnO = true;
            counter++;
            checkWinner();
        }
    };
    
    
    const minimax = (isMaximizing) => {
        let result = checkWinner(); 
        if (result !== null) {
            if (result === "O") {
                return -1;
            } else if (result === "X") {
                return 1; 
            } else {
                return 0; 
            }
        }
    
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < boxes.length; i++) {
                if (boxes[i].innerText === "") {
                    boxes[i].innerText = "X";
                    let score = minimax(false);
                    boxes[i].innerText = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < boxes.length; i++) {
                if (boxes[i].innerText === "") {
                    boxes[i].innerText = "O";
                    let score = minimax(true);
                    boxes[i].innerText = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };
    
    boxes.forEach((box) => {
        box.addEventListener('click', () => {
            playerMove(box);
        });
    });
    
    const resetGame = () => {
        turnO = true;
        counter = 0;
        isGameOver = false;
        boxes.forEach(box => {
            box.innerText = "";
            box.disabled = false;
        });
        msgContainer.classList.add("hide");

    };

newGameButton.addEventListener('click', () => {
    resetGame();
});
resetButton.addEventListener('click', () => {
    resetGame();
});


