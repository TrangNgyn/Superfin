import React, { useContext, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { Row, Col } from 'antd';
import {PlusCircleOutlined, MinusCircleOutlined, RestOutlined } from '@ant-design/icons';
import { formatNumber } from '../../_helpers/utils';
import { addQuantity, subtractQuantity } from '../../_actions/cartActions'
import altImage from "../../_assets/Images/No_Image.jpg"

const CartItem = (props) => {

  const increase = (product) => {
    // props.increase(product)
  }

  const decrease = (product) => {
    // props.decrease(product);
  }

    return (
      <Row justify="space-around" align="middle">
        <Col span={6} >
          <Row justify="center">
            <img alt={altImage} src= {props.product.p_image_uri} width="80%" height="80%"/>
          </Row>
          <Row justify="center">{props.product.p_name}</Row>
        </Col>
        <Col span={6}>
          <div style={{textAlign: "center"}}>{formatNumber(props.product.p_price)}</div>
        </Col>
        <Col span={6}>
          <div style={{textAlign: "center"}}>{props.quantity}</div>
        </Col>
        <Col span={5}>
          <div style={{textAlign: "right",paddingRight: "10px"}}>
            {formatNumber(props.product.p_price*props.quantity)}
          </div>
        </Col>
        <Col span={1}>
        <div style={{textAlign: "right"}}>
          <button onClick={() => increase(props.product)}><PlusCircleOutlined /></button>
          {
            props.quantity > 1 &&
            <button onClick={() => decrease(props.product)}><MinusCircleOutlined /></button>
          }
          {/* {
            quantity === 1 &&
            <button onClick={() => removeProduct(product)}><RestOutlined /></button>
          } */}
        </div></Col>
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