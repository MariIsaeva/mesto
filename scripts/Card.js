// 1. класс Card, который создаёт карточку с текстом и ссылкой на изображение
export class Card {
    constructor(cardName, cardLink, templateSelector) {
        this._cardName = cardName;
        this._cardLink = cardLink;
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
 
    //4.добавляем обработчики
    _setEventListeners () {
        this._elementDeleteBtn.addEventListener('click', this._handleDeleteCard);
        this._elementLikeBtn.addEventListener('click', this._handleLikeIcon);
        this._elemenImage.addEventListener('click', () => this._handlePreviewImage(this._cardName, this._cardLink));
    }

    //3. метод, который вставит данные в разметку и подготовит карточку к публикации
    generateCard() {
        this._element = this._getCardTemplate();
        this._elementTitle = this._element.querySelector('.card__title');
        this._elemenImage = this._element.querySelector('.card__image');
        this._elementDeleteBtn = this._element.querySelector('.card__delete-button');
        this._elementLikeBtn = this._element.querySelector('.card__like-button');
        //заполняем шаблон
        this._elementTitle.textContent = this._cardName;
        this._elemenImage.src = this._cardLink;
        this._elemenImage.alt = this._cardName;
        //устанавливаю слушатель
        this._setEventListeners();
        //возвращаю заполненый шаблон  
        return this._element; 
    }
    
    //2. научим класс работать с разметкой
    _getCardTemplate() {
        const cardItemTemplate = document.querySelector('.card-item-template').content.querySelector('.card__item');  //находим темплейт
        const cardItem = cardItemTemplate.cloneNode(true); //клонируем
        return cardItem;  //возвращаем клонируемый элемент
    }
};