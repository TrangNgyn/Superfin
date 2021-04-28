import React, { useContext } from 'react';
import { CartContext } from '../../../contexts/CartContext';
import { Button } from 'antd';
import altImage from "../../../_assets/Images/No_Image.jpg"



const ProductItem = ({product}) => {

    const { addProduct, cartItems, increase } = useContext(CartContext);

    const isInCart = product => {
        return !!cartItems.find(item => item._id === product._id);
    }

    return (

      <div id="product-container">
          <img id="product-image"
              src= {product.p_image_uri}
              alt={altImage}
              style={{height: '310px', width:'310px'}}
          />

          <table id="product-text-container">
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

          <div id="product-icon-container">
          {
              isInCart(product) &&
              <Button type="primary"
              onClick={() => increase(product)} >Add more</Button>
          }
          {
              !isInCart(product) &&
              <Button type="primary"
              onClick={() => addProduct(product)}>Add to cart</Button>
          }
          </div>
      </div>


     );
}

export default ProductItem;
