import { MIN_INGREDIENTS } from '../config.js';
import View from './View.js';

class ChangeIngredientView extends View {
  _btnAddIngredient = document.querySelector('.btn--add-ingredient');
  _btnRemoveIngredient = document.querySelectorAll('.btn--remove-ingredient');
  _ingredientCol = document.querySelector('.ingredient-column');

  _addIngredient() {
    // 1) Count how much ingredients already there
    const ingElArr = this._ingredientCol.querySelectorAll(
      '.ingredient--container'
    );
    const numOfIng = ingElArr.length;

    // 2) Create markup to add ingredient
    const markup = `
        <div class="ingredient--container">
            <label class="ingredient-name">Ingredient ${numOfIng + 1}</label>
            <input value="" type="number" name="amount" placeholder="0.5" />
            <input value="" type="text" name="unit" placeholder="kg" />
            <input
              value=""
              type="text"
              name="ingredient"
              placeholder="flour"
              class="input-ingredient"
            />
            <span class="btn--remove-ingredient">X</span>
            <small></small>
        </div>
    `;
    // 3) Add markup to the container
    this._ingredientCol.insertAdjacentHTML('beforeend', markup);

    // 4) Add event listener to remove button
    this._btnRemoveIngredient = document.querySelectorAll(
      '.btn--remove-ingredient'
    );
    this.addHandlerRemoveIngredient();
  }

  _removeIngredient(btn) {
    // 0) Check possibility to remove (number of ingredients cannnot be less than MIN_INGREDIENTS)
    let ingredientsEls = document.querySelectorAll('.ingredient--container');

    if (ingredientsEls.length <= MIN_INGREDIENTS) {
      return;
    }

    // 1) Remove ingredient from HTML
    btn.parentElement.remove();

    // 2) Update ingredient's numbers
    ingredientsEls = document.querySelectorAll('.ingredient--container');

    ingredientsEls.forEach(
      (ingElement, i) =>
        (ingElement.querySelector(
          '.ingredient-name'
        ).textContent = `Ingredient ${i + 1}`)
    );
  }

  addHandlerAddIngredient() {
    this._btnAddIngredient.addEventListener(
      'click',
      this._addIngredient.bind(this)
    );
  }

  addHandlerRemoveIngredient() {
    this._btnRemoveIngredient.forEach(btn =>
      btn.addEventListener('click', this._removeIngredient.bind(this, btn))
    );
  }
}

export default new ChangeIngredientView();
