import React, { useContext, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { Row, Col, Button, Input } from 'antd';
import {PlusOutlined, MinusOutlined, RestOutlined } from '@ant-design/icons';
import { formatNumber } from '../../_helpers/utils';
import { decreaseQuantity, increaseQuantity } from '../../_actions/cartActions'

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
          <div style={{textAlign: "center"}}>{quantityState}</div>
        </Col>
        <Col span={1}>
          <div style={{textAlign: "left"}}>  
            {
              editable &&
              <Button onClick={() => increase()}
                shape="circle"
                icon={<PlusOutlined />}
                style={{color: "#EB6E00"}}
              />
            }
            <br/> <br/>      
            {
              editable &&
              <Button onClick={() => decrease()}
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

const mapDispatchToProps= (dispatch)=>{
  return{
    increase: (index) => {dispatch(increaseQuantity(index))},
    decrease: (index) => {dispatch(decreaseQuantity(index))},
  }
}

export default connect(null, mapDispatchToProps)(CartItem);

// export default CartItem;