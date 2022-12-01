'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// Classes

class App {
  #map;
  #mapEvent;

  constructor() {
    this.#getPosition();

    // handle events

    form.addEventListener('submit', this.#newWorkout.bind(this));
    inputType.addEventListener('change', this.#toggleElevationField);
  }

  #getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.#loadMap.bind(this), () => {
        // triggers when the user states they do not want the application to
        // know their location

        alert('Could not get your position');
      });
    }
  }

  #loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];

    // map('map') is the id to the HTML tag in index.html
    // L is the namespace for LeafletJS
    // As LeafletJS is loading its code into the global object of the application
    // so other JavaScript files can access it.
    this.#map = L.map('map').setView(coords, 13);

    // see for more details https://leafletjs.com/reference.html
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // handling clicks on map
    this.#map.on('click', this.#showForm.bind(this));
  }

  #showForm(mapE) {
    form.classList.remove('hidden');

    // sets the focus to the first text input
    inputDistance.focus();

    this.#mapEvent = mapE;
  }

  #toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  #newWorkout(e) {
    e.preventDefault();

    // clear inputs
    inputDistance.value = '';
    inputDuration.value = '';
    inputCadence.value = '';
    inputElevation.value = '';

    // Display marker
    const { lat, lng } = this.#mapEvent.latlng;
    const popup = L.popup({
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: 'running-popup',
    });

    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(popup)
      .setPopupContent('Workout')
      .openPopup();
  }
}

const app = new App();
