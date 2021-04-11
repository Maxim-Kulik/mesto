import {popupImagecard} from './contants.js';

import {Card} from './Card.js';

import FormValidator from './FormValidator.js';

import {initialCards} from './initial-cards.js';

import {openPopup, closePopup} from './utils.js';

const popupEdit = document.querySelector('.popup_edit');
const formOverlayAdd = document.querySelector('.popup_add-cards');
const editButton = document.querySelector('.edit-button');
const closeButtonEdit = document.querySelector('.close-button_edit-form');
const formName = document.querySelector('.profile__name');
const formStatus = document.querySelector('.profile__status');
const inputName = document.querySelector('.form__input_input-name_name');
const inputStatus = document.querySelector('.form__input_input-name_status');
const formProfile = document.querySelector('.form__profile_edit');
const addButton = document.querySelector('.add-button');
const closeButtonAdd = document.querySelector('.close-button_add-cards');
const formProfileAddCards = document.querySelector('.form__profile_add-cards');
const closeButtonImageCards = document.querySelector('.close-button_image-cards');
const inputCardName = formProfileAddCards.querySelector('.form__input_input-card-name_name');
const inputCardImg = formProfileAddCards.querySelector('.form__input_input-card-name_img');
const cardsContainer = document.querySelector('.elements');

const closeByOverlayClick = (evt) => {
  if(evt.target.classList.contains('popup')){
    closePopup(evt.target);
    }
  }

popupEdit.addEventListener('click', closeByOverlayClick);
formOverlayAdd.addEventListener('click', closeByOverlayClick);
popupImagecard.addEventListener('click', closeByOverlayClick);


function createEditPopUpActive() {
  inputName.value = formName.textContent;
  inputStatus.value = formStatus.textContent;

  editFormValidator.activeButton();
  editFormValidator.clearErrorElements();
  openPopup(popupEdit);
}

editButton.addEventListener('click', createEditPopUpActive);

closeButtonEdit.addEventListener('click', function(){closePopup(popupEdit);});

function createEditSave(evt) {
  evt.preventDefault();

  formName.textContent = inputName.value;
  formStatus.textContent = inputStatus.value;

  closePopup(popupEdit);
}

formProfile.addEventListener('submit', createEditSave);

closeButtonImageCards.addEventListener('click', function(){closePopup(popupImagecard);});

function createAddPopupActive() {
  inputCardName.value = '';
  inputCardImg.value = '';

  addCardFormValidator.inctiveButton();
  addCardFormValidator.clearErrorElements();
 
  openPopup(formOverlayAdd);
}

addButton.addEventListener('click', createAddPopupActive);

closeButtonAdd.addEventListener('click', function(){closePopup(formOverlayAdd);});

const configValidation = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_invalid',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

initialCards.map(function(item){
  const newCard = new Card(item.name, item.link, '.template');
  cardsContainer.append(newCard.createCard());
});

const editFormValidator = new FormValidator(configValidation, popupEdit);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(configValidation, formOverlayAdd);
addCardFormValidator.enableValidation();


function addCardsFormListener (evt) {
  evt.preventDefault();
    
  const inputTitle = inputCardName.value;
  const inputImg = inputCardImg.value;
  const newCard = new Card(inputTitle, inputImg, '.template')
  
  cardsContainer.prepend(newCard.createCard());

  closePopup(formOverlayAdd);
    
  inputCardName.value = '';
  inputCardImg.value = '';
}

  formProfileAddCards.addEventListener('submit', addCardsFormListener);