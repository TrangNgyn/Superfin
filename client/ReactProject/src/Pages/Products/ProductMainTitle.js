import { Select, Input, Button } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import { useDispatch, connect } from 'react-redux';
import React, {useEffect, useState} from 'react';
import {addToCart} from '../../_actions/cartActions'
import { formatNumber } from '../../_helpers/utils';

// quantity can be upto 10
const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ProductMainTitle = props => {
    const { Option } = Select;
    const { TextArea } = Input;
    const productDetails = props.productDetails;
    console.log(productDetails)
    
    // line items' variables
    const [quantity, setQuantity] = useState((!productDetails) ? 0 : 1);
    const [specialRequirements, setSpecialRequirements] = useState("");
    const [productSize, setProductSize] = useState(
        (!productDetails) ? "Not Available" : productDetails.p_size[0]
    );

    // form event callbacks
    const onQuantityChange = (value) => {
        setQuantity(value);
    }

    const onRequirementChange = e => {
        setSpecialRequirements(e.target.value);
    }

    const onSizeChange = (value) => {
        setProductSize(value);
    }

    const addToCart = (product, quantity, specialRequirements, productSize) => {
        // update cart state
        props.addToCart(product, quantity, specialRequirements, productSize);
    }

    // dynamic component generators
    const selectionGenerator = (options, onChangeCallback, setDefault) => (
        (!options) ?
        <Select value="Not Available"
            id="sizeSelectionComponent"
            disabled
        >
            <Option value="Not Available">Not Available</Option>
        </Select> :
        <>
            <Select defaultValue={options[0]}
                id="sizeSelectionComponent"
                onChange={onChangeCallback}
            >
                {
                    options.map(element => {
                        return <Option value={element}>{element}</Option>;
                    })
                }
            </Select>
        </>
    );

    useEffect(() => {
        // store cart state to local storage
        localStorage.setItem("items", JSON.stringify(props.items));
        localStorage.setItem("total", JSON.stringify(props.total));
    }, [props.total, props.items]);

    return (
        <div className="product-details-main-title">
            <h3 id="product-name">{productDetails && productDetails.p_name}</h3>
            <div id="product-price">
                <strong>Price: {formatNumber(productDetails.p_price)} </strong>
                <br/>
                <strong>Unit per Item: {productDetails.p_unit} </strong>
            </div>
            <div id="quantity-selection">
                <label htmlFor="quantitySelectionComponent">Quantity: </label>
                {
                    selectionGenerator(
                        ((!productDetails.p_code)? null : quantityOptions),
                        onQuantityChange
                    )
                }
            </div>
            <div id="size-selection">
                <label htmlFor="sizeSelectionComponent">Size: </label>
                {
                    selectionGenerator(productDetails.p_size, onSizeChange)
                }
            </div>
            <div id="special-requirements">
                <label htmlFor="specialRequirementsField">Special Requirements:</label>
                <TextArea
                    id="specialRequirementsField"
                    placeholder="Please specify any special requirement
                    (e.g: Red Bag with a Rooster Icon on the front).
                    (Max length: 100)"
                    maxLength={100}
                    rows={3}
                    showCount
                    onChange={onRequirementChange}
                />
            </div>
            <br/>
            <Button type="primary" icon={<ShoppingOutlined />}
                onClick={()=>
                    {
                        addToCart(productDetails, quantity, specialRequirements, productSize)
                    }}
            >
                Add to Cart
            </Button>
        </div>
    );
};

const mapStateToProps = (state)=>{
    return{
      items: state.cartState.items,
      total: state.cartState.total,
    }
}

const mapDispatchToProps= (dispatch)=>{
    return{
      addToCart:
        (product, quantity, specialRequirements, productSize) => {
            dispatch(addToCart(product, quantity, specialRequirements, productSize))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductMainTitle);
