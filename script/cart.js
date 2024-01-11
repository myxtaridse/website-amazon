
export let cart = JSON.parse(localStorage.getItem('cart'));


if (!cart) {
    cart = [{
        productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity: 4,
        deliveryOptionId: '1',

    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2',
    }, {
        productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
        quantity: 2,
        deliveryOptionId: '3',
    }];
}
    
function saveOrders() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem;
    cart.forEach((cartItem) =>{
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value);
    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            /*
                productId: productId,
                quantity: quantity
            *///сократили
            productId,
            quantity,
            deliveryOptionId: '1'
        });
    }
    
    saveOrders();
}




export function removeProduct(productId) {
//функция возьмет идентификатор продукта и удалить его из корзины
    const newCart = []; 
    //в корзине останутся продукты кроме того, которого мы выбрали, нажав Delete
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveOrders();
}

export function calculateUpDateQuantity() {
    let cartQuantity = 0;
        cart.forEach((cartItem) =>{
            cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
}

export function updateQuantityCart(productId, inPut) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    matchingItem.quantity = inPut;
    saveOrders();
}