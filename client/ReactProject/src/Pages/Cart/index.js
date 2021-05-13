import React, { useContext } from 'react';
import {connect} from 'react-redux';
import CartProducts from './CartProducts';
import { formatNumber } from '../../_helpers/utils';
import '../../_assets/CSS/pages/Cart.css';
import { Typography, Button, Row, Col,Layout  } from 'antd';
import { Link } from 'react-router-dom';
import visa from "../../_assets/Images/visa.png"
import mastercard from "../../_assets/Images/mastercard.jpg"
import paypal from "../../_assets/Images/paypal.jpg"

const { Title } = Typography;
const { Sider, Content } = Layout;

const Cart = (props) =>{
  const itemCount = props.cartItems.length;

  const clearCart = () => {

  }
  
  return(
      <div>
        <div id="cart-head">
          <Title level={3}>Shopping Cart ({itemCount} items)</Title>
        </div>
        <div id="cart-content">
          <Layout>
            <Content style={{ background: '#fff',paddingRight: '2%'}}>
            <div id="cart-summary">
              <Row>
                <Col span={6}>
                  <div style={{fontWeight:"bold"}}>Product</div>
                </Col>
                <Col span={6}>
                  <div style={{textAlign: "center",fontWeight:"bold"}}>Unit Price</div>
                </Col>
                <Col span={3}>
                  <div style={{textAlign: "center",fontWeight:"bold"}}>Quantity</div>
                </Col>
                <Col span={9}>
                  <div 
                    style={{
                      textAlign: "left",
                      paddingLeft: "30px",
                      paddingRight: "10px",
                      fontWeight:"bold"
                    }}
                  >
                    Special Requirements
                  </div>
                </Col>
              </Row>
            </div>
            {
              itemCount > 0 ?
                <CartProducts editable={true} /> 
              :
                <div >
                  Your cart is empty
                </div>
            }
            </Content>
            <Sider  width={300} style={{ background: 'lightgrey', padding:"10px",fontWeight:"bold" }} >
              <Row>
                <Col span={12}>
                  <div style={{textAlign: "left"}}>Subtotal:</div>
                </Col>
                <Col span={12}>
                  <div style={{textAlign: "right"}}>{formatNumber(props.total)}</div>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <div style={{textAlign: "left"}}>Freight charge:</div>
                </Col>
                <Col span={12}>
                  <div style={{textAlign: "right"}}>{formatNumber(props.total*0.05)}</div>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <div style={{textAlign: "left"}}>GST:</div>
                </Col>
                <Col span={12}>
                  <div style={{textAlign: "right"}}>{formatNumber(props.total*0.01)}</div>
                </Col>
              </Row>
              <Row gutter={[16, 18]}>
                <Col span={12}>
                  <div style={{textAlign: "left"}}>Total:</div>
                </Col>
                <Col span={12}>
                  <div style={{textAlign: "right"}}>{formatNumber(props.total*1.06)}</div>
                </Col>
              </Row>

              <Row gutter={[16, 18]} justify="space-around" align="middle">
                {
                  itemCount > 0 ?
                    <Button type="primary">
                      <Link to="/CheckoutShipping">Checkout</Link>
                    </Button>
                  :
                    <Button type="primary" disabled>
                      <Link to="/CheckoutShipping">Checkout</Link>
                    </Button>
                }                
              </Row>

              <Row gutter={[16, 18]} justify="space-around" align="middle">
                {
                  itemCount > 0 ?
                    <Button type="text" onClick={clearCart}>Clear Cart</Button>
                  :
                    <Button type="text" disabled onClick={clearCart}>Clear Cart</Button>
                }
              </Row>

              <Row justify="space-around" align="middle">
                <img src={visa} alt="visa"width="30%"/>
                <img src={mastercard} alt="mastercard" width="30%" />
                <img src={paypal} alt="paypal" width="30%"/>
              </Row>
            </Sider>
          </Layout>

      </div>
    </div>
  );

}

const mapStateToProps = (state)=>{
  return{
      cartItems: state.cartState.items,
      total: state.cartState.total,
  }
}

export default connect(mapStateToProps)(Cart);
