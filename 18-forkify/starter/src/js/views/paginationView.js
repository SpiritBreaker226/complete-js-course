import icons from 'url:../../img/icons.svg';
import View from './view';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const buttonEl = e.target.closest('.btn--inline');

      if (!buttonEl) {
        return;
      }

      handler(+buttonEl.dataset.goto);
    });
  }

  _generateMarkup() {
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const { page: currentPage } = this._data;
    const previousPage = `<button class="btn--inline pagination__btn--prev" data-goto="${
      currentPage - 1
    }">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>`;
    const nextPage = `<button class="btn--inline pagination__btn--next" data-goto="${
      currentPage + 1
    }">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;

    if (numberOfPages > 1) {
      // Page 1 and there are other pages
      if (currentPage === 1) {
        return nextPage;
      }

      // Last Page
      if (currentPage === numberOfPages) {
        return previousPage;
      }

      // other pages
      return `${previousPage} ${nextPage}`;
    }

    // Page 1 and there are NO other pages
    return '';
  }
}

export default new PaginationView();
