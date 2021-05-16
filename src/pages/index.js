import './index.css';

import {popupEdit, formOverlayAdd, editButton, formName, formStatus, inputName, 
  inputStatus, addButton, cardsContainer, inputAvatarLink, popupEditAvatar} from '../utils/contants.js';

import {Card} from '../components/Card.js';

import FormValidator from '../components/FormValidator.js';

import {initialCards} from '../components/initial-cards.js';

import Section from '../components/Section.js';

import PopupWithImage from '../components/PopupWithImage.js';

import PopupWithForm from '../components/PopupWithForm.js';

import UserInfo from '../components/UserInfo.js';

import Api from '../components/Api.js';

import PopupWithSubmit from '../components/PopupWithSubmit.js';


const configValidation = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_invalid',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};







const imageCardPopup = new PopupWithImage('.popup_image-cards');



const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: 'c90e2f1d-6d2a-42d5-b339-06ebe429587d',
    'Content-Type': 'application/json'
  }
})

const tasks = api.getAllNeedData();

tasks.then((arg) => {
  const [cardsArray, userData] = arg;

const getCardList = new Section({items: cardsArray, renderer: (item) => {

  const newCard = createNewCard(item.name, item.link, item._id, userData._id,  item.likes, item.owner);
  const cardView = newCard.createCard();
  getCardList.addItem(cardView);
  imageCardPopup.close();
} }, '.elements');

getCardList.renderItems();
imageCardPopup.setEventListeners(); 


  

const userInfo = new UserInfo('.profile__name', '.profile__status', '.profile__avatar');

userInfo.setUserInfo(userData.name, userData.about, userData.avatar);

const editAvatarPopup = new PopupWithForm('.popup_edit-avatar', () => {
  renderLoading(true, '.form__button_edit-avatar', 'Сохранение...', 'Сохранить')
  api.editAvatar(inputAvatarLink.value)
  .then((data) => {
    userInfo.setUserInfo(data.name, data.about, data.avatar);
    renderLoading(false, '.form__button_edit-avatar', 'Сохранение...', 'Сохранить')
    editAvatarPopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
})
editAvatarPopup.setEventListeners();

function createEditAvatarPopupActive(){
  popupEditAvatarFormValidator.clearErrorElements();
  popupEditAvatarFormValidator.inctiveButton();
  editAvatarPopup.open();
}
document.querySelector('.profile__avatar-overlay').addEventListener('click', () => {createEditAvatarPopupActive()})

const editCardPopup = new PopupWithForm('.popup_edit', () => {
  renderLoading(true, '.form__button_edit-profile', 'Сохранение...', 'Сохранить')
  api.editUserInfo(inputName.value, inputStatus.value)
  .then((data) => {
    userInfo.setUserInfo(data.name, data.about, data.avatar);
    renderLoading(false, '.form__button_edit-profile', 'Сохранение...', 'Сохранить')
    editCardPopup.close()
  })
  .catch((err) => {
    console.log(err);
  })
})
editCardPopup.setEventListeners();

function createEditPopUpActive() {
  inputName.value = formName.textContent;
  inputStatus.value = formStatus.textContent;

  editFormValidator.activeButton();
  editFormValidator.clearErrorElements();
  editCardPopup.open();
}
editButton.addEventListener('click', () => {createEditPopUpActive()});


const addCardPopup = new PopupWithForm('.popup_add-cards', (input) => {
  renderLoading(true, '.form__button_add-card', 'Создание...', 'Создать');
  api.addTasks({name: input.place, link: input.link, _id: input.id})
  .then((cardData) => {
    const newCard = createNewCard(cardData.name, cardData.link, cardData._id, userData._id, cardData.likes, cardData.owner)
  const newElement = newCard.createCard();
  cardsContainer.prepend(newElement)
  renderLoading(false, '.form__button_add-card', 'Создание...', 'Создать');
    addCardPopup.close();
  })
  .catch((err) => {
    alert(err);
  })
});
addCardPopup.setEventListeners();

function createAddPopupActive() {
  addCardFormValidator.inctiveButton();
  addCardFormValidator.clearErrorElements();
 
  addCardPopup.open();
}

addButton.addEventListener('click', () => {createAddPopupActive()});

}) 
.catch((err) => {
  console.log(err);
});

const deleteCardPopup = new PopupWithSubmit('.popup_delete-card');

deleteCardPopup.setEventListeners();

function createNewCard(nameCard, linkCard, id, userId, likes, ownerId) {
 const card =  new Card(nameCard, linkCard, id, userId,  likes, ownerId, ({link, name}) => 
  {imageCardPopup.open({link, name})}, () => {
    deleteCardPopup.setSubmitAction(() => {
      api.deleteTasks(id)
      .then(() => {
        card.addTrashButtonFunction();
      })
      .catch((err) => {
        console.log(err)
      })
      
     }) 
     deleteCardPopup.open()
  },() => {
    api.getLikesArray(id).then((data) => {
      card.setLikesInfo(data.likes)
        }).catch((err) => {
          console.log(err)
        })
  }, () => {
    api.deletLikeElement(id)
    .then((data) => {
      card.setLikesInfo(data.likes)
    })
    .catch(() => {
      console.log(err)
    })
  }, '.template', api);
  return card
}

function renderLoading(isLoading, buttonSelector, textLoading, text){
  if (isLoading){
    document.querySelector(buttonSelector).textContent = textLoading;
    addCardFormValidator.inctiveButton();
   } else{
     document.querySelector(buttonSelector).textContent = text;
     addCardFormValidator.activeButton();
   }
}

const editFormValidator = new FormValidator(configValidation, popupEdit);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(configValidation, formOverlayAdd);
addCardFormValidator.enableValidation();

const popupEditAvatarFormValidator = new FormValidator(configValidation, popupEditAvatar);
popupEditAvatarFormValidator.enableValidation();



