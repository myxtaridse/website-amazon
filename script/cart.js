export const cart = [{
    productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
    quantity: 4
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}, {
    productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
    quantity: 2
}];

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
            quantity
        });
    }
}