import { Menu } from 'antd';
// import React, { useState } from 'react';

export default function MyAccount(){
  // const[currentMenuItem, setMenuItem] = useState('');

    return (
        <Menu style={{ width: 256 }} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline">
        <Menu.Item key="myAccount">My Account</Menu.Item>

        <Menu.Item key="browseProducts">Browse Products</Menu.Item>
        <Menu.Item key="viewCart">View Cart</Menu.Item>
        <Menu.Item key="manageOrders">Manage Orders</Menu.Item>
        <Menu.Item key="editProfiles">Edit Profiles</Menu.Item>
      
        <Menu.Item key="manageProducts">Manage Products</Menu.Item>
        <Menu.Item key="newOrders">New Orders</Menu.Item>
        <Menu.Item key="processedOrders">Processed Orders</Menu.Item>
        <Menu.Item key="editCompanyInformation">Edit Company Information </Menu.Item>
        <Menu.Item key="editProfile">Edit Profile</Menu.Item>

        <Menu.Item key="logOut">Log Out</Menu.Item>
      </Menu>     
      
    )
}