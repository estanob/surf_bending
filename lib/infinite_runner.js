document.addEventListener('DOMContentLoaded', () => {
  const GameView = require('./game_view.js');
  const Game = require('./game.js');
  
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas ? canvas.getContext("2d") : {};
  
  if (canvas) {
    canvas.setAttribute("width", "1200px");
    canvas.setAttribute("height", "550px");
  }
  
  const continueButton = document.getElementById('continue');
  const startButton = document.getElementById('start');
  const loseRestartButton = document.getElementById('lose-restart');
  const winRestartButton = document.getElementById('win-restart');
  const splash = document.getElementById('splash');
  const instructions = document.getElementById('game-explanation');
  const endScreen = document.getElementById("end-screen");
  const winScreen = document.getElementById("win-screen");
  const g = new Game(ctx);
  const game = new GameView(g, ctx)
  const gameContainer = document.getElementById("game-container");
  
  
  if (startButton) {
    startButton.addEventListener("click", () => {
      splash.classList.add("hidden");
      instructions.classList.remove("hidden");
    })
  }
  
  if (continueButton) {
    continueButton.addEventListener("click", () => {
      instructions.classList.add("hidden");
      gameContainer.classList.remove("hidden");
      canvas.classList.remove("hidden");
      game.start();
    });
  }
  
  if (loseRestartButton) {
    loseRestartButton.addEventListener("click", () => {
      window.location.reload()
      endScreen.classList.add("hidden");
      gameContainer.classList.remove("hidden");
      game.restart();
    });
  }
  
  if (winRestartButton) {
    winRestartButton.addEventListener("click", () => {
      window.location.reload()
      winScreen.classList.add("hidden");
      gameContainer.classList.remove("hidden");
      game.restart();
    });
  }
})