import { Layout, Row, Col, Avatar } from 'antd';
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
                <Row>
                    <h1>My Account</h1> 
                </Row>
                <Row>
                    <Col span={4}>
                        <Avatar size="large" icon={<UserOutlined />} />
                    </Col>
                    <Col span={20}>
                        Username
                    </Col>                    
                </Row>
                <Row>
                    
                </Row>
            </Content>
        </Layout>
    )
}