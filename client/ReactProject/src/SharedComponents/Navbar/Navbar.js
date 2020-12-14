import { Menu } from 'antd';
import {UserOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import React, { useState } from 'react';
import '../../CSS/Navbar.css'
import image from '../../Images/Logo.jpg'



export default function Navbar(props){
  const[currentMenuItem, setMenuItem] = useState('');
  
    return (
      <Menu className="Menu" onClick={(menu) => setMenuItem(menu.key)}  mode="horizontal" >

          <Menu.Item key="Logo" style = {{ right: 500 }}>
              <img src={image} width = "150" heigh = "150" alt="Logo" />
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


