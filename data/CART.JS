

export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart= [{
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:1,
    deliveryOptionId:'1'
  },
  {
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    deliveryOptionId:'2'
  }];
}


export function addToCart(productId){
  /*checking iteam already in cart or not if there it is added to 
     matchinIteam and increaing its quantity*/
     
     
     let matchingIteam;
     cart.forEach((iteam) =>{
       if(productId === iteam.productId){
         matchingIteam = iteam;

       }
     })
          //-----for select number of quntity--------
     const butt=document.querySelector(`.js-quantity-selector-${productId}`);
     const val = Number(butt.value);
          //------added---------------

     

     if(matchingIteam){
       matchingIteam.quantity+=val;
     }
     else{
       cart.push({
         productId,
         quantity:val,
         deliveryOptionId:'1'
       });
     }

     saveToStorage();
 
}

export function removeCart(productId){
  let newcart = []
    cart.forEach((cartItem)=>{
      if(productId !== cartItem.productId){
        newcart.push(cartItem)
      }
    })
    cart = newcart;
    console.log(cart) ; 
    saveToStorage();

}

export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function updateQuantity(productId,cartQuantity){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem
    }
  });
  matchingItem.quantity = cartQuantity;
  saveToStorage();
  
  

}


export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingIteam;
    cart.forEach((cartIteam)=>{
      if(cartIteam.productId === productId){
        matchingIteam = cartIteam;
      }
    });
      matchingIteam.deliveryOptionId = deliveryOptionId;
      saveToStorage();
}

