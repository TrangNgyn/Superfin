import { Button } from 'antd';
import { useState, useEffect } from "react";

const ProductMainTitle = props => {
    const productDetails = props;

    return (
        <div className="product-details-description">
            <h4>Description</h4>
            <p id="description-content">{productDetails && productDetails.p_description ? productDetails.p_description : <em>Sorry this product doesn't have any description!</em>}</p>
            <span id="product-code"><em>Product Code: {productDetails && productDetails.p_code}</em></span>
            <span id="enquire-span">
                <Button type="primary" onClick={() => { alert("H E L P !"); }}> Enquire </Button> Click here to enquire for more information.
            </span>
        </div>
    );
};

export default ProductMainTitle;