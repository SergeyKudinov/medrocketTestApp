import Catalog from "./views/Catalog.mjs";
import Favorite from "./views/Favorite.mjs";

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        {path: '/', view: Catalog},
        {path: '/favorite', view: Favorite}
    ]

    const potentialMatches = routes.map(route => {
        return{
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if(!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    const view = new match.route.view();

    document.querySelector('#app').innerHTML = await view.getHtml();

};

document.addEventListener('DOMContentLoaded', () => {
    let links = document.querySelectorAll('[data-link]');
    
    document.body.addEventListener('click', e => {
        if(e.target.matches('[data-link]')) {
            e.preventDefault();
            links.forEach(item => item.classList = 'nav_item');
            e.target.classList.value += ' active';
            navigateTo(e.target.href);
        }
    });

    router();
});


// async function getData(extraUrl, baseUrl='https://json.medrocket.ru/') {
//     return await fetch(`${baseUrl}${extraUrl}`).then(response => {
//         return response.json();
//     })
// }
// getData('users/').then(response => {console.log(response);});

// function toggleVisible() {
//     document.querySelectorAll('.trigger').forEach((item) => {
//         item.addEventListener('click', () => {
//             const content = item.parentNode.querySelector('.content');
//             if(content.classList.contains('accordeon_item_active')) {
//                 content.classList.remove('accordeon_item_active')
//             } else {
//                 content.classList.add('accordeon_item_active');
//             }
//         })
//     });
// }