import React from 'react';
import ProductsGrid from './ProductsGrid';
import '../../../_assets/CSS/pages/Homepage/productPage.css';


const Store = () => {


    return (
      <div>
            <div id="products-page-header">Products</div>
            <div>
                <ProductsGrid/>
            </div>
      </div>
     );
}


export default Store;
