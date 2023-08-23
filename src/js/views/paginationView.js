import View from './View.js';
import icons from 'url:../../img/icons.svg';

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

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    const buttonBack = `
    <button data-goto=${curPage - 1} class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
    </button>      
    `;
    const buttonForward = `
    <button data-goto=${curPage + 1} class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>      
    `;

    const pagesInfo = `
    <div class="page--info">
      Page ${curPage} of ${numPages}
    </div>
    `;

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return pagesInfo + buttonForward;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return buttonBack + pagesInfo;
    }
    // Other page
    if (curPage < numPages) {
      return buttonBack + pagesInfo + buttonForward;
    }

    // Pages 1, and  there are NO other pages
    return pagesInfo;
  }
}

export default new PaginationView();
