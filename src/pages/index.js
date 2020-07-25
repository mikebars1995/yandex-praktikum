import './index.css'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import { initialCards, editPopupWithFormSelector, cardSelector, placesListSelector, defaultFormConfig,
  popupWithImageSelector, cardPopupWithFormSelector, openEditFormButton, openCardFormButton, 
  profileTitleSelector, profileDescriptionSelector, titleInputValue, descriptionInputValue
} from '../utils/constants.js';

const popupWithImage = new PopupWithImage(popupWithImageSelector)
popupWithImage.setEventListeners()

const editPopupWithForm = new PopupWithForm(editPopupWithFormSelector, (editInfo) => {
  userInfo.setUserInfo({
    title: editInfo.name,
    description: editInfo.description
  })
  editPopupWithForm.close()
})
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

const userInfo = new UserInfo({profileTitleSelector, profileDescriptionSelector})

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
  const {title, description} = userInfo.getUserInfo()
  titleInputValue.value = title;
  descriptionInputValue.value = description;
  editPopupWithForm.open()
});

openCardFormButton.addEventListener('click', () => {
  cardPopupWithForm.open()
});

// Инициализация

cardsList.renderItems()

const editFormValidator = new FormValidator(defaultFormConfig, editPopupWithForm.getPopup());
const cardFormValidator = new FormValidator(defaultFormConfig, cardPopupWithForm.getPopup());

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
