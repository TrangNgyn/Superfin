import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, setLoadingProductDetails } from '../../_actions/productActions';
import ProductImagesCarousel from './ProductImagesCarousel';
import ProductMainTitle from './ProductMainTitle';
import ProductDescription from './ProductDescription';
import { Spin } from 'antd';

const ProductDetails = props => {
    // current product detail state
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetailsState.product);
    const isLoading = useSelector(state => state.productDetailsState.isLoading);
    const error = useSelector(state => state.productDetailsState.error);
    
    // Function for retrieving product code from URL params
    const getProductCode = () => {
        // get the query string (e.g. ?p_code=123&price_id=)
        const queryString = window.location.search;
        // get param values
        const urlParams = new URLSearchParams(queryString);
        const p_code = urlParams.get('p_code');

        // check if p_code is defined and is not an empty string
        if (p_code && p_code !== "") {
            // setProductCode(p_code);
            return p_code;
        }else{
            return "";
        }
    }

    // Init productCode based on URI's param
    const [productCode, setProductCode] = useState(getProductCode());

    // Retrieving the details of the p_code
    useEffect(() => {
        window.scrollTo(0, 0); // scroll to top on page load
        dispatch(getProductDetails(productCode));
    }, []);
    
    return (<>
        { (isLoading) ?
          <>
            <br/>
            <div align="center">
                <Spin size='large'/> <br/>
                Loading data... Please wait!
            </div>
          </> :
          ((!productDetails || productDetails.success === false)  ? 
            <h4 style={{color: "red", textAlign:"center"}} > 
                <br/>
                Could not load data. <br/>
                {
                    !productDetails?
                        "Please refresh the page!" : productDetails.message
                }
            </h4> : 
            <>
                <div className="container with-top-padding flex-horizontal-box-container">
                    <div className="box-item-xs-12 box-item-sm-12 box-item-md-6 box-item-lg-6 box-item-xl-6">
                        <ProductImagesCarousel key={productDetails}
                            productDetails={productDetails}/>
                    </div>
                    <div className="box-item-xs-12 box-item-sm-12 box-item-md-6 box-item-lg-6 box-item-xl-6">
                        <ProductMainTitle key={productDetails}
                            productDetails={productDetails} />
                    </div>
                    <div className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-12 box-item-xl-12">
                        <ProductDescription key={productDetails}
                            productDetails={productDetails}/>
                    </div>
                </div>
            </>)
        }
    </>);
};

export default ProductDetails;