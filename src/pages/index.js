import './index.css'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import { initialCards, editFormModalWindow, cardFormModalWindow,
  editPopupWithFormSelector, cardSelector, placesListSelector, defaultFormConfig,
  popupWithImageSelector, cardPopupWithFormSelector, openEditFormButton, openCardFormButton,

} from '../utils/constants.js';


// Врапперы

// const placesWrap = document.querySelector('.places__list');
// const editFormModalWindow = document.querySelector('.popup_type_edit');
// const cardFormModalWindow = document.querySelector('.popup_type_new-card');
// const imageModalWindow = document.querySelector('.popup_type_image');
// С submit ребята еще плохо работают.

// Кнопки и прочие дом узлы
// const openEditFormButton = document.querySelector('.profile__edit-button');
// const openCardFormButton = document.querySelector('.profile__add-button');

// DOM узлы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Данные форм и элементы форм
const titleInputValue = editFormModalWindow.querySelector('.popup__input_type_name');
const descriptionInputValue = editFormModalWindow.querySelector('.popup__input_type_description');
// const cardNameInputValue = cardFormModalWindow.querySelector('.popup__input_type_card-name');
// const cardLinkInputValue = cardFormModalWindow.querySelector('.popup__input_type_url');
// решение на минималках. Конечно, студент может корректно обобрать велью инпутов в форме.

// const cardSelector = '.card-template';
// const placesListSelector = '.places__list'

// const defaultFormConfig = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// };

// const isEscEvent = (evt, action) => {
//   const activePopup = document.querySelector('.popup_is-opened');
//   if (evt.which === ESC_KEYCODE) {
//     action(activePopup);
//   }
// };

// const openModalWindow = (modalWindow) => {
//   modalWindow.classList.add('popup_is-opened');
//   document.addEventListener('keyup', handleEscUp);
// };

// const closeModalWindow = (modalWindow) => {
//   modalWindow.classList.remove('popup_is-opened');
//   document.removeEventListener('keyup', handleEscUp);
// };

// const handleEscUp = (evt) => {
//   evt.preventDefault();
//   isEscEvent(evt, closeModalWindow);
// };
const popupWithImage = new PopupWithImage(popupWithImageSelector)
popupWithImage.setEventListeners()

const editPopupWithForm = new PopupWithForm(editPopupWithFormSelector, (editInfo) => {
  profileTitle.textContent = editInfo.name;
  profileDescription.textContent = editInfo.description;
  editPopupWithForm.close()
} )

editPopupWithForm.setEventListeners()

const cardPopupWithForm = new PopupWithForm(cardPopupWithFormSelector, (item) => {
  const card = new Card(
    item, 
    cardSelector,
    () => popupWithImage.open(item.link, item.name) 
  )

  cardsList.addItem(card.getView())
  cardPopupWithForm.close()
})

cardPopupWithForm.setEventListeners()


const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(
      item, 
      cardSelector,
      () => popupWithImage.open(item.link, item.name)
    )
    cardsList.addItem(card.getView())
  }
}, placesListSelector)

// EventListeners

openEditFormButton.addEventListener('click', () => {
  titleInputValue.value = profileTitle.textContent;
  descriptionInputValue.value = profileDescription.textContent;
  editPopupWithForm.open()
});

openCardFormButton.addEventListener('click', () => {
  cardPopupWithForm.open()
});


// Инициализация

cardsList.renderItems()

const editFormValidator = new FormValidator(defaultFormConfig, editFormModalWindow);
const cardFormValidator = new FormValidator(defaultFormConfig, cardFormModalWindow);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
