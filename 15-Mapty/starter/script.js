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

let map;
let mapEvent;

// to use the geo location from he browser

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      const coords = [latitude, longitude];

      // map('map') is the id to the HTML tag in index.html
      // L is the namespace for LeafletJS
      // As LeafletJS is loading its code into the global object of the application
      // so other JavaScript files can access it.
      map = L.map('map').setView(coords, 13);

      // see for more details https://leafletjs.com/reference.html
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // handling clicks on map
      map.on('click', mapE => {
        form.classList.remove('hidden');

        // sets the focus to the first text input
        inputDistance.focus();

        mapEvent = mapE;
      });
    },
    () => {
      // triggers when the user states they do not want the application to
      // know their location

      alert('Could not get your position');
    }
  );
}

form.addEventListener('submit', e => {
  e.preventDefault();

  // clear inputs
  inputDistance.value = '';
  inputDuration.value = '';
  inputCadence.value = '';
  inputElevation.value = '';

  // Display marker
  const { lat, lng } = mapEvent.latlng;
  const popup = L.popup({
    maxWidth: 250,
    minWidth: 100,
    autoClose: false,
    closeOnClick: false,
    className: 'running-popup',
  });

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(popup)
    .setPopupContent('Workout')
    .openPopup();
});

inputType.addEventListener('change', () => {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
