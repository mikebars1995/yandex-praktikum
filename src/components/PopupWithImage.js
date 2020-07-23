import Popup from './Popup'

class PopupWithImage extends Popup {

  open(link, text) {
    const imageCaption = this._popup.querySelector('.popup__caption')
    const img = this._popup.querySelector('.popup__image')
    img.src = link
    img.alt = `Изображение ${link}`
    imageCaption.textContent = text
    super.open()

  }
}

export default PopupWithImage;