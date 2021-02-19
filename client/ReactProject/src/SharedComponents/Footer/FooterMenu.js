import { Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function FooterMenu(){
    const[currentMenuItem, setMenuItem] = useState('');
      console.log(currentMenuItem);
      return (
        <Menu className="footer-menubar" 
              onClick={(menu) => setMenuItem(menu.key)}  
              mode="horizontal" >

            <Menu.Item key="Terms" className="item">
              <Link to="/termsAndConditions"> Terms and Conditions </Link>
            </Menu.Item >

            <Menu.Item key="Support" className="item">
              Support
            </Menu.Item >

            <Menu.Item key="Contact" className="item">
              <Link to="/contactUs"> Contact Us </Link>
            </Menu.Item>
        </Menu>
    );
}