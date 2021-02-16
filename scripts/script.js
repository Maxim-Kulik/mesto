let FormOverlay = document.querySelector('.Overlay');
let EditButton = document.querySelector('.Edit-Button');
let CloseButton = document.querySelector('.Close-button');
let FormButton = document.querySelector('.Form__button');
let FormName = document.querySelector('.Profile__name');
let FormStatus = document.querySelector('.Profile__status');
let inputName = document.querySelector('.Form__input_name');
let inputStatus = document.querySelector('.Form__input_status');

function PopUpActive() {
FormOverlay.classList.remove('popup_none');

}
EditButton.addEventListener('click', PopUpActive);

function PopUpClose() {
  FormOverlay.classList.add('popup_none');
}
CloseButton.addEventListener('click', PopUpClose);



function EditSave() {
FormName.textContent = `${inputName.value}`;
FormStatus.textContent = `${inputStatus.value}`;
PopUpClose()
inputName.value.textContent = `${FormName}`;
inputStatus.value.textContent = `${FormStatus}`;
}
FormButton.addEventListener('click', EditSave);