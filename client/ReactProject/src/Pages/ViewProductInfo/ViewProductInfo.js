import '../../_assets/CSS/pages/ViewProductInfo.css';
import {Typography, Button, Row, Col, InputNumber, Input } from 'antd';
import { Link } from 'react-router-dom';
import img from "../../_assets/Images/Temp_Images/product_image_1.jpg"
import { createBrowserHistory } from 'history';
import axios from 'axios';
import { useState, useEffect } from 'react';

const history = createBrowserHistory();
const { Title } = Typography;
const { TextArea } = Input;


const getProducts = setProducts => {
    axios.post('api/products/product-by-id',{
      "p_code":"product_38"
    })
    .then(res => {
        console.log(res);
        setProducts(res.data);
    })
    .catch(err => {
        console.log(err);
    })

}

const ViewProductInfo = () =>{

    const [product, setProducts] = useState([]);
    useEffect(() => {
        getProducts(setProducts);
    }, []);
      return(
        <body>
        <div id="view-product-info">
        <Row justify="space-around" align="top" >
        <Col span={8}><img src={img} alt="product" width="100%" height="100%"/></Col>
        <Col span={8} style={{textAlign: "left",paddingTop: "5%"}}>
          <Row><Title level={3} >{JSON.stringify(product.p_name)}</Title></Row>
          <Row><Title level={3}>{JSON.stringify(product.p_price)}$</Title></Row>
          <Row><Title level={5}>Product Code: {JSON.stringify(product.p_code)}</Title></Row>
          <Row><Title level={5}>Description</Title></Row>
          <Row gutter={[0,24]}>{JSON.stringify(product.p_description)}</Row>
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
              <Button type="primary"><Link to={{pathname:"/Cart",state:"hihi"}}>Add to cart</Link></Button>
            </Col>
          </Row>
          </div>
        </Col>
        </Row>
        </div>


        </body>
      );

}

export default ViewProductInfo
