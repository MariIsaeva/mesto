const popup = document.querySelector('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');

const popupInputName = popupTypeEdit.querySelector('.popup__input_el_name');
const popupInputJob = popupTypeEdit.querySelector('.popup__input_el_job');

const popupInputPlaceAdd = popupTypeAdd.querySelector('.popup__input_el_place');
const popupInputLinkAdd = popupTypeAdd.querySelector('.popup__input_el_link');

const popupCloseBtnEdit = popupTypeEdit.querySelector('.popup__close-button');
const popupCloseBtnAdd = popupTypeAdd.querySelector('.popup__close-button');

const profile = document.querySelector('.profile');
const profileEditBtn = profile.querySelector('.profile__edit-button');
const profileAddBtn = profile.querySelector('.profile__add-button');

const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

profileEditBtn.addEventListener('click', function() { 
  openPopup(popupTypeEdit);
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
});

profileAddBtn.addEventListener('click', function() { 
  openPopup(popupTypeAdd);
  popupInputPlaceAdd.value = '';
  popupInputLinkAdd.value = '';
});

function openPopup(popup) { 
  popup.classList.add('popup_opened');
}

function closePopup(popup) { 
  popup.classList.remove('popup_opened');
 }

popupCloseBtnEdit.addEventListener('click', function() {
  closePopup(popupTypeEdit);
});

popupCloseBtnAdd.addEventListener('click', function() {
  closePopup(popupTypeAdd);
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;
  closePopup(popup);
}

popupTypeEdit.addEventListener('submit', formSubmitHandler);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function AddformSubmitHandler(evt) {
  evt.preventDefault();
  const InputPlaceAdd = popupInputPlaceAdd.value;
  const InputLinkAdd = popupInputLinkAdd.value;

  const cardItem = cardItemTemplate.cloneNode(true);
  const cardItemTitle = cardItem.querySelector('.card__title');
  cardItemTitle.textContent = InputPlaceAdd.name;
  const cardItemImage = cardItem.querySelector('.card__image');
  cardItemImage.src = InputLinkAdd.link;
  closePopup(popupTypeAdd);
  cardItemlist.prepend(cardItem);
}

popupTypeAdd.addEventListener('submit', AddformSubmitHandler);

const cardItemTemplate = document.querySelector('.card-item-template').content.querySelector('.card__item');
const cardItemlist = document.querySelector('.card__list');
function initialCard(item) {
  const cardItem = cardItemTemplate.cloneNode(true);
  const cardItemTitle = cardItem.querySelector('.card__title');
  cardItemTitle.textContent = item.name;
  const cardItemImage = cardItem.querySelector('.card__image');
  cardItemImage.src = item.link;
  cardItemImage.alt = item.name;
  
  const LikeBtn = cardItem.querySelector('.card__like-button');
  LikeBtn.addEventListener('click', () => {
    LikeBtn.classList.toggle('card__like-button_active');
    });  
  
  const deleteBtn = cardItem.querySelector('.card__delete-button');
  deleteBtn.addEventListener('click', () => {
    cardItem.remove();
    });
 
  cardItemlist.prepend(cardItem);

  const popupTypeImage = document.querySelector('.popup_type_image');
  cardItemImage.addEventListener('click', () => {
    openPopup(popupTypeImage);
    const popupImgPhoto = popupTypeImage.querySelector('.popup-image__photo');
    popupImgPhoto.src = item.link;
    popupImgPhoto.alt = item.name;
    const popupImgTitle = popupTypeImage.querySelector('.popup-image__title');
    popupImgTitle.textContent = item.name;
    const popupImgCloseBtn = popupTypeImage.querySelector('.popup__close-button');
    popupImgCloseBtn.addEventListener('click', function() {
      closePopup(popupTypeImage);
      });
  });
}

const CardElement = initialCards.forEach(item => {
  initialCard(item);
});