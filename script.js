// *** Global Variables ***
const gameBoxNode = document.querySelector("#game-box");

const ballNode = document.createElement("div"); // se crea la pelotita
ballNode.id = "ball"; // se asigna un id a la pelotita (para CSS)
gameBoxNode.append(ballNode); // se añade la pelotita a la caja de juego

const paddleNode = document.createElement("div"); // se crea la paleta
paddleNode.id = "paddle"; // se asigna un id a la paleta (para CSS)
gameBoxNode.append(paddleNode); // se añade la pelotita a la caja de juego

// las dimensiones y posiciones de la pelotita
const ball = {
  x: 30, // posición en el eje X (horizontal)
  y: 30, // posición en el eje Y (vertical)
  w: 20, // ancho
  h: 20, // alto
  speed: 2.5, // velocidad
  isBallMovingRight: true, // si es true, se mueve a la derecha, si es false, se mueve a la izquierda.
  isBallMovingDown: true,
}

const paleta = {
  x: 200, // posición en el eje X (horizontal)
  y: 550, // posición en el eje Y (vertical)
  w: paddleNode.offsetWidth, // ancho
  h: paddleNode.offsetHeight, // alto
  speed: 10
}

// *** Game Functions ***
function gameLoop() {
  // console.log("ejecutando 60 veces por segundo")

  movimientoPelotita()
  colisionPelotitaPared()
  colisionPaletaPelota()
}

function gameOver() {
  clearInterval(gameIntervalId)
  alert("Has perdido :(")
}

function colisionPaletaPelota() {

  if (
    ball.x < paleta.x + paleta.w &&
    ball.x + ball.w > paleta.x &&
    ball.y < paleta.y + paleta.h &&
    ball.y + ball.h > paleta.y
  ) {
    // Collision detected!
    console.log("colisionando con la paleta")
    ball.isBallMovingDown = false;
  } 

}

function movimientoPelotita() {
  if (ball.isBallMovingRight === true) {
    ball.x += ball.speed
  } else {
    ball.x -= ball.speed
  }
  ballNode.style.left = `${ball.x}px` // linea que actualiza el DOM (posición en X)

  if (ball.isBallMovingDown === true) {
    ball.y += ball.speed
  } else {
    ball.y -= ball.speed
  }
  ballNode.style.top = `${ball.y}px` // linea que actualiza el DOM (posición en Y)
}

function colisionPelotitaPared() {

  if ((ball.x + ball.w) >= gameBoxNode.offsetWidth) {
    // console.log("pelotita colisionando")
    ball.isBallMovingRight = false;
  }
  if ((ball.y + ball.h) >= gameBoxNode.offsetHeight) {
    // ball.isBallMovingDown = false;
    gameOver()
  }
  if (ball.x <= 0) {
    ball.isBallMovingRight = true;
  }
  if (ball.y <= 0) {
    ball.isBallMovingDown = true;
  }

}

// *** Game Loop Interval ***
const gameIntervalId = setInterval(() => {
  gameLoop()
}, 1000/60) // 60fps

// *** Event Listeners ***
window.addEventListener("keydown", (event) => {
  //console.log("presionando cualquier tecla", event)
  if (event.code === "KeyD") {
    console.log("movimiento paleta a la derecha")
    paleta.x += paleta.speed
    paddleNode.style.left = `${paleta.x}px`
  } else if (event.code === "KeyA") {
    console.log("movimiento paleta a la izquierda")
    paleta.x -= paleta.speed
    paddleNode.style.left = `${paleta.x}px`
  }
})




