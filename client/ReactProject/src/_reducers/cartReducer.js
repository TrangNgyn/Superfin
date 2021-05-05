import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE
} from '../_constants/cart.constants'

const initialState = {
  item: {},
  addedItems:[],
  quantity: [],
  total: 0
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
            total : state.total + (addedItem.p_price * action.quantity)
        }
        
    }
  }
  else{
    return state
  }

}
export default cartReducer;