import React from 'react';
import { Button } from 'antd';

const ProductItem = ({product}) => {
    return (

      <div id="product-container">
          <img id="product-image"
              src= {product.p_image_uri}
              alt={product.p_name}
              style={{height: '310px', width:'310px'}}
          />

          <table id="product-text-container" className="center-content">
              <tbody>
                  <tr>
                      <td>Product Code: {product.p_code}</td>
                  </tr>
                  <tr>
                      <td>Product Name: {product.p_name}</td>
                  </tr>
                  <tr>
                      <td>Unit Price: ${product.p_price}</td>
                  </tr>
              </tbody>
          </table>
      </div>

    );
}

export default ProductItem;
