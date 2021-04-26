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

const popupImage = document.querySelector('.popup-content-wrapper__image');
const popupTitle = document.querySelector('.popup-content-wrapper__title');
const popupImagecard = document.querySelector('.popup_image-cards');

export {popupImage, popupTitle, popupImagecard, popupEdit, formOverlayAdd, editButton, closeButtonEdit, formName, formStatus, inputName, 
inputStatus, formProfile, addButton, closeButtonAdd, formProfileAddCards, closeButtonImageCards, inputCardName, inputCardImg, cardsContainer};