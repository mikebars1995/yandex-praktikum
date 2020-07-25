import Popup from './Popup'

class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector)
    this._popupSelector = popupSelector
    this._submitHandler = submitHandler
    this._form = this._popup.querySelector('.popup__form')
  }

  _getInputValues() {
    const {name, description, link} = this._form.elements
    const placeName = this._form.elements['place-name']
    
    return {
      name: name && name.value, 
      description: description && description.value, 
      link: link && link.value, 
      placeName: placeName && placeName.value
    }
  }

  setEventListeners() {
    
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const  {name, description, link, placeName} = this._getInputValues()
      if (this._popupSelector === '.popup_type_edit') {
        this._submitHandler({name, description})
      } else {
        this._submitHandler({link, name: placeName})
      }
    } );
  }

  close() {
    super.close()
    this._form.reset()
  }
}


export default PopupWithForm;