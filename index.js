const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $time = document.querySelector('#time')
const $result = document.querySelector('#result')
const $timeHeader = document.querySelector('#time-header')
const $resultHeader = document.querySelector('#result-header')
const $gameTime = document.querySelector('#game-time')

let score = 0
let isGameStarted = false
let color = ['#e57373', '#f06292', '#ba68c8', '#9575cd', '#7986cb', '#64b5f6',
    '#4fc3f7', '#4dd0e1', '#4db6ac', '#81c784', '#aed581', '#dce775', '#fff176', '#ffd54f',
    '#ffb74d', '#ff8a65', '#a1887f']

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBlockClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function handleBlockClick(event) {
    if (!isGameStarted) {
        return
    }
    if (event.target.dataset.box) {
        score++
        renderBox()
    }
}

function startGame() {
    score = 0
    setGameTime()
    hide($start)
    $gameTime.setAttribute('disabled', 'true')
    isGameStarted = true
    $game.style.backgroundColor = '#fff'

    let interval = setInterval(function () {
        let time = parseFloat($time.textContent)
        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)

    renderBox()
}

function endGame() {
    isGameStarted = false
    show($start)
    hide($timeHeader)
    show($resultHeader)
    $game.style.backgroundColor = '#ccc'
    $game.innerHTML = ''
    $gameTime.removeAttribute('disabled')
    setGameScore()
}

function setGameTime() {
    let time = +$gameTime.value
    show($timeHeader)
    hide($resultHeader)
    $time.textContent = time.toFixed(1)
}

function setGameScore() {
    $result.textContent = score.toString()
}

function renderBox() {
    $game.innerHTML = ''
    let box = document.createElement('div')
    let boxSize = getRandom(30, 100)
    let gameSize = $game.getBoundingClientRect()
    let maxTop = gameSize.height - boxSize
    let maxLeft = gameSize.width - boxSize
    let randomColor = getRandom(0, color.length)

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = color [randomColor]
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
