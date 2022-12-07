import View from './view';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _buttonOpen = document.querySelector('.nav__btn--add-recipe');
  _buttonClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();

    // needs to add in the handlers as shown as the application
    // is something that this view should always do so no need
    // for the controller to call those functions
    this.#addHandlerShowWindow();
    this.#addHandlerCloseWindow();
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      // `this` is the form
      const dataArray = [...new FormData(this)];

      // converts an array to an object
      const data = Object.fromEntries(dataArray);

      handler(data);
    });
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  #addHandlerShowWindow() {
    this._buttonOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  #addHandlerCloseWindow() {
    this._buttonClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
