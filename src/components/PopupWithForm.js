import Popup from './Popup'

class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector)
    this._submitHandler = submitHandler

  }

  _getInputValues() {

  }

  setEventListeners() {
    super.setEventListeners()
  }

  close() {
    
  }
}


export default PopupWithForm;