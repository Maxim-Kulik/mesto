const formOverlay = document.querySelector('.popup_edit');
const formOverlayAdd = document.querySelector('.popup_add-cards');
const popupImagecard = document.querySelector('.popup_image-cards');
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
const likeButton = document.querySelectorAll('.group');
const closeButtonImageCards = document.querySelector('.close-button_image-cards');
const cardsContainer = document.querySelector('.elements');
const templateElement = document.querySelector('.template');
const popup = document.querySelector('.popup') //...........................
const form = document.querySelector('.form__profile');

const closePopupEsc = (evt) => {
  const popupActive = document.querySelector('.popup_open');
  if(evt.key === 'Escape'){
    closePopup(popupActive);
  }
}

function openPopup(popups){
  popups.classList.add('popup_open');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popups){
  popups.classList.remove('popup_open'); 
  document.removeEventListener('keydown', closePopupEsc);
}

const closeByOverlayClick = (evt) => {
  if(evt.target.classList.contains('popup')){
    closePopup(evt.target);
  }
  }

  formOverlay.addEventListener('click', closeByOverlayClick);
  formOverlayAdd.addEventListener('click', closeByOverlayClick);
  popupImagecard.addEventListener('click', closeByOverlayClick);

const clearErrorElements = (formElement) => {
  const errorList = Array.from(formElement.querySelectorAll('.error'));

  errorList.forEach((errorElement) => {
  errorElement.classList.remove('error_visible')
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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function addLikeButtonFunction(evt) {
  evt.target.classList.toggle('group_active');
}

function addTrashButtonFunction(evt) {
  evt.target.closest('.element').remove();
}

function createPopupImageActive(item) {
  const popupImage = document.querySelector('.popup-content-wrapper__image');
  const popupTitle = document.querySelector('.popup-content-wrapper__title');

  popupTitle.textContent = item.name;
  popupImage.src = item.link;
  popupImage.alt = item.name;

  openPopup(popupImagecard);
}

closeButtonImageCards.addEventListener('click', function(){closePopup(popupImagecard);});

function createCardDomNode(item){
  const newItem = templateElement.content.cloneNode(true);
  const titleCard = newItem.querySelector('.element__title');
  const imgCard = newItem.querySelector('.element__image');

  titleCard.textContent = item.name;
  imgCard.src = item.link;
  imgCard.alt = item.name;

  const likeButton = newItem.querySelector('.group');
  likeButton.addEventListener('click', addLikeButtonFunction);

  const trashButton = newItem.querySelector('.trash-button');
  trashButton.addEventListener('click', addTrashButtonFunction);

  imgCard.addEventListener('click', function(){createPopupImageActive(item);});
  
  return newItem;
  }
  
function renderList(){
  const cardResult = initialCards.map(function(item){
  const newCard = createCardDomNode(item);

  return newCard;
  });
  cardsContainer.append(...cardResult);
}

renderList();

  addButton.addEventListener('click', function(){ 
    const inputCardName = formProfileAddCards.querySelector('.form__input_input-card-name_name');
    const inputCardImg = formProfileAddCards.querySelector('.form__input_input-card-name_img');
    inputCardName.value = '';
    inputCardImg.value = '';
    clearErrorElements(formProfileAddCards);

    disabledButton(formProfileAddCards);

    openPopup(formOverlayAdd);});

  closeButtonAdd.addEventListener('click', function(){closePopup(formOverlayAdd);});
  
function addCardsFormListener (evt) {
    evt.preventDefault();
    
    const inputCardName = formProfileAddCards.querySelector('.form__input_input-card-name_name');
    const inputTitle = inputCardName.value;

    const inputCardImg = formProfileAddCards.querySelector('.form__input_input-card-name_img');
    const inputImg = inputCardImg.value;
   
    const newCardName = createCardDomNode({name: inputTitle, link: inputImg});
    
    cardsContainer.prepend(newCardName);
    
    closePopup(formOverlayAdd);
    
    inputCardName.value = '';
    inputCardImg.value = '';
  }

  formProfileAddCards.addEventListener('submit', addCardsFormListener);

  const hasInvalidInput = (inputList)=> {
    return inputList.some(inputElement => !inputElement.validity.valid);
  }

  const toggleButtonState = (inputList, buttonElement) => {
  if(/*хотя бы один невалид*/ hasInvalidInput(inputList)){
  buttonElement.classList.add('form__button_invalid');
  buttonElement.setAttribute('disabled', true);
  }else{
    buttonElement.classList.remove('form__button_invalid');
    buttonElement.removeAttribute('disabled');
  }
  };

  const showInputError = (formElement, inputElement) => {

   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
   
  inputElement.classList.add('form__input_type_error');
  
  errorElement.textContent = inputElement.validationMessage;

  errorElement.classList.add('form__error_visible');
  };

  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
   
  inputElement.classList.remove('form__input_type_error');

  errorElement.classList.remove('form__error_visible');
  };

  const checkInput = (formElement, inputElement) => {
    if(inputElement.validity.valid){
      hideInputError(formElement, inputElement);
    } else{
      showInputError(formElement, inputElement);
    }
  };

  const setInputListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));

    const buttonElement = formElement.querySelector('.form__button');

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        //проверить состояние поля на валидность 
        checkInput(formElement, inputElement);
        // переключить состояние кнопки
        toggleButtonState(inputList, buttonElement);
      })
    });
  };
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form__profile'));
    
    formList.forEach(formElement => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      // навесить слушатели для полей формы
       (formElement);
    }
      );
  };

  enableValidation();

  

  