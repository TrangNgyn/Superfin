import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { Row, Col } from 'antd';
import {PlusCircleOutlined, MinusCircleOutlined, RestOutlined } from '@ant-design/icons';
import { formatNumber } from '../../_helpers/utils';

const CartItem = ({product}) => {

    const { increase, decrease, removeProduct } = useContext(CartContext);

    return (
      <Row justify="space-around" align="middle">
        <Col span={4}>
          <Row><img
          alt={product.name}
          style={{margin: "0 auto", maxHeight: "50px"}}
          src={product.photo} className="img-fluid d-block"/></Row>
          <Row>{product.name}</Row>
          <Row>Unit:100</Row>
        </Col>
        <Col span={5}>Print cats on the bags</Col>
        <Col span={5}><div style={{textAlign: "center"}}>{formatNumber(product.price)}</div></Col>
        <Col span={5}><div style={{textAlign: "center"}}>{product.quantity}</div></Col>
        <Col span={4}><div style={{textAlign: "right",paddingRight: "10px"}}>{formatNumber(product.price*product.quantity)}</div></Col>
        <Col span={1}>
        <div style={{textAlign: "right"}}>
          <button onClick={() => increase(product)}><PlusCircleOutlined /></button>
          {
            product.quantity > 1 &&
            <button onClick={() => decrease(product)}><MinusCircleOutlined /></button>
          }
          {
            product.quantity === 1 &&
            <button onClick={() => removeProduct(product)}><RestOutlined /></button>
          }
        </div></Col>
      </Row>
)}

export default CartItem;
