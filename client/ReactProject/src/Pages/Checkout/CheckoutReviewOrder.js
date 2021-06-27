import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Steps, Divider, Spin } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CartProducts from '../Cart/CartProducts';
import { formatNumber } from '../../_helpers/utils';
import { updateItemInfo } from '../../_actions/cartActions';

const { Step } = Steps;


const CheckoutReviewOrder = (props) =>{
  const total = props.total;
  const itemCount = props.cartItems.length;
  const address = props.address;
  const email = props.email;


  return(
		<>
			<div className="page-title-holder fill">
				<h2>Checkout</h2>
			</div>

			<div className="container flex-horizontal-box-container">
				<Steps current={1} direction="vertical" size="small"
				className="box-item-xs-12 box-item-sm-12 box-item-md-3 box-item-lg-2 box-item-xl-2">
					<Step title="Shipping Address"/>
					<Step title="Review Order"/>
					<Step title="Secure Payment" />
					<Step title="Order Complete"/>
				</Steps>
				<div className="box-item-xs-12 box-item-sm-12 box-item-md-9 box-item-lg-10 box-item-xl-10 div-box box-shadow flex-horizontal-box-container">
					<div className="box-item-xs-1 box-item-sm-1 box-item-md-1 box-item-lg-1 box-item-xl-1">
						<Button type="secondary">
							<Link to="/checkoutShipping"><CaretLeftOutlined />Back to Shipping Address</Link>
						</Button>
					</div>
					<div className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-12 box-item-xl-12">
						<h4>Shipping Information</h4>
						{ address ? <>
								<p><strong>Recipient's Name:&ensp;</strong>{address.po_attention_to}</p>
								<p><strong>Recipient's Address:&ensp;</strong>{ address.po_address_line2 ? <>{address.po_address_line2}/</>: <></>}{address.po_address_line1}, {address.po_suburb}, {address.po_state} {address.po_postcode}</p>
								<p><strong>Recipient's Email:&ensp;</strong>{email}</p>
							</>
							:
							<h5>Shipping Address not available.<br/>Please go back to the previous step!</h5>
						}
						<Divider/>
					</div>
					<div className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-12 box-item-xl-12">
						<h4>Order Summary ({itemCount} items)</h4>
						<div className="table-container">
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
									{ itemCount === 0 ? 
										<tr>
											<td colSpan={5}>
												<h3 style={{textAlign: 'center'}}>
													Your cart is empty! :(
												</h3>
											</td>
										</tr> :
										<CartProducts key={itemCount} editable={false} />}
								</tbody>
							</table>
						</div>
						<Divider/>
					</div>
					<div className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-12 box-item-xl-12">
						<table className="right-content">
							<tbody>
								<tr className="non-hover"><td><strong>Subtotal:&ensp;</strong>{formatNumber(total)}</td></tr>
								<tr className="non-hover"><td><strong>GST:&ensp;</strong>{formatNumber(total*0.01)}</td></tr>
								<tr className="non-hover"><td><strong>Freight Charge:&ensp;</strong>{formatNumber(total*0.05)}</td></tr>
								<tr className="non-hover"><td><strong>Total:&ensp;</strong>{formatNumber(total*1.06)}</td></tr>
							</tbody>
						</table>
					</div>
					<div className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-12 box-item-xl-12">
						<Button type="primary" style={{float:'right'}}>
							<Link to="/checkoutSecurePayment">Go to payment</Link>
						</Button>
					</div>

				</div>
			</div> 
		</>
    );	
}

const mapStateToProps = (state)=>{
  return{
      cartItems: state.cartState.items,
      total: state.cartState.total,
      address: state.cartState.address,
      email: state.cartState.c_email,
  }
}

const mapDispatchToProps= (dispatch)=>{
	return{
	  updateItemInfo: (items) => {dispatch(updateItemInfo(items))},
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(CheckoutReviewOrder);
