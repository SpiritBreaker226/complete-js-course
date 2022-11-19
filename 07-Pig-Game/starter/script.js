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
const btnRollDice = document.querySelector('.btn--roll');

let currentScore = 0;
let activePlayer = 0;

score0El.textContent = 0;
score1El.textContent = 0;

diceEl.classList.add('hidden');

// Rolling dice functionality
btnRollDice.addEventListener('click', () => {
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

  // udpate scurrent score
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
});
