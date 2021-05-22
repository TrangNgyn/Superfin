import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { Divider, Steps, Spin } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { formatNumber } from '../../_helpers/utils';
import CartProducts from '../Cart/CartProducts';
import { clearCart, setError, setLoading, updateItemInfo } from '../../_actions/cartActions';
import axios from 'axios';

const { Step } = Steps;


const CheckoutOrderComplete = (props) =>{

  // order fields
  const [total, setTotal] = useState(0);
  const items = props.items;
  const address = JSON.parse(localStorage.getItem("address"));
  const c_email = JSON.parse(localStorage.getItem("email"));

  // component states
  const [isLoading, setLoadingState] = useState(true);

  function fetchItemInfo(){
	axios
        .post('/api/products/validate-products', {
          p_codes: props.items.map(li => li.item_code)
        })
        .then(res => {
          // update information in cart
          props.updateItemInfo(res.data.valid_pcodes);

		  return res;
        })
        .catch(err => {
		  props.setError(err)
          setLoadingState(false);
        })
  }

  function fetchCreatOrder(){
	axios
      .post('/api/orders/create-order', {
        c_email,
        status: "NEW",
        items,
        address,
      })
      .then(res => {
        // set loading state to false when done
        setLoadingState(false);
        return res;
      })
      .catch(err => props.setError(err))   
  }

  useEffect(() => {
	// load product info
	fetchItemInfo();

    // create an order on rendering
    fetchCreatOrder();

	// clean up before component unmount
	return () => {
		localStorage.clear();
		props.clearCart()
	} 

  }, [])

  useEffect(() => {
    props.setLoading(isLoading);      
  }, [isLoading])

  return(<>
		<div className="page-title-holder fill">
			<h2>Checkout</h2>
		</div>
		<div className="container flex-horizontal-box-container">
			<Steps current={3} direction="vertical" size="small"
			className="box-item-xs-12 box-item-sm-12 box-item-md-3 box-item-lg-2 box-item-xl-2">
				<Step title="Shipping Address"/>
				<Step title="Review Order"/>
				<Step title="Secure Payment" />
				<Step title="Order Complete"/>
			</Steps>
			<div className="box-item-xs-12 box-item-sm-12 box-item-md-9 box-item-lg-10 box-item-xl-10 div-box box-shadow flex-horizontal-box-container">
				{ isLoading ? 
					<div className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-12 box-item-xl-12" align="center">
						<p><Spin size='large'/></p>
						<p>We are processing your order.</p>
						<p>Please wait and kindly <strong>do not close this tab</strong> until your order is processed!</p>
					</div> :
					(
						!items ?
							<div className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-12 box-item-xl-12" align="center">
								<p><CloseCircleFilled style={{ fontSize: '400%', color: 'red'}} /></p>
								<h2>Page Not Found</h2>
								<p>The page you're looking for is unavailable.</p>
								<p>Please click <Link to="/" >here</Link> to continue shopping.</p>
							</div> :
							<>
								<div className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-12 box-item-xl-12" align="center">
									<h3>Order Placed</h3>
									<CheckCircleFilled style={{ fontSize: '400%', color: 'green'}} />
									<h4><em>Your order has been received and will be processed soon.</em></h4>
									<h4>Thank you for choosing us!</h4>
									<Divider/>
								</div>
								<div className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-12 box-item-xl-12">
									<h4>Shipping Information</h4>
									{ address ? <>
											<p><strong>Recipient's Name:&ensp;</strong>{address.po_attention_to}</p>
											<p><strong>Recipient's Address:&ensp;</strong>{ address.po_address_line2 ? <>{address.po_address_line2}/</>: <></>}{address.po_address_line1}, {address.po_suburb}, {address.po_state} {address.po_postcode}</p>
											<p><strong>Recipient's Email:&ensp;</strong>{c_email}</p>
										</>
										:
										<h5>Shipping Address not available.<br/>Please go back to the previous step!</h5>
									}
									<Divider/>
								</div>
								<div className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-12 box-item-xl-12">
									<h4>Order Summary</h4>
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
											<CartProducts key={items} editable={false} />
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
							</>
					)
				}
			</div>
		</div>
  </>)
};

const mapStateToProps = (state)=>{
	return{
	  items: state.cartState.items,
	  total: state.cartState.total,
	}
  }
  

const mapDispatchToProps= (dispatch)=>{
  return{
    setLoading: (isLoading) => {dispatch(setLoading(isLoading))},
    setError: (err) => {dispatch(setError(err))},
    clearCart: () => {dispatch(clearCart())},
	updateItemInfo: (items) => {dispatch(updateItemInfo(items))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutOrderComplete);
