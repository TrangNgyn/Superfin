import React, {useState, useEffect} from 'react';
import '../../_assets/CSS/pages/ContactUs.css';
import {Button, Input,Typography} from 'antd';
import {PhoneFilled,EnvironmentFilled} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getCompanyInfo } from '../../_actions/companyInfoActions';

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

    const companyInfo = useSelector(state => state.companyInfoState.companyInfo);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(Object.keys(companyInfo).length === 0 && companyInfo.constructor === Object){
            dispatch(getCompanyInfo());
        }
    }, [dispatch, companyInfo]);





    return (
        <body id="contact-us">
        <div id="contact-us-window" >
            We'd love to hear from you
        </div>
        <div id="contact-us-content">
        <div id="contact-us-content1">
            <form  onSubmit={handleSubmit}>
            <div>
                <Title level={3}>Name</Title>
                <Input size="large" onChange={handleInputChange} value={inputs.name} required/>
            </div>
            <div>
                <Title level={3}>Email</Title>
                <Input size="large" type="email" name="email" onChange={handleInputChange} value={inputs.email} required/>
            </div>
            <div>
                <Title level={3}>Message</Title>
                <TextArea rows={4} type="message" name="message" onChange={handleInputChange} value={inputs.message} required/>
            </div>
            <div id="contact-us-button-div">
                <Button type="primary" size="large" htmlType="submit">Send</Button>
            </div>
            </form>
        </div>

        <div id="contact-us-content2">
            <Title level={3}>You can contact us via:</Title>
            <Title level={3}><PhoneFilled />: {companyInfo.c_number}</Title>
            <Title level={3}><EnvironmentFilled />: {companyInfo.c_address}</Title>
        </div>

        </div>
        </body>
    );
}

export default ContactUs
