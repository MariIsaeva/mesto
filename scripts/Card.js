// 1. класс Card, который создаёт карточку с текстом и ссылкой на изображение
export class Card {
    constructor(data, templateSelector, handlePreviewImage) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handlePreviewImage = handlePreviewImage
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
        this._cardElementDeleteBtn.addEventListener('click', this._handleDeleteCard);
        this._cardElementLikeBtn.addEventListener('click', this._handleLikeIcon);
        this._cardElementImage.addEventListener('click', () => {
            this._handlePreviewImage(this._link, this._name)
        });
    }

    //3. метод, который вставит данные в разметку и подготовит карточку к публикации
    generateCard() {
        this._cardElement = this._getCardTemplate();
        this._cardElementTitle = this._cardElement.querySelector('.card__title');
        this._cardElementImage = this._cardElement.querySelector('.card__image');
        this._cardElementDeleteBtn = this._cardElement.querySelector('.card__delete-button');
        this._cardElementLikeBtn = this._cardElement.querySelector('.card__like-button');
        //заполняем шаблон
        this._cardElementTitle.textContent = this._name;
        this._cardElementImage.src = this._link;
        this._cardElementImage.alt = this._name;
        //устанавливаю слушатель
        this._setEventListeners();
        //возвращаю заполненый шаблон  
        return this._cardElement; 
    }
    
    //2. научим класс работать с разметкой
    _getCardTemplate() {
        const cardItemTemplate = document.querySelector(this._templateSelector).content.querySelector('.card__item');  //находим темплейт
        const cardItem = cardItemTemplate.cloneNode(true); //клонируем
        this._cardElement = cardItem
        return cardItem;  //возвращаем клонируемый элемент
    }
};