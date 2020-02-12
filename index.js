document.addEventListener("DOMContentLoaded", () =>{
    console.log("connecteddddd")
    operators()
    UserBox().disabled = true
    // get24From()
    difficultyButton().addEventListener('click', chooseDifficulty)
    resetButton().addEventListener('click', resetHandler)
    submitButton().addEventListener('click', solve24)
    giveUpButton().addEventListener(`click`, giveUpHandler)
    loginContainer.addEventListener('submit', toggleLogin)
})

const unsolvables = [[1, 1, 1, 1], [1, 1, 1, 2], [1, 1, 1, 3], [1, 1, 1, 4], [1, 1, 1, 5], [1, 1, 1, 6], [1, 1, 1, 7], [1, 1, 1, 9], [1, 1, 2, 2], [1, 1, 2, 3] , [1, 1, 2, 4], [1, 1, 2, 5], [1, 1, 3, 3], [1,1,5,9],[1,1,6,7], [1,1,7,7], [1,1,7,8], [1,1,7,9], [1,1,8,9], [1,1,9,9], [1,2,2,2], [1,2,2,3], [1,2,9,9], [1,3,5,5], [1,4,9,9], [1,5,5,7], [1,5,5,8], [1,5,7,7], [1,6,6,7], [1,6,7,7], [1,6,7,8], [1,7,7,7], [1,7,7,8], [1,8,9,9], [1,9,9,9], [2,2,2,2], [2,2,2,6], [2,2,7,9], [2,2,9,9], [2,3,3,4], [2,5,5,5], [2,5,5,6], [2,5,9,9], [2,6,7,7], [2,7,7,7], [2,7,7,9], [2,7,9,9], [2,9,9,9], [3,3,5,8], [3,4,6,7], [3,4,8,8], [3,5,5,5], [3,5,7,7], [4,4,5,9], [4,4,6,7], [4,4,9,9], [4,7,7,9], [4,7,7,9], [4,9,9,9], [5,5,5,7], [5,5,5,8], [5,5,6,9], [5,5,7,9], [5,5,7,9], [5,7,7,7], [5,7,7,8], [5,7,9,9], [5,8,9,9], [5,9,9,9], [6,6,6,7], [6,6,7,7], [6,6,7,8], [6,6,9,9], [6,7,7,7], [6,7,7,8], [6,7,7,9], [6,7,8,8], [6,9,9,9], [7,7,7,7], [7,7,7,8], [7,7,7,9], [7,7,8,8], [7,7,8,9], [7,7,9,9], [7,7,8,8], [7,7,8,9], [7,7,9,9], [7,8,8,8], [7,7,8,9], [7,7,9,9], [7,8,8,8], [7,8,9,9], [7,9,9,9], [8,8,8,8], [8,8,8,9], [8,8,9,9], [8,9,9,9], [9,9,9,9]]
let joinedunsolves = unsolvables.map(arr => arr.join(''))
let timer
const loginContainer = document.querySelector('.login')
const gameContainer = document.querySelector('.game-session')
gameContainer.style.display = 'none'
difficultyButton().style.display = 'none'
function getHeader(){
    return document.getElementById("header")
}
function timerContainer(){
    return document.getElementById('safeTimer')
}

function createTimer(){
    let thisTimer = document.createElement('p')
    thisTimer.id = "safeTimerDisplay"
    timerContainer().appendChild(thisTimer)
    return thisTimer
}

function currentTimer(){
    return document.getElementById("safeTimerDisplay")
}

function chooseDifficulty(){
    if (event.target.value === "selector"){
        event.target.dataset.id = "clicked"
        createTimer()
    let sec = parseInt(event.target.innerText.split(" ")[0])
    console.log(sec)
    timer = setInterval(function(){
        timerContainer().children[0].innerHTML=':' +sec
        sec--
        if (sec < 0) {
            clearInterval(timer)
            // debugger
            giveUpHandler()
            // numberContainer().disabled = true
        }
    }, 1000)
    get24From()
    gameContainer.style.display = 'block'}
    else if (event.target.innerText === "New Game" || event.target.innerText === "Next Game"){
        createTimer()
            let sec = parseInt(selectedDifficulty().innerText.split(" ")[0])
    console.log(sec)
    timer = setInterval(function(){
        timerContainer().children[0].innerHTML=':' +sec
        sec--
        if (sec < 0) {
        // debugger
            clearInterval(timer)
            giveUpHandler()
        }
    }, 1000)
        get24From()
    }
}

