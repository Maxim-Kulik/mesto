function openPopup(popups){
  popups.classList.add('popup_open');
  document.addEventListener('keydown', closePopupEsc);
}
  
function closePopup(popups){
  popups.classList.remove('popup_open'); 
  document.removeEventListener('keydown', closePopupEsc);
}

const closePopupEsc = (evt) => {
  const popupActive = document.querySelector('.popup_open');
  if(evt.key === 'Escape'){
    closePopup(popupActive);
  }
}

export {openPopup, closePopup, closePopupEsc};