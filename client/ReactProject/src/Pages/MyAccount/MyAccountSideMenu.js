import { Menu } from 'antd';
import React, { useState } from 'react';

const isAuthenticated = 1;

export default function MyAccountSideMenu(){
    const [userType,setUseType] = useState(1);

    return (
      <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline">
        <Menu.Item key="myAccount">My Account</Menu.Item>

        { userType === 1 && isAuthenticated? 
          (<React.Fragment>
            <Menu.Item key="browseProducts">Browse Products</Menu.Item>
            <Menu.Item key="viewCart">View Cart</Menu.Item>
            <Menu.Item key="manageOrders">Manage Orders</Menu.Item>
            <Menu.Item key="editProfiles">Edit Profiles</Menu.Item>
          </React.Fragment>) : null }
        
          { userType === 2 && isAuthenticated? 
          (<React.Fragment>
            <Menu.Item key="manageProducts">Manage Products</Menu.Item>
            <Menu.Item key="newOrders">New Orders</Menu.Item>
            <Menu.Item key="processedOrders">Processed Orders</Menu.Item>
            <Menu.Item key="editCompanyInformation">Edit Company Information </Menu.Item>
            <Menu.Item key="editProfile">Edit Profile</Menu.Item>
          </React.Fragment>) : null }

        <Menu.Item key="logOut">Log Out</Menu.Item>
      </Menu>     
      
    )
}