'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const getDateParts = date => {
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  const hour = `${date.getHours()}`.padStart(2, 0);
  const minutes = `${date.getMinutes()}`.padStart(2, 0);

  return {
    day,
    month,
    year,
    hour,
    minutes,
  };
};

const displayMovements = ({ movements, movementsDates }, isSort = false) => {
  containerMovements.innerHTML = '';

  const movs = isSort
    ? // since sort needs either 1, -1, or zero by subtracting
      // movementA from movementB the sort can return the correct number
      //  to sort
      movements.slice().sort((movementA, movementB) => movementA - movementB)
    : movements;

  movs.forEach((movement, index) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    // please note that movementsDates[index] is not correct as the date does
    // not follow the transaction when sorted. this should be in an object with
    // the movement amount however, this is only practice.
    const { day, month, year } = getDateParts(new Date(movementsDates[index]));

    const displayDate = `${day}/${month}/${year}`;

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${index} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${movement.toFixed(2)}€</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = account => {
  account.balance = account.movements.reduce(
    (account, movement) => account + movement,
    0
  );

  labelBalance.textContent = `${account.balance.toFixed(2)}€`;
};

const calcDisplaySummary = ({ movements, interestRate }) => {
  const incomes = movements
    .filter(movement => movement > 0)
    .reduce((prevDeposit, deposit) => prevDeposit + deposit, 0);

  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = movements
    .filter(movement => movement < 0)
    .reduce((prevWithdrawn, withdrawn) => prevWithdrawn + withdrawn, 0);

  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = movements
    .filter(movement => movement > 0)
    .map(deposit => (deposit * interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((prevInterest, interest) => prevInterest + interest, 0);

  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = accounts => {
  accounts.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createUsernames(accounts);

const updateUI = account => {
  // Display Movements
  displayMovements(account);

  // Display Balance
  calcDisplayBalance(account);

  // Display Summary
  calcDisplaySummary(account);
};

const findAccount = username =>
  accounts.find(account => account.username === username);

// Event handler

let currentAccount;

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAccount = findAccount(inputLoginUsername.value);

  if (currentAccount?.pin === +inputLoginPin.value) {
    const firstName = currentAccount.owner.split(' ')[0];

    // Display UI & Message
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Welcome, back, ${firstName}`;

    const { day, month, year, hour, minutes } = getDateParts(new Date());

    labelDate.textContent = `${day}/${month}/${year} ${hour}:${minutes}`;

    // Clear input fields
    inputLoginUsername.value = '';
    inputLoginUsername.blur();
    inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  const canRequest = currentAccount.movements.some(
    movement => movement >= amount * 0.1
  );

  if (amount > 0 && canRequest) {
    // Add movement
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.blur();
  inputLoanAmount.value = '';
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const amount = +inputTransferAmount.value;
  const receiverAccount = findAccount(inputTransferTo.value);

  // Clear input fields
  inputTransferAmount.value = '';
  inputTransferAmount.blur();
  inputTransferTo.value = '';
  inputTransferTo.blur();

  if (
    receiverAccount &&
    receiverAccount.username !== currentAccount?.username &&
    amount > 0 &&
    currentAccount.balance >= amount
  ) {
    // Doing transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
  ) {
    const closeAccountIndex = accounts.findIndex(
      account => account.username === currentAccount.username
    );

    // remove account from accounts
    accounts.splice(closeAccountIndex, 1);

    // update UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';

    containerMovements.innerHTML = '';
    labelBalance.innerHTML = '';
    labelSumIn.innerHTML = '';
    labelSumOut.innerHTML = '';
    labelSumInterest.innerHTML = '';
  }

  // Clear input fields
  inputCloseUsername.value = '';
  inputCloseUsername.blur();
  inputClosePin.value = '';
  inputClosePin.blur();
});

let isSorted = false;

btnSort.addEventListener('click', e => {
  e.preventDefault();

  isSorted = !isSorted;

  displayMovements(currentAccount, isSorted);
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
