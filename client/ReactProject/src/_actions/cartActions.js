import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY,
  ADD_QUANTITY, ADD_SHIPPING} from '../_constants/cart.constants'

// add item to cart action
export const addToCart= (product, quantity)=>{
  return{
    type: ADD_TO_CART,
    product,
    quantity
  }
}

