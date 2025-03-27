const startBtn = document.querySelector('#start')

const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeElement = document.querySelector('#time')
const board = document.querySelector('#board')
const colors =['#51e2f5', '#d433de','#edf756','#ffa8B6', '#2fd93c', '#fa60ff', '#45515e']

let time= 0
let score = 0
let int

startBtn.addEventListener('click', (evt)=>{
    evt.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (evt)=>{
    if(evt.target.classList.contains('time-btn')){
        time = parseInt(evt.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})
board.addEventListener('click',(evt) => {
    if(evt.target.classList.contains('circle')){
        score++
        evt.target.remove()
        createRandomCircle()
    }
})
function startGame(){
    int = setInterval(decreaseTime, 1000)
    setTime(time)
    createRandomCircle()
}
function decreaseTime (){
    if (time===0){
        finishGame()
    }else{
        let current = --time
        if(current<10){
            current = `0${current}`
        }
        setTime(current)
    }  
}
function setTime (value){
    timeElement.innerHTML=`00:${value}` 
}

function finishGame (){
    timeElement.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счет: <span class='primary'>${score}</span></h1><br>
        <a href="#" class="start" id="back">Начать игру</a>`
    clearTimeout(int)
    const backBtn = document.querySelector('#back')
    backBtn.addEventListener('click', (evt)=>{
        evt.preventDefault()
        clearGame()
    })
}

function clearGame (){
    for(let screen of screens){
        screen.classList.remove('up')
    }
    board.innerHTML = ''
    timeElement.parentNode.classList.remove('hide')
    score = 0  
}

function createRandomCircle(){
    const circle = document.createElement('div')
    const size = getRandomNumber(10,60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0,width-size)
    const y = getRandomNumber(0,height-size)
    const color = getRandomColor()

    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.background = color
    board.append(circle)
}

function getRandomNumber (min,max){
    return Math.round(Math.random() * (max-min) + min)
}
function getRandomColor() {
    return colors[Math.floor(Math.random()*colors.length)]
}


