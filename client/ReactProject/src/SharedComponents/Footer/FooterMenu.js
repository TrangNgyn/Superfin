import { Menu } from 'antd';
import React, { useState } from 'react';
import '../../_assets/CSS/layouts/Footer/FooterMenu.css';

export default function FooterMenu(){
    const[currentMenuItem, setMenuItem] = useState('');
      console.log(currentMenuItem);
      return (
        <Menu className="FooterMenu" 
              onClick={(menu) => setMenuItem(menu.key)}  
              mode="horizontal" >
  
            <Menu.Item key="Home" className="FooterMenuItem">
              Home
            </Menu.Item >

            <Menu.Item key="Terms" className="FooterMenuItem">
              Terms and conditions
            </Menu.Item >

            <Menu.Item key="Support" className="FooterMenuItem">
              Support
            </Menu.Item >

            <Menu.Item key="Contact" className="FooterMenuItem">
              Contact us
            </Menu.Item >
        </Menu>
    );
  }