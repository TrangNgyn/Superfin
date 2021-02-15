import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Button, Form, Input,Typography} from 'antd';
import {PhoneFilled,EnvironmentFilled} from '@ant-design/icons';
const { TextArea } = Input;
const { Title } = Typography;

const useContactUs = (callback) => {
  const [inputs, setInputs] = useState({});
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      alert("Thank you for your reponse");
    }
  }
  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }

  return {
    handleSubmit,
    handleInputChange,
    inputs
  };

}

const ContactUs = () =>{
  const {inputs, handleInputChange, handleSubmit} = useContactUs();
  return (
      <>
      <div className="page-title-holder fill center-text">
        <h2>We'd love to hear from you</h2>
      </div>
      <div className="flex-horizontal-box-container" id="contact-us-content">
        <div className="box-item-lg-6 box-item-md-6 box-item-sm-12 box-item-xs-12">
          <form  onSubmit={handleSubmit}>
            <div>
              <Title level={4}>Name</Title>
              <Input size="large" onChange={handleInputChange} value={inputs.name} required/>
            </div>
            <div>
              <Title level={4}>Email</Title>
              <Input size="large" type="email" name="email" onChange={handleInputChange} value={inputs.email} required/>
            </div>
            <div>
              <Title level={4}>Message</Title>
              <TextArea rows={8} type="message" name="message" onChange={handleInputChange} value={inputs.message} required/>
            </div>
            <div>
              <Button type="primary" size="large" htmlType="submit">Send</Button>
            </div>
          </form>
        </div>

        <div className="box-item-lg-6 box-item-md-6 box-item-sm-12 box-item-xs-12">
          <Title level={3}>You can contact us via:</Title>
          <Title level={3}><PhoneFilled />: (02) 9681 6075</Title>
          <Title level={3}><EnvironmentFilled />: 3/34-36 Fairfield St, Fairfield East NSW 2165</Title>
        </div>
      </div>
      </>
  );
}


export default ContactUs
