import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';

const CartProducts = (props) => {
    const editable = props.editable
    
    const itemList = () => {
      var items = [];
      for(var i = 0; i < props.line_items.length; i++){
        items.push(
          <>
            <br/>
            <CartItem 
              key={props.line_items[i]}
              product={props.line_items[i]}
              editable={editable}
              index={i}
            />
          </>
        )
      }
      return items;
    }

    return (
      <div>
        {
          itemList()
        }
      </div>
    );
}

const mapStateToProps = (state)=>{
  return{
    line_items: state.cartState.items,
    total: state.cartState.total,
  }
}

export default connect(mapStateToProps)(CartProducts);
