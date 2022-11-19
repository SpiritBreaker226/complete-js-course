'use strict';

// Players
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

// Dice
const diceEl = document.querySelector('.dice');

// Buttons
const btnRollDice = document.querySelector('.btn--roll');

let currentScore = 0;

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

    // TODO CHange later
    current0El.textContent = currentScore;

    return;
  }

  // switch to next player
});
