import {cart} from "../data/CART.JS"
import { products } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

const today = dayjs();
const orderday = today.format('MMMM D')

//---to get products from cart finging matching item in products
let iteam='';
let matchingingItem;
cart.forEach((cartItem)=>{
  let totalCost=0;
  const productId = cartItem.productId;
  products.forEach((product)=>{
    if(product.id === productId){
      matchingingItem = product;
    }
  
  })
   

  
  


  let deliveryDay;
  deliveryOptions.forEach((option)=>{
    if(option.id === cartItem.deliveryOptionId){
      deliveryDay = option
    } 

  });

  //-----totalprice = productprice+deliverycharges
  totalCost += ((matchingingItem.priceCents*cartItem.quantity)+deliveryDay.priceCents)
  console.log(totalCost)

  
  //-----to find delivarydate
  const deliveryDate = today.add(deliveryDay.deliveryDays,'days')
  console.log(deliveryDate)
  const deliveryday = deliveryDate.format(' dddd, MMMM D');

  

  




  iteam+=
  `
        <div class="order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderday}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${(Math.round(totalCost)/100).toFixed(2)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${matchingingItem.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${matchingingItem.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingingItem.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${deliveryday}
              </div>
              <div class="product-quantity">
                Quantity: ${cartItem.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>
        </div>
    
  `
  document.querySelector('.js-orders').innerHTML= iteam

})
