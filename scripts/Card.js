import { openPopup } from "./index.js";

// 1. класс Card, который создаёт карточку с текстом и ссылкой на изображение
export class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }
    
    //удаление карточки
    _handleDeleteCard(evt) {
        evt.target.closest('.card__item').remove();
    }
    
    //лайк карточки 
    _handleLikeIcon(evt) {
        evt.target.classList.toggle('card__like-button_active');
    }

    //открыть карточку с фото
    _handlePreviewImage() {
        const popupTypeImage = document.querySelector('.popup_type_image');
        const popupImgPhoto = popupTypeImage.querySelector('.popup-image__photo');
        const popupImgTitle = popupTypeImage.querySelector('.popup-image__title');
        popupImgPhoto.src = this._link;
        popupImgPhoto.alt = this._name;
        popupImgTitle.textContent = this._name;
        openPopup(popupTypeImage);
    };
 
    //4.добавляем обработчики
    _setEventListeners () {
        this._elementDeleteBtn.addEventListener('click', this._handleDeleteCard);
        this._elementLikeBtn.addEventListener('click', this._handleLikeIcon);
        this._elemenImage.addEventListener('click', () => this._handlePreviewImage(this._link, this._name));
    }

    //3. метод, который вставит данные в разметку и подготовит карточку к публикации
    generateCard() {
        this._element = this._getCardTemplate();
        this._elementTitle = this._element.querySelector('.card__title');
        this._elemenImage = this._element.querySelector('.card__image');
        this._elementDeleteBtn = this._element.querySelector('.card__delete-button');
        this._elementLikeBtn = this._element.querySelector('.card__like-button');
        //заполняем шаблон
        this._elementTitle.textContent = this._name;
        this._elemenImage.src = this._link;
        this._elemenImage.alt = this._name;
        //устанавливаю слушатель
        this._setEventListeners();
        //возвращаю заполненый шаблон  
        return this._element; 
    }
    
    //2. научим класс работать с разметкой
    _getCardTemplate() {
        const cardItemTemplate = document.querySelector('.card-item-template').content.querySelector('.card__item');  //находим темплейт
        const cardItem = cardItemTemplate.cloneNode(true); //клонируем
        this._element = cardItem
        return cardItem;  //возвращаем клонируемый элемент
    }
};