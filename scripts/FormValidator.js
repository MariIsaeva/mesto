//класс FormValidator настраивает валидацию полей формы
export class FormValidator {
  constructor(formObj, formElement) {
    this._formObj = formObj;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._formObj.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._formObj.submitButtonSelector); 
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

     //приватный метод проверки в форме на возврат невалидных инпутов
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
      })
    } 

  //кнопка
  _desactivateButton() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._formObj.inactiveButtonClass);
  }

  _toggleButtonState() {
    const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
    const hasNotValidInput = this._inputList.some(findAtLeastOneNotValid);
  
    if (hasNotValidInput) {
      this._desactivateButton();
      } else {
        this._buttonElement.removeAttribute('disabled');
        this._buttonElement.classList.remove(this._formObj.inactiveButtonClass);
    }
  }

  // функция которая навешивает события на саму форму и запрещает отправку формы по умолчанию
  _setEventListeners() {
    this._desactivateButton();
    const inputListIterator = (inputElement) => {
      const handleInput = () => {
        this._checkInputValidity(inputElement); 
        this._toggleButtonState(this._formObj.inactiveButtonClass); 
      };
    inputElement.addEventListener('input', handleInput)
    };

    this._inputList.forEach(inputListIterator);
    this._toggleButtonState(this._formObj.inactiveButtonClass);
  }
  
  //функция проходит по всем формам и включает валидацию, навешивает обработчики события на формы
  enableValidation() {
    this._formElement.addEventListener('submit', evt => evt.preventDefault()); ;  
    this._setEventListeners();
  }
}  