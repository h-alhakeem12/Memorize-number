const startButton = document.querySelector("#start")
const restartButton = document.querySelector("#restart")

const levelText = document.querySelector("#level")
const items = document.querySelectorAll(".flex-item")
const container = document.querySelector(".flex-container")

let currentLevel = 1
let expectedNumber = 1

startButton.addEventListener("click", () => {
  startButton.style.display = "none"
  levelText.style.display = "block"
  init()
})
function restart(item) {
  item.style.backgroundColor = "red"
  levelText.textContent = "Game over"
  restartButton.style.display = "block"
  restartButton.addEventListener("click", () => {
    restartButton.style.display = "none"
    levelText.style.display = "block"
    item.style.backgroundColor = "rgb(32, 32, 148)"
    levelText.textContent = `Level ${currentLevel}`
  })
}

function init() {
  expectedNumber = 1
  levelText.textContent = `Level ${currentLevel}`
  const blocks = expectedNumber + 3

  items.forEach((item, x) => {
    if (x < blocks) {
      const randomX = Math.floor(Math.random() * 80)
      const randomY = Math.floor(Math.random() * 80)

      item.style.top = randomX + "%"
      item.style.left = randomY + "%"

      item.style.display = "flex"
      item.style.alignItems = "center"
      item.style.justifyContent = "center"

      item.style.visibility = "visible"
      item.style.fontSize = "20px"

      const myNum = x + 1
      item.textContent = myNum

      setTimeout(() => {
        item.textContent = ""
      }, 4000)
      item.addEventListener("click", () => {
        setTimeout((item.style.backgroundColor = "rgb(32, 32, 148)"), 4000)
        if (myNum === expectedNumber) {
          item.textContent = myNum

          item.style.backgroundColor = "green"
          expectedNumber++
          if (expectedNumber > blocks) {
            currentLevel++
            setTimeout(init, 1000)
          }
        } else {
          restart(item)
        }
      })
    }
  })
}
