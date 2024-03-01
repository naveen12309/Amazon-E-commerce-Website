import {cart} from "../data/CART.JS"
import { products } from "../data/products.js"
import { deliveryOptions } from "../data/deliveryOptions.js";



export function renderPaymentSummary(){

  let totalPriceCents = 0;
  let shippingPriceCents = 0;
  let TotalQuantity=0;

  cart.forEach((cartIteam)=>{
     TotalQuantity += cartIteam.quantity;


    //---for totalpriceCents--------------
    let matchingIteam;
    const productId = cartIteam.productId;
    
    products.forEach((product)=>{
      if(product.id === productId){
        matchingIteam = product;  
      }
    })
    totalPriceCents+=matchingIteam.priceCents*cartIteam.quantity; 
    
    //-----------calculating totaldeiverycharges
    let deliveryOption;
    deliveryOptions.forEach((option)=>{
      if(option.id === cartIteam.deliveryOptionId){
        deliveryOption = option
        console.log()
      }  
    })
    shippingPriceCents+=deliveryOption.priceCents
  })
  //--------total beforetax--------
  const totalBeforeTax = totalPriceCents+shippingPriceCents;
  //------ tax cents for totalamount 
  const TaxCents = (totalBeforeTax*10)/100;

  //------tax ordertotal-----------------------
  const orderTotal = totalBeforeTax+TaxCents



  console.log(totalPriceCents);
  console.log(shippingPriceCents); 
  console.log(totalBeforeTax);
  console.log(TaxCents);
  console.log(orderTotal);

  const html = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${TotalQuantity}):</div>
            <div class="payment-summary-money">$${(Math.round(totalPriceCents)/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(Math.round(shippingPriceCents)/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(Math.round(totalBeforeTax)/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(Math.round(TaxCents)/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(Math.round(orderTotal)/100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary " >
            Place your order
          </button>
  `
  

  document.querySelector('.js-payment-summary').innerHTML = html;

  

}



