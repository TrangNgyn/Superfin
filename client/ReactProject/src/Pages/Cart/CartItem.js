import React, { useContext, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { Row, Col, Button, Input } from 'antd';
import {PlusOutlined, MinusOutlined, RestOutlined } from '@ant-design/icons';
import { formatNumber } from '../../_helpers/utils';
import { addQuantity, subtractQuantity } from '../../_actions/cartActions'

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

    return (
      <Row justify="space-around" align="middle">
        <Col span={6} >
          <Row justify="left">
            <img alt={"No Image Available"} 
              src= {product.p_image_uri} 
              width="80%" height="80%"
            />
          </Row>
          <Row justify="left">{product.p_name}</Row>
        </Col>
        <Col span={6}>
          <div style={{textAlign: "center"}}>{formatNumber(product.unit_price)}</div>
        </Col>
        
        <Col span={2}>
          <div style={{textAlign: "center"}}>{product.quantity}</div>
        </Col>
        <Col span={1}>
          <div style={{textAlign: "left"}}>  
            {
              editable &&
              <Button onClick={() => increase(props.product)}
                shape="circle"
                icon={<PlusOutlined />}
                style={{color: "#EB6E00"}}
              />
            }
            <br/>        
            {
              editable &&
              <Button onClick={() => decrease(props.product)}
                shape="circle"
                icon={<MinusOutlined />}
                style={{color: "#EB6E00"}}
              />
            }
          </div>
        </Col>
        <Col span={9} justify="right">
          <div 
            style={{
              textAlign: "right",
              paddingRight: "10px",
            }}
          >
            { product.special_requirements.length > 0 ? 
                <TextArea style={{width: 270}}
                  value={product.special_requirements}
                  rows={4}
                  maxLength={100}
                  autoSize={{ minRows: 4, maxRows: 4 }}
                />
              : <TextArea style={{width: 270}}
                  value={"N/A"}
                  rows={4}
                  maxLength={100}
                  autoSize={{ minRows: 4, maxRows: 4 }}
                />
              }
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