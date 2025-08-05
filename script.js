// Estado do jogo
let board = ['black', 'black', 'black', 'empty', 'white', 'white', 'white']
let selectedPosition = -1
let moves = 0
let gameWon = false

function createBoard() {
  const boardElement = document.getElementById('board')
  boardElement.innerHTML = ''

  for (let i = 0; i < 7; i++) {
    const position = document.createElement('div')
    position.className = 'position'
    position.id = `pos-${i}`
    position.onclick = () => handlePositionClick(i)

    const positionNumber = document.createElement('div')
    positionNumber.className = 'position-number'
    positionNumber.textContent = i
    position.appendChild(positionNumber)

    if (board[i] !== 'empty') {
      const piece = document.createElement('div')
      piece.className = `piece ${board[i]}`
      position.appendChild(piece)
    }

    boardElement.appendChild(position)
  }
}

function handlePositionClick(position) {
  if (selectedPosition === -1) {
    // Selecionar uma peça
    if (board[position] !== 'empty') {
      selectedPosition = position
      updateBoard()
      showPossibleMoves()
    }
  } else {
    // Tentar mover para a posição clicada
    if (isValidMove(selectedPosition, position)) {
      makeMove(selectedPosition, position)
      selectedPosition = -1
      moves++
      updateMoves()
      updateBoard()
      checkWin()
    } else if (board[position] !== 'empty' && position !== selectedPosition) {
      // Selecionar uma nova peça
      selectedPosition = position
      updateBoard()
      showPossibleMoves()
    } else {
      // Desselecionar
      selectedPosition = -1
      updateBoard()
    }
  }
}

function isValidMove(from, to) {
  if (board[to] !== 'empty') return false

  // Movimento adjacente
  if (Math.abs(from - to) === 1) return true

  // Pulo sobre uma peça
  if (Math.abs(from - to) === 2) {
    const middle = (from + to) / 2
    return board[middle] !== 'empty'
  }

  return false
}

function makeMove(from, to) {
  board[to] = board[from]
  board[from] = 'empty'
}

function showPossibleMoves() {
  if (selectedPosition === -1) return

  for (let i = 0; i < 7; i++) {
    if (isValidMove(selectedPosition, i)) {
      document.getElementById(`pos-${i}`).classList.add('possible-move')
    }
  }
}

function updateBoard() {
  // Limpar todas as classes especiais
  for (let i = 0; i < 7; i++) {
    const posElement = document.getElementById(`pos-${i}`)
    posElement.classList.remove('selected', 'possible-move')
  }

  // Marcar posição selecionada
  if (selectedPosition !== -1) {
    document.getElementById(`pos-${selectedPosition}`).classList.add('selected')
  }

  // Recriar o tabuleiro
  createBoard()

  // Reaplica as classes após recriar
  if (selectedPosition !== -1) {
    document.getElementById(`pos-${selectedPosition}`).classList.add('selected')
    showPossibleMoves()
  }
}

function updateMoves() {
  document.getElementById('moves').textContent = moves
}

function checkWin() {
  const winCondition = [
    'white',
    'white',
    'white',
    'empty',
    'black',
    'black',
    'black',
  ]
  const isWin = board.every((piece, index) => piece === winCondition[index])

  if (isWin && !gameWon) {
    gameWon = true
    document.getElementById(
      'game-status'
    ).innerHTML = `<div class="victory">🎉 Parabéns! Você resolveu o puzzle em ${moves} movimentos! 🎉</div>`
  }
}

function resetGame() {
  board = ['black', 'black', 'black', 'empty', 'white', 'white', 'white']
  selectedPosition = -1
  moves = 0
  gameWon = false

  updateMoves()
  updateBoard()
  document.getElementById('game-status').textContent =
    'Clique em uma peça para começar'
}

// Inicializar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', function () {
  createBoard()
  updateMoves()
})
