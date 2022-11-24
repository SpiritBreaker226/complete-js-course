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
