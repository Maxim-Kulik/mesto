import {openPopup} from './utils.js';

import {popupImage, popupTitle, popupImagecard, } from './contants.js';

class Card{
  constructor (name, link, cardSelector) {
    this._name = name;
    this._link = link;
  
    this._cardSelector = cardSelector;
  }
  
  createCard () {
    this._element = this._getTemplateElement();
    const cardImage = this._element.querySelector('.element__image');
    const cardTitle = this._element.querySelector('.element__title');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    this._addLikeButtonFunction();
    this._addTrashButtonFunction();
    this._activePopupImage();
    return this._element;
  }

  _getTemplateElement() {
    const templateElement = document.querySelector(this._cardSelector).content.cloneNode(true);
  
    return templateElement;
  }
  _addLikeButtonFunction(){
    const likeButton = this._element.querySelector('.group');
    likeButton.addEventListener('click', function(){
    likeButton.classList.toggle('group_active');
    })
  }
  _addTrashButtonFunction() {
    const trashButton = this._element.querySelector('.trash-button');
    trashButton.addEventListener('click', function(evt){
    evt.target.closest('.element').remove();
    })
  }
  _activePopupImage(){
    this._element.querySelector('.element__image').addEventListener('click', () => {
      popupImage.src = this._link;
      popupTitle.textContent = this._name;
      popupImage.alt = this._name;
      
      openPopup(popupImagecard);
    });
  }
}

export {Card};