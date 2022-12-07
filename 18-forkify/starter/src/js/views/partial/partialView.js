import View from '../view';

export default class PartialView extends View {
  _parentElement = '';

  render(data) {
    if (!data || (Array.isArray(data) && !data.length)) {
      return this.renderError();
    }

    this._data = data;

    return this._generateMarkup();
  }
}
