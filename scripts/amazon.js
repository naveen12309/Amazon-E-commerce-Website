/*const products = [{
  image: "images/products/athletic-cotton-socks-6-pairs.jpg",
  name:"Black and Gray Athletic Cotton Socks - 6 Pairs",
  rating:{
    stars:4.5,
    count:87
  },
  priceCents:1090
},{
  image:"images/products/intermediate-composite-basketball.jpg",
  name:"Intermediate Size Basketball",
  rating:{
    stars:4,
    count:127
  },
  priceCents:2095
},{
  image:"images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
  name:" Adults Plain Cotton T-Shirt - 2 Pack",
  rating:{
    stars:4.5,
    counts:56,
  },
  priceCents:799

},
{
  image:"images/products/black-2-slot-toaster.jpg",
  name:"2 Slot Toaster - Black",
  rating:{
    stars:5,
    counts:2197
  },
  priceCents:1899
},{
  image:""
}];*/

import {cart,addToCart} from "../data/CART.JS";
import { products } from "../data/products.js";
let productsHtml = '';

products.forEach((product)=>{
  productsHtml += `<div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars*10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count} 
      </div>
    </div>

    <div class="product-price">
      $${(product.priceCents/100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}">
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

    <div class="product-spacer"></div>
    
    <div class="added-to-cart js-added-to-cart-${product.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>
    

    <button class="add-to-cart-button button-primary  js-add-to-cart" 
    data-product-id="${product.id}">
      Add to Cart
    </button>
  </div>`; 

});

//console.log(productsHtml)
document.querySelector('.js-products-grid').innerHTML = productsHtml;




function cartQuantity(productId){
  let cartQuantity=0;
      cart.forEach((iteam) =>{
        cartQuantity+=iteam.quantity
      });
      console.log(cartQuantity)
         
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
      console.log(cart);

      const message = document.querySelector(`.js-added-to-cart-${productId}`);
      message.classList.add('added-to-cart-visible');

      setTimeout(()=>{
        message.classList.remove('added-to-cart-visible');
      },2000)
}
// for add to cart  button
document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click',()=>{
      // data attribute from add to cart button
      const {productId}=button.dataset;
      
      addToCart(productId);

      cartQuantity(productId);
      //---calculating total quantity from cart array    
    });
  });

  
