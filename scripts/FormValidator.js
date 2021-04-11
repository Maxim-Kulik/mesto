  export default class FormValidator {
    constructor(config, form){
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;
      this._form = form;
  }

  enableValidation(){
    this._form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
    this._setInputListeners(this._form);
  }

  _setInputListeners(){
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);

    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
      this._checkInput(input);
      this._toggleButtonState();
      });
    });
  }

  _checkInput(input){
  
    if(input.validity.valid) {
      this._hideInputError(input);
    } else{
      this._showInputError(input);
    }
  }

  _hideInputError(input){
    this._errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = input.validationMessage;
  }

  _showInputError(input){
    this._errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    this._errorElement.classList.add(this._errorClass);
    this._errorElement.textContent = input.validationMessage;
  }

  _toggleButtonState(){
    if(this._hasInvalidInput(this._inputList) || this._allInputsEmpty(this._inputList)){
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _hasInvalidInput(){
    return this._inputList.some((input) => !input.validity.valid);
  }

  _allInputsEmpty(){
    return !this._inputList.some((input) => input.value.length > 0);
  }
}


 