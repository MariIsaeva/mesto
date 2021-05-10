//класс FormValidator настраивает валидацию полей формы
export class FormValidator {
  constructor(formObj, formElement) {
    this._formObj = formObj;
    this._formElement = formElement;
    this._inputSelector = formObj.inputSelector;
    this._submitButtonSelector = formObj.submitButtonSelector;
    this._inputErrorClass = formObj.inputErrorClass;
    this._errorClass = formObj.errorClass;
    this._inactiveButtonClass = formObj.inactiveButtonClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector); 
  };

  //показать ошибку 
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  //убрать ошибку 
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  //кнопка
  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    })
  }

  _desactivateButton() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._formObj.inactiveButtonClass);
  }
  
  _toggleButtonState() {
     
    if (this._hasInvalidInput()) {
      this._desactivateButton();
      } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  //проверяем валидацию инпутов
  _checkInputValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;

      if (isInputNotValid) {
        this._showInputError(inputElement);
      } else {
    this._hideInputError(inputElement, inputElement.validationMessage);
    }
  };
  
  //проверяем валидацию форм
  _checkFormValidity() {
    this._inputList.forEach(inputElement => {
      if (inputElement.value !== '') {
        this._checkInputValidity(inputElement);
      } else {
        this._hideInputError(inputElement);
      }
    this._toggleButtonState();
    });
  }
 
  // функция которая навешивает события на саму форму и запрещает отправку формы по умолчанию
  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      const handleInput = () => {
        this._checkInputValidity(inputElement); 
        this._toggleButtonState(); 
      };
    inputElement.addEventListener('input', handleInput)
    });
    this._toggleButtonState();
  }

  //функция проходит по всем формам и включает валидацию, навешивает обработчики события на формы
  enableValidation() {
    this._formElement.addEventListener('submit', evt => evt.preventDefault()); ;  
    this._setEventListeners();
    }
}







        