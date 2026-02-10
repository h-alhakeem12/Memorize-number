const startButton = document.querySelector("#start")
const restartButton = document.querySelector("#restart")

const levelText = document.querySelector("#level")
const flexBlock = document.querySelectorAll(".flex-block")
const container = document.querySelector(".flex-container")

const middle = document.querySelector(".middle")

const first = document.querySelector(".first")
const second = document.querySelector(".second")
const third = document.querySelector(".third")

const score = document.querySelector(".score")

let scoreCount = 0
let lives = 3
let currentLevel = 1
let expectedNumber = 1

function hearts() {
  array = []

  for (let i = 0; i < lives; i++) {
    array.push("❤️")
  }

  first.textContent = array[0]
  second.textContent = array[1]
  third.textContent = array[2]
  init()
}

console.log(first)

first.style.fontSize = "30px"
second.style.fontSize = "30px"
third.style.fontSize = "30px"

startButton.addEventListener("click", () => {
  startButton.style.display = "none"
  levelText.style.display = "block"
  score.style.visibility = "visible"

  hearts()

  init()
})
restartButton.addEventListener("click", () => {
  restartGame()
})

function init() {
  expectedNumber = 1
  levelText.textContent = `Level ${currentLevel}`
  score.textContent = `score:${scoreCount}`
  score.style.fontSize = "30px"

  const blocksCount = currentLevel + 3

  flexBlock.forEach((block, index) => {
    block.style.backgroundColor = "rgb(32, 32, 148)"
    block.style.display = "none"

    if (index < blocksCount) {
      const randomX = Math.floor(Math.random() * 80)
      const randomY = Math.floor(Math.random() * 80)

      block.style.top = randomX + "%"
      block.style.left = randomY + "%"

      block.style.display = "flex"
      block.style.alignItems = "center"
      block.style.justifyContent = "center"

      block.style.visibility = "visible"

      const myNum = index + 1
      block.textContent = myNum

      block.onclick = null
      setTimeout(() => {
        block.textContent = ""
      }, 4000)

      block.onclick = function () {
        if (myNum === expectedNumber) {
          block.textContent = myNum
          block.style.backgroundColor = "green"
          expectedNumber++

          if (expectedNumber > blocksCount) {
            scoreCount += 10

            currentLevel++
            setTimeout(init, 1000)
          }
        } else {
          block.style.backgroundColor = "red"

          lives--
          hearts()
          if (lives === 0) {
            block.style.backgroundColor = "red"

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
  hearts()
  restartButton.style.display = "none"
  init()
}
