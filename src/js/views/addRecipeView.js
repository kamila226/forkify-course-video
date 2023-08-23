import View from './View.js';
import validationView from './validationView.js';
import { MIN_INGREDIENTS } from '../config.js';
import icons from 'url:../../img/icons.svg';
import changeIngredientsView from './changeIngredientsView.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfullly uploaded';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _ingredientCol = document.querySelector('.ingredient-column');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    changeIngredientsView.addHandlerAddIngredient();
    changeIngredientsView.addHandlerRemoveIngredient();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const formValid = validationView.validateInputs();
      if (formValid) {
        // 1) Get array of data from input fields
        const dataArray = [...new FormData(this)];
        // 2) Put ingredients to the objects array
        const ingArray = dataArray.splice(6);
        let ingredients = [];
        console.log(ingArray);
        let i = 0;
        while (ingArray[i + 2][1] !== '' && i < ingArray.length - 3) {
          if (ingArray[i + 2][1] !== '') {
            const ing = {
              quantity: ingArray[i][1],
              unit: ingArray[i + 1][1],
              description: ingArray[i + 2][1],
            };
            ingredients.push(ing);
          }
          i += 3;
        }

        // 3) Put recipe data and ingredients array to the object
        const data = Object.fromEntries(dataArray);
        data.ingredients = ingredients;
        handler(data);
      }
    });
  }
}

export default new AddRecipeView();
