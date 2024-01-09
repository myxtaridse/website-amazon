import {cart, addToCart} from './cart.js';
import {products} from './data.js';


let productsHTML = '';
products.forEach((product) =>{
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
    <select name="" id="" class="select js-quantity-selector-${product.id}">
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
    <div class="added-messanger js-added-to-cart-${product.id}">
        <img src="images/icon/checkmark.png" alt="" class="checkmark">
        <div class="added-text">Added!</div>
    </div>
    <div class="add-button"><button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button></div>
</div>`
});

document.querySelector('.grid-container').innerHTML = productsHTML;


function updateCartQuantity() {
    let cartQuantity = 0;
        cart.forEach((cartItem) =>{
            cartQuantity += cartItem.quantity;
    });
    document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}


document.querySelectorAll('.add-to-cart').forEach((button) =>{
    
    button.addEventListener('click', () =>{
        //const productId = button.dataset.productId;
        //сократили
        const {productId} = button.dataset;

        addToCart(productId);
        updateCartQuantity();

        let addedTimeOut;
            
            const added = document.querySelector(`.js-added-to-cart-${productId}`);
            added.classList.add('added-opacity');
            if (addedTimeOut) {
                clearTimeout(addedTimeOut);
            }
            const timeoutId = setTimeout(() =>{
            added.classList.remove('added-opacity');
            }, 2000); //сообщение удаляется спустя 2 секунды, точнее класс удаляется
            addedTimeOut = timeoutId;
        
    });
});
