const showInputError = (formElement, inputElement, formObj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(formObj.inputErrorClass);
  errorElement.classList.add(formObj.errorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (formElement, inputElement, formObj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formObj.inputErrorClass);
  errorElement.classList.remove(formObj.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, formObj, errorElement) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    showInputError(formElement, inputElement, formObj, errorElement);
  } else {
    hideInputError(formElement, inputElement, formObj);
  }
};

const desactivateButton = (buttonElement) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(formObj.inactiveButtonClass);
}

const toggleButtonState = (inputList, buttonElement) => {

  const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
  const hasNotValidInput = inputList.some(findAtLeastOneNotValid);
    
  if (hasNotValidInput) {
    desactivateButton(buttonElement);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(formObj.inactiveButtonClass);
  }
};

function setEventListeners(formElement, formObj) {
  const buttonElement = formElement.querySelector(formObj.submitButtonSelector); 
  
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    desactivateButton(buttonElement);
  };
  
  desactivateButton(buttonElement);
  formElement.addEventListener("submit", handleFormSubmit);
  
  const inputList = Array.from(formElement.querySelectorAll(formObj.inputSelector));
  
  const inputListIterator = (inputElement) => {
    const handleInput = () => {
      checkInputValidity(formElement, inputElement, formObj); 
      toggleButtonState(inputList, buttonElement, formObj.inactiveButtonClass); 
    };
    inputElement.addEventListener('input', handleInput)
  };

  inputList.forEach(inputListIterator);
  toggleButtonState(inputList, buttonElement, formObj.inactiveButtonClass);
};

function enableValidation(formObj) {
  const formElements = document.querySelectorAll(formObj.formSelector);
  const formList = Array.from(formElements);
  formList.forEach((formElement) => {
    setEventListeners(formElement, formObj);
    });  
 };
 
const formObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__form-error_visible'
}

enableValidation(formObj); 
 