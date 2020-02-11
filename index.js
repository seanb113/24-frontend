document.addEventListener("DOMContentLoaded", () =>{
    console.log("connecteddddd")
    operators()
    UserBox().disabled = true
    get24From()
    resetButton().addEventListener('click', resetHandler)
    submitButton().addEventListener('click', solve24)
    window.addEventListener('error', function (e) {
    var error = e.error
    alert("Check your equation")
})

})
const unsolvables = [[1, 1, 1, 1], [1, 1, 1, 2], [1, 1, 1, 3], [1, 1, 1, 4], [1, 1, 1, 5], [1, 1, 1, 6], [1, 1, 1, 7], [1, 1, 1, 9], [1, 1, 2, 2], [1, 1, 2, 3] , [1, 1, 2, 4], [1, 1, 2, 5], [1, 1, 3, 3], [1,1,5,9],[1,1,6,7], [1,1,7,7], [1,1,7,8], [1,1,7,9], [1,1,8,9], [1,1,9,9], [1,2,2,2], [1,2,2,3], [1,2,9,9], [1,3,5,5], [1,4,9,9], [1,5,5,7], [1,5,5,8], [1,5,7,7], [1,6,6,7], [1,6,7,7], [1,6,7,8], [1,7,7,7], [1,7,7,8], [1,8,9,9], [1,9,9,9], [2,2,2,2], [2,2,2,6], [2,2,7,9], [2,2,9,9], [2,3,3,4], [2,5,5,5], [2,5,5,6], [2,5,9,9], [2,6,7,7], [2,7,7,7], [2,7,7,9], [2,7,9,9], [2,9,9,9], [3,3,5,8], [3,4,6,7], [3,4,8,8], [3,5,5,5], [3,5,7,7], [4,4,5,9], [4,4,6,7], [4,4,9,9], [4,7,7,9], [4,7,7,9], [4,9,9,9], [5,5,5,7], [5,5,5,8], [5,5,6,9], [5,5,7,9], [5,5,7,9], [5,7,7,7], [5,7,7,8], [5,7,9,9], [5,8,9,9], [5,9,9,9], [6,6,6,7], [6,6,7,7], [6,6,7,8], [6,6,9,9], [6,7,7,7], [6,7,7,8], [6,7,7,9], [6,7,8,8], [6,9,9,9], [7,7,7,7], [7,7,7,8], [7,7,7,9], [7,7,8,8], [7,7,8,9], [7,7,9,9], [7,7,8,8], [7,7,8,9], [7,7,9,9], [7,8,8,8], [7,7,8,9], [7,7,9,9], [7,8,8,8], [7,8,9,9], [7,9,9,9], [8,8,8,8], [8,8,8,9], [8,8,9,9], [8,9,9,9], [9,9,9,9]]
let joinedunsolves = unsolvables.map(arr => arr.join(''))

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
    gameNumsArray.forEach(num => {
    let numBtn = document.createElement('button')
    numBtn.innerText = num
    numBtn.className = "num-buttons"
    numberContainer().appendChild(numBtn)
    numBtn.addEventListener("click", () => populateUserInput(numBtn))
    })
}

function get24From(){
const gameNumbers = Array.from({length: 4},
    () => getRandomInt(1, 9))
    checkGameNums(gameNumbers) ? get24From() : makeNumButtons(gameNumbers)
    // makeNumButtons(gameNumbers)
}

function checkGameNums(thisThing){
    console.log("checking numbers")
    let sorted = thisThing.sort(function(a, b){return a - b})
    // if _.isEqual(sorted, unsolvables)
    let joined = sorted.join('')
    return unsolvables.find(arr => arr.join('').includes(joined))
 }

function nextGameHandler(){
    clearDiv(numberContainer())
    event.target.id = "submit-button"
    event.target.innerText = "Submit"
    event.target.removeEventListener("click", nextGameHandler)
    submitButton().addEventListener('click', solve24)
    resetHandler()
    get24From()
}

function clearDiv(div){
   while(div.firstChild){
    div.firstChild.remove()
   }
}

function resetButton(){
    return document.getElementById('reset-button')
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
function submitButton(){
    return document.getElementById('submit-button')
}
function nextGameButton(){
    return document.getElementById('next-game-button')
}
function endGameButton(){
    return document.getElementById('end-game')
}

function numberButtons(){
    return document.getElementsByClassName('num-buttons')
}

function isDisabled(){
    let checkedButtons = Array.from(numberButtons())
    // debugger
    return checkedButtons.map(btn => btn.disabled)
}
function solve24(){
    // debugger
    if (isDisabled().every(v => v === true)){
     
        // if parseInt(UserBox().value)
        if (math.evaluate(UserBox().value) == 24){
        // if userSolution == 24
        alert(`You got 24 through ${UserBox().value}!`)
        event.target.id = "next-game-button"
        event.target.innerText = "Next Game"
        event.target.removeEventListener("click", solve24)
        nextGameButton().addEventListener("click", nextGameHandler)}

        /* backend info needed

        event.target.nextElementSibling.id = "end-game"
        event.target.nextElementSibling.innerText = "End Streak"
        endGameButton().addEventListener("click", ()=>console.log("end"))}
        */

        else
        {alert("Nope. Try again!")
        resetHandler()}}
    else alert("You must use all numbers")
}

