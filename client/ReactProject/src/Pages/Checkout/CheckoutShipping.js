import React from 'react';
import { Form, Input, Button, Steps, Select, InputNumber } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../../_helpers/history';
import { setShipping } from '../../_actions/cartActions';

const { Option } = Select;
const { Step } = Steps;

const CheckoutShipping = (props) =>{
  const [form] = Form.useForm();
  const address = props.address;
  const email = props.email;

  const onFinish = (values) => {
    const addressPayload = {
      po_attention_to: values.fullname,
      po_address_line1: values.address_line1,
      po_address_line2: values.address_line2,
      po_suburb: values.suburb,
      po_state: values.state,
      po_postcode: values.postcode,
    };

    const emailPayload = values.email;
    console.log(addressPayload)
    // update cart state
    props.setShipping(addressPayload, emailPayload);

    // store input address to local storage
    localStorage.setItem("address", JSON.stringify(addressPayload));
    localStorage.setItem("email", JSON.stringify(emailPayload));

    // redirect to review order page
    history.push('/checkoutReviewOrder');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };      

  return(
    <>
		<div className="page-title-holder fill">
			<h2>Checkout</h2>
		</div>
		<div className="container flex-horizontal-box-container">
			<Steps current={0} direction="vertical" size="small"
			className="box-item-xs-12 box-item-sm-12 box-item-md-3 box-item-lg-2 box-item-xl-2">
				<Step title="Shipping Address"/>
				<Step title="Review Order"/>
				<Step title="Secure Payment" />
				<Step title="Order Complete"/>
			</Steps>
			<Form
				layout={'vertical'}
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				requiredMark={false}
				className="box-item-xs-12 box-item-sm-12 box-item-md-9 box-item-lg-10 box-item-xl-10 div-box box-shadow flex-horizontal-box-container"
				initialValues={{
					fullname: address.po_attention_to,
					address_line1: address.po_address_line1,
					address_line2: address.po_address_line2,
					suburb: address.po_suburb,
					state: address.po_state,
					postcode: address.po_postcode,
					email: email,
				}}
			>
				<Form.Item className="box-item-xs-1 box-item-sm-1 box-item-md-1 box-item-lg-1 box-item-xl-1">
					<Button type="secondary"><Link to="/Cart"><CaretLeftOutlined />Return to cart</Link></Button>
				</Form.Item>
				<Form.Item className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-12 box-item-xl-12"
					label="Full Name"
					name="fullname" 
					rules={[
						{ 
						required: true,
						message: "Please enter your full name!"
						}
					]}>
					<Input />
				</Form.Item>
			
				<Form.Item className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-12 box-item-xl-12"
					label="Email Address" 
					name="email" 
					rules={[
						{ 
						type: 'email',
						required: true,
						message: 'Please enter your email!'
						}
					]}>
					<Input />
				</Form.Item>
				<Form.Item className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-6 box-item-xl-6"
					label="Address Line 1" name="address_line1" 
					rules={[
						{
						required: true, 
						message: "Please enter your address line 1"
						}
					]}>
					<Input />
				</Form.Item>
				<Form.Item className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-6 box-item-xl-6"
					label="Address Line 2"
					name="address_line2"
					rules={[
						{
						required: false,
						}
					]}>
					<Input />
				</Form.Item>
				<Form.Item className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-4 box-item-xl-4"
					label="Suburb" 
					name="suburb" 
					rules={[
						{ 
						required: true,
						message: 'Please enter your suburb'
						}
					]}>
					<Input />
				</Form.Item>
				<Form.Item className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-4 box-item-xl-4"
					label="State" 
					name="state"
					rules={[
						{ 
						required: true,
						message: 'Please select a state!'
						}
					]}
					>
					<Select>
						<Option value="NSW">NSW</Option>
						<Option value="VIC">VIC</Option>
						<Option value="ACT">ACT</Option>
						<Option value="NT">NT</Option>
						<Option value="QLD">QLD</Option>
						<Option value="SA">SA</Option>
						<Option value="TAS">TAS</Option>
						<Option value="WA">WA</Option>
					</Select>
				</Form.Item>
				<Form.Item className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-4 box-item-xl-4"
					label="Postcode" 
					name="postcode"  
					rules={[
						{ 
						required: true,
						type: 'number',
						message: "Please enter your postcode"
						}
					]}>
					<InputNumber min={200} max={9729} />
				</Form.Item>
				<Form.Item className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-12 box-item-xl-12">
					<Button style={{float:'right'}} type="primary" htmlType="submit">Continue</Button>
				</Form.Item>
			</Form>
		</div>
    </>
  );
}

const mapStateToProps = (state)=>{
  return{
    address: state.cartState.address,
    email: state.cartState.c_email,
  }
}

const mapDispatchToProps= (dispatch)=>{
  return{
    setShipping: (address, email) => {dispatch(setShipping(address, email))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutShipping);