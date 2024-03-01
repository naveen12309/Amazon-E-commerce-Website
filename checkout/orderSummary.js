import {cart,removeCart,updateQuantity,saveToStorage,updateDeliveryOption} from "../data/CART.JS"
import{products} from "../data/products.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";


export function renderOrderSummary(){
  let matchingItem;
  let cartSummary=''
  cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    products.forEach((product) =>{
      if(product.id ===productId ){
        matchingItem = product
      }
    })
    let deliveryOption;
    deliveryOptions.forEach((option)=>{
      if(option.id === cartItem.deliveryOptionId){
        deliveryOption = option;
      }
    });
    //console.log(matchingItem)
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    const day = deliveryDate.format('dddd, MMMM D')

    cartSummary+=`
    <div class="cart-item-container js-cart-item-container-${matchingItem.id} js-remove-cart-${matchingItem.id}">
      <div class="delivery-date">
        Delivery date: ${day}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingItem.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-price">
            $${(matchingItem.priceCents/100).toFixed(2)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label new-quntity-${matchingItem.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-cart" data-product-Id="${matchingItem.id}">
              Update
            </span>
            <input class="quantity-input js-input-save-${matchingItem.id} ">
            <span class="save-quantity-link link-primary js-save-link " data-save-Id="${matchingItem.id}">
              Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-cart" data-product-id="${matchingItem.id}"                                               >
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingItem,cartItem)}
        </div>
      </div>
  </div>`
  });


  document.querySelector('.js-cart-Summary').innerHTML = cartSummary;

  //-----------------radio---------------
  function deliveryOptionsHTML(matchingItem,cartIteam){
    let html='';
    
    deliveryOptions.forEach((deliveryOption)=>{
      const today = dayjs();

      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
      const date = deliveryDate.format('dddd, MMMM D');

      const priceString = deliveryOption.priceCents === 0 ? 'FREE': `$${(deliveryOption.priceCents/100).toFixed(2)} -`

      const isChecked = deliveryOption.id === cartIteam.deliveryOptionId;


      html+=`
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingItem.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" class="delivery-option-input"
          ${isChecked ?'checked':''}
          name="delivery-option-${matchingItem.id}">
        <div>
          <div class="delivery-option-date">
          ${date} 
          </div>
          <div class="delivery-option-price">
            ${priceString}  Shipping
          </div>
        </div>
      </div>`

    });
    return html
    
  }
  


  // --------------------delete option ----------------
  document.querySelectorAll('.js-delete-cart').forEach((link)=>{
    link.addEventListener('click',() =>{
      const productId = link.dataset.productId
      removeCart(productId);

      document.querySelector(`.js-remove-cart-${productId}`).remove();

      saveToStorage();
      renderOrderSummary();
      renderPaymentSummary();
    })  
  })




  //--------------update----------------------
  document.querySelectorAll('.js-update-cart').forEach((cartItem)=>{
    cartItem.addEventListener('click',()=>{
      const productId = cartItem.dataset.productId;
      console.log(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add('is-editing-quantity');
      
    })
  });

  //--------------save/input--------------------------
  document.querySelectorAll('.js-save-link').forEach((link)=>{
    link.addEventListener('click',()=>{
      const saveId = link.dataset.saveId;

      const container = document.querySelector(
        `.js-cart-item-container-${saveId}`
      );
      container.classList.remove('is-editing-quantity');

      const inputValue=document.querySelector(`.js-input-save-${saveId}`);
      const cartQuantity = Number(inputValue.value);


      updateQuantity(saveId, cartQuantity);

      document.querySelector(`.new-quntity-${saveId}`).innerHTML = cartQuantity;
      
      document.querySelector('.js-checkout-quantity').innerHTML = `Checkout (<a class="return-to-home-link"
          href="amazon.html">${cartQuantity}</a>)`;
     
      renderPaymentSummary();
    });
  });


  //-----checkout box--------------
  let cartQuantity = 0;
  cart.forEach((iteam) =>{
    
    cartQuantity+=iteam.quantity
  });
  console.log(cartQuantity)
  document.querySelector('.js-checkout-quantity').innerHTML = `Checkout (<a class="return-to-home-link"
  href="amazon.html">${cartQuantity}</a>)`;
  
  console.log(cart);


  //------ update-delivery option-------------------------
  document.querySelectorAll('.js-delivery-option')
  .forEach((element)=>{
    element.addEventListener('click',()=>{
      const productId = element.dataset.productId;
      
      const deliveryOptionId = element.dataset.deliveryOptionId
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
      
    });
  });
}


