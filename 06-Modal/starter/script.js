'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnShowModals = document.querySelectorAll('.show-modal');

btnShowModals.forEach(btnShowModal =>
  btnShowModal.addEventListener('click', () => {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  })
);
