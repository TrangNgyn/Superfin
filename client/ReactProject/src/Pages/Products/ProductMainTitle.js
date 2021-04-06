import { Select } from 'antd';

const ProductMainTitle = props => {
    const { Option } = Select;
    const productDetails = props;
    const quantitySelectionComponent = ((productDetails !== null && productDetails.p_units_sold > 0) ?
        <Select defaultValue="1" id="quantitySelectionComponent">
            <Option value="selectQuantityTitle" disabled>Select Quantity</Option>
            {}
        </Select> :
        <>
            <Select defaultValue="0" id="quantitySelectionComponent" disabled>
                <Option value="selectQuantityTitle" disabled>Select Quantity</Option>
                <Option value="0" >0</Option>
            </Select>
            <span style={{color: 'red'}}> Out of Stock! </span>
        </>
    );
    return (
        <div className="product-details-main-title">
            <h2 id="product-name">{productDetails && productDetails.p_name}</h2>
            <div id="units-sold"><strong>{productDetails && productDetails.p_units_sold} sold</strong></div>
            <div id="quantity-selection">
                <label htmlFor="quantitySelectionComponent">Quantity: </label>
                {quantitySelectionComponent}
            </div>
        </div>
    );
};

export default ProductMainTitle;