const popup = document.querySelector('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');

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

function openPopup(popup) { 
  popup.classList.add('popup_opened');
}

function closePopup(popup) { 
  popup.classList.remove('popup_opened');
 }

function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  placeValue = popupInputPlaceAdd.value;
  placeLink = popupInputLinkAdd.value;
  plaseElement = createCard({ name: placeValue, link: placeLink });
  popupInputPlaceAdd.value = '';
  popupInputLinkAdd.value = '';
  closePopup(popupTypeAdd);
} 

function handleDeleteCard(evt) {
  evt.target.closest('.card__item').remove();
}

function handleLikeIcon(evt) {
  evt.target.classList.toggle('card__like-button_active');
}

function handllePreviewImage(link, name) {
  popupImgPhoto.src = link;
  popupImgPhoto.alt = name;
  popupImgTitle.textContent = name;
  openPopup(popupTypeImage);
};

const cardItemTemplate = document.querySelector('.card-item-template').content.querySelector('.card__item');
const cardItemlist = document.querySelector('.card__list');

function createCard(data) {
  const cardItem = cardItemTemplate.cloneNode(true);
  const cardItemTitle = cardItem.querySelector('.card__title');
  const cardItemImage = cardItem.querySelector('.card__image');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  const cardLikeIcon = cardItem.querySelector('.card__like-button');
  
  cardItemTitle.textContent = data.name;
  cardItemImage.src = data.link;
  cardItemImage.alt = data.name;
  
  cardDeleteButton.addEventListener('click', handleDeleteCard);
  cardLikeIcon.addEventListener('click', handleLikeIcon);
  cardItemImage.addEventListener('click', () => handllePreviewImage(data.link, data.name));
  //return cardItem;
  cardItemlist.prepend(cardItem);
}
// у меня так и не получилось разделить функции карточки, пока до меня не доходит,
// хотелось бы знать в чем у меня еще проблемы в коде

// function renderCard(data, wrap) {
//   wrap.prepend(createCard(data));
//   cardItemlist.prepend(cardItem);
//  }
//  initialCards.forEach((data) => {
//   renderCard(data, placesWrap)
//  });

initialCards.forEach(data => {
   createCard(data);
});

profileEditBtn.addEventListener('click', openPopupTypeEdit);
profileAddBtn.addEventListener('click', () => openPopup(popupTypeAdd)); 

closeEditModalButton.addEventListener('click', () => closePopup(popupTypeEdit));
closeAddModalButton.addEventListener('click', () => closePopup(popupTypeAdd));
closeImageModalButton.addEventListener('click', () => closePopup(popupTypeImage));

popupTypeEdit.addEventListener('submit', formSubmitHandlerEdit);
popupTypeAdd.addEventListener('submit', formSubmitHandlerAdd);