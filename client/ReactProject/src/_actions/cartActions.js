import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY,
  ADD_QUANTITY, ADD_SHIPPING, SET_LOADING, SET_ERROR,
  LOAD_STRIPE, SET_ADDRESS} 
  from '../_constants/cart.constants'

// add item to cart action
export const addToCart = (product, quantity, special_requirements) => {
  return {
    type: ADD_TO_CART,
    product,
    quantity,
    special_requirements,
  }
}

export const setAddress  = (address) => {
  return {
    type: SET_ADDRESS,
    address,
  }
}

// export const subtractQuantity

export const setLoading  = (loading) => {
  return {
    type: SET_LOADING,
    loading,
  }
}

export const setError  = (error) => {
  return {
    type: SET_ERROR,
    error,
  }
}

export const loadStripeAction = (stripe) => {
  return {
    type: LOAD_STRIPE,
    stripe: stripe,
  }
}