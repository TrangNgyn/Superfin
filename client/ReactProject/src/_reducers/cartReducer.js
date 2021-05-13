/*
  Author: Trang Nguyen
  Notes: This file contains the reducer for all cart actions.
    such as add-to-cart, clear cart, etc.
*/

import {
  ADD_TO_CART,
  SET_SHIPPING_INFO,
  SET_LOADING,
  SET_ERROR,
  LOAD_STRIPE
} from '../_constants/cart.constants'

// initial state of address
const address_init = {
  po_attention_to: "",
  po_address_line1: "",
  po_address_line2: "",
  po_suburb: "Sydney",
  po_state: "NSW",
  po_postcode: 2000,
}

// the cart's initial state
const initialState = {
  items: JSON.parse(localStorage.getItem("items")) || [],// array of {item_code, price_id (for stripe), unit_price, 
                                                         //   quantity, special_requirements, image_uri[]}
  total: JSON.parse(localStorage.getItem("total")) || 0, // order total
  address: JSON.parse(localStorage.getItem("address")) || address_init, // shipping address
  c_email: JSON.parse(localStorage.getItem("email")) || "", // user email         
  loading: false,    // page's loading state
  error: null,       // if an error is returned
  stripe: null,      // stripe session id
}

// cart reducer that performs different actions depending on action.type
const cartReducer= (state = initialState, action)=>{
    
  //INSIDE PRODUCT COMPONENT
  if(action.type === ADD_TO_CART){
    let addedItem = action.product;
    let newTotal = state.total + (addedItem.p_price * action.quantity);

    // check if the action id exists in the addedItems
    // or if the item exists but the special requirements are different
    // by returning its index (if not exists then return -1)
    const i = state.items
      .findIndex(p =>
        p.item_code === addedItem.p_code 
          && p.special_requirements === action.special_requirements
      );
    
    if(i !== -1) // if item's already existed
    {
      // update current quantity and requirements of the existing item                    
      state.items[i].quantity += action.quantity;

      // return the cart state with updated total and item's quantity
      return{
        ...state,
        total: newTotal,
      }
    }
    else{     
      // return cart state with updated item list and total      
      return{
        ...state,
        items: [...state.items, 
          {
            item_code: addedItem.p_code,
            price_id: addedItem.p_price_id,
            unit_price: addedItem.p_price,
            quantity: action.quantity,
            special_requirements: action.special_requirements,
            p_image_uri: addedItem.p_image_uri[0],
          }
        ],            
        total : newTotal
      }
    }
  }
  else if(action.type === SET_SHIPPING_INFO){
    return { ...state, address: action.address, c_email: action.email };
  }
  else if(action.type === SET_LOADING){
    return { ...state, loading: action.loading };
  }
  else if(action.type === SET_ERROR){
    return {...state, error: action.error};
  }
  else if (action.type === LOAD_STRIPE){
    return {...state, stripe: action.stripe}
  }
  else{
    return state
  }

}
export default cartReducer;