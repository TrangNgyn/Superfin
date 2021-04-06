import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../_actions/productActions';
import placeholderImg from '../../_assets/Images/No_Image.jpg';
import ProductMainTitle from './ProductMainTitle';
import { Spin } from 'antd';

const ProductDetails = props => {
    const dispatch = useDispatch();
    const [productCode, setProductCode] = useState(null);
    const [productDetails, setProductDetails] = useState(null);
    const productDetailsArray = useSelector(state => state.productState.products);
    const productDetailsLoading = useSelector(state => state.productState.loading);
    const productDetailsError = useSelector(state => state.productState.error);

    useEffect(() => { // For setting the state of the p_code
        if (window.location.toString().split("?p_code=").length === 2) {
            setProductCode(window.location.toString().split("?p_code=")[1]);
        }
    }, [window.location, productCode]);

    useEffect(() => { // For retrieving the details of the p_code
        if (!productDetailsArray.length && productCode !== null)
            dispatch(getProductDetails(productCode));
    }, [productDetailsArray, dispatch, productCode]);

    useEffect(() => { // For getting the product details from the returned value
        if (productDetailsArray !== [])
            setProductDetails(productDetailsArray[0]);
    }, [productDetailsArray, productDetails, dispatch, productCode]);
    

    return (<>
        { productDetailsError ?<div class= "container" > <h1 style={{ textAlign: 'center', color: 'red' }}>Could not load data, please try refreshing page!</h1></div> :
            (productDetailsLoading ? <Spin size='large' /> :<>
                <div className="container with-top-padding flex-horizontal-box-container" style={{backgroundColor: 'gray'}}>
                    <div className="box-item-xs-1 box-item-sm-1 box-item-md-2 box-item-lg-2 box-item-xl-2" style={{ backgroundColor: 'red' }}>
                        <div className="product-details-images">
                            <img src={placeholderImg} style={{ width: '80%' }}/>
                        </div>
                    </div>
                    <div className="box-item-xs-1 box-item-sm-1 box-item-md-2 box-item-lg-2 box-item-xl-2" style={{ backgroundColor: 'green' }}>
                        <ProductMainTitle {...productDetails} />
                    </div>
                    <div className="box-item-xs-1 box-item-sm-1 box-item-md-1 box-item-lg-1 box-item-xl-1" style={{ backgroundColor: 'blue' }}>
                        <div className="product-details-description">

                        </div>
                    </div>
                </div>
            </>)
        }
    </>);
};

export default ProductDetails;