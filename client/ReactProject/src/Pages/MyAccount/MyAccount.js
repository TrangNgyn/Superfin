import { Layout } from 'antd';
import { Avatar } from 'antd';
import React, { useState } from 'react';
import MyAccountSideMenu from '../MyAccount/MyAccountSideMenu'
import { UserOutlined } from '@ant-design/icons';


const { Header, Content, Sider } = Layout;
const isAuthenticated = 1;

export default function MyAccount(){
    const [userType,setUseType] = useState(1);
    return(
        <Layout>
            <Sider width = "256" className="my-account-sider-menu"> 
                <MyAccountSideMenu/>
            </Sider>
            <Content>
                <div>
                   <h1>My Account</h1> 
                   <Avatar size="large" icon={<UserOutlined />} />
                </div>
                <div>
                    
                </div>
            </Content>
        </Layout>
    )
}