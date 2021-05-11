import {
  ADD_TO_CART,
  SET_ADDRESS,
  SET_LOADING,
  SET_ERROR,
  LOAD_STRIPE
} from '../_constants/cart.constants'

const initialState = {
  item: {},
  addedItems:[],
  items: [], // array of {price_id, quantity, item_code, special_requirements}
  total: 0,
  address: {},
  loading: false,
  error: null,
  stripe: null,
}

const cartReducer= (state = initialState, action)=>{
    
  //INSIDE PRODUCT COMPONENT
  if(action.type === ADD_TO_CART){
    let addedItem = action.product
    
    //check if the action id exists in the addedItems
    let existed_item = state.addedItems.find(item => action.product.p_code === item.p_code)
    
    if(existed_item)
    {
      // update current quantity and requirements of the existing item
      const i = state.addedItems
                    .map(function(p) { return p.p_code; }).indexOf(existed_item.p_code);
                    
      state.items[i].quantity += action.quantity;
      state.items[i].special_requirements = action.special_requirements;
      
      return{
          ...state,
          total: state.total + (addedItem.p_price * action.quantity)
      }
    }
    else{        
        return{
            ...state,
            addedItems: [...state.addedItems, addedItem],
            items: [...state.items, 
              {
                price_id: addedItem.p_price_id,
                quantity: action.quantity,
                item_code: addedItem.p_code,
                special_requirements: action.special_requirements,
              }
            ],            
            total : state.total + (addedItem.p_price * action.quantity)
        }
        
    }
  }
  else if(action.type === SET_ADDRESS){
    return { ...state, address: action.address };
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