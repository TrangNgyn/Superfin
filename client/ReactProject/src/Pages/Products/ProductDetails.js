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
        if (window.location.toString().split("?p_code=").length === 2) {
            setProductCode(window.location.toString().split("?p_code=")[1]);
        }
    }, [productCode]);

    useEffect(() => { // For retrieving the details of the p_code
        if (productCode !== null)
            dispatch(getProductDetails(productCode));
    }, [productCode, productDetails, dispatch]);
    

    return (<>
        { productDetailsError ?<div class= "container" > <h1 style={{ textAlign: 'center', color: 'red' }}>Could not load data, please try refreshing page!</h1></div> :
            (productDetailsLoading ? <Spin size='large' /> :<>
                <div className="container with-top-padding flex-horizontal-box-container">
                    <div className="box-item-xs-1 box-item-sm-1 box-item-md-2 box-item-lg-2 box-item-xl-2">
                        <ProductImagesCarousel {...productDetails}/>
                    </div>
                    <div className="box-item-xs-1 box-item-sm-1 box-item-md-2 box-item-lg-2 box-item-xl-2">
                        <ProductMainTitle {...productDetails} />
                    </div>
                    <div className="box-item-xs-1 box-item-sm-1 box-item-md-1 box-item-lg-1 box-item-xl-1">
                        <ProductDescription {...productDetails}/>
                    </div>
                </div>
            </>)
        }
    </>);
};

export default ProductDetails;