import { Menu, Dropdown } from 'antd';
import { UserOutlined, ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch  } from 'react-redux';

import { getAllCategories } from '../../_actions/categoryActions';
import { history } from '../../_helpers/history';
import image from '../../_assets/Images/new_logo.jpg'
const { SubMenu } = Menu;


//fake user and login check
const userDetails = {
  name: "Homer",
  loggedIn: false,
  userType: "GUEST"
}






export default function Navbar(props){
    const [userType, setUserType] = useState(userDetails.userType);
    const categories = useSelector(state => state.categoryState.categories);
    const dispatch = useDispatch();

    useEffect(() => {             
        if(!categories.length) dispatch(getAllCategories());
    }, [categories.length, dispatch]);

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


  const customerMenu = (
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

  const adminMenu = (
    <>
      <Menu.Item>
        <Link to="/myAccountAdmin"> My Account </Link>
      </Menu.Item>
    </>
  );

  let accountSpecificMenu = <></>;

  if(userType==="CUSTOMER") accountSpecificMenu = customerMenu;
  else if(userType==="ADMIN") accountSpecificMenu = adminMenu;

  // Account Menu
  const accountMenu = (
    <Menu>
      {accountSpecificMenu}
      <Menu.Item>
        <Link to="/" onClick={logout}> Logout</Link>
      </Menu.Item>
    </Menu>
  );

  const accountMenuMobile = (<SubMenu key="AccountMenuMobile" className="submenu-background"  icon={<UserOutlined />} title={"Welcome, " + userDetails.name}>
      {accountSpecificMenu}
      <Menu.Item>
        <Link to="/" onClick={logout}>Logout</Link>
      </Menu.Item>
    </SubMenu>
  );
  let categoriesMenu = <></>

  if(categories.length !== 0){
      categoriesMenu = categories.map(c => {
          return ( <Menu.Item key={c._id}> 
                      <Link to={`/products/${c._id}`}> {c.c_name} </Link>
                  </Menu.Item>)
      });
  }

  const ourProductsDropdown = ( //Our Products dropdown
    <Menu>
      <Menu.Item>
        <Link to="/">
          <b>Shop By Category</b>
        </Link>
      </Menu.Item>
      {categoriesMenu}
      <Menu.Item>
        <Link to="/products">
          <b>{"View all Products  >"}</b>
        </Link>
      </Menu.Item>
    </Menu>
  );

  const ourProductsSubmenuMobile = ( //Our Products Submenu
    <SubMenu key="OurProductsSubmenu" className="submenu-background" title="Our Products">
      <Menu.Item>
        <Link to="/products/categories">
          <b>Shop By Category</b>
        </Link>
      </Menu.Item>
      {categoriesMenu}
      <Menu.Item>
        <Link to="/products">
          <b>{"View all Products  >"}</b>
        </Link>
      </Menu.Item>
    </SubMenu>
  );
  
  //Login/Welcome, User menu item that changes based on whether user is logged in or not

  let login = ( <Menu.Item key = "Login" onContextMenu={loginUserCustomer} onDoubleClick={loginUserAdmin} icon={<UserOutlined />}>
      <Link to="/login"> Login/Sign up </Link>       
    </Menu.Item>
  );
  let loginMobile = login;

  if(userType==="CUSTOMER"){
    login = (
      <Menu.Item key = "Welcome"  icon={<UserOutlined />}>
        <Dropdown overlay={accountMenu}>
          <span> Welcome, {userDetails.name} </span>
        </Dropdown>
      </Menu.Item>
    );
    loginMobile = (<>{accountMenuMobile}</>);
  }
  else if(userType==="ADMIN"){
    login = (
      <Menu.Item key = "Welcome"  icon={<UserOutlined />}>
        <Dropdown overlay={accountMenu}>
          <span> Welcome, {userDetails.name} </span>
        </Dropdown>
      </Menu.Item>
    );
    loginMobile = (<>{accountMenuMobile}</>);
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
      <Menu.Item key="Products">
        <Dropdown overlay={ourProductsDropdown}>
          <span>Our Products</span>
        </Dropdown>
      </Menu.Item >

      <Menu.Item key="Delivery">
        <Link to="/deliveryDispatch"> Delivery and Dispatch </Link>
      </Menu.Item>

      <Menu.Item key="About">
        <Link to="/aboutUs"> About Us </Link>
      </Menu.Item>

      <Menu.Item key="Blog">
        <Link to="/blog"> Blog </Link>
      </Menu.Item>

      <Menu.Item key="Cart" icon = {<ShoppingCartOutlined />}>
        <Link to="/cart"> Cart </Link>
      </Menu.Item>
    </>       
  );

  let mainMenuMobile = (
    <SubMenu key="SubMenuMoreDetails" icon={<MenuOutlined />} title="Menu">
      {ourProductsSubmenuMobile}
      <Menu.Item key="Delivery">
        <Link to="/deliveryDispatch"> Delivery and Dispatch </Link>
      </Menu.Item>

      <Menu.Item key="About">
        <Link to="/aboutUs"> About Us </Link>
      </Menu.Item>

      <Menu.Item key="Blog">
        <Link to="/blog"> Blog </Link>
      </Menu.Item>
    </SubMenu>
  );

  if(userType==="ADMIN"){
    mainMenu = (
      <>
        <Menu.Item key="Orders">
          <Dropdown overlay={orderDropdown}>
            <span>Orders</span>
          </Dropdown>
        </Menu.Item>

        <Menu.Item key="Products">
          <Dropdown overlay={productsDropdown}>
            <span>Products</span>
          </Dropdown>
        </Menu.Item>

        <Menu.Item key="EditCustomer">
            <Link to="/editCustomer">Edit Customer Information</Link>
        </Menu.Item>

        <Menu.Item key="EditCompany">
            <Link to="/editCompanyInformation">Edit Company Information</Link>
        </Menu.Item>
      </>
    );
  }

  return (
    <>
      <Menu className="Navbar box-shadow" mode="horizontal" selectable={false}>
        <Menu.Item key="Logo" id="Logo" selectable="false">
          <Link to="/" >
            <img src={image} alt="Logo" />
          </Link>
        </Menu.Item>
        {mainMenu}
        {login}
      </Menu>
      <Menu className="Navbar-Mobile" mode="inline" selectable={false}>
        <Menu.Item key="Logo" id="Logo">
          <Link to="/" >
            <img src={image} alt="Logo" />
          </Link>
        </Menu.Item>
        {mainMenuMobile}
        <Menu.Item key="Cart" icon = {<ShoppingCartOutlined/>}>
          <Link to="/cart"> Cart </Link>
        </Menu.Item>
        {loginMobile}
      </Menu>
    </>
  );
}