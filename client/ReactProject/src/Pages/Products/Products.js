import { Spin, Select } from 'antd';
import ProductsList from './ProductsList';
import { getAllCategories } from '../../_actions/categoryActions';
import { getAllProducts } from '../../_actions/productActions';


import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
const { Option } = Select;

const Products = () => {
    const dispatch = useDispatch();

    const categories = useSelector(state => state.categoryState.categories);
    const loadingCategory = useSelector(state => state.categoryState.loading);
    const errorCategory = useSelector(state => state.categoryState.error);
    const products = useSelector(state => state.productState.products);
    const loadingProduct = useSelector(state => state.productState.loading);
    const errorProduct = useSelector(state => state.productState.error);

    const loading = (loadingCategory || loadingProduct) ? true : false; // If either are loading, set loading to true, if not, set to false
    const error = (errorCategory || errorProduct) ? true : false; // If either are errorneous, set error to true, if not, set to false

    useEffect(() => {
        if (!categories.length) dispatch(getAllCategories());
        if (!products.length) dispatch(getAllProducts());
    }, [categories, products, dispatch]);

    return (
        <>  <div className="page-title-holder fill">
                <h2>Our product range</h2>
            </div>
            { error ? <div class="container"><h1 style={{ textAlign: 'center', color: 'red'}}>Could not load data, please try refreshing page!</h1></div> :
            (loading ? <Spin size='large' /> : <>
                <div className="container flex-horizontal-box-container">
                    <Select className="box-item-sm-4" defaultValue="noCategory" onChange={changedValue => {console.log("Changed to: " + changedValue)}}>
                        <Option value="noCategory" disabled>Filter By Category</Option>
                        {categories.map((category, index) => {
                            return (<Option value={category._id} key={index}>{category.c_name}</Option>);
                        })}
                    </Select>
                    <Select className="box-item-sm-4" defaultValue="lucy" onChange={changedValue => { console.log("Changed to: " + changedValue) }}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </div>
                <ProductsList {...products}/>
            </>)}
        </>
    );

}

export default Products;