import { Menu, Dropdown } from 'antd';
import { history } from '../../_helpers/history';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import image from '../../_assets/Images/new_logo.jpg'

//fake user and login check
const fakeUser = {
  name: "Homer",
  loggedIn: false,
  userType: "GUEST"
}

//fake getCategories API function
const getCategories = () => {
  return [
    {c_name: "Bags"},
    {c_name: "Clams"},
    {c_name: "Cups"},
    {c_name: "Food Wrappings"},
    {c_name: "Boxes"}
  ];
}

export default function Navbar(){

  const [userType, setUserType] = useState(fakeUser.userType);

  const logout = () => {          //fake login logout functions
    setUserType("GUEST");
  }
  
  //delete these login functions
  const loginUserCustomer = () => {
    setUserType("CUSTOMER");
    history.push('/');
  }

  const loginUserAdmin = () => {
    setUserType("ADMIN");
    history.push('/admin');
  }

  const subCustomer = (
    <>
      <Menu.Item>
          <Link to="/myAccount"> My Account </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/products"> Browse Products </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/cart"> View Cart </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/manageOrders"> Manage Orders </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/editProfile"> Edit Profile </Link>
      </Menu.Item>
    </>
  );

  const subAdmin = (
    <Menu.Item>
      <Link to="/myAccountAdmin"> My Account </Link>
    </Menu.Item>
  );

  let subWelcome = <></>;

  if(userType==="CUSTOMER") subWelcome = subCustomer;
  else if(userType==="ADMIN") subWelcome = subAdmin;

  //Welcome User CUSTOMER dropdown
  const welcomeDropdown = (
    
    <Menu>
      {subWelcome}
      <Menu.Item>
        <Link to="/" onClick={logout}> Logout</Link>
      </Menu.Item>
    </Menu>
  );
  
  //Fake categories API call
  const categories = getCategories();   

  const ourProductsDropdown = (                     //Our Products dropdown
    <Menu >
      <Menu.Item>
        <Link to="/products/categories">
          <b>Shop By Category</b>
        </Link>
      </Menu.Item>

      {categories.map((cat) => {
        return  <Menu.Item key={cat.c_name}> 
                  <Link to={"/products/categories/" + cat.c_name}> {cat.c_name} </Link>
                </Menu.Item>
      })}

      <Menu.Item>
        <Link to="/products">
          <b>{"View all Products  >"}</b>
        </Link>
      </Menu.Item>
    </Menu>
  );  
  
  //Login/Welcome, User menu item that changes based on whether user is logged in or not

  let login = ( <Menu.Item key = "Login" onContextMenu={loginUserCustomer} onDoubleClick={loginUserAdmin} icon={<UserOutlined />} style = {{float: "right"}}>
                  <Link to="/login"> Login/Sign up </Link>       
                </Menu.Item>
      );

  if(userType==="CUSTOMER"){
    login = ( <Menu.Item key = "Welcome"  icon={<UserOutlined />} style = {{float: "right"}}>
                <Dropdown overlay={welcomeDropdown}>
                  <span> Welcome, {fakeUser.name} </span>
                </Dropdown>
              </Menu.Item>
    );
  }
  else if(userType==="ADMIN"){
    login = (
      <Menu.Item key = "Welcome"  icon={<UserOutlined />} style = {{float: "right"}}>
        <Dropdown overlay={welcomeDropdown}>
          <span> Welcome, {fakeUser.name} </span>
        </Dropdown>
      </Menu.Item>
    );
  }

  const orderDropdown = (
    <Menu>
        <Menu.Item>
            <Link to="/currentOrders">Current Orders</Link>
        </Menu.Item>

        <Menu.Item>
            <Link to="/admin">Add Order</Link>
        </Menu.Item>

        <Menu.Item>
            <Link to="/processedOrders">Processed Orders</Link>
        </Menu.Item>
    </Menu>
  );

  const productsDropdown = (
    <Menu>
        <Menu.Item>
            <Link to="/manageProducts">Manage Products</Link>
        </Menu.Item>

        <Menu.Item>
            <Link to="/editAddProducts">Add Product</Link>
        </Menu.Item>
    </Menu>
  );

  let mainMenu = (
    <>
      <Menu.Item key="Products" style = {{marginLeft: "30px", marginRight: "30px"}}>
        <Dropdown overlay={ourProductsDropdown}>
          <span>Our Products</span>
        </Dropdown>
      </Menu.Item >

      <Menu.Item key="Delivery">
              <Link to="/deliveryDispatch"> Delivery and Dispatch </Link>
            </Menu.Item>

      <Menu.Item key="About" style = {{marginLeft: "30px", marginRight: "30px"}}>
        <Link to="/aboutUs"> About Us </Link>
      </Menu.Item>

      <Menu.Item key="Blog" style = {{marginLeft: "30px"}}>
        <Link to="/blog"> Blog </Link>
      </Menu.Item>

      <Menu.Item key="Cart" className = "rightItems"  icon = {<ShoppingCartOutlined /> } style = {{float: "right", marginLeft:"60px"}}>
        <Link to="/cart"> Cart </Link>
      </Menu.Item>
    </>       
  );

  if(userType==="ADMIN"){
    mainMenu = (
      <>
        <Menu.Item key="Orders" style = {{marginLeft: "30px", marginRight: "30px"}}>
          <Dropdown overlay={orderDropdown}>
            <span>Orders</span>
          </Dropdown>
        </Menu.Item>

        <Menu.Item key="Products" style = {{marginLeft: "30px", marginRight: "30px"}}>
          <Dropdown overlay={productsDropdown}>
            <span>Products</span>
          </Dropdown>
        </Menu.Item>

        <Menu.Item key="EditCompany" style = {{marginLeft: "30px", marginRight: "30px"}}>
            <Link to="/editCompanyInformation">Edit Company Information</Link>
        </Menu.Item>
      </>
    );
  }

    return (
      <div>
        <Menu mode="horizontal" style={{textAlign: "center"}}>
            <Menu.Item key="Logo" style = {{float: "left"}}>
              <Link to="/">
                <img src={image} style= {{ width: "100px"}} alt="Logo" />
              </Link>
            </Menu.Item >
            {mainMenu}
            {login}
        </Menu> 
      </div>
  );
}