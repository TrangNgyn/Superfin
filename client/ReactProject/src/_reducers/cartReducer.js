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
  LOAD_STRIPE,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  REMOVE_ITEMS,
  CLEAR_CART,
  UPDATE_ITEM_INFO,
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
  total: 0, // order total
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
          && p.p_size === action.p_size
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
            p_size: action.p_size,
            quantity: action.quantity,
            special_requirements: action.special_requirements,
          }
        ],            
        total : newTotal
      }
    }
  }
  else if(action.type === INCREASE_QUANTITY){
    const i = action.index;

    // update new quantity
    state.items[i].quantity += 1;

    // calc new total
    const newTotal = state.total + state.items[i].unit_price;

    return {...state, total: newTotal};
  }
  else if(action.type === DECREASE_QUANTITY){
    const i = action.index;

    // decrease the quantity by 1
    state.items[i].quantity -= 1;

    // calc new total
    const newTotal = state.total - state.items[i].unit_price;

    // remove of item list if quantity = 0
    if(state.items[i].quantity === 0){
      state.items.splice(i, 1);
    }

    return {...state, total: newTotal};
  }
  else if(action.type === REMOVE_ITEMS){
    let newItems = state.items;
    action.invalid_pcodes.forEach(invalid => {
      // remove items that are in invalid_pcodes
      newItems = state.items.filter(item =>
        (item.item_code !== invalid.item_code && item.p_size !== invalid.p_size)
      );
    });  
    
    // calc new total
    let newTotal = 0;
    state.items.forEach(item => {
      newTotal += item.quantity * item.unit_price;
    });

    return {...state, items: newItems, total: newTotal};

  }
  else if(action.type === CLEAR_CART){
    return{
      ...state,
      total: 0,
      items: [],
      address: address_init,
      c_email: "",
    };

  }
  else if(action.type === UPDATE_ITEM_INFO){
    // set item info for each item in cart
    action.items.forEach(item => {
      // get the item index
      state.items
        .filter(i => i.item_code === item.p_code)
        .forEach((element, index) => {

          // add updated info on item
          state.items[index].p_name = item.p_name;
          state.items[index].price_id = item.p_price_id;
          state.items[index].unit_price = item.p_price;
          state.items[index].p_image_uri = item.p_image_uri[0];

        });      
    });

    // calc new total
    let newTotal = 0;
    state.items.forEach(item => {
      newTotal += item.quantity * item.unit_price;
    });

    console.log({total: newTotal})

    return {...state, total: newTotal};
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