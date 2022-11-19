'use strict';

// Players
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

// Dice
const diceEl = document.querySelector('.dice');

// Buttons
const btnNew = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores;
let currentScore;
let activePlayer;
let isPlaying;

const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

init();

// Rolling dice functionality
btnRollDice.addEventListener('click', () => {
  if (!isPlaying) {
    return;
  }

  // 1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice
  diceEl.src = `dice-${dice}.png`;
  diceEl.classList.remove('hidden');

  // 3. Check for rolled 1: fi true
  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;

    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;

    return;
  }

  // switch to next player
  switchPlayer();
});

btnHold.addEventListener('click', () => {
  if (!isPlaying) {
    return;
  }

  // 1. Add current score to active player's score
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];

  // 2. CHeck if player is 100
  if (scores[activePlayer] >= 100) {
    isPlaying = false;

    diceEl.classList.add('hidden');

    // end gam
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    return;
  }

  // switch players
  switchPlayer();
});

btnNew.addEventListener('click', init);
