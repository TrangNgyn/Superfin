import ProductItem from './ProductItem';
import {  useEffect } from 'react';
import { getAllProducts, setDefaultOrder } from '../../../_actions/productActions';
import { useDispatch, useSelector } from 'react-redux';



const ProductsGrid = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.productState.products);

    useEffect(() => {
    //checks if the store is empty. If so, do an API request. If data is already there, set it to default ordering
      if(!products.length) dispatch(getAllProducts());
      else dispatch(setDefaultOrder());
    }, [products.length, dispatch]);


    return (
        <div>
            <div id="number-of-products-container">
                {products.length} Products
            </div>
            <div id="products-page-container">
                {
                    products.map(product => (
                        <ProductItem key={product._id} product={product}/>
                    ))
                }
            </div>
        </div>
     );
}

export default ProductsGrid;