function toggleLogin(){
    event.preventDefault()
    loginContainer.style.display = 'none',
    difficultyButton().style.display = 'block'
    processLogin()
    }

function processLogin(){
    let newSessionName = event.target.name.value
    let newSession = {name: newSessionName, score: 0, fastest_time: 0}
    fetch("http://localhost:3000/sessions",
    {
    method: "POST",
    headers:
    {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(newSession)
})
.then(r => r.json())
.then(r => renderSession(r))
}

// function getFastestTime(){
//     let idContainer = document.getElementById("score-id")
//     let id = idContainer.dataset.id
//     // debugger
//     fetch(`http://localhost:3000/sessions/${id}`)
//     .then(r=>r.json())
//     .then(r=>compareScore(r))
// }

function compareTimes(){
    console.log("compareTimes")
    let recordContainer = document.getElementById("fastest-solve-time")
    let currentRecord = parseInt(recordContainer.innerText.split("0:")[1])
        // debugger
    let difficulty = parseInt(selectedDifficulty().innerText.split(" ")[0])
    let clockedAt = parseInt(currentTimer().innerText.split(":")[1])
    if (clockedAt > currentRecord){
        updateFastestTime()
        alert("You beat your previous fastest solve time!")
        recordContainer.innerText = `Fastest solved equation: ${UserBox().value} in 00:${difficulty - clockedAt} seconds`
    }
}

function updateFastestTime(){
    let scoreText = document.getElementById("fastest-solve-time")
    let id = scoreText.dataset.id
    let newRecord = parseInt(currentTimer().innerText.split(":")[1])
    // debugger
    fetch(`http://localhost:3000/sessions/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"fastest_time": newRecord})
    }).then(r=>r.json())
    .then(console.log)
    }

function renderSession(r){
    getHeader().innerText = `Welcome: ${r.name} `
    let scoreDiv = document.createElement("div")
    scoreDiv.id = "score-id"
    scoreDiv.dataset.id = r.id
    scoreDiv.innerText = `Current Score: ${r.score}`
    debugger
    let timeDiv = document.createElement("div")
    timeDiv.id = "fastest-solve-time"
    timeDiv.dataset.id = r.id
    timeDiv.innerText = `Fastest solved equation: 1+1 in 00:${r.fastest_time} seconds`
    getHeader().appendChild(scoreDiv)
    getHeader().appendChild(timeDiv)
    console.log(r)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function numberContainer() {
    return document.getElementById('number-container')
}

function makeNumButtons(gameNumsArray){
    console.log("making buttons")
    let i = 1
    gameNumsArray.forEach(num => {
    let numBtn = document.createElement('button')
    numBtn.innerText = num
    numBtn.className = 'num-buttons'
    numberContainer().appendChild(numBtn)
    numBtn.addEventListener("click", () => populateUserInput(numBtn))
    })
}

function get24From(){
    difficultyButton().style.display = 'none'
    clearDiv(solutionList())
    const gameNumbers = Array.from({length: 4},
    () => getRandomInt(1, 9))
    checkGameNums(gameNumbers) ? get24From() : makeNumButtons(gameNumbers)
    // makeNumButtons(gameNumbers)
}

function checkGameNums(thisThing){
    console.log("checking numbers")
    let sorted = thisThing.sort(function(a, b){return a - b})
    let joined = sorted.join('')
    return unsolvables.find(arr => arr.join('').includes(joined))
 }

function nextGameHandler(){
    chooseDifficulty()
    clearDiv(numberContainer())
    event.target.id = "submit-button"
    event.target.innerText = "Submit"
    event.target.removeEventListener("click", nextGameHandler)
    clearDiv(solutionList())
    submitButton().addEventListener('click', solve24)
    resetHandler()
    giveUpButton().innerText = "Give Up?"
    get24From()
}

function incrementScore(){
    let scoreText = document.getElementById("score-id")
    let id = scoreText.dataset.id
    let currentScore = parseInt(scoreText.innerText.split(" ")[2])
    let newScore = ++currentScore
    scoreText.innerText = `Current Score: ${newScore}`
    fetch(`http://localhost:3000/sessions/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"score": newScore})
    }).then(r=>r.json())
    .then(console.log)
    }

function clearDiv(div){
   while(div.firstChild){
    div.firstChild.remove()
   }
}

function resetButton(){
    return document.getElementById('reset-button')
}

function selectedDifficulty(){
    return document.querySelector('[data-id="clicked"]')
}

