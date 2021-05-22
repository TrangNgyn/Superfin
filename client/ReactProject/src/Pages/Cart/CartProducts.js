/*
  - Author: Trang Nguyen
  - A list of Cart Items that will be validated and updated on render.
*/

import React, { useState, useCallback, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Spin } from 'antd';
import axios from 'axios';
import CartItem from './CartItem';
import { removeItems, updateItemInfo, setLoading, setError } from '../../_actions/cartActions';

const CartProducts = (props) => {
    const editable = props.editable

    // up-to-date product codes
    const [validPCodes, setValidPCodes] = useState(
      // init pCodes with all product codes in cart
      props.line_items.map(li => li.item_code)
    );
    // products that are in cart but no longer available (deleted)
    const [invalidProducts, setInvalidProducts] = useState([]);
    // product info pulled from database using product codes in cart
    const [productInfo, setProductInfo] = useState([]);

    // component states
    const [isLoading, setLoadingState] = useState(true);
    // state if the invalid products have been removed from cart
    const [invalidRemoved, setInvalidRemoved] = useState(false);

    function filterInavlidProducts() {
      if(validPCodes 
          && validPCodes.length !== props.line_items.length)
      {
        let invalid1 = props.line_items
          .filter((li) => {
            return !validPCodes.includes(li.item_code);
          })
          .map(li => {return {item_code: li.item_code, p_size: li.p_size}});
        
        // add to invalid array
        setInvalidProducts(invalid1);

        // find products that have correct p_code but incorrect p_size
        let invalid2 = [];
        productInfo.forEach(p => {
          props.line_items
            .filter(li => {
              return (li.item_code === p.p_code && !p.p_size.includes(li.p_size))
            })
            .forEach(li => {
              invalid2 = [...invalid2, {item_code: li.item_code, p_size: li.p_size}];
            });
        }); 

        // add to invalid array
        invalid2.forEach(element => {
          setInvalidProducts([...invalidProducts, element]);
        });
        
      }
    }

    useEffect(() => {
      // update cart items' info
      axios
        .post('/api/products/validate-products', {
          p_codes: props.line_items.map(li => li.item_code)
        })
        .then(res => {
          // update information in cart
          props.updateItemInfo(res.data.valid_pcodes);
          setProductInfo(res.data.valid_pcodes);

          if(res.data.valid_pcodes){
            setValidPCodes(res.data.valid_pcodes.map(p => p.p_code));
            
          }else{
            setValidPCodes([]);
          }
          console.log({res: res})
          setLoadingState(false);

        })
        .catch(err => {
          console.log(err);
          setLoadingState(false);
        })


    }, []);

    useEffect(() => {

      filterInavlidProducts();

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

    // on confirming, remove invalid products in cart
    const removeItems = (invalidProds) => {
      // remove invalid products
      console.log("OK");
      props.removeItems(invalidProds);
      setInvalidRemoved(true);
      
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
                invalidProds.map((prod, index) => (
                  <li key={`${prod.item_code} ${index}`} >
                    {`Product Code: ${prod.item_code} (Product Size: ${prod.p_size})`}
                  </li>
                ))
              }
            </ul>
            <p>Please remove them from your Cart!</p>
          </div>
          
        ),
        okText: 'Remove Items',
        onOk () { removeItems(invalidProds) }
      });
    }

    return (<>
        {
          isLoading ?
            <tr><td colSpan={5}><h3 style={{textAlign: 'center'}}>Fetching your Cart Items. . .<br/>Thank you for your patience!<br/><Spin size='large'/></h3></td></tr>
          :
          (        
            !invalidRemoved ?
              (
                (invalidProducts.length > 0) ? 
                 infoModal(invalidProducts, validPCodes) : 
                 itemList()
              ) : 
              itemList()
          )
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
    removeItems: (invalid_pcodes) => {dispatch(removeItems(invalid_pcodes))},
    updateItemInfo: (items) => {dispatch(updateItemInfo(items))},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartProducts);
