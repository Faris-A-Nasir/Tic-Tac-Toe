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
let homeBtn = document.querySelector('.homeBtn');
let backBtn1 = document.querySelector('#back-btn');

let player1name = document.querySelector("#player1Name");
let player2name = document.querySelector("#player2Name");
let Score1 = document.querySelector("#player1");
let Score2 = document.querySelector("#player2");
let glow = document.getElementById("glowText");

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


let player1Score = 0;
let player2Score = 0;


if(homeBtn){
homeBtn.addEventListener('click', () => {
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
let winningCombinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showtie = (counter) => {
    console.log(counter);
    if(counter === 9){
        msg.innerText = "It's a tie!";
        msgContainer.classList.remove("hide");
    }
}



const showWinner = (winner) => {
    if(winner === "O"){
        player1Score++;
        winner = player1Name;
    }else{
        player2Score++;
        winner = player2Name;
    }
    Score1.innerText = player1Score;
    Score2.innerText = player2Score;
    msg.innerText = `${winner} is the winner!`;
    msgContainer.classList.remove("hide");
    userTurn.innerText = `${player1Name}'s(O) turn`;

    for(let box of boxes){
        box.disabled = true;
    }
};



const checkWinner = () => {
    for(let pattern of winningCombinations){

    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if(pos1 != "" || pos2 != "" || pos3 != ""){
        if(pos1 === pos2 && pos2 === pos3){
            console.log('Winner', pos1), pos2, pos3;
            showWinner(pos1);
        }else{
            showtie(counter);
        }
    }
}
}

boxes.forEach((box) => {
    userTurn.innerText = `${player1Name}'s(O) turn`;
    player1name.innerText = `${player1Name} Score`;
    player2name.innerText = `${player2Name} Score`;
    box.addEventListener('click', () => {
        if(turnO){
        box.innerText = "O";
        glow.classList.toggle("glow");
        box.style.color = "Red";
        userTurn.innerText = `${player2Name}'s(X) turn`;
        turnO = false;
        }else{
        box.innerText = "X";
        glow.classList.toggle("glow");
        box.style.color = "Yellow";
        userTurn.innerText = `${player1Name}'s(O) turn`;
        turnO = true;
        }
        box.disabled = true;
        counter++;
        checkWinner();
    });
});

const resetGame = () => {
    turnO = true;
    counter = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    userTurn.innerText = `${player1Name}'s(O) turn`;

};

newGameButton.addEventListener('click', () => {
loadAds();
    resetGame();
});
resetButton.addEventListener('click', () => {
loadAds();
    resetGame();
});

const appId = 'ca-app-pub-8704504953407288~3770896413';
const unitId = 'ca-app-pub-8704504953407288/3390309386';

// Function to load ads
const loadAds = () => {
    // Create a script element for AdSense
    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`;
    script.setAttribute('data-ad-client', appId);
    script.setAttribute('async', true);
    document.body.appendChild(script);

    // Create a div element for the ad container
    const adContainer = document.createElement('div');
    adContainer.id = 'ad-container';
    document.body.appendChild(adContainer);

    // Create an ins element for the ad unit
    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.setAttribute('data-ad-client', appId);
    ins.setAttribute('data-ad-slot', unitId);
    ins.setAttribute('data-ad-format', 'auto');
    adContainer.appendChild(ins);

    // Call the adsbygoogle function to initialize ads
    (adsbygoogle = window.adsbygoogle || []).push({});
};

// Call loadAds function to display ads