function resetHandler(){
    UserBox().value = ""
    document.querySelectorAll('button').forEach(button => {
    button.disabled = false})
}
function UserBox(){
    return document.getElementById("user-input-box")
}

function operators(){
    const operations = document.getElementById('operators')
    let operatorButtons = Array.from(operations.children)
    operatorButtons.forEach(button => button.addEventListener("click", () => inputOperation(button)))
    }

function inputOperation(button){
    UserBox().value = UserBox().value + button.innerText
}

function populateUserInput(numBtn){
    UserBox().value = UserBox().value + numBtn.innerText
    numBtn.disabled = true
}

function difficultyButton(){
    return document.getElementById('instruction-page')
}
function easyButton(){
    return document.getElementById('easy')
}
function mediumButton(){
    return document.getElementById('medium')
}
function hardButton(){
    return document.getElementById('hard')
}
function submitButton(){
    return document.getElementById('submit-button')
}
function nextGameButton(){
    return document.getElementById('next-game-button')
}

function giveUpButton(){
    return document.getElementById('give-up-button')
}

function endGameButton(){
    return document.getElementById('end-game-button')
}

function numberButtons(){
    return document.getElementsByClassName('num-buttons')
}

function giveUpHandler(){
    // debugger
    clearInterval(timer)
    giveUpButton().disabled = true
    let f1 = parseInt(Array.from(numberButtons())[0].innerText)
    let f2 = parseInt(Array.from(numberButtons())[1].innerText)
    let f3 = parseInt(Array.from(numberButtons())[2].innerText)
    let f4 = parseInt(Array.from(numberButtons())[3].innerText)
    fetch(`https://helloacm.com/api/24/?a=${f1}&b=${f2}&c=${f3}&d=${f4}`)
    .then(r=>r.json())
    .then(r=> renderSolution(r))
}

function renderSolution(r){
    let solutionContainer = document.querySelector('.solutions')
    let solutionUl = document.createElement("ul")
    solutionUl.id = "solution-list"
    solutionUl.innerText = "Here are all possible solutions:"
    solutionContainer.appendChild(solutionUl)
    r.result.forEach(sol=>{
        let solutionLi = document.createElement('li')
        solutionUl.appendChild(solutionLi)
        solutionLi.innerText = sol
    })
    
    resetButton().disabled = true
    submitButton().removeEventListener("click", solve24)
    submitButton().id = "new-game-button"
    newGameButton().innerText = "New Game"
    // debugger
    clearDiv(numberContainer())
    newGameButton().addEventListener('click', newGameHandler) 
}

function newGameHandler(){
    // clearInterval(timer)
    chooseDifficulty()
    resetButton().disabled = false
    giveUpButton().disabled = false
    newGameButton().removeEventListener("click", newGameHandler)
    newGameButton().id = "submit-button"
    submitButton().innerText = "Submit"
    submitButton().addEventListener('click', solve24)
//   debugger

}
function solutionList(){
    return document.querySelector('.solutions')
}
function newGameButton(){
    return document.getElementById("new-game-button")
}
function isDisabled(){
    let checkedButtons = Array.from(numberButtons())
    // debugger
    return checkedButtons.map(btn => btn.disabled)
}

function isLegit(){
    let userSolution = UserBox().value.split(/[^\d]/).filter(word => word.length > 0)
    // debugger
    return (userSolution.length === 4)
}
function solve24(){
    //     window.addEventListener('error', function (e) {
    //     var error = e.error
    //     alert("Check your equation")
    // })
    
    if ((isDisabled().every(v => v === true)) && (isLegit())){
     console.log("hit first")
        // if parseInt(UserBox().value)
        if (math.evaluate(UserBox().value) == 24){
            console.log("hit second")
        incrementScore()
        alert(`You got 24 through ${UserBox().value}!`)
        compareTimes()
        event.target.id = "next-game-button"
        event.target.innerText = "Next Game"
        event.target.removeEventListener("click", solve24)
        clearInterval(timer)
        nextGameButton().addEventListener("click", nextGameHandler)
        // debugger
        giveUpButton().innerText = "Show all solutions"
        // event.target.nextElementSibling.id = "end-game"
        // event.target.nextElementSibling.innerText = "End Streak"
        // endGameButton().addEventListener("click", ()=>console.log("end"))}
        // */

    }else
        {alert("Nope. Try again!")
        resetHandler()}}
    else alert("Invalid input. Please use all the numbers once.")
}

