import React, { useContext, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { Row, Col } from 'antd';
import {PlusCircleOutlined, MinusCircleOutlined, RestOutlined } from '@ant-design/icons';
import { formatNumber } from '../../_helpers/utils';
import { addQuantity, subtractQuantity } from '../../_actions/cartActions'
import altImage from "../../_assets/Images/No_Image.jpg"

const CartItem = (props) => {
  const editable = props.editable;

  const increase = (product) => {
    // props.increase(product)
  }

  const decrease = (product) => {
    // props.decrease(product);
  }

    return (
      <Row justify="space-around" align="middle">
        <Col span={6} >
          <Row justify="left">
            <img alt={altImage} src= {props.product.p_image_uri} width="80%" height="80%"/>
          </Row>
          <Row justify="left">{props.product.p_name}</Row>
        </Col>
        <Col span={6}>
          <div style={{textAlign: "center"}}>{formatNumber(props.product.p_price)}</div>
        </Col>
        
        <Col span={5}>
          <div style={{textAlign: "center"}}>{props.quantity}</div>
        </Col>
        <Col span={1}>
          <div style={{textAlign: "left"}}>  
            {
              editable &&
              <button onClick={() => increase(props.product)}><PlusCircleOutlined /></button>
            }        
            {
              editable &&
              <button onClick={() => decrease(props.product)}><MinusCircleOutlined /></button>
            }
          </div>
        </Col>
        <Col span={6} justify="right">
          <div 
            style={{
              textAlign: "right",
              paddingRight: "10px",
            }}
          >
            {props.special_requirements}
          </div>
        </Col>
      </Row>
)}

// const mapDispatchToProps= (dispatch)=>{
//   return{
//      decrease: (product) => {dispatch(subtractQuantity(product))},
//      increase: (product) => {dispatch(addQuantity(product))},
//   }
// }

// export default connect(null, mapDispatchToProps)(CartItem);

export default CartItem;