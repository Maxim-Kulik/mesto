let formOverlay = document.querySelector('.overlay');
let editButton = document.querySelector('.edit-Button');
let closeButton = document.querySelector('.close-button');
let formButton = document.querySelector('.form__button');
let formName = document.querySelector('.profile__name');
let formStatus = document.querySelector('.profile__status');
let inputName = document.querySelector('.form__input_name');
let inputStatus = document.querySelector('.form__input_status');

function popUpActive() {
formOverlay.classList.remove('overlay_none');

}
editButton.addEventListener('click', popUpActive);

function popUpClose() {
  formOverlay.classList.add('overlay_none');
}
closeButton.addEventListener('click', popUpClose);



function editSave() {
formName.textContent = `${inputName.value}`;
formStatus.textContent = `${inputStatus.value}`;
popUpClose()
inputName.value.textContent = `${formName}`;
inputStatus.value.textContent = `${formStatus}`;
}
formButton.addEventListener('click', editSave);

