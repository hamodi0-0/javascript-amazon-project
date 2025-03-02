export let cart = JSON.parse(
  localStorage.getItem('cart')
) || [];

//loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(
    localStorage.getItem('cart')
  ) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId:'1'
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    deliveryOptionId:'2'
  }
  ];
  return cart
}

function selectingQuantity(productId){
  let selectQuantity = document.querySelector(`.js-quantity-selector-${productId}`).value;

  return selectQuantity
}

export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart))
}

export function addToCart(productId){

  let matchingItem;

  let selectQuantity = selectingQuantity(productId);

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

 saveToStorage();

}

export function removeFromCart(productId){

    const newCart = [];

    cart.forEach((cartItem)=>{
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });

    cart = newCart;

    saveToStorage();
}

 export function calculateCartQuantity(){

  let cartQuantity = 0;

  cart.forEach((cartItem)=>{
    cartQuantity+=cartItem.quantity
  })

  localStorage.setItem('cartQuantity',JSON.stringify(cartQuantity));

  return cartQuantity
}

export function updateQuantity(productId,newQuantity){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  matchingItem.quantity = newQuantity;
   saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem)=>{
   if(productId === cartItem.productId){
     matchingItem = cartItem;
   } 
  });

  matchingItem.deliveryOptionId = deliveryOptionId

  saveToStorage();
};

export async function loadCartFetch(){
   /*
  const xhr = new XMLHttpRequest;
  xhr.addEventListener('load', ()=>{
  console.log(xhr.response)

  fun();
  });
  xhr.open('GET', 'https://supersimplebackend.dev/cart')
  xhr.send();
   */
    const response = await fetch('https://supersimplebackend.dev/cart')
    const data = await response.text();
    
}