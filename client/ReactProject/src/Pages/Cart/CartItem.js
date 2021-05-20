import React, { useContext, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { Row, Col, Button, Input } from 'antd';
import {PlusOutlined, MinusOutlined, RestOutlined } from '@ant-design/icons';
import { formatNumber } from '../../_helpers/utils';
import { decreaseQuantity, increaseQuantity } from '../../_actions/cartActions'
import altImage from "../../_assets/Images/No_Image.jpg"

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
        <Col span={4} >
          <Row justify="left">
            <img alt={altImage} 
              src= {product.p_image_uri} 
              width="70%" height="70%"
            />
          </Row>
          <Row justify="left">
            <strong>{product.p_name}</strong>
          </Row>
        </Col>
        <Col span={4}>
          <div style={{textAlign: "center"}}>{formatNumber(product.unit_price)}</div>
        </Col>        
        <Col span={3}>
          <div style={{textAlign: "center"}}>{product.p_size}</div>
        </Col>
        <Col span={4}>
          <div style={{textAlign: "center"}}>  
            {
              editable &&
              <Button onClick={() => decrease()}
                shape="circle"
                icon={<MinusOutlined />}
                style={{color: "#EB6E00"}}
              />
            }

            &nbsp;
            <span>{quantityState}</span>
            &nbsp;
            
            {
              editable &&
              <Button onClick={() => increase()}
                shape="circle"
                icon={<PlusOutlined />}
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
