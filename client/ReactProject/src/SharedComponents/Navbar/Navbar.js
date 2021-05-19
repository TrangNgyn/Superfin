import { Menu, Dropdown, Badge } from 'antd';
import { UserOutlined, ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch  } from 'react-redux';
import { useAuthUpdate, useAuth } from '../AuthContext/AuthContext';
import { _logout } from '../../_services/SharedFunctions';
import { userConstants } from '../../_constants/user.constants';
import { getAllCategories } from '../../_actions/categoryActions';
import image from '../../_assets/Images/new_logo.jpg'
import { history } from '../../_helpers/history';
import axios from 'axios';
import { baseURL } from '../../_helpers/axiosBaseURL';


const { SubMenu } = Menu;





export default function Navbar(){
    const dispatch = useDispatch();
    const updateAuth = useAuthUpdate();             //authorization data
    const auth = useAuth();

    const [userDetails, setUserDetails] = useState({});             //stores users detials to access their name

    const [parentCategoires, setParentCategories] = useState([]);         //categories in local state
    const [childCategories, setChildCategories] = useState([]);

    const categories = useSelector(state => state.categoryState.categories);           //categories in redux-store
    const emptyCategories = useSelector(state => state.categoryState.empty);

    // update the number of items for Cart(itemCount) icon
    const itemCount = useSelector(state => state.cartState.items.length);
    // check if the order is being processed
    const isLoading = useSelector(state => state.cartState.loading);

    useEffect(() => {                                                      
        if(!categories.length && !emptyCategories) dispatch(getAllCategories());    //for populating categories
        else{   
            if(!parentCategoires.length){
                const parents = categories.filter(c => {
                    return c.path === null;
                });
                setParentCategories(parents);
            }
            if(!childCategories.length){
                const children = categories.filter(c => {
                    return c.path !== null;
                });
                setChildCategories(children);
            }
        }
    }, [categories.length, dispatch, categories, childCategories.length, emptyCategories, parentCategoires.length]);

    useEffect(() => {   //for populating the welcome name    
        if(auth.roles[0] !== userConstants.ROLE_GUEST && JSON.stringify(userDetails) === '{}'){

            const config = { headers:{ authorization : `Bearer ${auth.access_token}` }};
            axios.defaults.baseURL = baseURL;

            axios.get('api/user/', config)
            .then(res => { setUserDetails(res.data) })
            .catch(err => {
                console.log(err);
                if(err.response.status === 401) _logout(updateAuth);
            });
        } 
        else if(auth.roles[0] === userConstants.ROLE_GUEST && JSON.stringify(userDetails) !== '{}') setUserDetails({});   //very important condition
    }, [auth, updateAuth, userDetails]);
 
    const logout = () => {         
        _logout(updateAuth);
    }





    const customerMenu = (                  //menus to be conditionally rendered 
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


    let accountSpecificMenu = <></>;
    if(auth.roles[0] === userConstants.ROLE_CUSTOMER) accountSpecificMenu = customerMenu;

    // Account Menu
    const accountMenu = (
        <Menu>
            {accountSpecificMenu}
            <Menu.Item onClick={logout}>Logout</Menu.Item>
        </Menu>
    );

    const accountMenuMobile = (
        <SubMenu 
            key="AccountMenuMobile" 
            className="submenu-background"  
            icon={<UserOutlined />} 
            title={"Welcome, " + userDetails.first_name}
        >
            {accountSpecificMenu}
            <Menu.Item onClick={logout}>Logout</Menu.Item>
        </SubMenu>
    );
  
    const categoriesMenu = parentCategoires.map(p => {                  //dynamic category drop down
        const sub_categories = childCategories
            .filter(c => { return c.path === `,${p.c_name},`})
            .map(c => {
                return <Menu.Item key={c._id}>{c.c_name}</Menu.Item>
            });
            return (
                <SubMenu key={p._id} title={p.c_name}>{sub_categories}</SubMenu>
            );
    })

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

    let login = ( 
        <Menu.Item key = "Login" icon={<UserOutlined />}>
            <Link to="/login"> Login/Sign up </Link>
        </Menu.Item>
    );
    let loginMobile = login;

    if(auth.roles[0] === userConstants.ROLE_CUSTOMER){
        login = (
            <Menu.Item key = "Welcome"  icon={<UserOutlined />}>
                <Dropdown overlay={accountMenu}>
                    <span> Welcome, {userDetails.first_name} </span>
                </Dropdown>
            </Menu.Item>
        );
        loginMobile = (<>{accountMenuMobile}</>);
    }
    else if(auth.roles[0] ===userConstants.ROLE_ADMIN){
        login = (
            <Menu.Item onClick={logout} key = "Welcome"  icon={<UserOutlined />}>
                <span> Logout </span>
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
                <Link to="/order">Add Order</Link>
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

            <Menu.Item key="Blog">
                <Link to="/blog"> Blog </Link>
            </Menu.Item>

            <Menu.Item key="Cart" 
                icon = {
                    <Badge count={itemCount} showZero style={{backgroundColor: "#EB6E00"}} >
                        <ShoppingCartOutlined />
                    </Badge>          
                }
            >
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

            <Menu.Item key="Blog">
                <Link to="/blog"> Blog </Link>
            </Menu.Item>
        </SubMenu>
    );

    if(auth.roles[0] === userConstants.ROLE_ADMIN){
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
                    <Link to="/manageCategories">Manage Product Categories</Link>
                </Menu.Item>

                <Menu.Item key="EditCompany">
                    <Link to="/editCompanyInformation">Edit Company Information</Link>
                </Menu.Item>
            </>
        );
    }

    let logoLink = '/';           //logo link for homepage navigation
    if(auth.roles[0] === userConstants.ROLE_ADMIN) logoLink = '/admin';




  
    return (
        <>
            {
                isLoading 
                ?
                // don't allow the user to navigate if true
                <Menu className="Navbar box-shadow" mode="horizontal" selectable={false}>
                    <Menu.Item key="Logo" id="Logo" selectable="false" disabled={true}>
                        <img src={image} alt="Logo" onClick={() => { history.push(logoLink)}}/>
                    </Menu.Item>
                </Menu>
                :
                <>
                    <Menu className="Navbar box-shadow" mode="horizontal" selectable={false}>
                        <Menu.Item key="Logo" id="Logo" selectable="false">
                            {
                                auth.roles[0] === userConstants.ROLE_ADMIN
                                ?
                                <Link to="/admin">
                                    <img src={image} alt="Logo" />
                                </Link>
                                :
                                <Link to="/">
                                    <img src={image} alt="Logo" />
                                </Link>
                            }
                        </Menu.Item>

                        {mainMenu}

                        {login}
                    </Menu>

                    <Menu className="Navbar-Mobile" mode="inline" selectable={false} onClick={() => {history.push(logoLink)}}>
                        <Menu.Item key="Logo" id="Logo">
                            {
                                auth.roles[0] === userConstants.ROLE_ADMIN
                                ?
                                <Link to="/admin">
                                    <img src={image} alt="Logo" />
                                </Link>
                                :
                                <Link to="/">
                                    <img src={image} alt="Logo" />
                                </Link>
                            }
                        </Menu.Item>

                        {mainMenuMobile}

                        <Menu.Item key="Cart" icon = {<ShoppingCartOutlined/>}>
                            <Link to="/cart"> Cart </Link>
                        </Menu.Item>

                        {loginMobile}
                    </Menu>
                </>
            }
        </>
    );
}
