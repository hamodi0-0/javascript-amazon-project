import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import "../data/van.js";
import { loadProducts, loadProductsFetch, products } from "../data/products.js";
import {  loadCartFetch, loadFromStorage } from "../data/cart.js";
//import '../data/backend-practice.js'
import { cart } from "../data/cart.js";


async function loadPage(){
  try {
    await Promise.all(
      [
        loadCartFetch(),
        loadProductsFetch()
        
      ]
    );       
  } catch(error){
    console.log('Unexpected error, skill issue')
  }
  
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage()

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })
]).then(()=>{
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
})

new Promise((resolve)=>{
  loadProducts(()=>{
    resolve()
  })

}).then(()=>{

  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })

}).then(()=>{
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});

loadProducts(()=>{
  loadCart(()=>{
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
    
  })
  
});
*/