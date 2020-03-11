document.addEventListener("DOMContentLoaded", () => {
  operators();
  UserBox().disabled = true;
  difficultyButton().addEventListener("click", chooseDifficulty);
  resetButton().addEventListener("click", resetHandler);
  submitButton().addEventListener("click", solve24);
  giveUpButton().addEventListener(`click`, giveUpHandler);
  getLoginContainer().addEventListener("submit", toggleLogin);
});

const unsolvables = [
  [1, 1, 1, 1],
  [1, 1, 1, 2],
  [1, 1, 1, 3],
  [1, 1, 1, 4],
  [1, 1, 1, 5],
  [1, 1, 1, 6],
  [1, 1, 1, 7],
  [1, 1, 1, 9],
  [1, 1, 2, 2],
  [1, 1, 2, 3],
  [1, 1, 2, 4],
  [1, 1, 2, 5],
  [1, 1, 3, 3],
  [1, 1, 5, 9],
  [1, 1, 6, 7],
  [1, 1, 7, 7],
  [1, 1, 7, 8],
  [1, 1, 7, 9],
  [1, 1, 8, 9],
  [1, 1, 9, 9],
  [1, 2, 2, 2],
  [1, 2, 2, 3],
  [1, 2, 9, 9],
  [1, 3, 5, 5],
  [1, 4, 9, 9],
  [1, 5, 5, 7],
  [1, 5, 5, 8],
  [1, 5, 7, 7],
  [1, 6, 6, 7],
  [1, 6, 7, 7],
  [1, 6, 7, 8],
  [1, 7, 7, 7],
  [1, 7, 7, 8],
  [1, 8, 9, 9],
  [1, 9, 9, 9],
  [2, 2, 2, 2],
  [2, 2, 2, 6],
  [2, 2, 7, 9],
  [2, 2, 9, 9],
  [2, 3, 3, 4],
  [2, 5, 5, 5],
  [2, 5, 5, 6],
  [2, 5, 9, 9],
  [2, 6, 7, 7],
  [2, 7, 7, 7],
  [2, 7, 7, 9],
  [2, 7, 9, 9],
  [2, 9, 9, 9],
  [3, 3, 5, 8],
  [3, 4, 6, 7],
  [3, 4, 8, 8],
  [3, 5, 5, 5],
  [3, 5, 7, 7],
  [4, 4, 5, 9],
  [4, 4, 6, 7],
  [4, 4, 9, 9],
  [4, 7, 7, 9],
  [4, 7, 7, 9],
  [4, 9, 9, 9],
  [5, 5, 5, 7],
  [5, 5, 5, 8],
  [5, 5, 6, 9],
  [5, 5, 7, 9],
  [5, 5, 7, 9],
  [5, 7, 7, 7],
  [5, 7, 7, 8],
  [5, 7, 9, 9],
  [5, 8, 9, 9],
  [5, 9, 9, 9],
  [6, 6, 6, 7],
  [6, 6, 7, 7],
  [6, 6, 7, 8],
  [6, 6, 9, 9],
  [6, 7, 7, 7],
  [6, 7, 7, 8],
  [6, 7, 7, 9],
  [6, 7, 8, 8],
  [6, 9, 9, 9],
  [7, 7, 7, 7],
  [7, 7, 7, 8],
  [7, 7, 7, 9],
  [7, 7, 8, 8],
  [7, 7, 8, 9],
  [7, 7, 9, 9],
  [7, 7, 8, 8],
  [7, 7, 8, 9],
  [7, 7, 9, 9],
  [7, 8, 8, 8],
  [7, 7, 8, 9],
  [7, 7, 9, 9],
  [7, 8, 8, 8],
  [7, 8, 9, 9],
  [7, 9, 9, 9],
  [8, 8, 8, 8],
  [8, 8, 8, 9],
  [8, 8, 9, 9],
  [8, 9, 9, 9],
  [9, 9, 9, 9]
];

let joinedunsolves = unsolvables.map(arr => arr.join(""));
let timer;
getGamesContainer().style.display = "none";
difficultyButton().style.display = "none";

function getHeader() {
  return document.getElementById("header");
}

function getStatsDiv() {
  return document.getElementById("stats-div");
}

function getGamesContainer() {
  return document.querySelector(".game-session");
}

function getLoginContainer() {
  return document.querySelector(".login");
}

function timerContainer() {
  return document.getElementById("safeTimer");
}

function currentTimer() {
  return document.getElementById("safeTimerDisplay");
}

function numberContainer() {
  return document.getElementById("number-container");
}

