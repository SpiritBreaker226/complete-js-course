'use strict';

/*
console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = '🎉 Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

console.log(document.querySelector('.guess').value);
document.querySelector('.guess').value = 23;
*/

const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;

document.querySelector('.number').textContent = secretNumber;

document.querySelector('.check').addEventListener('click', e => {
  const guess = Number(document.querySelector('.guess').value);

  console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector('.message').textContent = '⛔️ No number!';

    return;
  }

  if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct Number!';

    return;
  }

  document.querySelector('.message').textContent =
    guess > secretNumber ? '📈 Too High!' : '📉 Too Low!';

  score--;

  document.querySelector('.score').textContent = score;
});
