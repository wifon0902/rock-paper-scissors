let isAutoPlaying = false;
let intervalId;
const buttonText = document.querySelector('.autoplay-button');

function autoPlay() {
  if(!isAutoPlaying) {
    intervalId = setInterval(function() {
      let playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    buttonText.innerHTML = 'STOP AUTO';
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    buttonText.innerHTML = 'AUTO PLAY';
  }
  
}

function resetGame() {
  score.wins = 0;
  localStorage.removeItem('score');
  refreshScore();
  document.querySelector('.result').innerHTML = '';
  document.querySelector('.moves').innerHTML = '';
  document.querySelector('.result-box').style.backgroundColor = '';
  document.querySelector('.result-box').style.border = '';
}

function refreshScore() {
  document.querySelector('.score').innerHTML = score.wins;
}

let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0
  }

function playGame(playerMove) {
  pickComputerMove();
  let result = '';

  if (playerMove === 'Nozyce') {
    if (computerMove === 'Papier') {
      result = 'You win';
    } else if (computerMove === 'Kamien') {
      result = 'You lose';
    } else if (computerMove === 'Nozyce') {
      result = 'Tie';
    }

  } else if (playerMove === 'Kamien') {
    if (computerMove === 'Papier') {
      result = 'You lose';
    } else if (computerMove === 'Kamien') {
      result = 'Tie';
    } else if (computerMove === 'Nozyce') {
      result = 'You win';
    }
    
  } else if (playerMove === 'Papier') {
    if (computerMove === 'Papier') {
      result = 'Tie';
    } else if (computerMove === 'Kamien') {
      result = 'You win';
    } else if (computerMove === 'Nozyce') {
      result = 'You lose';
    }
  }
  
  if (result === "You win") {
    score.wins += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  refreshScore();
  
  document.querySelector('.result').innerHTML = result;

  document.querySelector('.moves').innerHTML = `<img class="moves-icon" src="images/${playerMove}.png"><img class="moves-icon" src="images/${computerMove}.png">`;

  const colorContainer = document.querySelector('.result-box');

  if (result === "You win") {
    colorContainer.style.backgroundColor = "rgb(110, 255, 74, 0.25)";
    colorContainer.style.border = "rgb(82, 182, 57) solid 3px";
  } else if (result === "You lose") {
    colorContainer.style.backgroundColor = "rgba(255, 0, 0, 0.25)";
    colorContainer.style.border = "rgb(255, 74, 74) solid 3px";
  } else if (result === "Tie") {
    colorContainer.style.backgroundColor = "rgb(74, 122, 255, 0.25)";
    colorContainer.style.border = "rgb(74, 122, 255) solid 3px";
  }
}

let computerMove;

function pickComputerMove() {
  const random = Math.random();

  if (random >= 0 && random < 1/3) {
    computerMove = 'Papier';
  } else if (random >= 1/3 && random < 2/3) {
    computerMove = 'Kamien';
  }
  else if (random >= 2/3 && random < 1) {
    computerMove = 'Nozyce';
  }
  return computerMove;
}

refreshScore();