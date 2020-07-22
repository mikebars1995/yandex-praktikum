import './index.css'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { ESC_KEYCODE, initialCards } from '../utils/constants.js';
import { isEscEvent, openModalWindow, closeModalWindow } from '../utils/utils.js';

// Константы


// Врапперы
const placesWrap = document.querySelector('.places__list');
const editFormModalWindow = document.querySelector('.popup_type_edit');
const cardFormModalWindow = document.querySelector('.popup_type_new-card');
const imageModalWindow = document.querySelector('.popup_type_image');
// С submit ребята еще плохо работают.

// Кнопки и прочие дом узлы
const openEditFormButton = document.querySelector('.profile__edit-button');
const openCardFormButton = document.querySelector('.profile__add-button');

// DOM узлы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Данные форм и элементы форм
const titleInputValue = editFormModalWindow.querySelector('.popup__input_type_name');
const descriptionInputValue = editFormModalWindow.querySelector('.popup__input_type_description');
const cardNameInputValue = cardFormModalWindow.querySelector('.popup__input_type_card-name');
const cardLinkInputValue = cardFormModalWindow.querySelector('.popup__input_type_url');
// решение на минималках. Конечно, студент может корректно обобрать велью инпутов в форме.

const cardSelector = '.card-template';
const defaultFormConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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

const renderCard = (data, wrap) => {
  const card = new Card(data, cardSelector);
  wrap.prepend(card.getView());
};


const formSubmitHandler = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = titleInputValue.value;
  profileDescription.textContent = descriptionInputValue.value;
  closeModalWindow(editFormModalWindow);
};

const cardFormSubmitHandler = (evt) => {
  evt.preventDefault();
  renderCard({
    name: cardNameInputValue.value,
    link: cardLinkInputValue.value
  }, placesWrap);
  closeModalWindow(cardFormModalWindow);
};

// EventListeners
editFormModalWindow.addEventListener('submit', formSubmitHandler);
cardFormModalWindow.addEventListener('submit', cardFormSubmitHandler);

openEditFormButton.addEventListener('click', () => {
  titleInputValue.value = profileTitle.textContent;
  descriptionInputValue.value = profileDescription.textContent;
  openModalWindow(editFormModalWindow);
});

openCardFormButton.addEventListener('click', () => {
  openModalWindow(cardFormModalWindow);
});

editFormModalWindow.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closeModalWindow(editFormModalWindow);
  }
});
cardFormModalWindow.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closeModalWindow(cardFormModalWindow);
  }
});
imageModalWindow.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closeModalWindow(imageModalWindow);
  }
});

// Инициализация
initialCards.forEach((data) => {
  renderCard(data, placesWrap)
});

const editFormValidator = new FormValidator(defaultFormConfig, editFormModalWindow);
const cardFormValidator = new FormValidator(defaultFormConfig, cardFormModalWindow);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
