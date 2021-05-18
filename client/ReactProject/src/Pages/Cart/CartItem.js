import React, { useContext, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { Button, Input } from 'antd';
import {PlusOutlined, MinusOutlined, RestOutlined } from '@ant-design/icons';
import { formatNumber } from '../../_helpers/utils';
import { decreaseQuantity, increaseQuantity } from '../../_actions/cartActions'
import placeholderImg from '../../_assets/Images/No_Image.jpg';

const { TextArea } = Input;

const CartItem = (props) => {
  // getting the props values
  const editable = props.editable;
  const product = props.product;
  const index = props.index;

  const [quantityState, setQuantityState] = useState(product.quantity);

  const increase = () => {
    // update the quantity displayed
    setQuantityState(quantityState + 1);

    // update site's state
    props.increase(index);
  }

  const decrease = () => {
    // update the displayed quantity
    setQuantityState(quantityState - 1);

    // update the site's state
    props.decrease(index);
    
  }

  return (
    <tr>
        <td>
            <img alt={(product.item_code === undefined || (product.item_code !== undefined && product.item_code.length === 0)) ? "image of paper bag" : product.item_code + "\'s image"}
            src= {(product.p_image_uri === null || (product.p_image_uri !== null && product.p_image_uri.length === 0)) ? placeholderImg : product.p_image_uri} height="160px" width="120px" style={{objectFit:'scale-down'}}/>
        </td>
        <td>{formatNumber(product.unit_price)}</td> 
        <td>
            { editable &&
                <Button onClick={() => increase()}
                icon={<PlusOutlined />} type="primary"/>
            }<br/>
            {quantityState}
            <br/>{ editable &&
                <Button onClick={() => decrease()}
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

const mapDispatchToProps= (dispatch)=>{
  return{
    increase: (index) => {dispatch(increaseQuantity(index))},
    decrease: (index) => {dispatch(decreaseQuantity(index))},
  }
}

export default connect(null, mapDispatchToProps)(CartItem);
