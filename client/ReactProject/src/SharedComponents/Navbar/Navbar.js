import { Menu } from 'antd';
import React, { useState } from 'react';
import './Navbar.css'
import {Link} from "react-router-dom";


export default function Navbar(props){
  let menuItemKey = "Login";
  let menuItemTo = "/login";
  let menuItemValue = "Login/sign up";
 

  if(props.loggedInStatus === "CUSTOMER"){
    menuItemKey = "MyAccount";
    menuItemTo = "/myaccount";
    menuItemValue = "My Account/ Sign Out";
    console.log("this should NOT print");
  }

  const[currentMenuItem, setMenuItem] = useState('');

    return (

      <Menu className="Menu" style={{ textAlign: 'center' }} onClick={(menu) => setMenuItem(menu.key)} selectedKeys={currentMenuItem} mode="horizontal">
          <Menu.Item key="Logo">
            <Link to = "/">Logo/Home</Link>
          </Menu.Item >
          <Menu.Item key="Delivery">
            <Link to = "/deliverydispatch">Delivery and Dispatch</Link>
          </Menu.Item >
          <Menu.Item key="Contact" >
            <Link to = "/contactus">Contact Us</Link>
          </Menu.Item>
          <Menu.Item key="About">
            <Link to = "/aboutus">About us</Link>
          </Menu.Item>
          <Menu.Item key="Blog">
            <Link to = "/blog">Blog</Link>
          </Menu.Item>
          <Menu.Item key = {menuItemKey}>
            <Link to = {menuItemTo}>{menuItemValue}</Link>
          </Menu.Item>
          <Menu.Item key="Cart">
            <Link to = "/cart">Cart</Link>
          </Menu.Item>
      </Menu>
  );

}



/*
export default class Navbar extends React.Component {


  state = {
    current: '',
  };

  

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key});
  };

  
  

  render() {
    const { current } = this.state;
    return (

            <Menu className="Menu" style={{ textAlign: 'center' }} onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="Logo">
                  <Link to = "/">Logo/Home</Link>
                </Menu.Item >
                <Menu.Item key="Delivery">
                  <Link to = "/deliverydispatch">Delivery and Dispatch</Link>
                </Menu.Item >
                <Menu.Item key="Contact" >
                  <Link to = "/contactus">Contact Us</Link>
                </Menu.Item>
                <Menu.Item key="About">
                  <Link to = "/aboutus">About us</Link>
                </Menu.Item>
                <Menu.Item key="Blog">
                  <Link to = "/blog">Blog</Link>
                </Menu.Item>
                <Menu.Item key="Login">
                  <Link to = "/login">Login/Sign Up</Link>
                </Menu.Item>
                <Menu.Item key="Cart">
                  <Link to = "/cart">Cart</Link>
                </Menu.Item>
            </Menu>
    );
  }
}*/



