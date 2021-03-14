import '../../_assets/CSS/pages/ViewProductInfo.css';
import {Typography, Button, Row, Col, InputNumber, Input } from 'antd';
import { Link } from 'react-router-dom';
import img from "../../_assets/Images/Temp_Images/product_image_1.jpg"



const { Title } = Typography;
const { TextArea } = Input;


const CheckoutReviewOrder = () =>{
      return(
        <body>
        <div id="view-product-info">
        <Row justify="space-around" align="top" >
        <Col span={8}><img src={img} alt="product" width="100%" height="100%"/></Col>
        <Col span={8} style={{textAlign: "left",paddingTop: "5%"}}>
          <Row><Title level={3} >Brown Bag with Handles</Title></Row>
          <Row><Title level={3}>$5.00</Title></Row>
          <Row><Title level={5}>Product Code: G397</Title></Row>
          <Row><Title level={5}>Description</Title></Row>
          <Row gutter={[0,24]}>Brown paper bag with handles. Comes in small, medium and large sizes. Sold individually. Please enquire for details on custom prints. Perfect for catering events, gifts and small business needs. Strurdy and hard to break. Do not get wet, and please recycle.</Row>
          <Row><Button type="primary"><Link to="/ContactUs">Enquire</Link></Button> Click here to enquire for more information</Row>

        </Col>
        <Col span={8} style={{textAlign: "left",paddingTop: "5%"}}>
        <div id="add-to-cart">
          <Row gutter={[0,24]}>
          <Col span={12}>Quantity</Col>
          <Col span={12}><InputNumber defaultValue={1} size="small"/></Col>
          </Row>
          <Row gutter={[0,24]}>
          <Col span={12}>Special Requirements (100 words)</Col>
          <Col span={12}><TextArea rows={4} /></Col>
          </Row>
          <Row>
            <Col offset={12}>
              <Button type="primary"><Link to="/Cart">Add to cart</Link></Button>
            </Col>
          </Row>
          </div>
        </Col>
        </Row>
        </div>


        </body>
      );

}

export default CheckoutReviewOrder
