'use strict';

/*
console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = '🎉 Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

console.log(document.querySelector('.guess').value);
document.querySelector('.guess').value = 23;
*/

const displayMessage = message =>
  (document.querySelector('.message').textContent = message);

const randomNumber = () => Math.trunc(Math.random() * 20) + 1;

let secretNumber = randomNumber();
let score = 20;
let hightscore = 0;

document.querySelector('.check').addEventListener('click', e => {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayMessage('⛔️ No number!');

    return;
  }

  // When they win
  if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');

    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > hightscore) {
      hightscore = score;
      document.querySelector('.highscore').textContent = score;
    }

    return;
  }

  // Game Over!
  if (score === 0) {
    displayMessage('💥 You lost the game!');

    return;
  }

  const hint = guess > secretNumber ? '📈 Too High!' : '📉 Too Low!';
  displayMessage(hint);

  score--;

  document.querySelector('.score').textContent = score;
});

// Coding Challenge #1

/*
Implement a game rest functionality, so that the player can make a new guess! Here is how:

1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the score and secretNumber variables
3. Restore the initial conditions of the message, number, score and guess input field
4. Also restore the original background color (#222) and number width (15rem)

GOOD LUCK 😀
*/

document.querySelector('.again').addEventListener('click', () => {
  secretNumber = randomNumber();
  score = 20;

  document.querySelector('.score').textContent = score;
  displayMessage('Start guessing...');
  document.querySelector('.number').textContent = '?';

  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
