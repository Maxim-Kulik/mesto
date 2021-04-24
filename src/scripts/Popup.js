export default class Popup{
    constructor(popupSelector){
      this._popupSelector = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this)
      
    } 
    setEventListeners(){
        this._popupSelector.querySelector('.close-button').addEventListener('click', () => {this.close()});

        const popupAll = document.querySelectorAll('.popup');
        
        popupAll.forEach(popup => {
          popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_open')){
              this.close();
            }
          })
        })
    }

    _handleEscClose(evt) {
      if (evt.key === 'Escape'){
        this.close();
      }
    }
 

    open(){
      this._popupSelector.classList.add('popup_open'); 
      document.addEventListener('keydown', this._handleEscClose);
    }

    close(){
      this._popupSelector.classList.remove('popup_open'); 
      document.removeEventListener('keydown', this._handleEscClose);
    }
}