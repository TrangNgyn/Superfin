import React, { useContext } from 'react';
import ProductItem from './ProductItem';
import { ProductsContext } from '../../../contexts/ProductsContext';

const ProductsGrid = () => {

    const { products} = useContext(ProductsContext)

    return (
        <div>
            <div>
                {products.length} Products
            </div>
            <div>
                {
                    products.map(product => (
                        <ProductItem key={product.id} product={product}/>
                    ))
                }
            </div>
        </div>
     );
}

export default ProductsGrid;
