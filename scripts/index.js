import {popupImagecard} from './contants.js';

import {Card} from './Card.js';

import FormValidator from './FormValidator.js';

import {initialCards} from './initial-cards.js';

import {openPopup, closePopup} from './utils.js';

const formOverlay = document.querySelector('.popup_edit');
const formOverlayAdd = document.querySelector('.popup_add-cards');
const editButton = document.querySelector('.edit-button');
const closeButton = document.querySelector('.close-button');
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

formOverlay.addEventListener('click', closeByOverlayClick);
formOverlayAdd.addEventListener('click', closeByOverlayClick);
popupImagecard.addEventListener('click', closeByOverlayClick);

const clearErrorElements = (formElement) => {
  const errorList = Array.from(formElement.querySelectorAll('.form__error'));

  errorList.forEach((errorElement) => {
    errorElement.classList.remove('form__error_visible')
  });

  const errorInputList = Array.from(formElement.querySelectorAll('.form__input'));

  errorInputList.forEach((errorElement) => {
    errorElement.classList.remove('form__input_type_error')

    clearErrorButton(formElement);
  });
}

const clearErrorButton = (formElement) => {
  const buttonElement = formElement.querySelector('.form__button');

  buttonElement.classList.remove('form__button_invalid');

  buttonElement.removeAttribute('disabled');
}

const disabledButton = (formElement) => {
  const buttonElement = formElement.querySelector('.form__button');

  buttonElement.classList.add('form__button_invalid'); 
  
  buttonElement.setAttribute('disabled', true);
}

function createPopUpActive() {
  inputName.value = formName.textContent;
  inputStatus.value = formStatus.textContent;

  clearErrorElements(formProfile);
  openPopup(formOverlay);
}

editButton.addEventListener('click', createPopUpActive);

closeButton.addEventListener('click', function(){closePopup(formOverlay);});

function createEditSave(evt) {
  evt.preventDefault();

  formName.textContent = inputName.value;
  formStatus.textContent = inputStatus.value;

  clearErrorElements(formProfile);
  closePopup(formOverlay);
}

formProfile.addEventListener('submit', createEditSave);

closeButtonImageCards.addEventListener('click', function(){closePopup(popupImagecard);});

addButton.addEventListener('click', function(){ 
  inputCardName.value = '';
  inputCardImg.value = '';
  clearErrorElements(formProfileAddCards);

  disabledButton(formProfileAddCards);

  openPopup(formOverlayAdd);});

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

const editFormValidator = new FormValidator(configValidation, formOverlay);
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