import {cart, removeProduct, calculateUpDateQuantity, updateQuantityCart, updateDeliveryOption} from './cart.js';
import products from './data.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from './deliveryOptions.js';



const toDay = dayjs();
const deliveryDate = toDay.add(7, 'days');
const updateDeliveryDate = deliveryDate.format('dddd, MMMM D');
console.log(updateDeliveryDate);


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

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });

        const toDay = dayjs();
        const deliveryDate = toDay.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
    <div class="product-container-order js-order-${matchingProduct.id}">
        <div class="title-order">
            Delivery date: <div class="delivery-data">${dateString}</div>
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
                        Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                     </div>
                    <button class="link-quantity js-update-product" data-product-id="${matchingProduct.id}">
                        Update
                    </button>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}" type="number">
                    <span class="link-quantity save-quantity" data-product-id="${matchingProduct.id}">Save</span>
                    <button class="link-quantity js-delete-product" data-product-id="${matchingProduct.id}">
                        Delete
                    </button>
                </div>
            </div>

            <div class="deadlines-data-order">
                <div class="deadline-title">
                    Choose a delivery option:
                </div>

                ${deliveryOptionsHTML(matchingProduct, cartItem)}

            </div>

        </div>

    </div>
    `;
});

function deliveryOptionsHTML(matchingProduct, cartItem) {

    let html = '';

    deliveryOptions.forEach((deliveryOption) => {

        const toDay = dayjs();
        const deliveryDate = toDay.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        const priceString = deliveryOption.priceCents === 0
            ? 'FREE'
            : `$${(deliveryOption.priceCents / 100).toFixed(2)} -`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html += `
        <div class="delivery-container" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
            <input class="delivery-input" type="radio" 
                ${isChecked ? 'checked' : ''}
            name="delivery-${matchingProduct.id}">
        
            <div class="delivery-data-shipping">
                <div class="delivery-data">
                    ${dateString}
                </div>
                <div class="delivery-shipping">
                    ${priceString} Shipping
                </div>
            </div>
        </div>
        `
    });
    return html;
}

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
            updateCartQuantity();
        } 
        
    });
});

export function updateCartQuantity() {
    const cartQuantity = calculateUpDateQuantity();
    document.querySelector('.items-link').innerHTML = `${cartQuantity} items`;
}
updateCartQuantity();


document.querySelectorAll('.js-update-product').forEach((link) => {
    link.addEventListener('click', () =>{
        const {productId} = link.dataset;
        const productOrder = document.querySelector(`.js-order-${productId}`);
        productOrder.classList.add('is-quantity');
    });
});


document.querySelectorAll('.save-quantity').forEach((link) => {
    function saveClick() {
        const {productId} = link.dataset;

            const inputQuantity = document.querySelector(`.js-quantity-input-${productId}`);
            const inPut = Number(inputQuantity.value);

            if (inPut < 0 || inPut >= 1000) {
                alert('Quantity must be at least 0 and less than 1000');
                return;
            }
            updateQuantityCart(productId, inPut);

            const productOrder = document.querySelector(`.js-order-${productId}`);
            productOrder.classList.remove('is-quantity');

            const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
            quantityLabel.innerHTML = inPut;

            updateCartQuantity();
    }
        link.addEventListener('click', () => {

        saveClick();
        
        });

        /*||
        link.addEventListener('keydown', (event) => {
            if (event.key === '13') {
                saveClick();
            }
        
        })*/
    
});

document.querySelectorAll('.delivery-container').forEach((element) => {
    element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
    });
});

