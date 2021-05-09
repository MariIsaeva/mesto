//класс FormValidator настраивает валидацию полей формы
export class FormValidator {
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
  
      //приватный метод проверки в форме на возврат невалидных инпутов
    _hasInvalidInput(inputList) {
      return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
      })
    }  
    
     _desactivateButton(buttonElement) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this._formObj.inactiveButtonClass);
    }
    
     _toggleButtonState(inputList, buttonElement) {
    
      const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
      const hasNotValidInput = inputList.some(findAtLeastOneNotValid);
        
      if (hasNotValidInput) {
        desactivateButton(buttonElement);
      } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(this._formObj.inactiveButtonClass);
      }
    };
    
     _setEventListeners() {
      
      const inputList = Array.from(this._formElement.querySelectorAll(this._formObj.inputSelector));
      const buttonElement = this._formElement.querySelector(this._formObj.submitButtonSelector);
  
      const inputListIterator = (inputElement) => {
        const handleInput = () => {
          this._checkInputValidity(inputElement); 
          this._toggleButtonState(inputList, buttonElement, formObj.inactiveButtonClass); 
        };
        inputElement.addEventListener('input', handleInput)
      };
    
      inputList.forEach(inputListIterator);
  
      this._toggleButtonState(inputList, buttonElement, formObj.inactiveButtonClass);
    };
    
      // публичный метод включения валидации формы
      enableValidation() {
        
          const handleFormSubmit = (evt) => {
            evt.preventDefault();
            this._desactivateButton(buttonElement);
          };
          
          this._formElement.addEventListener('submit', handleFormSubmit);  
          this._desactivateButton(buttonElement);  
  
          this._setEventListeners(); // устанавлиет слушатели
      }
  }