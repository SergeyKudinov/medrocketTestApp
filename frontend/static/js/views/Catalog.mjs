import AbstractView from "./AbstractView.mjs";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('Каталог');
    }   

    async getHtml() {
        let loading = '<h1 style="text-align: center;">Loading...</h1>';
        document.querySelector('#app').innerHTML = loading;
        
        window.addEventListener('DOMContentLoaded', () => {
            loading = '';
            document.querySelectorAll('.trigger').forEach((item) => {
                item.addEventListener('click', () => {
                    const content = item.parentNode.querySelector('. accordeon_item_active');
                    if(content.classList.contains('accordeon_item_active')) {
                        content.classList.remove('accordeon_item_active')
                    } else {
                        content.classList.add('accordeon_item_active');
                    }
                })
            });
        });
        let userResponse = await fetch('https://json.medrocket.ru/users/');
        let userContent = await userResponse.json();

        let userItems = '';
        let userAlbum = '';
        let albumItem = '';

        for(let i = 0; i < userContent.length; i++) {
            let albumResponse = await fetch(`https://json.medrocket.ru/albums?userId=${userContent[i].id}`);
            let albumContent = await albumResponse.json();

            for(let j = 0; j < albumContent.length; j++) {
                let albumItemResponse = await fetch(`https://json.medrocket.ru/photos?albumId=${albumContent[j].id}`);
                let albumItemContent = await albumItemResponse.json();
                console.log(albumItemContent);

                // for(let m = 0; m < albumItemContent.length; m++){
                //     albumItem += `
                //         <li>
                //             <img src="./assets/Pic.png" data-modal class="photo_item" alt="picture">
                //             <img src="./assets/star_active.png" class="star" alt="star">
                //         </li>
                //     `;
                // }

                userAlbum += `
                    <div class="user_content content accordeon_item accordeon_item_active">
                        <div class="album_trigger trigger">
                            <div class="user_pm">
                            </div>
                            <div class="user_album">
                                ddjndt
                            </div>
                        </div>
                        <div class="content accordeon_item_active">
                            <ul class="album_content accordeon_item">
                                ${albumItem}
                            </ul>
                        </div>
                    </div>
                `;
            };

            userItems += `
                <div class="user_item accordeon_item">
                    <div class="user_trigger trigger">
                        <div class="user_pm">
                        </div>
                        <div class="user_name">
                            ${userContent[i].name}
                        </div>
                    </div>
                    ${userAlbum}
                </div>
            `;
        };
            
        return `
            <div class="container">
                <div class="catalog">
                    ${userItems}
                </div>
            </div>
            <div class="big_pic_wrapper" style="display: none;">
                <div class="close_modal" data-close>
                    ╳
                </div>
                <img src="./assets/Pic.png" class="big_picture" alt="big picture">
            </div>
        `;
        // return `
        //     <div class="catalog">
        //         <div class="user_item accordeon_item">
        //             <div class="user_trigger trigger" onclick="toggleVisible()">
        //                 <div class="user_pm">
        //                 </div>
        //                 <div class="user_name">
        //                     Leanne Graham
        //                 </div>
        //             </div>
        //             <div class="user_content content accordeon_item">
        //                 <div class="album_trigger trigger" onclick="toggleVisible()">
        //                     <div class="user_pm">
        //                     </div>
        //                     <div class="user_album">
        //                         consequatur autem doloribus natus consectetur
        //                     </div>
        //                 </div>
        //                 <div class="content">
        //                     <ul class="album_content accordeon_item">
        //                         <li>
        //                             <img src="./assets/Pic.png" data-modal class="photo_item" alt="picture">
        //                             <img src="./assets/star_active.png" class="star" alt="star">
        //                         </li>
        //                         <li>
        //                             <img src="./assets/Pic.png" data-modal class="photo_item" alt="picture">
        //                             <img src="./assets/star_active.png" class="star" alt="star">
        //                         </li>
        //                         <li>
        //                             <img src="./assets/Pic.png" data-modal class="photo_item" alt="picture">
        //                             <img src="./assets/star_active.png" class="star" alt="star">
        //                         </li>
        //                         <li>
        //                             <img src="./assets/Pic.png" data-modal class="photo_item" alt="picture">
        //                             <img src="./assets/star_active.png" class="star" alt="star">
        //                         </li>
        //                         <li>
        //                             <img src="./assets/Pic.png" data-modal class="photo_item" alt="picture">
        //                             <img src="./assets/star_active.png" class="star" alt="star">
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div class="big_pic_wrapper" style="display: none;">
        //         <div class="close_modal" data-close>
        //             ╳
        //         </div>
        //         <img src="./assets/Pic.png" class="big_picture" alt="big picture">
        //     </div>
        // `;
    }
}
