import {cart} from "../cart.js";
import {getProduct} from "../data.js";
import {getDeliveryOption} from "../deliveryOptions.js";
import {formatCurrency} from "../cents.js";

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;
        
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });
    console.log(productPriceCents);
    console.log(shippingPriceCents);

    const totalBeforeTaxCents = shippingPriceCents + productPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = taxCents + totalBeforeTaxCents;
    console.log(taxCents);

    const paymentSummaryHTML = `
        
            <div class="title-summary">Order Summary</div>

            <div class="row-summary">
                <div>Items (0):</div>
                <div class="money-summary">$${formatCurrency(productPriceCents)}</div>
            </div>

            <div class="row-summary">
                <div>Shipping & handling:</div>
                <div class="money-summary container-border">$${formatCurrency(shippingPriceCents)}</div>
            </div>

            <div class="row-summary">
                <div>Total before tax:</div>
                <div class="money-summary">$${formatCurrency(totalBeforeTaxCents)}</div>
            </div>

            <div class="row-summary">
                <div>Estimated tax (10%):</div>
                <div class="money-summary">$${formatCurrency(taxCents)}</div>
            </div>
        
            <div class="row-summary row-total">
                <div>Order total:</div>
                <div class="money-summary">$${formatCurrency(totalCents)}</div>
            </div>

            <div class="paypal-container">
                Use PayPal <input type="checkbox" class="toggle-check">
            </div>

            <div class="container-execution">
                <button class="button-execution">Place your order</button>
            </div>

    `;
    document.querySelector('.right-container-main').innerHTML = paymentSummaryHTML;
    
}
