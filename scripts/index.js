let popup = document.querySelector('.popup');
let popupContainer = document.querySelector('.popup__conteiner');
let popupCloseBtn = popupContainer.querySelector('.popup__close-button');
let popupNameInput = popupContainer.querySelector('.popup__input_el_name');
let popupJobInput = popupContainer.querySelector('.popup__input_el_job');
let profile = document.querySelector('.profile');
let profileInfo = document.querySelector('.profile__info');
let profileEditBtn = profileInfo.querySelector('.profile__edit-button');
let profileName = profileInfo.querySelector('.profile__name');
let profileJob = profileInfo.querySelector('.profile__job');

function openPopup() {
  popupNameInput.value = profileName.textContent;
  popupJobInput.value = profileJob.textContent;
  popup.classList.add('popup_opened');
 }

 function closePopup() {
  popup.classList.remove('popup_opened');
}

profileEditBtn.addEventListener('click', openPopup); 

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupNameInput.value;
  profileJob.textContent = popupJobInput.value;
  closePopup();
}

popupCloseBtn.addEventListener('click', closePopup);
popupContainer.addEventListener('submit', formSubmitHandler);

