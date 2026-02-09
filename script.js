const startButton = document.querySelector("#start")
const restartButton = document.querySelector("#restart")

const levelText = document.querySelector("#level")
const items = document.querySelectorAll(".flex-item")
const container = document.querySelector(".flex-container")

let currentLevel = 1
let expectedNumber = 1

let click = false

startButton.addEventListener("click", () => {
  startButton.style.display = "none"
  levelText.style.display = "block"
  init()
})
restartButton.addEventListener("click", () => {
  restartGame()
})

function init() {
  expectedNumber = 1
  click = false
  levelText.textContent = `Level ${currentLevel}`
  const blocks = currentLevel + 3

  items.forEach((item, x) => {
    item.style.backgroundColor = "rgb(32, 32, 148)"
    item.style.display = "none"

    if (x < blocks) {
      const randomX = Math.floor(Math.random() * 80)
      const randomY = Math.floor(Math.random() * 80)

      item.style.top = randomX + "%"
      item.style.left = randomY + "%"

      item.style.display = "flex"
      item.style.alignItems = "center"
      item.style.justifyContent = "center"

      item.style.visibility = "visible"

      const myNum = x + 1
      item.textContent = myNum

      item.onclick = null
      setTimeout(() => {
        item.textContent = ""
      }, 4000)

      item.onclick = function () {
        if (click) return
        if (myNum === expectedNumber) {
          item.textContent = myNum
          item.style.backgroundColor = "green"
          expectedNumber++

          if (expectedNumber > blocks) {
            currentLevel++
            setTimeout(init, 1000)
          }
        } else {
          item.style.backgroundColor = "red"
          levelText.textContent = "Game Over"
          restartButton.style.display = "block"
        }
      }
    }
  })
}

items.style.backgroundColor = "red"
levelText.textContent = "Game Over"
restartButton.style.display = "block"

function restartGame() {
  currentLevel = 1
  restartButton.style.display = "none"
  init()
}
