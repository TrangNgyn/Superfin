import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../_actions/productActions';
import ProductImagesCarousel from './ProductImagesCarousel';
import ProductMainTitle from './ProductMainTitle';
import ProductDescription from './ProductDescription';
import { Spin } from 'antd';

const ProductDetails = props => {
    const dispatch = useDispatch();
    const [productCode, setProductCode] = useState(null);
    const productDetails = useSelector(state => state.productDetailsState.product);
    const productDetailsLoading = useSelector(state => state.productDetailsState.loading);
    const productDetailsError = useSelector(state => state.productDetailsState.error);

    useEffect(() => { // For setting the state of the p_code
        // get the query string (e.g. ?p_code=123&price_id=)
        const queryString = window.location.search;
        // get param values
        const urlParams = new URLSearchParams(queryString);
        const p_code = urlParams.get('p_code');

        // check if p_code is defined and is not an empty string
        if (p_code && p_code !== "") {
            setProductCode(p_code);
        }
    }, [productCode]);

    useEffect(() => { // For retrieving the details of the p_code
        if (productCode !== null)
            dispatch(getProductDetails(productCode));
    }, [productCode, productDetails, dispatch]);
    

    return (<>
        { productDetailsError ?
            <div class= "container" > 
                <h1 style={{ textAlign: 'center', color: 'red' }}>
                    Could not load data, please try refreshing page!
                </h1>
            </div> :
            (productDetailsLoading ? <Spin size='large' /> :<>
                <div className="container with-top-padding flex-horizontal-box-container">
                    <div className="box-item-xs-12 box-item-sm-12 box-item-md-6 box-item-lg-6 box-item-xl-6">
                        <ProductImagesCarousel {...productDetails}/>
                    </div>
                    <div className="box-item-xs-12 box-item-sm-12 box-item-md-6 box-item-lg-6 box-item-xl-6">
                        <ProductMainTitle {...productDetails} />
                    </div>
                    <div className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-12 box-item-xl-12">
                        <ProductDescription {...productDetails}/>
                    </div>
                </div>
            </>)
        }
    </>);
};

export default ProductDetails;