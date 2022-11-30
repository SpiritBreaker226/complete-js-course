'use strict';

// Variables

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContents = document.querySelectorAll('.operations__content');
const tabsContainer = document.querySelector('.operations__tab-container');

const nav = document.querySelector('.nav');

// Modal window

const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(event => {
  event.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Page Scrolling

btnScrollTo.addEventListener('click', () => {
  // old school 👨🏻‍🏫

  // is base on the view point hof where the user is scroll
  // const s1coords = section1.getBoundingClientRect();

  //  to get the current scroll which you not use
  // window. pageXOffset and  window. pageYOffset

  // the Viewpoint client heigh and width is base on the device the user is using
  // document.documentElement.clientHeight and
  // document.documentElement.clientWidth

  // Scrolling
  // The s1coords.top needs to have a different when the user is not
  // right at the top of the page as JavaScript offset for it does not change
  // to reflect this so we will have to add window.PageYOffset to the s1coords so that it equals
  // to the top of the window thus JavaScript is then able to do the calculations
  // properly
  // We also did it for X just in case that is needed

  /*
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    // behavior tells JavaScript how to scroll to a location
    behavior: 'smooth',
  });
  */

  // new school
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation

/*
// this Is the Nave solution as
// as it creates create too many events for each nav link
// which is too slow

document.querySelectorAll('.nav__link').forEach(elNav => {
  elNav.addEventListener('click', function (e) {
    e.preventDefault();

    const id = this.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed Component

tabsContainer.addEventListener('click', e => {
  e.preventDefault();

  const clicked = e.target.closest('.operations__tab');

  if (!clicked) {
    return;
  }

  // Active tab
  tabs.forEach(tab => {
    tab.classList.remove('operations__tab--active');
  });

  clicked.classList.add('operations__tab--active');

  // Active content area

  tabsContents.forEach(tabsContent => {
    tabsContent.classList.remove('operations__content--active');
  });

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu Fade Animation

const handleHover = function (e) {
  if (!e.target.classList.contains('nav__link')) {
    return;
  }

  const link = e.target;
  const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('img');

  siblings.forEach(sibling => {
    if (sibling !== link) {
      sibling.style.opacity = this.opacity;
    }
  });

  logo.style.opacity = this.opacity;
};

// Passing "argument" into handler
// event can only have argument however,
// you can use this to add to argument
// and objects to extend this

nav.addEventListener('mouseover', handleHover.bind({ opacity: 0.5 }));

nav.addEventListener('mouseout', handleHover.bind({ opacity: 1 }));

// Sticky Navigation

/*

// Should not do this as the window scroll happens all the time
// and thus is a performance issue in the long run

const initialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', () => {
  if (window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});

*/

const obsCallback = entries => {
  entries.forEach(entry => {
    console.log(entry);
  });
};
const obsOptions = {
  // the targe for the Observer i.e. what to observe
  // (select a element or null for the entry view port of the observer element)
  root: null,
  // how much of the root should be in the viewport before the
  // callback is activated. Its by percentage.
  // can have multiple thresholds by using an array
  threshold: [0, 0.2],
};
const observer = new IntersectionObserver(obsCallback, obsOptions);

observer.observe(section1);

/*
// Selecting, Creating, and Deleting Elements

// Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));
// Tabbed Component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContents = document.querySelectorAll('.operations__content');
const tabsContainer = document.querySelector('.operations__tab-container');

// Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookied for improved functionality and analytics.';
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

// Styles, Attributes and Classes

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// Don't use
logo.clasName = 'jonas';

// Types of Events and Event Handlers

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };


// Event Propagation in Practice

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
`rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});

// DOM Traversing

const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

*/
