import { Button } from 'antd';
import { history } from '../../_helpers/history';

const ProductDescription = props => {
    const productDetails = props.productDetails;

    return (
        <div className="product-details-description">
            <h4>Description</h4>
            <p id="description-content">
                {productDetails && productDetails.p_description ?
                    productDetails.p_description :
                    <em>Sorry, no description is available for this product!</em>}
            </p>
            <span id="product-code">
                <em>Product Code: {productDetails && productDetails.p_code}</em>
            </span>
            <span id="enquire-span">
                <Button type="primary"
                    onClick={() => { history.push('ContactUs') }}>
                    Inquire
                </Button> Click here for more information on how to send us your product enquiry.
            </span>
        </div>
    );
};

export default ProductDescription;
