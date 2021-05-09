import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector){
    super(popupSelector)
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupSelector.querySelector('.form__profile_delete-card').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
      this.close();
    })
  }

  setSubmitAction(action){
    this._handleSubmitCallback = action;
  }
  
}
