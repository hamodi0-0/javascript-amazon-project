
  import {addToCart, cart} from '../data/cart.js'
  import {products,loadProducts, loadingProductsFetch} from '../data/products.js'
  import { formatCurrency } from './utils/money.js';
  import { calculateCartQuantity } from '../data/cart.js';
  
 // loadingProductsFetch(renderProductsGrid);
  renderProductsGrid();

  export  function updateCartQuantity(){

        let cartQuantity = calculateCartQuantity();

        document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
      }

  function renderProductsGrid(){

    let filteredProducts = products;
    const url = new URL(window.location.href);
    const search = url.searchParams.get('search');

    if(search){
      filteredProducts = products.filter((product)=>{
        const lowerCase = product.name.toLowerCase()
        const keywords = product.keywords;

        let result;
        keywords.forEach((word) => {
          if(word === search.toLowerCase()){
            result = true
            
          } 
        });
        

        return lowerCase.includes(search.toLowerCase()) || result;
      })
    }


    let productsHTML = '';

    filteredProducts.forEach((product)=>{
   productsHTML+= `
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
           ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector js-quantity-selector-${product.id}"
            data-product-id="${product.id}">
              <option selected value="1">1</option>
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
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `;
});

      document.querySelector('.js-products-grid')
      .innerHTML = productsHTML;


      

      updateCartQuantity();

      function displayAddedMessage(productId){

        let addedMessage = document
        .querySelector(`.added-to-cart-${productId}`);
        
        addedMessage.classList
          .add('style-added-message');

          let formerTimeoutId = timeOutIds[productId];

          if(formerTimeoutId){
            clearTimeout(formerTimeoutId);
          }

          let timeoutId = setTimeout(()=>{
          addedMessage.classList.remove('style-added-message');
         },2000)

         timeOutIds[productId] = timeoutId;
      }

      let timeOutIds ={};

      document.querySelectorAll('.js-add-to-cart')
      .forEach((button)=>{

        button.addEventListener('click',()=>{

          const productId = button.dataset.productId;

          displayAddedMessage(productId);

          addToCart(productId);

          updateCartQuantity();

        });
        
      });
    };

   
    document.querySelector('.js-search-button')
      .addEventListener('click',()=>{
       
        const searchBar = document.querySelector('.js-search-bar');

        window.location.href = `amazon.html?search=${searchBar.value}`;
       
      })