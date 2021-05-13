import { 
  ADD_TO_CART, SET_LOADING, SET_ERROR, LOAD_STRIPE,
  SET_SHIPPING_INFO, INCREASE_QUANTITY, DECREASE_QUANTITY, CLEAR_CART,
} 
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

export const setShipping  = (address, email) => {
  return {
    type: SET_SHIPPING_INFO,
    address,
    email,
  }
}

export const increaseQuantity = (index) => {
  return {
    type: INCREASE_QUANTITY,
    index,
  }
}

export const decreaseQuantity = (index) => {
  return {
    type: DECREASE_QUANTITY,
    index,
  }
}

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  }
}


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