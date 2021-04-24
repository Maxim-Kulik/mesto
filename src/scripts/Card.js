import {openPopup} from './utils.js';

import {popupImage, popupTitle, popupImagecard, } from './contants.js';

import PopupWithImage from './PopupWithImage.js';

class Card{
  constructor (name, link, handleCardClick, cardSelector) {
    this._name = name;
    this._link = link;
  
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  createCard () {
    this._element = this._getTemplateElement();
    const cardImage = this._element.querySelector('.element__image');
    const cardTitle = this._element.querySelector('.element__title');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners(){
    this._addLikeButtonFunction();
    this._addTrashButtonFunction();
    this._element.querySelector('.element__image').addEventListener('click', () => 
    {this._handleCardClick({link: this._link, name: this._name})});
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
  }


export {Card};