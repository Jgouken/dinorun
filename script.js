import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection} from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById("game-board")

function main(currentTime) {
    if (gameOver) {
        if (snakeIntersection()) {
            if (confirm('You ran into yourself! Press OK to eat yourself out of existence or press cancel to view your mistakes.')) return window.location = '/'
        } else {
            if (confirm('You left the grid! Stay on the field! Press OK to enter the white void or press cancel to view your mistakes.')) return window.location = '/'
        }
        return;
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function outsideGrid(position) {
    return position.x < 1 || position.x > 42 || position.y < 1 || position.y > 42
}

