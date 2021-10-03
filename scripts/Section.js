export default class Section {
    constructor ({ items, renderer }, conteinerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(conteinerSelector);
    }

    _clearContainer() {
        this._container.innerHTML = '';
    }

    addItemPrepend(formElement) {
        this._container.prepend(formElement);
    }

    addItemAppend(formElement) {
        this._container.append(formElement);
    }

    _renderedItems(Items) {
        this._clearContainer();
        this._renderedItems.forEach((item) => {
        this._renderer(item);
        });
    }
}    