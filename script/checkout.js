import {cart, removeProduct} from './cart.js';
import {products} from './data.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) =>{
    
    const productId = cartItem.productId;

    let matchingProduct;

    //тут проверим соответствует ли свойство ID нашему идентификатору продукта
    products.forEach((product) =>{
        if (product.id === productId) { //если равны, значит сохраним в переменную наш товар
            matchingProduct = product;
        }
    });

    cartSummaryHTML += `
    <div class="product-container-order js-order-${matchingProduct.id}">
        <div class="title-order">
            Delivery date: Thursday, January 11
        </div>

        <div class="order-sections">
            <div class="image-order">
                <img src="${matchingProduct.image}" alt="" class="image-product">
            </div>
            
            <div class="about-order">
                <div class="title-product">
                    ${matchingProduct.name}
                </div>

                <div class="price-product">$${(matchingProduct.priceCents / 100).toFixed(2)}</div>
                <div class="quantity-product">
                    <div class="quantity">
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                     </div>
                    <button class="link-quantity">
                        Update
                    </button>
                    <button class="link-quantity js-delete-product" data-product-id=${matchingProduct.id}>
                        Delete
                    </button>
                </div>
            </div>

            <div class="deadlines-data-order">
                <div class="deadline-title">
                    Choose a delivery option:
                </div>

                <div class="delivery-container">
                    <input class="delivery-input" type="radio" name="delivery-${matchingProduct.id}">

                    <div class="delivery-data-shipping">
                        <div class="delivery-data">
                            Friday, January 19
                        </div>
                        <div class="delivery-shipping">
                            FREE Shipping
                        </div>
                    </div>
                </div>

                <div class="delivery-container">
                    <input class="delivery-input" type="radio" name="delivery-${matchingProduct.id}">
                
                    <div class="delivery-data-shipping">
                        <div class="delivery-data">
                            Monday, January 15
                        </div>
                        <div class="delivery-shipping">
                            $4.99 - Shipping
                        </div>
                    </div>
                </div>

                <div class="delivery-container">
                    <input class="delivery-input" type="radio" name="delivery-${matchingProduct.id}">
                    
                    <div class="delivery-data-shipping">
                        <div class="delivery-data">
                            Thursday, January 11
                        </div>
                        <div class="delivery-shipping">
                            $9.99 - Shipping
                        </div>
                    </div>
                </div>
            
            </div>

        </div>

    </div>
    `;
});

const containerProducts = document.querySelector('.js-container-products');
containerProducts.innerHTML = cartSummaryHTML;


document.querySelectorAll('.js-delete-product').forEach((link) => {
    link.addEventListener('click', () =>{
        const {productId} = link.dataset;
        removeProduct(productId);
        const productOrder = document.querySelector(`.js-order-${productId}`);
        const answer = confirm("Вы действительно хотите удалить продукт?");
        if (answer === true) {
            productOrder.remove();
        } 
        
    });
});
