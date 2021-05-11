import {initialCards} from './initial-сards.js';
import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';

const formObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__form-error_visible'
}

const popup = document.querySelector('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');
const popupAddForm = popupTypeAdd.querySelector('.popup-add-form');

const popupInputName = popupTypeEdit.querySelector('.popup__input_el_name');
const popupInputJob = popupTypeEdit.querySelector('.popup__input_el_job');

const popupInputPlaceAdd = popupTypeAdd.querySelector('.popup__input_el_place');
const popupInputLinkAdd = popupTypeAdd.querySelector('.popup__input_el_link');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImgPhoto = popupTypeImage.querySelector('.popup-image__photo');
const popupImgTitle = popupTypeImage.querySelector('.popup-image__title');

const closeImageModalButton = popupTypeImage.querySelector('.popup__close-button');
const closeEditModalButton = popupTypeEdit.querySelector('.popup__close-button');
const closeAddModalButton = popupTypeAdd.querySelector('.popup__close-button');

const profile = document.querySelector('.profile');
const profileEditBtn = profile.querySelector('.profile__edit-button');
const profileAddBtn = profile.querySelector('.profile__add-button');

const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

const popups = Array.from(document.querySelectorAll('.popup'));

const cardItemlist = document.querySelector('.card__list');

//закрытие попапа по нажатию на пустое место
function closeOverlayPopups (popups) {
  popups.forEach(popup => {
    popup.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
      }
    })
  }); 
}

//закрытие попапа по нажатию Esc
function closePopupEsc(evt) {
  if(evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

//обработчик отправки формы профиля
function formSubmitHandlerEdit(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;
  closePopup(popup);
}

//открыть попап
  function openPopup(popup) { 
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

//закрыть попап
function closePopup(popup) { 
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

 //открыть попап с редактированием профиля
function openPopupTypeEdit() { 
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
  popupTypeEditValidator.resetValidation();
  openPopup(popupTypeEdit);
};

// //открыть попап с редактированием карточки
function openPopupTypeAdd() {
  popupAddForm.reset()
  popupTypeAddValidator.resetValidation();
  openPopup(popupTypeAdd);
}

//открыть карточку с фото
function handlePreviewImage(link, name) {
  popupImgPhoto.src = link;
  popupImgPhoto.alt = name;
  popupImgTitle.textContent = name;
  openPopup(popupTypeImage);
  };

initialCards.forEach((item) => {
  addCartInList(item);
});

function addCartInList(data) { 
  const cardItem = createCard(data); 
  //добавляем в ДОМ
  cardItemlist.prepend(cardItem);
}

function createCard(data) {
  const templateSelector = '.card-item-template';
  const newCard = new Card(data, templateSelector, handlePreviewImage);
  const newCreateCard = newCard.generateCard();
  return newCreateCard;
}

//обработчик отправки формы карточки
function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  addCartInList({ name: popupInputPlaceAdd.value, link: popupInputLinkAdd.value }, handlePreviewImage, '.card-item-template');
  popupAddForm.reset();
  closePopup(popupTypeAdd);
}

closeOverlayPopups(popups);

profileEditBtn.addEventListener('click', openPopupTypeEdit);
profileAddBtn.addEventListener('click', openPopupTypeAdd); 

closeEditModalButton.addEventListener('click', () => closePopup(popupTypeEdit));
closeAddModalButton.addEventListener('click', () => closePopup(popupTypeAdd));
closeImageModalButton.addEventListener('click', () => closePopup(popupTypeImage));

popupTypeEdit.addEventListener('submit', formSubmitHandlerEdit);
popupTypeAdd.addEventListener('submit', formSubmitHandlerAdd);



function validateForm(formElement) {
   const validatorForm = new FormValidator(formObj, formElement);
   validatorForm.enableValidation();
   return validatorForm;
}  

const popupTypeEditValidator = validateForm(popupTypeEdit);
const popupTypeAddValidator = validateForm(popupTypeAdd);