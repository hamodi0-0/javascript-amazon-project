import { orders } from "../data/addOrder.js";
import { addToCart, saveToStorage,cart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { getProduct } from "../data/products.js";
import { products }  from "../data/products.js" ;
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";

function findProduct(order){

  const orderId = order.id; 
  let productsHTML = '';  
  let matchingProduct;

    order.products.forEach((product)=>{
  
    let productId = product.productId;

    matchingProduct = getProduct(productId);

    const date = new Date(product.estimatedDeliveryTime);

    productsHTML+=`
    <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${date.toDateString()}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              
              <button class="buy-again-button button-primary js-buy-again-button"
              data-product-id="${productId}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${orderId}&productId=${productId}">
                <button class="track-package-button button-secondary js-track-package-button"
                data-product-id="${productId}"
                data-order-id="${orderId}">
                  Track package
                </button>
              </a>
            </div>
            `
  })
  
  document.querySelector(`.js-order-details-grid-${orderId}`)
    .innerHTML = productsHTML;
}


let orderPageHTML = '';

orders.forEach((order) => {

  const orderId = order.id; 

  const date = new Date(order.orderTime);


   orderPageHTML+= `
   <div class="order-container js-order-container-${orderId}">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${date.toDateString()}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${(order.totalCostCents)/100}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderId}</div>
            </div>
          </div>

                <div class="order-details-grid js-order-details-grid-${orderId}"></div>
          </div>
        </div>`   
});
        document.querySelector('.js-orders-grid')
            .innerHTML = orderPageHTML;

      orders.forEach((order)=>{
        findProduct(order)
      })            

      document.querySelectorAll('.js-buy-again-button')
        .forEach((button)=>{
          
          button.addEventListener('click',()=>{
            const productId = button.dataset.productId;

            console.log(productId)
            let matchingItem;

            let selectQuantity = '1';
          
            cart.forEach((cartItem)=>{
             if(productId === cartItem.productId){
               matchingItem = cartItem;
             } 
            });
            if(matchingItem){
              
             matchingItem.quantity+=Number(selectQuantity);
            }else{
              
             cart.push({
              productId,
              quantity: Number(selectQuantity),
              deliveryOptionId: '1'
             });
           }
           
           saveToStorage()
           
           let cartQuantity = calculateCartQuantity();
            document.querySelector('.js-cart-quantity')
            .innerHTML = cartQuantity;
          })
        })

        let cartQuantity = calculateCartQuantity();
            document.querySelector('.js-cart-quantity')
            .innerHTML = cartQuantity;
