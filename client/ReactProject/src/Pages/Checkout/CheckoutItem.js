// import React, { useContext } from 'react';
// import { Row, Col} from 'antd';
// import {PlusCircleOutlined, MinusCircleOutlined, RestOutlined } from '@ant-design/icons';
// import { formatNumber } from '../../_helpers/utils';
// import altImage from "../../_assets/Images/No_Image.jpg"

// const CartItem = ({product}) => {

//     return (
//       <Row justify="space-around" align="middle">
//         <Col span={6}>
//           <Row justify="center">
//             <img alt={altImage} src= {product.p_image_uri} width="80%" height="80%"/>
//           </Row>
//           <Row justify="center">{product.p_name}</Row>
//         </Col>
//         <Col span={6}>
//           <div style={{textAlign: "center"}}>{formatNumber(product.p_price)}</div>
//         </Col>
//         <Col span={6}>
//           <div style={{textAlign: "center"}}>{product.quantity}</div>
//         </Col>
//         <Col span={6}>
//           <div style={{textAlign: "right",paddingRight: "10px"}}>
//             {formatNumber(product.p_price*product.quantity)}
//           </div>
//         </Col>
//       </Row>
// )}

// export default CartItem;
