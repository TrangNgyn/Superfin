import { Menu, Dropdown } from 'antd';
import { history } from '../../_helpers/history';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import image from '../../_assets/Images/Logo.png'

//fake user and login check
const fakeUser = {
  name: "Homer",
  loggedIn: false
}

const checkLoggedIn = () => {
  return fakeUser.loggedIn;
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
export default function Navbar(props){
  const[currentMenuItem, setMenuItem] = useState("");
  const [loggedStatus, setLoggedStatus] = useState(checkLoggedIn);
  console.log(currentMenuItem);

  function handleMenuClick(menuitem){
    setMenuItem(menuitem);
  }

  const logout = () => {          //fake login logout functions
    fakeUser.loggedIn = false;
    setLoggedStatus(false);
  }

  //delete this
  const loginUser = () => {
    fakeUser.loggedIn = true;
    setLoggedStatus(true);
    history.push('/');
  }
  //Welcome, User dropdown
  const welcomeDropdown = (
    <Menu>
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

    let login = ( <Menu.Item key = "Login" onContextMenu={loginUser} icon={<UserOutlined />} style = {{float: "right"}}>
                    <Link to="/login"> Login/Sign up </Link>        {/*remove onclick event. This is for demonstration only*/}
                  </Menu.Item> );

    if(loggedStatus){
      login = ( <Menu.Item key = "Welcome"  icon={<UserOutlined />} style = {{float: "right"}}>
                  <Dropdown overlay={welcomeDropdown}>
                    <span> Welcome, {fakeUser.name} </span>
                  </Dropdown>
                </Menu.Item>
      );
    }

    return (
      <div >

        <Menu className="Menu" onClick={(menu) => handleMenuClick(menu.key)} mode="horizontal" style={{textAlign: "center"}}>

            <Menu.Item key="Logo" style = {{float: "left"}}>
              <Link to="/">
                <img src={image} style= {{ width: "100px"}} alt="Logo" />
              </Link>
            </Menu.Item >

            <Menu.Item key="Products" style = {{marginLeft: "30px", marginRight: "30px"}}>
              <Dropdown overlay={ourProductsDropdown}>
                <span>Our Products</span>
              </Dropdown>
            </Menu.Item >

            <Menu.Item key="Delivery" style = {{marginLeft: "30px", marginRight: "30px"}}>
              <Link to="/deliveryDispatch"> Delivery and Dispatch </Link>
            </Menu.Item >

            <Menu.Item key="Contact" style = {{marginLeft: "30px", marginRight: "30px"}}>
              <Link to="/contactUs"> Contact Us </Link>
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

            {login}
        </Menu>
      </div>
  );
}
