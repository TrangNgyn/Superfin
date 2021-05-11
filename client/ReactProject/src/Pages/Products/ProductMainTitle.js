import { Select, Input, Button } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import { useDispatch, connect } from 'react-redux';
import React, {useState} from 'react';
import {addToCart} from '../../_actions/cartActions'

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

const ProductMainTitle = props => {
    const dispatch = useDispatch();

    const { Option } = Select;
    const { TextArea } = Input;
    const productDetails = props;

    const [quantity, setQuantity] = useState(0);
    const [special_requirements, setSpecialRequirements] = useState("");

    const onQuantityChange = (value) => {
        setQuantity(value);
    }
    
    const onRequirementChange = e => {
        setSpecialRequirements(e.target.value);
    }

    const quantitySelectionComponent = 
        ((productDetails) ?
        <Select defaultValue="1" 
            id="quantitySelectionComponent"
            onChange={onQuantityChange}
        >
            {quantityOptionGenerator(10)}
        </Select> :
        <>
            <Select defaultValue="0" 
                id="quantitySelectionComponent" 
                onChange={onQuantityChange}
                disabled>
                <Option value="0" >0</Option>
            </Select>
            <span> Not Available! </span>
        </>
    );


    const addToCart = (product, quantity, special_requirements) => {
        props.addToCart(product, quantity, special_requirements);
    }

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
                <TextArea 
                    id="specialRequirementsField" 
                    placeholder="Please specify any special requirement (e.g: Red Bag with a Rooster Icon on the front).
                     (Max length: 100)" 
                    maxLength={100}
                    showCount
                    onChange={onRequirementChange}
                />
            </div>
            <Button type="primary" icon={<ShoppingOutlined />} 
                onClick={()=> 
                    {
                        addToCart(productDetails, quantity, special_requirements)
                    }}
            > 
                Add to Cart 
            </Button>
        </div>
    );
};
  
const mapDispatchToProps= (dispatch)=>{
    return{
       addToCart: 
        (product, quantity, special_requirements) => {
            dispatch(addToCart(product, quantity, special_requirements))
        }
    }
}


export default connect(null, mapDispatchToProps)(ProductMainTitle);