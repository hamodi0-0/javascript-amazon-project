import { calculateCartQuantity } from "../data/cart.js";
import { orders } from "../data/addOrder.js";
import { getProduct } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
/*
       
      
*/
const url = new URL(window.location.href);

const orderId = url.searchParams.get('orderId');

const productId = url.searchParams.get('productId');

function findMatchingProduct(){
  let matchingOrder;
  let matchingProduct;
  orders.forEach((order) => {
   
  
      if(order.id === orderId){
        matchingOrder = order;
      }
      
      matchingOrder.products.forEach((product)=>{
  
          if(product.productId === productId){
            matchingProduct = product;
          }
      });
      
    });

    const orderTime = dayjs(matchingOrder.orderTime);
    const date = dayjs(matchingProduct.estimatedDeliveryTime);
    const today = dayjs().add(2,'days')
    
    const deliveryPercenetage = ((today-orderTime)/(date-orderTime)) * 100;
    console.log(deliveryPercenetage)
     let matchingProductDetails = getProduct(productId);

      let trackingHTML = `
      <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${date.format('dddd DD, YYYY')}
        </div>

        <div class="product-info">
          ${matchingProductDetails.name}
        </div>

        <div class="product-info">
          Quantity: ${matchingProduct.quantity}
        </div>

        <img class="product-image" src="${matchingProductDetails.image}">

        <div class="progress-labels-container">
          <div class="progress-label js-preparing">
            Preparing
          </div>
          <div class="progress-label js-shipped">
            Shipped
          </div>
          <div class="progress-label js-delivered">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"
          style = "width: ${deliveryPercenetage}%;"></div>
        </div>`

          document.querySelector('.js-order-tracking')
            .innerHTML = trackingHTML

            if(deliveryPercenetage>=0 && deliveryPercenetage<=49){
              document.querySelector('.js-preparing').classList.add('current-status')
            } else if(deliveryPercenetage>=50 && deliveryPercenetage<=99){
              document.querySelector('.js-shipped').classList.add('current-status')
            } else if(deliveryPercenetage>=100){
              document.querySelector('.js-delivered').classList.add('current-status')
            }
   
}

findMatchingProduct()

let cartQuantity = calculateCartQuantity();
  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
