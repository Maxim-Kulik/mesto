let formOverlay = document.querySelector('.popup__edit');
let formOverlayAdd = document.querySelector('.popup__add-cards');
let editButton = document.querySelector('.edit-button');
let closeButton = document.querySelector('.close-button');
let formName = document.querySelector('.profile__name');
let formStatus = document.querySelector('.profile__status');
let inputName = document.querySelector('.form__input_input-name_name');
let inputStatus = document.querySelector('.form__input_input-name_status');
let formProfile = document.querySelector('.form__profile_edit');
let addButton = document.querySelector('.add-button');
let closeButtonAdd = document.querySelector('.close-button__add-cards');
let formProfileAddCards = document.querySelector('.form__profile_add-cards');
let likeButton = document.querySelectorAll('.group');

function popUpActive() {
inputName.value = formName.textContent;
inputStatus.value = formStatus.textContent;
formOverlay.classList.add('overlay_open');
}
editButton.addEventListener('click', popUpActive);
function popUpClose() {
  formOverlay.classList.remove('overlay_open');
}
closeButton.addEventListener('click', popUpClose);
function editSave(evt) {
evt.preventDefault();
formName.textContent = inputName.value;
formStatus.textContent = inputStatus.value;
popUpClose();
}
formProfile.addEventListener('submit', editSave);

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
const cardsContainer = document.querySelector('.elements');

function renderListString (item) {
  return `<div class="element">
  <img class="element__image" src=${item.link} alt="Карачаевск">
  <div class="element__description">
    <h2 class="element__title">${item.name}</h2>
    <button class="group" type="button"></button>
  </div>
</div>`;
  };

function renderList(){
  const cardResult = initialCards.map(renderListString).join('');

  cardsContainer.insertAdjacentHTML('afterbegin',cardResult );

  
}
renderList();

function popUpAddActive() {
  formOverlayAdd.classList.add('overlay_open');
  }
  addButton.addEventListener('click', popUpAddActive);
  function popUpAddClose() {
    formOverlayAdd.classList.remove('overlay_open');
  }
  closeButtonAdd.addEventListener('click', popUpAddClose);
  

  function addCardsFormListener (evt) {
    evt.preventDefault();
    
    const inputCardName = formProfileAddCards.querySelector('.form__input_input-card-name_name');
    const inputTitle = inputCardName.value;

    const inputCardImg = formProfileAddCards.querySelector('.form__input_input-card-name_img');
    const inputImg = inputCardImg.value;
   
    const newCardName = renderListString({name: inputTitle, link: inputImg});
    
    cardsContainer.insertAdjacentHTML('afterbegin',newCardName);
    popUpAddClose()
    
    inputCardName.value = '';
    inputCardImg.value = '';
  }
  formProfileAddCards.addEventListener('submit', addCardsFormListener);