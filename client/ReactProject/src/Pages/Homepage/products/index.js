import React from 'react';
import ProductsGrid from './ProductsGrid';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Store = () => {

    return (
            <div >
                <ProductsGrid/>
                <Products/>
            </div>
     );
}

const getProducts = setProducts => {
    axios.get('api/products/all-product')
    .then(res => {
        console.log(res);
        setProducts(res.data.products);
    })
    .catch(err => {
        console.log(err);
    })

}

const Products = () => {
    const [productsList, setProducts] = useState([]);

    useEffect(() => {
        getProducts(setProducts);
    }, []);

    const productsString = JSON.stringify(productsList);

    return productsString;
}

export default Store;
