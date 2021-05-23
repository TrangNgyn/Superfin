import React, {useState, useEffect} from 'react';
import {Button, Input,Typography} from 'antd';
import {PhoneFilled,EnvironmentFilled, MailFilled} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getCompanyInfo } from '../../_actions/companyInfoActions';

const { Title } = Typography;



const ContactUs = () =>{

  const companyInfo = useSelector(state => state.companyInfoState.companyInfo);
  const dispatch = useDispatch();

  useEffect(() => {
      if(Object.keys(companyInfo).length === 0 && companyInfo.constructor === Object){
          dispatch(getCompanyInfo());
      }
  }, [dispatch, companyInfo]);

  console.log(companyInfo);
  return (
		<>
			<div className="page-title-holder fill">
				<h2>We'd love to hear from you</h2>
			</div>
			<div className="container">
				<Title level={3}>You can contact us via:</Title>
				<Title level={3}><PhoneFilled />{`: ${companyInfo.c_number}`}</Title>
				<Title level={3}><MailFilled />{`: ${companyInfo.c_email}`}</Title>
				<Title level={3}><EnvironmentFilled />{`: ${companyInfo.c_address}`}</Title>
			</div>
		</>
  );
}
export default ContactUs
