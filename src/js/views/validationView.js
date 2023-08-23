import View from './View.js';
import icons from 'url:../../img/icons.svg';

class ValidationView extends View {
  _formEl = document.querySelector('.upload');

  _titleEl = document.getElementById('title');
  _urlEl = document.getElementById('url');
  _imgUrlEl = document.getElementById('img-url');
  _publisherEl = document.getElementById('publisher');
  _prepTimeEl = document.getElementById('prep-time');
  _servingsEl = document.getElementById('servings');

  _amountEls = document.querySelectorAll('.amount');
  _unitEls = document.querySelectorAll('.unit');
  _ingredientEls = document.querySelectorAll('.ingredient');

  _showError(input, message) {
    const formField = input.parentElement;
    const error = formField.querySelector('small');
    error.textContent = message;
  }

  showSuccess = input => {
    const formField = input.parentElement;
    const error = formField.querySelector('small');
    error.textContent = '';
  };

  _validateTextField(inputEl, min = 1, max = 20) {
    const isBetween = (length, min, max) => length >= min && length <= max;
    let valid = false;

    const input = inputEl.value.trim();
    console.log(input);
    if (!isBetween(input.length, min, max)) {
      this._showError(
        inputEl,
        `${inputEl.name} must be between ${min} and ${max} characters`
      );
    } else {
      this.showSuccess(inputEl);
      valid = true;
    }
    return valid;
  }

  _validateNumField(inputEl, min, max) {
    const isBetween = (input, min, max) => input > min && input <= max;
    let valid = false;

    let input = inputEl.value;

    if (!isBetween(input, min, max)) {
      this._showError(
        inputEl,
        `${inputEl.name} must be more than ${min} and less than ${max}`
      );
    } else {
      this.showSuccess(inputEl);
      valid = true;
    }

    return valid;
  }

  validateInputs() {
    const titleValid = this._validateTextField(this._titleEl, 5, 50);
    const urlValid = this._validateTextField(this._urlEl, 5, 500);
    const imgUrlValid = this._validateTextField(this._imgUrlEl, 5, 500);
    const publisherValid = this._validateTextField(this._publisherEl, 3, 50);
    const prepTimeValid = this._validateNumField(this._prepTimeEl, 0, 1000);
    const servingsValid = this._validateNumField(this._servingsEl, 0, 100);

    const ingredientsValid = Array.prototype.map
      .call(this._ingredientEls, (ing, i) => {
        // If unit is entered but amount not
        const amountMissing =
          this._amountEls[i].value === '' && this._unitEls[i].value !== '';

        // If amount entered but unit not
        const unitMissing =
          this._amountEls[i].value !== '' && this._unitEls[i].value === '';

        //  If amount or unit entered but ingredient not
        const ingMissing =
          this._amountEls[i].value !== '' || this._unitEls[i].value !== '';

        if (ing.value !== '') {
          // amount unit ing --> 1 0 1
          if (unitMissing) {
            this._showError(this._unitEls[i], 'Please select unit');
            return false;
          }
          // amount unit ing --> 0 1 1
          if (amountMissing) {
            this._showError(this._amountEls[i], 'Please enter the amount');
            return false;
          }
          // amount unit ing --> 0 0 1 or 1 1 1
          if (!this._validateTextField(ing, 2, 20)) return false;
        }

        // amount unit ing --> 1 0 0 or 0 1 0 or 1 1 0
        else if (ingMissing) {
          this._showError(ing, 'Please enter the ingredient');
          return false;
        }

        // Validate amount if it is entered
        if (
          this._amountEls[i].value !== '' &&
          !this._validateNumField(this._amountEls[i], 0.1, 1000)
        )
          return false;

        // Validate unit if it is entered
        if (
          this._unitEls[i].value !== '' &&
          !this._validateTextField(this._unitEls[i])
        )
          return false;

        return true;
      })
      .every(el => el === true);

    return (
      titleValid &&
      urlValid &&
      imgUrlValid &&
      publisherValid &&
      prepTimeValid &&
      servingsValid &&
      ingredientsValid
    );
  }
}

export default new ValidationView();
