let formOverlay = document.querySelector('.overlay');
let editButton = document.querySelector('.edit-button');
let closeButton = document.querySelector('.close-button');
let formName = document.querySelector('.profile__name');
let formStatus = document.querySelector('.profile__status');
let inputName = document.querySelector('.form__input_input-name_name');
let inputStatus = document.querySelector('.form__input_input-name_status');
let formProfile = document.querySelector('.form__profile');
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