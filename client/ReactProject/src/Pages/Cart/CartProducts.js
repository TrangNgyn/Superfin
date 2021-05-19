import React, { useState, useCallback, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Spin } from 'antd';
import axios from 'axios';
import CartItem from './CartItem';
// import { getProductDetails } from '../../_actions/productActions';
import { removeItems, setLoading, setError } from '../../_actions/cartActions';


const CartProducts = (props) => {
    const editable = props.editable

    // products that are in cart but no longer available (deleted)
    const [validPCodes, setValidPCodes] = useState(
      // init pCodes with all product codes in cart
      props.line_items.map(li => li.item_code)
    );
    const [invalidPCodes, setInvalidPCodes] = useState([]);
    console.log({valid: validPCodes})
    console.log({invalid: invalidPCodes})
    console.log({itens: props.line_items})

    // component states
    const [isLoading, setLoadingState] = useState(true);
    const [popupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
      axios
        .post('/api/products/validate-products', {
          p_codes: validPCodes,
          p_names: props.line_items.map(li => li.p_name),
          unit_prices: props.line_items.map(li => li.unit_price),
          price_ids: props.line_items.map(li => li.price_id), 
          images: props.line_items.map(li => li.p_image_uri), 
          p_sizes: props.line_items.map(li => li.p_size)
        })
        .then(res => {
          setValidPCodes(res.data.valid_pcodes.map(p => p.p_code));
          setLoadingState(false);
        })
        .catch(err => {
          console.log(err);
          setLoadingState(false);
        })

    }, []);

    useEffect(() => {
      if(validPCodes 
          && validPCodes.length !== props.line_items.length)
      {
        let invalid = props.line_items
          .filter((li) => {
            return !validPCodes.includes(li.item_code);
          })
          .map(li => li.p_name);

        setInvalidPCodes(invalid);
      }
      
    }, [validPCodes])
   
    const itemList = () => {
      var items = [];
      if(props.line_items){
        for(var i = 0; i < props.line_items.length; i++){
          items.push(
            <>
              <CartItem 
                key={props.line_items[i]}
                product={props.line_items[i]}
                editable={editable}
                index={i}
              />
            </>
          )
        }
      }
      
      return items;
    }

    // on confirming, keep valid products in cart
    const removeItems = (validProds) => {
      console.log("OK");
      props.removeItems(validProds);      
    };

    // popup for when an invalid product exists in cart
    const infoModal = (invalidProds, validProds) => {
      Modal.info({
        title: 'Unavailable Products exist in Cart',
        icon: <ExclamationCircleOutlined />,
        content: (
          <div>
            <p>
              The following products in your Cart are outdated or no longer available: 
            </p>
            <ul>
              {
                invalidProds.map((p_name, index) => (
                  <li key={`${p_name} ${index}`} >
                    {p_name}
                  </li>
                ))
              }
            </ul>
            <p>Please remove them from your Cart!</p>
          </div>
          
        ),
        okText: 'Remove Items',
        onOk () { removeItems(validProds) }
      });
    }

    return (<>
        {
          isLoading ?
            <tr><td colSpan={4}><h3 style={{textAlign: 'center'}}>Fetching your Cart Items. . .<br/>Thank you for your patience!<br/><Spin size='large'/></h3></td></tr>
          :
          <>
            {
              itemList()
            }
            {
              (invalidPCodes.length > 0) ? infoModal(invalidPCodes, validPCodes) : <></>
            }
          </>
        }
        </>
    );
}

const mapStateToProps = (state)=>{
  return{
    line_items: state.cartState.items,
    total: state.cartState.total,
  }
}

const mapDispatchToProps= (dispatch)=>{
  return{
    // setLoading: (isLoading) => {dispatch(setLoading(isLoading))},
    // setError: (err) => {dispatch(setError(err))},
    removeItems: (valid_pcodes) => {dispatch(removeItems(valid_pcodes))},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartProducts);
