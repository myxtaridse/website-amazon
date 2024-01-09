// 1
//СОХРАНЕНИЕ ДАННЫХ
//создаем данные для сайта о товарах
//дабы не копировать каждый раз product-container создадим упрощение с помощью скрипта
/*const products = [{
    image: 'images/product/athletic-cotton-socks-6-pairs.jpg',
    name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
    rating: {
        stars: 4.5,
        count: 87
    },
    priceCents: 1090
},]; */
//занесено в data.js

// 2 
// Генерируем HTML

//модель аккумулятора - мы проходим по массиву и каждый раз прибавляем к результату, накапливаем результат
let productsHTML = '';

products.forEach((product) =>{
    //вставляем весь HTML-код
    productsHTML += `
        <div class="product-container">
            <div class="image-container">
                <img src="${product.image}" alt="" class="image">
            </div>
            <div class="title-product">${product.name}</div>
            <div class="rating-container">
                <img src="images/rating/rating-${product.rating.stars * 10}.png" alt="" class="rating-image">
                <div class="rating-text">${product.rating.count}</div>
            </div>
            <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>
            <select name="" id="" class="select">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            <div class="added-messanger">
                <img src="images/icon/checkmark.png" alt="" class="checkmark">
                <div class="added-text">Added!</div>
            </div>
            <div class="add-button"><button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button></div>
        </div>
    `;
});

//объединение всего HTML-кода для всех продуктов вместе

//3 
//взять весь HTML и выложить его на саму страницу
//document.querySelector('.grid-container') //берем контейнер, в котором хранятся все контейнеры
//теперь меняем весь HTML внутри контейнера с нашими изменениями
document.querySelector('.grid-container').innerHTML = productsHTML; 

//добавление действий к кнопке добавить в корзину
document.querySelectorAll('.add-to-cart').forEach((button) =>{
    button.addEventListener('click', () =>{
        const productId = button.dataset.productId;
        let matchingItem;
        cart.forEach((item) =>{
            if (productId === item.productId){
                matchingItem = item;
            }
        });
            if (matchingItem){
                matchingItem.quantity += 1;
            } else {
                cart.push({
                productId: productId,
                quantity: 1
        });
        };
        console.log(cart);
    });
});