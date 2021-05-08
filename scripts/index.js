import {initialCards} from './initial-сards.js';
import {validateForm} from './FormValidator.js';
import {Card} from './Card.js';

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

function closeOverlayPopups (popups) {
  popups.forEach(popup => {
    popup.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
      }
    })
  }); 
}

function closePopupEsc(evt) {
  if(evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function openPopupTypeEdit() { 
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
  openPopup(popupTypeEdit);
};

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
  const newCard = new Card(data, '.card-item-template');
  const newCreateCard = newCard.generateCard();
  return newCreateCard;
}

function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  addCartInList({ name: popupInputPlaceAdd.value, link: popupInputLinkAdd.value });
  popupAddForm.reset();
  closePopup(popupTypeAdd);
}

closeOverlayPopups(popups);

profileEditBtn.addEventListener('click', openPopupTypeEdit);
profileAddBtn.addEventListener('click', () => openPopup(popupTypeAdd)); 

closeEditModalButton.addEventListener('click', () => closePopup(popupTypeEdit));
closeAddModalButton.addEventListener('click', () => closePopup(popupTypeAdd));
closeImageModalButton.addEventListener('click', () => closePopup(popupTypeImage));

popupTypeEdit.addEventListener('submit', formSubmitHandlerEdit);
popupTypeAdd.addEventListener('submit', formSubmitHandlerAdd);

validateForm(popupTypeEdit);
validateForm(popupTypeAdd);