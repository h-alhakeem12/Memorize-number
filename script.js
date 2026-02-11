const startButton = document.querySelector("#start")
const restartButton = document.querySelector("#restart")

const levelText = document.querySelector("#level")
const flexBlock = document.querySelectorAll(".flex-block")
const container = document.querySelector(".flex-container")

const first = document.querySelector(".first")
const second = document.querySelector(".second")
const third = document.querySelector(".third")

const score = document.querySelector(".score")
const bestScore = document.querySelector(".best-score")

let scoreCount = 0
let lives = 3
let currentLevel = 1
let expectedNumber = 1
let bestScoreCount = 0
let gameOver = false
let canClick = false
function hearts() {
  array = []

  for (let i = 0; i < lives; i++) {
    array.push("❤️")
  }

  first.textContent = array[0]
  second.textContent = array[1]
  third.textContent = array[2]
}

first.style.fontSize = "20px"
second.style.fontSize = "20px"
third.style.fontSize = "20px"

startButton.addEventListener("click", () => {
  startButton.style.display = "none"
  levelText.style.display = "block"
  score.style.visibility = "visible"
  gameOver = false

  hearts()

  init()
})
restartButton.addEventListener("click", () => {
  restartGame()
})

function init() {
  if (gameOver) return
  expectedNumber = 1
  canClick = false
  levelText.textContent = `Level ${currentLevel}`
  score.textContent = `score:${scoreCount}`
  score.style.fontSize = "15px"
  bestScore.textContent = `best score:${bestScoreCount}`

  const blocksCount = currentLevel + 3

  let usedPositions = []

  flexBlock.forEach((block, index) => {
    block.style.backgroundColor = "rgb(32, 32, 148)"
    block.style.display = "none"

    if (index < blocksCount) {
      let randomX = Math.floor(Math.random() * 85)
      let randomY = Math.floor(Math.random() * 85)

      for (let i = 0; i < usedPositions.length; i++) {
        if (
          Math.abs(usedPositions[i].x - randomX) < 10 &&
          Math.abs(usedPositions[i].y - randomY) < 10
        ) {
          randomX = Math.floor(Math.random() * 85)
          randomY = Math.floor(Math.random() * 85)
        }
      }
      usedPositions.push({ x: randomX, y: randomY })
      console.log(usedPositions)

      block.style.position = "absolute"
      block.style.top = randomX + "%"
      block.style.left = randomY + "%"

      block.style.display = "flex"
      block.style.alignItems = "center"
      block.style.justifyContent = "center"

      block.style.visibility = "visible"

      const myNum = index + 1
      block.textContent = myNum

      setTimeout(() => {
        block.textContent = ""

        canClick = true
      }, 4000)

      block.onclick = function () {
        if (gameOver || !canClick) return

        if (myNum === expectedNumber) {
          block.textContent = myNum
          block.style.backgroundColor = "green"
          expectedNumber++

          if (expectedNumber > blocksCount) {
            scoreCount += 10
            currentLevel++
            setTimeout(init, 1000)
            if (scoreCount > bestScoreCount) {
              bestScoreCount = scoreCount
            }
          }
        } else {
          block.style.backgroundColor = "red"
          lives--
          hearts()

          setTimeout(() => {
            block.style.backgroundColor = "rgb(32, 32, 148)"
          }, 1000)

          if (lives === 0) {
            gameOver = true
            canClick = false
            score.style.visibility = "hidden"
            levelText.textContent = "Game Over"
            restartButton.style.display = "block"
          }
        }
      }
    }
  })
}

function restartGame() {
  currentLevel = 1
  lives = 3
  scoreCount = 0
  expectedNumber = 1
  gameOver = false
  canClick = false
  hearts()
  restartButton.style.display = "none"
  init()
}
