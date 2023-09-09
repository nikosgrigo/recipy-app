import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _createPaginationForFirstPage(curPage) {
    return `
    <button class="btn--inline btn-current" disabled>
      <span>${curPage}</span>
    </button>
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  _createPaginationForLastPage(curPage) {
    return `
    <button class="btn--inline btn-current" disabled>
      <span>${curPage}</span>
    </button>
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>${curPage - 1}</span>
      </button>
    `;
  }

  _createPaginationOtherPage(curPage) {
    return `
      
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>${curPage - 1}</span>
        </button>
        <button class="btn--inline btn-current" disabled>
        <span>${curPage}</span>
      </button>
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._createPaginationForFirstPage(curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._createPaginationForLastPage(curPage);
    }

    // Other page
    if (curPage < numPages) {
      return this._createPaginationOtherPage(curPage);
    }

    // Page 1, and there are NO other pages
    return ``;
  }
}

export default new PaginationView();
