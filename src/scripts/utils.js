function openPopup(popups){
  popups.classList.add('popup_open');
  
}
  
function closePopup(popups){
  popups.classList.remove('popup_open'); 
 
}



export {openPopup, closePopup};