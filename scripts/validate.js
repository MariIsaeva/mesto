const showInputError = (formElement, inputElement, formObj, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formObj.inputErrorClass);
  errorElement.classList.add(formObj.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, formObj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formObj.inputErrorClass);
  errorElement.classList.remove(formObj.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, formObj, errorMessage) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    showInputError(formElement, inputElement, formObj, errorMessage);
  } else {
    hideInputError(formElement, inputElement, formObj);
  }
};

const toggleButtonState = (inputList, inputElement, buttonElement, formObj) => {
  const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
  const hasNotValidInput = inputList.some(findAtLeastOneNotValid);
   
  if (hasNotValidInput) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(formObj.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(formObj.inactiveButtonClass);
  }
};

function setEventListeners(formElement, formObj) {
    
  const handleFormSubmit = (evt) => {
    evt.preventDefault()
  };
  
  formElement.addEventListener("submit", handleFormSubmit);
  
  const inputList = Array.from(formElement.querySelectorAll(formObj.inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  const inputListIterator = (inputElement) => {
    const handleInput = () => {
      checkInputValidity(formElement, formObj, input.validationMessage); 
      toggleButtonState(inputList, buttonElement, formObj.inactiveButtonClass); 
    };
    inputElement.addEventListener('input', handleInput)
  };

  inputList.forEach(inputListIterator);
  toggleButtonState(inputList, buttonElement, formObj.inactiveButtonClass);
};

const enableValidation = () => {
  const formElements = document.querySelectorAll(formObj.formSelector);
  const formList = Array.from(formElements);
  formList.forEach((formElement) => {
    setEventListeners(formElement, formObj);
    });  
 };
 
formObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__form-error_visible'
}

enableValidation(); 
 