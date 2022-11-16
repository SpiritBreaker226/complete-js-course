
/*

let js = 'amazing'
console.log(40+8+23-10)

console.log('Jones')
console.log(23)

let firstName = 'Matilda'
console.log(firstName)
console.log(firstName)
console.log(firstName)

// naming converencts

//camelcase

let person = 'jones'

// constant

const PI = 3.1415

// name variable names more descriptive

// best

let myFirstJob = 'Programmer'
let myCurrentJob = 'Teacher'

// worse

let job1 = 'Programmer'
let job2 = 'Teacher'

// Data Types

let javascriptIsFun = true;
console.log(javascriptIsFun);

// console.log(typeof true);
console.log(typeof javascriptIsFun);
// console.log(typeof 23);
// console.log(typeof 'Jonas');

javascriptIsFun = 'YES!';
console.log(typeof javascriptIsFun);

let year;
console.log(year);
console.log(typeof year);

year = 1991;
console.log(typeof year);

console.log(typeof null);



// let, const and var

let age = 30;
age = 31;

const birthYear = 1991;
// birthYear = 1990;
// const job;

var job = 'programmer';
job = 'teacher'

lastName = 'Schmedtmann';
console.log(lastName);

// Basic Operators

// Math operators
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah);

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2

const firstName = 'Jonas';
const lastName = 'Schmedtmann';
console.log(firstName + ' ' + lastName);

// Assignment operators
let x = 10 + 5; // 15
x += 10; // x = x + 10 = 25
x *= 4; // x = x * 4 = 100
x++; // x = x + 1
x--;
x--;
console.log(x);

// Comparison operators
console.log(ageJonas > ageSarah); // >, <, >=, <=
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;

console.log(now - 1991 > now - 2018);

// Operator Precedence

// MDA  Operator Precedence
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

let x, y;
x = y = 25 - 10 - 5; // x = y = 10, x = 10
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah, averageAge);

*/

// Coding Challenge #1

/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both versions)
3. Create a boolean variable 'markHigherBMI' containing information about whether Mark has a higher BMI than John.

TEST DATA 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
TEST DATA 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.

GOOD LUCK 😀
*/

console.log("Coding Challenge #1")

let markMass = 78
let johnMass = 92
let markHeight = 1.69
let johnHeight = 1.95

let markBmi = markMass / markHeight ** 2
let johnBmi = johnMass / johnHeight ** 2

console.log("Mark's BMI", markBmi)
console.log("John's BMI", johnBmi)

let markHigherBMI = markBmi > johnBmi

console.log("Mark's BMI higher then John's", markHigherBMI)

markMass = 95
johnMass = 85
markHeight = 1.88
johnHeight = 1.76

markBmi = markMass / markHeight ** 2
johnBmi = johnMass / johnHeight ** 2

console.log("Mark's BMI", markBmi)
console.log("John's BMI", johnBmi)

markHigherBMI = markBmi > johnBmi

console.log("Mark's BMI higher then John's", markHigherBMI)

console.log("=============================")

/*

// Strings and Template Literals

const firstName = 'Jonas';
const job = 'teacher';
const birthYear = 1991;
const year = 2037;

// the old way

const jonas = "I'm " + firstName + ', a ' + (year - birthYear) + ' year old ' + job + '!';
console.log(jonas);

// the new and perfer way

const jonasNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;
console.log(jonasNew);

console.log(`Just a regular string...`);

console.log('String with \n\
multiple \n\
lines');

console.log(`String
multiple
lines`);

// Taking Decisions: if / else Statements

const age = 15;

if (age >= 18) {
  console.log('Sarah can start driving license 🚗');
} else {
  const yearsLeft = 18 - age;
  console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
}

const birthYear = 2012;

let century;
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}

console.log(century);

*/

// Coding Challenge #2

/*
Use the BMI example from Challenge #1, and the code you already wrote, and improve it:

1. Print a nice output to the console, saying who has the higher BMI. The message can be either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's BMI (28.3) is higher than John's (23.9)!"

HINT: Use an if/else statement 😉

GOOD LUCK 😀
*/

console.log("Coding Challenge #2")

const markHigherBmi = (isMarkHigherBmi) => (
  (isMarkHigherBmi) ?
    "Mark's BMI is higher than John's!"
  :
    "John's BMI is higher than Mark's!"
)

let mark2Mass = 78
let john2Mass = 92
let mark2Height = 1.69
let john2Height = 1.95

let mark2Bmi = mark2Mass / mark2Height ** 2
let john2Bmi = john2Mass / john2Height ** 2

console.log(`Mark's BMI (${mark2Bmi}) is higher than John's (${john2Bmi})!`)
console.log(markHigherBmi(mark2Bmi > john2Bmi))

mark2Mass = 95
john2Mass = 85
mark2Height = 1.88
john2Height = 1.76

mark2Bmi = mark2Mass / mark2Height ** 2
john2Bmi = john2Mass / john2Height ** 2

mark2HigherBMI = mark2Bmi > john2Bmi

console.log(`Mark's BMI (${mark2Bmi}) is higher than John's (${john2Bmi})!`)
console.log(markHigherBmi(mark2Bmi > john2Bmi))

console.log("=============================")

