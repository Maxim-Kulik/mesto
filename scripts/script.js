let formOverlay = document.querySelector('.overlay');
let editButton = document.querySelector('.edit-button');
let closeButton = document.querySelector('.close-button');
let formButton = document.querySelector('.form__button');
let formName = document.querySelector('.profile__name');
let formStatus = document.querySelector('.profile__status');
let inputName = document.querySelector('.form__input_input-name_name');
let inputStatus = document.querySelector('.form__input_input-name_status');
function popUpActive() {
inputName.value = formName.textContent;
inputStatus.value = formStatus.textContent;
formOverlay.classList.add('overlay_none');
}
editButton.addEventListener('click', popUpActive);
function popUpClose() {
  formOverlay.classList.remove('overlay_none');
}
closeButton.addEventListener('click', popUpClose);
function editSave(evt) {
formName.textContent = inputName.value;
formStatus.textContent = inputStatus.value;
popUpClose();
evt.preventDefault();
}
let formProfile = document.querySelector('.form__profile');
formProfile.addEventListener('submit', editSave);