import icons from 'url:../../img/icons.svg';

export default class View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = '';
  _message = '';
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && !data.length)) {
      return this.renderError();
    }

    this._data = data;

    this._clear();

    this._parentElement.insertAdjacentHTML(
      'afterbegin',
      this._generateMarkup()
    );
  }

  update(data) {
    this._data = data ?? [];

    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = newDOM.querySelectorAll('*');
    const currentElements = this._parentElement.querySelectorAll('*');

    newElements.forEach((newElement, index) => {
      const currentElement = currentElements[index];

      // check is the  element is different if so then update the text and
      // attributes so not to remove other elements that did not change
      if (!newElement.isEqualNode(currentElement)) {
        // updates the text in the newElement
        if (newElement.firstChild?.nodeValue.trim() !== '') {
          currentElement.textContent = newElement.textContent;
        }

        // update all attributes in the currentElement as textContent does not update
        Array.from(newElement.attributes).forEach(attribute =>
          currentElement.setAttribute(attribute.name, attribute.value)
        );
      }
    });
  }

  renderSpinner() {
    const markUp = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
