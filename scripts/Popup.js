export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._closePopupEsc = this._closePopupEsc.bind(this)
    }
  
    _closePopupEsc(evt) {
      if (evt.key === "Escape") {
        this.closePopup();
      }
    }
  
    //открыть попап
    open() {
      this._popup.classList.add("popup_opened");
      document.addEventListener("keydown", this._closePopupEsc);
    }
  
    //закрыть попап
    close() {
      this._popup.classList.remove("popup_opened");
      document.removeEventListener("keydown", this._closePopupEsc);
    }
  
    setEventListeners() {
      // закрытие попапа по клику на крестик
      this._popup.querySelector('.popup__close-button').addEventListener("click", () => {
        this.closePopup();
      });
  
      // закрытие попапа по клику на оверлее
      this._popup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          this.closePopup();
        }
      });
    }
  }