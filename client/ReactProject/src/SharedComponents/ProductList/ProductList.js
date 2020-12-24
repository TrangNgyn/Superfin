import React, { useState } from "react";
import Product from '../Product/Product';
import {fetchProducts} from '../ProductList/MockProductList';
import '../../_assets/CSS/layouts/ProductList.css';
import '../../_constants';
import { pageConstants } from "../../_constants";
import { Pagination } from 'antd';







const currentPage = pageConstants.HOMEPAGE_CUSTOMER; //currentPage will get initialized using Redux later

const prods = fetchProducts();

function onlyCategories(value, index, self){
  return self.map(function(e) { 
    return e.category; 
  }).indexOf(value.category) === index;
}






const ProductList = () => {
    const [page, setPage] = useState(0);
    const onChange = p => { setPage(p - 1) };

    //const [isLoading, setIsLoading] = useState(true);
    const itemsPerPage = 6;
    let productsArray = null;





    
    if(currentPage === pageConstants.HOMEPAGE_CUSTOMER) productsArray = prods.filter(onlyCategories);
    else productsArray = prods

    const maxNumberOfPages = (Math.ceil(productsArray.length/itemsPerPage) - 1);

    let renderableArray = productsArray.slice( page * itemsPerPage, 
      ((page + 1) * itemsPerPage) > productsArray.length ? productsArray.length : ((page + 1) * itemsPerPage));

    const rederableProducts = renderableArray.map((p) => {
      return <div key={p.id}><Product {...p}/></div>
    });







    return (
      <>
        <div className="Product-List-Container">
          {rederableProducts}
        </div>
        <Pagination defaultCurrent={1} total={(maxNumberOfPages + 1) * 10} onChange = {onChange}/>
      </>
  );
};

export default ProductList;