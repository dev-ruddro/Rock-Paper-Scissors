let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  loses: 0,
  ties: 0,
};
// Update author info
upadateScoreElmnt();

let isautoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isautoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickCompMove();
      playGame(playerMove);
    }, 1000);
    isautoPlaying = true;
  } else {
    clearInterval(intervalId);
    isautoPlaying = false;
  }
}

document.querySelector(".js-rock-btn").addEventListener("click", () => {
  playGame("Rock");
});
document.querySelector(".js-paper-btn").addEventListener("click", () => {
  playGame("Paper");
});
document.querySelector(".js-scissors-btn").addEventListener("click", () => {
  playGame("Scissors");
});
document.querySelector("#btn-auto").addEventListener("click", () => {
  autoPlay();
});
document.querySelector("#bt").addEventListener("click", () => {
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  upadateScoreElmnt();
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("Rock");
  } else if (event.key === "p") {
    playGame("Paper");
  } else if (event.key === "s") {
    playGame("Scissors");
  }
});

function playGame(playerMove) {
  const compMove = pickCompMove();

  let result = "";

  if (playerMove === "Scissors") {
    if (compMove === "Rock") {
      result = "Lose";
    } else if (compMove === "Paper") {
      result = "Win";
    } else if (compMove === "Scissors") {
      result = "Tie";
    }
  } else if (playerMove === "Paper") {
    if (compMove === "Rock") {
      result = "Win";
    } else if (compMove === "Paper") {
      result = "Tie";
    } else if (compMove === "Scissors") {
      result = "Lose";
    }
  } else if (playerMove === "Rock") {
    if (compMove === "Rock") {
      result = "Tie";
    } else if (compMove === "Paper") {
      result = "Lose";
    } else if (compMove === "Scissors") {
      result = "Win";
    }
  }

  if (result === "Win") {
    score.wins += 1;
  } else if (result === "Lose") {
    score.loses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  upadateScoreElmnt();

  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(".js-move").innerHTML =
    `You Picked ${playerMove} - Computer Picked ${compMove}`;
}

function upadateScoreElmnt() {
  document.querySelector(".jss-btn").innerHTML =
    `Wins ${score.wins} Loses ${score.loses} Ties ${score.ties}`;
}
function updateMove() {}

function pickCompMove() {
  let compMove = "";

  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    compMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    compMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    compMove = "Scissors";
  }

  return compMove;
}
