import { Menu } from 'antd';
import React, { useState } from 'react';
import '../../_assets/CSS/layouts/Footer/FooterMenu.css';
import { Link } from 'react-router-dom';


export default function FooterMenu(){
    const[currentMenuItem, setMenuItem] = useState('');
      console.log(currentMenuItem);
      return (
        <Menu className="FooterMenu"
              onClick={(menu) => setMenuItem(menu.key)}
              mode="horizontal" >

            <Menu.Item key="Home" className="FooterMenuItem">
              <Link to="/">Home</Link>
            </Menu.Item >

            <Menu.Item key="Terms" className="FooterMenuItem">
              <Link to="/TermsConditions">Terms and conditions </Link>
            </Menu.Item >

            <Menu.Item key="Support" className="FooterMenuItem">
              Support
            </Menu.Item >

            <Menu.Item key="Contact" className="FooterMenuItem">
              <Link to="/contactUs">Contact us</Link>
            </Menu.Item >
        </Menu>
    );
  }
