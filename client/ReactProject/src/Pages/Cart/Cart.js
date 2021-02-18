import '../../_assets/CSS/pages/Cart.css';
import { Typography, Button, Row, Col, InputNumber,Layout  } from 'antd';
import {DeleteFilled} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import img1 from "../../_assets/Images/Temp_Images/product_image_1.jpg"
import visa from "../../_assets/Images/visa.png"
import mastercard from "../../_assets/Images/mastercard.jpg"
import paypal from "../../_assets/Images/paypal.jpg"



const { Title } = Typography;
const { Sider, Content } = Layout;

const Cart = () =>{
      return(
        <body>

        <div id="cart-head">
        <Title level={3}>Shopping Cart</Title>
        </div>

        <div id="cart-content">

        <Layout>
        <Content style={{ background: '#fff',paddingRight: '2%'}}>
        <div id="cart-summary">
          <Row>
            <Col span={4}><div style={{fontWeight:"bold"}}>Product</div></Col>
            <Col span={5}><div style={{textAlign: "left",fontWeight:"bold"}}>Special Requirements</div></Col>
            <Col span={5}><div style={{textAlign: "center",fontWeight:"bold"}}>Price</div></Col>
            <Col span={5}><div style={{textAlign: "center",fontWeight:"bold"}}>Quantity</div></Col>
            <Col span={4}><div style={{textAlign: "right",paddingRight: "10px",fontWeight:"bold"}}>Total</div></Col>
          </Row>
          <Row justify="space-around" align="middle">
            <Col span={4}>
              <Row><img src={img1} width="100%" height="100%"/></Row>
              <Row>Brown Bag with Handles</Row>
              <Row>Unit:100</Row>
            </Col>
            <Col span={5}>Print cats on the bags</Col>
            <Col span={5}><div style={{textAlign: "center"}}>70.25</div></Col>
            <Col span={5}><div style={{textAlign: "center"}}><InputNumber defaultValue={1} size="small"/></div></Col>
            <Col span={4}><div style={{textAlign: "right",paddingRight: "10px"}}>225.30</div></Col>
            <Col span={1}><div style={{textAlign: "right"}}><Button type="text"><DeleteFilled /></Button></div></Col>
          </Row>
        </div>
        </Content>
        <Sider  width={300} style={{ background: 'lightgrey', padding:"10px",fontWeight:"bold" }} >
        <Row>
        <Col span={12}><div style={{textAlign: "left"}}>Subtotal:</div></Col>
        <Col span={12}><div style={{textAlign: "right"}}>$225.30</div></Col>
        </Row>
        <Row>
        <Col span={12}><div style={{textAlign: "left"}}>Freight charge:</div></Col>
        <Col span={12}><div style={{textAlign: "right"}}>$22.63</div></Col>
        </Row>
        <Row>
        <Col span={12}><div style={{textAlign: "left"}}>GST:</div></Col>
        <Col span={12}><div style={{textAlign: "right"}}>$16.8</div></Col>
        </Row>
        <Row gutter={[16, 18]}>
        <Col span={12}><div style={{textAlign: "left"}}>Total:</div></Col>
        <Col span={12}><div style={{textAlign: "right"}}>$264.73</div></Col>
        </Row>
        <Row gutter={[16, 18]} justify="space-around" align="middle">
        <Button type="primary"><Link to="/CheckoutShipping">CHECKOUT</Link></Button>
        </Row>
        <Row justify="space-around" align="middle">
        <img src={visa} width="30%"/>
        <img src={mastercard} width="30%" />
        <img src={paypal} width="30%"/>
        </Row>
        </Sider>
        </Layout>




        </div>
        </body>
      );

}

export default Cart
