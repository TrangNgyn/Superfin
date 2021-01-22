import { Menu } from 'antd';
import React, { useState } from 'react';

export default function FooterMenuMobile(){
    const[currentMenuItem, setMenuItem] = useState('');
      console.log(currentMenuItem);
      return (
        <Menu className="footer-menubar-mobile" 
              onClick={(menu) => setMenuItem(menu.key)}  
              mode="vertical" >
  
            <Menu.Item key="Home" className="item">
              Home
            </Menu.Item >

            <Menu.Item key="Terms" className="item">
              Terms and Conditions
            </Menu.Item >

            <Menu.Item key="Support" className="item">
              Support
            </Menu.Item >

            <Menu.Item key="Contact" className="item">
              Contact Us
            </Menu.Item >
        </Menu>
    );
  }