function resetButton() {
  return document.getElementById("reset-button");
}

function selectedDifficulty() {
  return document.querySelector('[data-id="clicked"]');
}

function UserBox() {
  return document.getElementById("user-input-box");
}

function difficultyButton() {
  return document.getElementById("instruction-page");
}

function easyButton() {
  return document.getElementById("easy");
}

function mediumButton() {
  return document.getElementById("medium");
}

function hardButton() {
  return document.getElementById("hard");
}

function submitButton() {
  return document.getElementById("submit-button");
}

function nextGameButton() {
  return document.getElementById("next-game-button");
}

function giveUpButton() {
  return document.getElementById("give-up-button");
}

function endGameButton() {
  return document.getElementById("end-game-button");
}

function numberButtons() {
  return document.getElementsByClassName("ui big inverted grey button");
}

function solutionList() {
  return document.querySelector(".solutions");
}

function newGameButton() {
  return document.getElementById("new-game-button");
}

function createTimer() {
  let thisTimer = document.createElement("p");
  thisTimer.id = "safeTimerDisplay";
  timerContainer().appendChild(thisTimer);
  return thisTimer;
}

function difficultyInnerTime() {
  createTimer();
  let sec = parseInt(selectedDifficulty().innerText.split(" ")[0]);
  timer = setInterval(function() {
    timerContainer().children[0].innerHTML = ":" + sec;
    sec--;
    if (sec < 0) {
      clearInterval(timer);
      giveUpHandler();
    }
  }, 1000);
  numGenerator();
}

function chooseDifficulty() {
  if (event.target.value === "selector") {
    getStatsDiv().style.display = "block";
    event.target.dataset.id = "clicked";
    difficultyInnerTime();
    getGamesContainer().style.display = "block";
  } else if (
    event.target.innerText === "New Game" ||
    event.target.innerText === "Next Game"
  ) {
    difficultyInnerTime();
  }
}

function toggleLogin() {
  event.preventDefault();
  getLoginContainer().style.display = "none";
  difficultyButton().style.display = "block";
  processLogin();
}

function processLogin() {
  let newSessionName = event.target.name.value;
  let newSession = { name: newSessionName, score: 0, fastest_time: 0 };
  fetch("http://localhost:3000/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newSession)
  })
    .then(r => r.json())
    .then(r => renderSession(r));
}

function compareTimes() {
  let recordContainer = document.getElementById("fastest-solve-time");
  let currentRecord = parseInt(recordContainer.innerText.split("0:")[1]);
  let mode = selectedDifficulty().id;
  let difficulty = parseInt(selectedDifficulty().innerText.split(" ")[0]);
  let clockedAt = parseInt(currentTimer().innerText.split(":")[1]);
  if (clockedAt > currentRecord) {
    updateFastestTime();
    alert("You beat your previous fastest solve time!");
    recordContainer.innerText = `Fastest solved equation: ${
      UserBox().value
    } in 0:${difficulty - clockedAt} seconds on ${mode} mode`;
  }
}

function updateFastestTime() {
  let scoreText = document.getElementById("fastest-solve-time");
  let id = scoreText.dataset.id;
  let newRecord = parseInt(currentTimer().innerText.split(":")[1]);
  fetch(`http://localhost:3000/sessions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ fastest_time: newRecord })
  });
}

function renderSession(r) {
  let hideMainHeader = document.getElementById("main-header");
  hideMainHeader.style.display = "none";
  getStatsDiv().appendChild(getHeader());
  getHeader().innerText = `User: ${r.name} `;
  let scoreDiv = document.createElement("div");
  scoreDiv.id = "score-id";
  scoreDiv.dataset.id = r.id;
  scoreDiv.innerText = `Current Score: ${r.score}`;
  let timeDiv = document.createElement("div");
  timeDiv.id = "fastest-solve-time";
  timeDiv.dataset.id = r.id;
  timeDiv.innerText = `Fastest solved equation: 1+1 in 0:${r.fastest_time}0 seconds`;
  getHeader().appendChild(scoreDiv);
  getHeader().appendChild(timeDiv);
  console.log(r);
}

function makeNumButtons(gameNumsArray) {
  gameNumsArray.forEach(num => {
    let numBtn = document.createElement("button");
    numBtn.innerText = num;
    numBtn.className = "ui big inverted grey button";
    numberContainer().appendChild(numBtn);
    numBtn.addEventListener("click", () => populateUserInput(numBtn));
  });
}

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function numGenerator() {
  difficultyButton().style.display = "none";
  clearDiv(solutionList());
  const gameNumbers = Array.from({ length: 4 }, () => getRandomInteger(1, 9));
  checkGameNums(gameNumbers) ? numGenerator() : makeNumButtons(gameNumbers);
}

function checkGameNums(gameNumbers) {
  let sortedNums = gameNumbers.sort(function(a, b) {
    a - b;
  });
  let joinedNums = sortedNums.join("");
  return unsolvables.find(arr => arr.join("").includes(joinedNums));
}

function nextGameHandler() {
  UserBox().value = "";
  chooseDifficulty();
  clearDiv(numberContainer());
  event.target.id = "submit-button";
  event.target.innerText = "Submit";
  event.target.removeEventListener("click", nextGameHandler);
  clearDiv(solutionList());
  submitButton().addEventListener("click", solve24);
  resetHandler();
  giveUpButton().innerText = "Give Up?";
  numGenerator();
}

function incrementScore() {
  let scoreText = document.getElementById("score-id");
  let id = scoreText.dataset.id;
  let currentScore = parseInt(scoreText.innerText.split(" ")[2]);
  let newScore = ++currentScore;
  scoreText.innerText = `Current Score: ${newScore}`;
  fetch(`http://localhost:3000/sessions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ score: newScore })
  });
}

