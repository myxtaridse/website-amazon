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
</div>`
});

document.querySelector('.grid-container').innerHTML = productsHTML;

document.querySelectorAll('.add-to-cart').forEach((button) =>{
    button.addEventListener('click', () =>{
        const productId = button.dataset.productId;
        let matchingItem;
        cart.forEach((item) =>{
            if (productId === item.productId) {
                matchingItem = item;
            }
        });
        if (matchingItem) {
            matchingItem.quantity += 1;
        } else {
            cart.push({
                productId: productId,
                quantity: 1
            });
        }
        let cartQuantity = 0;
        cart.forEach((item) =>{
            cartQuantity += item.quantity;
        });
        document.querySelector('.cart-quantity').innerHTML = cartQuantity;
    });
});