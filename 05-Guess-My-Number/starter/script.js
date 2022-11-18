'use strict';

/*
console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = '🎉 Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

console.log(document.querySelector('.guess').value);
document.querySelector('.guess').value = 23;
*/

document.querySelector('.check').addEventListener('click', e => {
  const guess = Number(document.querySelector('.guess').value);

  console.log(guess, typeof guess);
});
