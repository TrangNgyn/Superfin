import { Menu } from 'antd';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
// import '../../_assets/CSS/Navbar.css'
import image from '../../_assets/Images/Logo.png'

export default function Navbar(props){
  const[currentMenuItem, setMenuItem] = useState('');
  
    return (
      
      <Menu className="Menu" onClick={(menu) => setMenuItem(menu.key)}  mode="horizontal" >

          <Menu.Item key="Logo" style = {{ right: 200 }}>
              <img src={image} style= {{ width: "100px", left: 500}} alt="Logo" />
          </Menu.Item >
   
          <Menu.Item key="Delivery" >
            Delivery and Dispatch
          </Menu.Item >

          <Menu.Item key="Contact" >
            Contact Us
          </Menu.Item>

          <Menu.Item key="About">
            About us
          </Menu.Item>

          <Menu.Item key="Blog">
            Blog
          </Menu.Item>

          <Menu.Item key = "Login" style = {{ left: 500}} icon={<UserOutlined />} >
            Log in/Sign up
          </Menu.Item>

          <Menu.Item key="Cart" style = {{ left: 500}} className = "rightItems"  icon = {<ShoppingCartOutlined />} >
            Cart
          </Menu.Item>

      </Menu> 
  );
}


