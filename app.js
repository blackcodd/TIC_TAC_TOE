const boxes = document.querySelectorAll('.box');
const resetButton = document.querySelector('#resetButton');
const newMatchButton = document.querySelector('#newMatchButton');
const turnStatus = document.querySelector('#turnStatus');
const moveCount = document.querySelector('#moveCount');
const roundNumber = document.querySelector('#roundNumber');
const scoreX = document.querySelector('#scoreX');
const scoreO = document.querySelector('#scoreO');
const scoreXCard = document.querySelector('#scoreXCard');
const scoreOCard = document.querySelector('#scoreOCard');
const statusDot = document.querySelector('#statusDot');
const resultModal = document.querySelector('#resultModal');
const menuModal = document.querySelector('#menuModal');
const quitModal = document.querySelector('#quitModal');
const resultTitle = document.querySelector('#resultTitle');
const resultCopy = document.querySelector('#resultCopy');
const resultIcon = document.querySelector('#resultIcon');
const soundLabel = document.querySelector('#soundLabel');
const soundIcon = document.querySelector('#soundIcon');

let currentPlayer = 'X';
let round = 1;
let scores = { X: 0, O: 0 };
let soundEnabled = true;
let gameOver = false;

let ans = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playSound() {
  if (!soundEnabled) return;
  const audio = new Audio('assets/computer-mouse-click-352734.mp3');
  audio.volume = 0.35;
  audio.playbackRate = 2;
  audio.play().catch(() => {});
}

function setModal(modal, isOpen) { modal.classList.toggle('hidden', !isOpen); }

function updateStatus() {
  turnStatus.textContent = `Player ${currentPlayer}'s turn`;
  statusDot.className = `status-dot ${currentPlayer.toLowerCase()}`;
  scoreXCard.classList.toggle('active', currentPlayer === 'X' && !gameOver);
  scoreOCard.classList.toggle('active', currentPlayer === 'O' && !gameOver);
  moveCount.textContent = `${[...boxes].filter((box) => box.textContent).length} / 9`;
  boxes.forEach((box, index) => box.setAttribute('aria-label', box.textContent ? `Cell ${index + 1}: ${box.textContent}` : `Empty cell ${index + 1}`));
}

function resetRound() {
  boxes.forEach((box) => {
    box.textContent = '';
    box.disabled = false;
    box.classList.remove('winning-box', 'mark-x', 'mark-o');
  });
  currentPlayer = 'X';
  gameOver = false;
  updateStatus();
}

function startNewMatch() {
  scores = { X: 0, O: 0 };
  round = 1;
  scoreX.textContent = '0';
  scoreO.textContent = '0';
  roundNumber.textContent = '1';
  resetRound();
  setModal(resultModal, false);
  setModal(menuModal, false);
  setModal(quitModal, false);
}

function showResult(winner, winningLine = []) {
  gameOver = true;
  boxes.forEach((box) => (box.disabled = true));
  winningLine.forEach((index) => boxes[index].classList.add('winning-box'));
  if (winner) {
    scores[winner] += 1;
    document.querySelector(`#score${winner}`).textContent = scores[winner];
    resultIcon.textContent = winner;
    resultIcon.className = `result-icon ${winner.toLowerCase()}`;
    resultTitle.textContent = `Player ${winner} wins!`;
    resultCopy.textContent = scores[winner] >= 5 ? 'That makes five. Match victory!' : 'That was a clean line.';
    turnStatus.textContent = `Player ${winner} takes the round`;
  } else {
    resultIcon.textContent = '=';
    resultIcon.className = 'result-icon tie';
    resultTitle.textContent = 'It is a draw';
    resultCopy.textContent = 'No room left on the grid. Run it back?';
    turnStatus.textContent = 'Round drawn';
  }
  scoreXCard.classList.remove('active');
  scoreOCard.classList.remove('active');
  setModal(resultModal, true);
}

function checkWinner() {
  for (const line of ans) {
    const [a, b, c] = line;
    if (boxes[a].textContent && boxes[a].textContent === boxes[b].textContent && boxes[b].textContent === boxes[c].textContent) return { player: boxes[a].textContent, line };
  }
  return null;
}

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (gameOver || box.textContent) return;
    playSound();
    box.textContent = currentPlayer;
    box.classList.add(`mark-${currentPlayer.toLowerCase()}`);
    box.disabled = true;
    const result = checkWinner();
    if (result) { showResult(result.player, result.line); return; }
    if ([...boxes].every((cell) => cell.textContent)) { showResult(null); return; }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
  });
});

resetButton.addEventListener('click', resetRound);
newMatchButton.addEventListener('click', startNewMatch);
document.querySelector('#nextRoundButton').addEventListener('click', () => {
  round += 1;
  roundNumber.textContent = round;
  setModal(resultModal, false);
  resetRound();
});
document.querySelector('#resultMenuButton').addEventListener('click', () => { setModal(resultModal, false); setModal(menuModal, true); });
document.querySelector('#menuButton').addEventListener('click', () => setModal(menuModal, true));
document.querySelector('#closeMenuButton').addEventListener('click', () => setModal(menuModal, false));
document.querySelector('#resumeButton').addEventListener('click', () => setModal(menuModal, false));
document.querySelector('#menuNewRoundButton').addEventListener('click', () => { setModal(menuModal, false); resetRound(); });
document.querySelector('#menuNewMatchButton').addEventListener('click', startNewMatch);
document.querySelector('#soundButton').addEventListener('click', () => { soundEnabled = !soundEnabled; soundLabel.textContent = soundEnabled ? 'On' : 'Off'; soundIcon.textContent = soundEnabled ? '\u266b' : '\u00d7'; });
document.querySelector('#quitButton').addEventListener('click', () => { setModal(menuModal, false); setModal(quitModal, true); });
document.querySelector('#continueButton').addEventListener('click', () => setModal(quitModal, false));
document.querySelector('#quitNewMatchButton').addEventListener('click', startNewMatch);
document.querySelectorAll('.modal-backdrop').forEach((backdrop) => backdrop.addEventListener('click', (event) => { if (event.target === backdrop && backdrop.id !== 'resultModal') setModal(backdrop, false); }));

updateStatus();

newbtn.addEventListener('click', () => {
  boxes.forEach((box) => {
    box.innerText = '';
    box.disabled = false;
  });
  hide_winner.classList.add('afterwin');
  terno = true;
});
