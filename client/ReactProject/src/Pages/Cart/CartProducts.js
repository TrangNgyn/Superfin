import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { CartContext } from '../../contexts/CartContext';
import CartItem from './CartItem';

const CartProducts = (props) => {
    const editable = props.editable

    const itemList = () => {
      var items = [];
      for(var i = 0; i < props.cartItems.length; i++){
        items.push(
          <CartItem key={props.cartItems[i].p_code} 
            product={props.cartItems[i]}
            quantity={props.quantity[i]} 
            editable={editable}
          />
        )
      }
      return items;
    }

    return (
      <div>
        {
          // props.cartItems.map(product => <CartItem key={product.id} product={product}/>)
          itemList()
        }
      </div>
    );
}

const mapStateToProps = (state)=>{
  return{
      cartItems: state.cartState.addedItems,
      quantity: state.cartState.quantity,
  }
}

export default connect(mapStateToProps)(CartProducts);
