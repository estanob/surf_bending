const KeyMaster = require('../src/keymaster.js');
const Power = require('./power.js');
const Game = require('./game.js');
const Surfer = require('./surfer.js');
const Background = require('./background.js');

const GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.surfer = this.game.addSurfer();
  this.icebergs = this.game.addIcebergs();
};

const gameContainer = document.getElementById("game-container");
const canvas = document.getElementById("game-canvas");

GameView.MOVES = {
  "up": [0, -0.5],
  "down": [0, 0.5],
  "left": [-0.5, 0],
  "right": [0.5, 0],
};

GameView.prototype.bindKeyHandlers = function () {
  const surfer = this.surfer;

  Object.keys(GameView.MOVES).forEach(k => {
    let move = GameView.MOVES[k];
    key(k, function () { surfer.surf(move) }) 
  });
  
  key("space", function () { 
    surfer.waterBend()
  });

  key("x", function () {
    surfer.stopWave()
  })

  key("c", function () {
    surfer.killWaves()
  })
};

GameView.prototype.start = function () {
  this.backGround = new Background(this.ctx)
  this.game.score = 0;
  this.game.gameOver = false;
  this.bindKeyHandlers();
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function (time) {
  const delta = time - this.lastTime;
  this.backGround.drawBackground(this.ctx); // draw background first
  this.game.gameDraw(this.ctx); // then draw all items on top of background
  this.lastTime = time;
  this.displayIcebergInfo();
  this.displayPowerInfo();
  if (this.game.waves.length >= this.game.bendingPower) {
    this.powerWarning();
  }
  if (this.game.icebergsPassed >= Math.ceil(this.game.numIcebergs * 0.88)) {
    this.gameAlmostWon();
  }
  this.game.step(delta);
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.displayIcebergInfo = function () {
  this.ctx.fillStyle ="#045080"
  this.ctx.font = "15px BlinkMacSystemFont,Roboto,Helvetica Neue,Arial,sans-serif"
  this.ctx.fillText("Number of Icebergs: " + this.game.numIcebergs, 10, 20)
  this.ctx.fillText("Icebergs Hit: " + this.game.icebergsHit, 10, 40)
}

GameView.prototype.displayPowerInfo = function () {
  this.ctx.fillStyle ="#FFFFFF"
  this.ctx.font = "15px BlinkMacSystemFont,Roboto,Helvetica Neue,Arial,sans-serif"
  this.ctx.fillText("Bending Power Distance: " + this.game.powerDistance, 10, 520)
  this.ctx.fillText("Max Bending Power: " + this.game.bendingPower, 10, 540)
}

GameView.prototype.powerWarning = function () {
  this.ctx.fillStyle ="#FE3105"
  this.ctx.font = "25px BlinkMacSystemFont,Roboto,Helvetica Neue,Arial,sans-serif"
  this.ctx.fillText("Your chi is low, you can't bend right now!!!", 360, 240)
}

GameView.prototype.gameAlmostWon = function () {
  this.ctx.fillStyle ="#FFFFFF"
  this.ctx.font = "25px BlinkMacSystemFont,Roboto,Helvetica Neue,Arial,sans-serif"
  this.ctx.fillText("You're almost at the end!!!", 920, 540)
}

GameView.prototype.restart = function () {
  gameContainer.classList.remove("hidden")
  canvas.classList.remove("hidden")
  this.start();
}

module.exports = GameView;