function clearDiv(div) {
  while (div.firstChild) {
    div.firstChild.remove();
  }
}

function resetHandler() {
  UserBox().value = "";
  document.querySelectorAll("button").forEach(button => {
    button.disabled = false;
  });
}

function operators() {
  const operations = document.getElementById("operators");
  let operatorButtons = Array.from(operations.children);
  operatorButtons.forEach(button =>
    button.addEventListener("click", () => inputOperation(button))
  );
}

function inputOperation(button) {
  UserBox().value = UserBox().value + button.innerText;
}

function populateUserInput(numBtn) {
  UserBox().value = UserBox().value + numBtn.innerText;
  numBtn.disabled = true;
}

function giveUpHandler() {
  clearInterval(timer);
  giveUpButton().disabled = true;
  let f1 = parseInt(Array.from(numberButtons())[0].innerText);
  let f2 = parseInt(Array.from(numberButtons())[1].innerText);
  let f3 = parseInt(Array.from(numberButtons())[2].innerText);
  let f4 = parseInt(Array.from(numberButtons())[3].innerText);
  fetch(`https://helloacm.com/api/24/?a=${f1}&b=${f2}&c=${f3}&d=${f4}`)
    .then(r => r.json())
    .then(r => renderSolution(r));
}

function renderSolution(r) {
  let solutionContainer = document.querySelector(".solutions");
  let solutionUl = document.createElement("ul");
  solutionUl.id = "solution-list";
  solutionUl.innerText = "Here are all possible solutions:";
  solutionContainer.appendChild(solutionUl);
  r.result.forEach(sol => {
    let solutionLi = document.createElement("li");
    solutionUl.appendChild(solutionLi);
    solutionLi.innerText = sol;
  });

  resetButton().disabled = true;
  submitButton().removeEventListener("click", solve24);
  submitButton().id = "new-game-button";
  newGameButton().innerText = "New Game";
  clearDiv(numberContainer());
  newGameButton().addEventListener("click", newGameHandler);
}

function newGameHandler() {
  UserBox().value = "";
  chooseDifficulty();
  resetButton().disabled = false;
  giveUpButton().disabled = false;
  newGameButton().removeEventListener("click", newGameHandler);
  newGameButton().id = "submit-button";
  submitButton().innerText = "Submit";
  submitButton().addEventListener("click", solve24);
}

function isBtnDisabled() {
  let checkedButtons = Array.from(numberButtons());
  return checkedButtons.map(btn => btn.disabled);
}

function isLegitInput() {
  let userSolution = UserBox()
    .value.split(/[^\d]/)
    .filter(word => word.length > 0);
  return userSolution.length === 4;
}

function solve24() {
  if (
    isBtnDisabled().every(btnStatus => btnStatus === true) &&
    isLegitInput()
  ) {
    if (math.evaluate(UserBox().value) == 24) {
      incrementScore();
      alert(`You got 24 through ${UserBox().value}!`);
      compareTimes();
      event.target.id = "next-game-button";
      event.target.innerText = "Next Game";
      event.target.removeEventListener("click", solve24);
      clearInterval(timer);
      nextGameButton().addEventListener("click", nextGameHandler);
      giveUpButton().innerText = "Show all solutions";
    } else {
      alert("Nope. Try again!");
      resetHandler();
    }
  } else alert("Invalid input. Please use all the numbers once.");
}
