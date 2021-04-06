import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../_actions/productActions';
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

    useEffect(() => { // For retrieving the details of the p_code
        if (!productDetailsArray.length && productCode !== null)
            dispatch(getProductDetails(productCode));
    }, [productDetailsArray, dispatch, productCode]);

    return (<>
        { productDetailsError ?<div class= "container" > <h1 style={{ textAlign: 'center', color: 'red' }}>Could not load data, please try refreshing page!</h1></div> :
            (productDetailsLoading ? <Spin size='large' /> :<>
                <div className="page-title-holder fill">
                    {productDetails.map((product, index) => <h2 key={index}>{product.p_name}</h2>)}
                </div>
            </>)
        }
    </>);
};

export default ProductDetails;