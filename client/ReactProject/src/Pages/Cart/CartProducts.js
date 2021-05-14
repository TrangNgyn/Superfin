import React from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';

const CartProducts = (props) => {
    const editable = props.editable

    const itemList = () => {
      var items = [];
      for(var i = 0; i < props.line_items.length; i++){
        items.push(
          <CartItem key={props.line_items[i].item_code} 
            product={props.line_items[i]}
            editable={editable}
          />
        )
      }
      return items;
    }

    return (<>{itemList()}</>);
}

const mapStateToProps = (state)=>{
  return{
      line_items: state.cartState.items,
  }
}

export default connect(mapStateToProps)(CartProducts);
