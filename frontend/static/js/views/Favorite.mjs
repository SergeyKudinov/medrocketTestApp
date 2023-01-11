import AbstractView from "./AbstractView.mjs";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('Избранное');
    }
    
    async getHtml() {
        let response = await fetch('https://json.medrocket.ru/photos?albumId=2');
        let content = await response.json();
        let listItems = '';

        for(let i = 0; i < content.length; i++) {
            listItems += `
                <li>
                    <img src="${content[i].thumbnailUrl}" class="photo_item" alt="picture">
                    <img src="../../assets/star_active.png" class="star" alt="star">
                    <div class="favorite_item_text">
                        ${content[i].title}
                    </div>
                </li>
            `;
        };
        return `
        <div class="container">
            <div class="favorite">
                <ul class="favorite_list">
                    ${listItems}
                </ul>
            </div>

            <div class="favorite_empty" style="display: none;"> 
                <img src="../../assets/empty.png" alt="picture">
                <div class="favorite_empty_text">
                    <p>Список избранного пуст</p>
                    <p>Добавляйте изображения, нажимая на звездочки</p>
                </div>
            </div>
        </div>
        `;
    }
}