import React, { useContext, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { Button, Input } from 'antd';
import {PlusOutlined, MinusOutlined, RestOutlined } from '@ant-design/icons';
import { formatNumber } from '../../_helpers/utils';
import { addQuantity, subtractQuantity } from '../../_actions/cartActions'
import placeholderImg from '../../_assets/Images/No_Image.jpg';

const { TextArea } = Input;

const CartItem = (props) => {
  const editable = props.editable;
  const product = props.product;

  const increase = (product) => {
    // props.increase(product)
  }

  const decrease = (product) => {
    // props.decrease(product);
  }

  console.log(product)
  return (
    <tr>
        <td>
            <img alt={(product.item_code === undefined || (product.item_code !== undefined && product.item_code.length === 0)) ? "image of paper bag" : product.item_code + "\'s image"}
            src= {(product.p_image_uri === null || (product.p_image_uri !== null && product.p_image_uri.length === 0)) ? placeholderImg : product.p_image_uri} height="160px" width="120px" style={{objectFit:'scale-down'}}/>
        </td>
        <td>{formatNumber(product.unit_price)}</td> 
        <td>
            { editable &&
                <Button onClick={() => increase(props.product)}
                icon={<PlusOutlined />} type="primary"/>
            }<br/>
            {product.quantity}
            <br/>{ editable &&
                <Button onClick={() => decrease(props.product)}
                icon={<MinusOutlined />} type="secondary"/>
            }
        </td>
        <td>
          <TextArea placeholder="Please input any special requirements that you have here"
          rows={4} maxLength={100}
          autoSize={{ minRows: 4, maxRows: 4 }}
          value={(product.special_requirements === null || (product.special_requirements !== null && product.special_requirements.length === 0)) ? "" : product.special_requirements}></TextArea>
        </td>
    </tr>
  );
}

// const mapDispatchToProps= (dispatch)=>{
//   return{
//      decrease: (product) => {dispatch(subtractQuantity(product))},
//      increase: (product) => {dispatch(addQuantity(product))},
//   }
// }

// export default connect(null, mapDispatchToProps)(CartItem);

export default CartItem;