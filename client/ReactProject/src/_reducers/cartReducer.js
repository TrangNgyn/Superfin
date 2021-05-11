import {
  ADD_TO_CART,
  SET_LOADING,
  SET_ERROR,
  LOAD_STRIPE
} from '../_constants/cart.constants'

const initialState = {
  item: {},
  addedItems:[],
  quantity: [],
  line_items: [], // array of {price_id, quantity}
  total: 0,
  loading: false,
  error: null,
  stripe: null,
}

const cartReducer= (state = initialState, action)=>{
    
  //INSIDE PRODUCT COMPONENT
  if(action.type === ADD_TO_CART){
    let addedItem = action.product
    
    //check if the action id exists in the addedItems
    let existed_item = state.addedItems.find(item=> action.product.p_code === item.p_code)
    
    if(existed_item)
    {
      const i = state.addedItems
                    .map(function(p) { return p.p_code; }).indexOf(existed_item.p_code);
      state.quantity[i] += action.quantity;
      state.line_items[i].quantity += action.quantity;
      
      return{
          ...state,
          total: state.total + (addedItem.p_price * action.quantity)
      }
    }
    else{
        //addedItem.quantity = action.quantity;
        //calculating the total
        // let newTotal = state.total + (addedItem.price * action.quantity)
        
        return{
            ...state,
            addedItems: [...state.addedItems, addedItem],
            quantity: [...state.quantity, action.quantity],
            line_items: [...state.line_items, 
              {
                price_id: addedItem.p_price_id,
                quantity: action.quantity,
              }
            ],            
            total : state.total + (addedItem.p_price * action.quantity)
        }
        
    }
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