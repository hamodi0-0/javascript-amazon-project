export const cart = [

];

export function addToCart(productId){

  let matchingItem;

  let selectQuantity = document
  .querySelector(`.js-quantity-selector-${productId}`).value;

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
    quantity: Number(selectQuantity)
   });
 }

}