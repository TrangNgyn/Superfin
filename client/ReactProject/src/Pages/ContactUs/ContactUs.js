import React, {useState, useEffect} from 'react';
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
      alert("Thank you for your response");
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
      <>
        <div className="page-title-holder fill">
          <h2>We'd love to hear from you</h2>
        </div>
        <div className="flex-horizontal-box-container" id="contact-us-content">
          <div className="box-item-xs-12 box-item-sm-12 box-item-md-6 box-item-lg-6">
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

        <div className="box-item-xs-12 box-item-sm-12 box-item-md-6 box-item-lg-6">
          <Title level={3}>You can contact us via:</Title>
          <Title level={3}><PhoneFilled />: (02) 9681 6075</Title>
          <Title level={3}><EnvironmentFilled />: 3/34-36 Fairfield St, Fairfield East NSW 2165</Title>
        </div>
      </div>
    </>
  );
}
export default ContactUs
