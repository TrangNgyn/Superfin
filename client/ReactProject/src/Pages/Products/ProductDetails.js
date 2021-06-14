import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../_actions/productActions';
import ProductImagesCarousel from './ProductImagesCarousel';
import ProductMainTitle from './ProductMainTitle';
import ProductDescription from './ProductDescription';
import { Spin, Divider } from 'antd';
import { useParams } from "react-router";
 
const ProductDetails = () => {
    // current product detail state
    const dispatch = useDispatch();
    const {p_code} = useParams();

    const productDetails = useSelector(state => state.productDetailsState.product);
    const isLoading = useSelector(state => state.productDetailsState.isLoading);
    


    // Retrieving the details of the p_code
    useEffect(() => {
        window.scrollTo(0, 0); // scroll to top on page load
        dispatch(getProductDetails(p_code));
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
                    <Divider/>
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