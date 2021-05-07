const formObj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__form-error_visible'
}

//класс FormValidator настраивает валидацию полей формы
class FormValidator {
    constructor(formObj, formElement) {
        this._formObj = formObj;
        this._formElement = formElement;
    };
    //показать ошибку 
    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._formObj.inputErrorClass);
        errorElement.classList.add(this._formObj.errorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    //убрать ошибку 
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._formObj.inputErrorClass);
        errorElement.classList.remove(this._formObj.errorClass);
        errorElement.textContent = '';
    }

    //проверяем валидацию в форме
    _checkInputValidity(inputElement, errorElement) {
        const isInputNotValid = !inputElement.validity.valid;

        if (isInputNotValid) {
           this._showInputError(inputElement, errorElement);
        } else {
           this._hideInputError(inputElement);
        }
    };
    
    //кнопка
    _desactivateButton(buttonElement) {
        buttonElement.disabled = true;
        buttonElement.classList.add(this._formObj.inactiveButtonClass);
    }

    _toggleButtonState(inputList, buttonElement) {
        const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
        const hasNotValidInput = inputList.some(findAtLeastOneNotValid);
    
        if (hasNotValidInput) {
           this._desactivateButton(buttonElement);
        } else {
           buttonElement.removeAttribute('disabled');
           buttonElement.classList.remove(this._formObj.inactiveButtonClass);
        }
    }

    // функция которая навешивает события на саму форму и запрещает отправку формы по умолчанию
    _setEventListeners() {
        const buttonElement = this._formElement.querySelector(this._formObj.submitButtonSelector); 
  
        const handleFormSubmit = (evt) => {
        evt.preventDefault();
        this._desactivateButton(buttonElement);
        };
  
        this._desactivateButton(buttonElement);
        this._formElement.addEventListener("submit", handleFormSubmit);
  
        const inputList = Array.from(this._formElement.querySelectorAll(this._formObj.inputSelector));
  
        const inputListIterator = (inputElement) => {
           const handleInput = () => {
              this._checkInputValidity(inputElement); 
              this._toggleButtonState(inputList, buttonElement, this._formObj.inactiveButtonClass); 
            };
            inputElement.addEventListener('input', handleInput)
        };

        inputList.forEach(inputListIterator);
        this._toggleButtonState(inputList, buttonElement, this._formObj.inactiveButtonClass);
    }
    
    //функция проходит по всем формам и включает валидацию, навешивает обработчики события на формы
    enableValidation() {
        const formElements = document.querySelectorAll(this._formObj.formSelector);
        const formList = Array.from(formElements);
        formList.forEach((formElement) => {
        this._setEventListeners(formElement);
        });  
    }
}

export function validateForm(formElement) {
    const validatedForm = new FormValidator(formObj, formElement);
    validatedForm.enableValidation();
    return validatedForm
}