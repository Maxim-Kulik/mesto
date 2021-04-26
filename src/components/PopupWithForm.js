import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popupSelector.querySelector('.form__profile')
    
  }

  setEventListeners(){
    this._popupSelector.querySelector('.form__profile').addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitCallback(this._getInputValues());
        this.close();
    }); 
    super.setEventListeners();
  }
  
  _getInputValues(){
    this._inputList = Array.from(this._popupSelector.querySelectorAll('.form__input'));
    this._inputValue = {};
    this._inputList.forEach(input => {
      this._inputValue[input.name] = input.value;
    });
    return this._inputValue;
    
  }

  close(){
    this._form.reset();
    super.close();
  }
}