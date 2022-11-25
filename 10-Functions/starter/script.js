'use strict';

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );

    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jason');

// displays
// Jason booked a seat on Lufthansa flight LH239

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// create a variable for book function so other airline objects
// can use the book funciton
const book = lufthansa.book;

const bookEW = book.bind(eurowings);

bookEW(635, 'James');

// displays
// James booked a seat on Eurowings flight EW635

// Can make sure the first agrument is preset to 635
const bookEW635 = book.bind(eurowings, 635);

bookEW635('James');

// displays
// James booked a seat on Eurowings flight EW635

// JavaScript knows that the first argument is already set
// so the developer needs to set the last argument before they
// can use the fuction.

// Works well with event listeners as well

eurowings.planes = 300;
eurowings.buyPlane = function () {
  console.log(this);

  this.planes++;

  console.log(this);
};

// document.querySelector('.buy').addEventListener('click', eurowings.buyPlane);

// Since the Event Listner does not have for the object, it will error out
// with a NaN as the event function `eurowings.buyPlane` is attach to the
// event listener not eurowings

document
  .querySelector('.buy')
  .addEventListener('click', eurowings.buyPlane.bind(eurowings));

// More examples of Partial Application

const addTax = (rate, value) => value + value * rate;

console.log(`Add Tax: ${addTax(0.1, 200)}`);

// results is 220

const addVAT = addTax.bind(null, 0.23);
// = addVAT = value => value + (value * 0.23)

console.log(`Add to VAT: ${addVAT(100)}`);

// results 123

// Now that the buyPlane has the this keyword for the eurowings object
// it can now add to planes

// Code Challenge create a Partial Application like function

// recreate bind without the is

const bind = (fn, ...arg) => {
  return (...bindArg) => {
    return fn(...arg, ...bindArg);
  };
};

const addVAT2 = bind(addTax, 0.23);

console.log(`Add to VAT2: ${addVAT2(100)}`);

// when using Tax Rate

const addTaxRate = rate => {
  return value => value + value * rate;
};

const addVAT3 = addTaxRate(0.23);

console.log(`Add to VAT3: ${addVAT3(100)}`);

// Coding Challenge #1

/*
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)

  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

console.log('Coding Challenge #1');

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const index = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );

    if (!this.options[index]) {
      console.log('Choose one of the numbers in the list');

      return;
    }

    this.answers[index]++;

    poll.displayResults();
  },
  displayResults(type = 'array') {
    if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);

      return;
    }

    console.log(this.answers);
  },
};

poll.displayResults.call({
  answers: [5, 2, 3],
});

poll.displayResults.call(
  {
    answers: [1, 5, 3, 9, 6, 1],
  },
  'string'
);

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

console.log('=============================');

// Coding Challenge #2

/*
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

console.log('Coding Challenge #2');

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();

/*
  When the page first loads up, the header is changed to red then, when it is
  clicking, the header is changed to blue since the page does not reload when
  and does not change back to red or the click event does not have that function.
  It stays blue. The click event still happens, just that it continuously
  changes to blue.

  In terms of closure, since the parent function has the variable in its
  Variable Environment the click event also has access to the style colour
  so it too can change the colour.
*/

console.log('=============================');
