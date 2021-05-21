import React, { useContext, useEffect } from 'react';
import {connect} from 'react-redux';
import CartProducts from './CartProducts';
import { formatNumber } from '../../_helpers/utils';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import visa from "../../_assets/Images/visa.png"
import mastercard from "../../_assets/Images/mastercard.jpg"
import alipay from "../../_assets/Images/Alipay.png"
import { clearCart } from '../../_actions/cartActions';

const Cart = (props) =>{
    const itemCount = props.cartItems.length;
    const subTotal = props.total;
    const GST = subTotal / 11;
    const freightCharge = subTotal * 0.1;
    const grandTotal = subTotal + freightCharge;

    const clearCart = () => {
        props.clearCart();
    }

    useEffect(() => {
        // get only user input values
        const items = props.cartItems.map(i => {
            return {
                item_code: i.item_code,
                p_size: i.p_size,
                quantity: i.quantity,
                special_requirements: i.special_requirements,
            }
        });

        // store cart state to local storage
        localStorage.setItem("items", JSON.stringify(items));

    }, [props.cartItems, props.total])
  
    return(<>
        <div className="page-title-holder fill">
            <h2>Shopping Cart</h2>
        </div>
        <div className="container flex-horizontal-box-container" id="cart-content-page">
            <div className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-8 box-item-xl-9 box-shadow table-container">
                <table className="center-content">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Unit Price</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th>Special Requirements</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemCount > 0 ? <CartProducts key={props.cartItems} editable={false} /> : <tr><td colSpan={5}><h3 style={{textAlign: 'center'}}>Your cart is empty! :(</h3></td></tr> }
                    </tbody>
                </table>
            </div>
            <div className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-4 box-item-xl-3 box-shadow">
                <h4>Order Summary</h4>
                <table>
                    <tbody>
                        <tr className="non-hover">
                            <td><strong>Total items:</strong></td>
                            <td>{itemCount}</td>
                        </tr>
                        <tr className="non-hover">
                            <td><strong>Subtotal (incl. GST):</strong></td>
                            <td>{formatNumber(subTotal)}</td>
                        </tr>
                        <tr className="non-hover">
                            <td><strong>GST:</strong></td>
                            <td>{formatNumber(GST)}</td>
                        </tr>
                        <tr className="non-hover">
                            <td><strong>Freight charge:</strong></td>
                            <td>{formatNumber(freightCharge)}</td>
                        </tr>
                        <tr className="non-hover">
                            <td><strong>Grand total:</strong></td>
                            <td>{formatNumber(grandTotal)}</td>
                        </tr>
                    </tbody>
                </table>
                <Button type="secondary" disabled={itemCount < 1} onClick={clearCart}>Clear Cart</Button>
                &emsp;
                <Button type="primary" disabled={itemCount < 1}>
                    <Link to="/CheckoutShipping">Checkout</Link>
                </Button>
                <div id="cart-content-page-accept-payment">
                    <strong><em>We accept the following: </em></strong>
                    <img src={visa} alt="Visa"/>
                    <img src={mastercard} alt="Mastercard"/>
                    <img src={alipay} alt="Alipay"/>
                </div>
            </div>
        </div>
    </>);
}

const mapStateToProps = (state)=>{
    return{
        cartItems: state.cartState.items,
        total: state.cartState.total,
    }
  }
  
  const mapDispatchToProps= (dispatch)=>{
    return{
      clearCart: () => {dispatch(clearCart())},
    }
  }
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(Cart);
