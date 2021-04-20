import { Select, Input, Button } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';

const quantityOptionGenerator = maxOptionCounts => {
    const { Option } = Select;
    var returnElement = [];
    if(maxOptionCounts === null || (maxOptionCounts !== null && maxOptionCounts < 0)) {
        return (<Option value="0" >0</Option>);
    } else {
        for (let index = 1; index <= maxOptionCounts; index++) {
            returnElement.push(<Option value={index} key={index}>{index}</Option>);
        }
        return returnElement;
    }    
}

const addToCart = (p_code) => {
    const order = {
        p_code: p_code,
        quantity: document.getElementById("quantitySelectionComponent").offsetParent.nextSibling.innerText,
        requirement: document.getElementById("specialRequirementsField").textContent
    };
    console.log(order);
}

const ProductMainTitle = props => {
    const { Option } = Select;
    const { TextArea } = Input;
    const productDetails = props;
    const quantitySelectionComponent = ((productDetails !== null) ?
        <Select defaultValue="1" id="quantitySelectionComponent">
            {quantityOptionGenerator(10)}
        </Select> :
        <>
            <Select defaultValue="0" id="quantitySelectionComponent" disabled>
                <Option value="0" >0</Option>
            </Select>
            <span> Not Available! </span>
        </>
    );

    return (
        <div className="product-details-main-title">
            <h3 id="product-name">{productDetails && productDetails.p_name}</h3>
            <div id="units-sold"><strong>{productDetails && productDetails.p_units_sold} sold</strong></div>
            <div id="quantity-selection">
                <label htmlFor="quantitySelectionComponent">Quantity: </label>
                {quantitySelectionComponent}
            </div>
            <div id="special-requirements">
                <label htmlFor="specialRequirementsField">Special Requirements:</label>
                <TextArea id="specialRequirementsField" placeholder="Please give us any special requirements (e.g: Red Bag with a Rooster Icon on the front). Max length: 100" maxLength={100}/>
            </div>
            <Button type="primary" icon={<ShoppingOutlined />} onClick={()=>{addToCart(productDetails.p_code);}}> Add to Cart </Button>
        </div>
    );
};

export default ProductMainTitle;