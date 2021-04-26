import './index.css';

import {popupEdit, formOverlayAdd, editButton, formName, formStatus, inputName, 
  inputStatus, addButton, inputCardName, inputCardImg, cardsContainer} from '../utils/contants.js';

import {Card} from '../components/Card.js';

import FormValidator from '../components/FormValidator.js';

import {initialCards} from '../components/initial-cards.js';

import Section from '../components/Section.js';

import PopupWithImage from '../components/PopupWithImage.js';

import PopupWithForm from '../components/PopupWithForm.js';

import UserInfo from '../components/UserInfo.js';


const configValidation = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_invalid',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};


function createAddPopupActive() {
  addCardFormValidator.inctiveButton();
  addCardFormValidator.clearErrorElements();
 
  addCardPopup.open();
}

function createEditPopUpActive() {
  inputName.value = formName.textContent;
  inputStatus.value = formStatus.textContent;

  editFormValidator.activeButton();
  editFormValidator.clearErrorElements();
  editCardPopup.open();
}


function createNewCard(nameCard, linkCard) {
 const card =  new Card(nameCard, linkCard, ({link, name}) => 
  {imageCardPopup.open({link, name})}, '.template');
  return card
}


const userInfo = new UserInfo('.profile__name', '.profile__status');

const editCardPopup = new PopupWithForm('.popup_edit', (input) => {
  userInfo.setUserInfo(input.name, input.status);
})
editCardPopup.setEventListeners();

editButton.addEventListener('click', () => {createEditPopUpActive()});

const addCardPopup = new PopupWithForm('.popup_add-cards', (input) => {

  const newCard = createNewCard(input.place, input.link)
  const newElement = newCard.createCard();
  cardsContainer.prepend(newElement)
});
addCardPopup.setEventListeners();

addButton.addEventListener('click', () => {createAddPopupActive()});

const imageCardPopup = new PopupWithImage('.popup_image-cards');

const getCardList = new Section({items: initialCards, renderer: (item) => {
  const newCard = createNewCard(item.name, item.link);
  const cardView = newCard.createCard();
  getCardList.addItem(cardView);
  imageCardPopup.close();
} }, '.elements');

getCardList.renderItems();
imageCardPopup.setEventListeners();

const editFormValidator = new FormValidator(configValidation, popupEdit);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(configValidation, formOverlayAdd);
addCardFormValidator.enableValidation();