 import Popup from './Popup.js';

import {popupImage, popupTitle} from '../utils/contants.js';

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
      super(popupSelector);
    }
  open({link, name}) {
  popupTitle.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;
  super.open();
  }
  close(){
    super.close();
  }
}

