'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = (movements, isSort = false) => {
  containerMovements.innerHTML = '';

  const movs = isSort
    ? // since sort needs either 1, -1, or zero by subtracting
      // movementA from movementB the sort can return the correct number
      //  to sort
      movements.slice().sort((movementA, movementB) => movementA - movementB)
    : movements;

  movs.forEach((movement, index) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${index} ${type}</div>
        <div class="movements__value">${movement}€</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = account => {
  account.balance = account.movements.reduce(
    (account, movement) => account + movement,
    0
  );

  labelBalance.textContent = `${account.balance}€`;
};

const calcDisplaySummary = ({ movements, interestRate }) => {
  const incomes = movements
    .filter(movement => movement > 0)
    .reduce((prevDeposit, deposit) => prevDeposit + deposit, 0);

  labelSumIn.textContent = `${incomes}€`;

  const out = movements
    .filter(movement => movement < 0)
    .reduce((prevWithdrawn, withdrawn) => prevWithdrawn + withdrawn, 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = movements
    .filter(movement => movement > 0)
    .map(deposit => (deposit * interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((prevInterest, interest) => prevInterest + interest, 0);

  labelSumInterest.textContent = `${interest}€`;
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
  displayMovements(account.movements);

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

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    const firstName = currentAccount.owner.split(' ')[0];

    // Display UI & Message
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Welcome, back, ${firstName}`;

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

  const amount = Number(inputLoanAmount.value);
  const canRequest = currentAccount.movements.some(
    movement => movement >= amount * 0.1
  );

  if (amount > 0 && canRequest) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.blur();
  inputLoanAmount.value = '';
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
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

    // Update UI
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
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

  displayMovements(currentAccount.movements, isSorted);
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Coding Challenge #1

/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

console.log('Coding Challenge #1');

const checkDogs = (dogsJulia, dogsKate) => {
  const dogAges = [...dogsJulia.slice(1, -2), ...dogsKate];

  dogAges.forEach((dogAge, index) => {
    if (dogAge >= 3) {
      console.log(
        `Dog number ${index + 1} is an adult, and is ${dogAge} years old")`
      );
    } else {
      console.log(`Dog number ${index + 1} is still a puppy 🐶`);
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-');

checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

console.log('=============================');

// Coding Challenge #2

/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

console.log('Coding Challenge #2');

const calcAverageHumanAge = ages => {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adult = humanAges.filter(age => age >= 18);

  /*
  const sumOfHumanAge = humanAges.reduce((prevAge, age) => prevAge + age, 0);

  console.log(sumOfHumanAge / humanAges.length);
  */

  // another way of getting avg

  console.log(
    adult.reduce((prevAge, age, _, array) => prevAge + age / array.length, 0)
  );
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-');

calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log('=============================');

// Coding Challenge #3

/*
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

console.log('Coding Challenge #3');

const calcAverageHumanAgeChain = ages => {
  const adult = ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((prevAge, age, _, array) => prevAge + age / array.length, 0);

  console.log(adult);
};

calcAverageHumanAgeChain([5, 2, 4, 1, 15, 8, 3]);

console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-');

calcAverageHumanAgeChain([16, 6, 10, 5, 6, 1, 4]);

console.log('=============================');

// Array Methods Practice

// 1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

// 2.
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

console.log(numDeposits1000);

// Prefixed ++ oeprator
let a = 10;
console.log(++a);
console.log(a);

// 3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitzalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitzalize(word)))
    .join(' ');

  return capitzalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

// Coding Challenge #4

/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

console.log('Coding Challenge #4');

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

console.log('1.');

dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);

console.log('new dogs', dogs);

console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-');

console.log('2.');

const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));

console.log(
  `Sarah's dog eats too ${
    sarahDog.curFood > sarahDog.recommendedFood ? 'much' : 'little'
  }`
);

console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-');

console.log('3.');

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);

console.log('ownersEatTooMuch', ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);

console.log('ownersEatTooLittle', ownersEatTooLittle, dogs);

console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-');

console.log('4.');

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);

console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-');

console.log('5.');

console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-');

const checkEating = dog =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;

console.log('6.');

console.log(dogs.some(checkEating));

console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-');

console.log('7.');

const okayDogs = dogs.filter(checkEating);

console.log(okayDogs);

console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-');

console.log('8.');

const sortDogs = [...dogs].sort(
  (sortDogA, sortDogB) => sortDogA.recommendedFood - sortDogB.recommendedFood
);

console.log(sortDogs);

console.log('=============================');