/*

// Type Conversion and Coercion

// type conversion
const inputYear = '1991';
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

console.log(Number('Jonas'));
console.log(typeof NaN);

console.log(String(23), 23);

// type coercion
console.log('I am ' + 23 + ' years old');
console.log('23' - '10' - 3);
console.log('23' / '2');

let n = '1' + 1; // '11'
n = n - 1;
console.log(n);



// Truthy and Falsy Values

// 5 falsy values: 0, '', undefined, null, NaN

console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('Jonas'));
console.log(Boolean({}));
console.log(Boolean(''));

const money = 100;
if (money) {
  console.log("Don't spend it all ;)");
} else {
  console.log('You should get a job!');
}

let height = 0;
if (height) {
  console.log('YAY! Height is defined');
} else {
  console.log('Height is UNDEFINED');
}

// Equality Operators: == vs. ===

const age = '18';
if (age === 18) console.log('You just became an adult :D (strict)');

if (age == 18) console.log('You just became an adult :D (loose)');

const favourite = Number(prompt("What's your favourite number?"));
console.log(favourite);
console.log(typeof favourite);

if (favourite === 23) { // 22 === 23 -> FALSE
  console.log('Cool! 23 is an amzaing number!')
} else if (favourite === 7) {
  console.log('7 is also a cool number')
} else if (favourite === 9) {
  console.log('9 is also a cool number')
} else {
  console.log('Number is not 23 or 7 or 9')
}

if (favourite !== 23) console.log('Why not 23?');

// Logical Operators

const hasDriversLicense = true; // A
const hasGoodVision = true; // B

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

// if (hasDriversLicense && hasGoodVision) {
//   console.log('Sarah is able to drive!');
// } else {
//   console.log('Someone else should drive...');
// }

const isTired = false; // C
console.log(hasDriversLicense && hasGoodVision && isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log('Sarah is able to drive!');
} else {
  console.log('Someone else should drive...');
}

*/

// Coding Challenge #3

/*
There are two gymnastics teams, Dolphins and Koalas. They compete against each other 3 times. The winner with the highest average score wins the a trophy!

1. Calculate the average score for each team, using the test data below
2. Compare the team's average scores to determine the winner of the competition, and print it to the console. Don't forget that there can be a draw, so test for that as well (draw means they have the same average score).

3. BONUS 1: Include a requirement for a minimum score of 100. With this rule, a team only wins if it has a higher score than the other team, and the same time a score of at least 100 points. HINT: Use a logical operator to test for minimum score, as well as multiple else-if blocks 😉
4. BONUS 2: Minimum score also applies to a draw! So a draw only happens when both teams have the same score and both have a score greater or equal 100 points. Otherwise, no team wins the trophy.

TEST DATA: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
TEST DATA BONUS 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
TEST DATA BONUS 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106

GOOD LUCK 😀
*/

console.log("Coding Challenge #3")

let dolphinsAvg = (96 + 108 + 89) / 3
let koalasAvg = (88 + 91 + 110) / 3

console.log(`Dolphins Average ${dolphinsAvg}`)
console.log(`Koalas Average ${koalasAvg}`)

if (dolphinsAvg === koalasAvg) {
  console.log('Its a draw')
} else if (dolphinsAvg > koalasAvg) {
  console.log('Dolphin wins')
} else {
  console.log('Koalas wins')
}

console.log("-+-+-+-+-+-+-+-+-+-+-+-+-+-")

dolphinsAvg = (97 + 112 + 101) / 3
koalasAvg = (109 + 95 + 123) / 3

console.log(`Dolphins Average ${dolphinsAvg}`)
console.log(`Koalas Average ${koalasAvg}`)

if (dolphinsAvg === koalasAvg && dolphinsAvg >= 100 && koalasAvg >= 100) {
  console.log('Its a draw')
} else if (dolphinsAvg > koalasAvg && dolphinsAvg >= 100) {
  console.log('Dolphin wins')
} else if (koalasAvg >= 100) {
  console.log('Koalas wins')
} else {
  console.log('No team wins')
}

console.log("-+-+-+-+-+-+-+-+-+-+-+-+-+-")

dolphinsAvg = (97 + 112 + 101) / 3
koalasAvg = (109 + 95 + 106) / 3

console.log(`Dolphins Average ${dolphinsAvg}`)
console.log(`Koalas Average ${koalasAvg}`)

if (dolphinsAvg === koalasAvg && dolphinsAvg >= 100 && koalasAvg >= 100) {
  console.log('Its a draw')
} else if (dolphinsAvg > koalasAvg && dolphinsAvg >= 100) {
  console.log('Dolphin wins')
} else if (koalasAvg >= 100) {
  console.log('Koalas wins')
} else {
  console.log('No team wins')
}

console.log("=============================")

/*

// The switch Statement

const day = 'friday';

switch (day) {
  case 'monday': // day === 'monday'
    console.log('Plan course structure');
    console.log('Go to coding meetup');
    break;
  case 'tuesday':
    console.log('Prepare theory videos');
    break;
  case 'wednesday':
  case 'thursday':
    console.log('Write code examples');
    break;
  case 'friday':
    console.log('Record videos');
    break;
  case 'saturday':
  case 'sunday':
    console.log('Enjoy the weekend :D');
    break;
  default:
    console.log('Not a valid day!');
}

if (day === 'monday') {
  console.log('Plan course structure');
  console.log('Go to coding meetup');
} else if (day === 'tuesday') {
  console.log('Prepare theory videos');
} else if (day === 'wednesday' || day === 'thursday') {
  console.log('Write code examples');
} else if (day === 'friday') {
  console.log('Record videos');
} else if (day === 'saturday' || day === 'sunday') {
  console.log('Enjoy the weekend :D');
} else {
  console.log('Not a valid day!');
}

*/
