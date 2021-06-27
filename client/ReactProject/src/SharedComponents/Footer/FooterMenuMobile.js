import { Menu } from 'antd';
import { Link } from 'react-router-dom';

export default function FooterMenuMobile(){

      return (
        <Menu className="footer-menubar-mobile" mode="vertical" >
            <Menu.Item key="Home" className="item">
                <Link to="/"> Home </Link>
            </Menu.Item >

            <Menu.Item key="Terms" className="item">
              <Link to="/termsAndConditions"> Terms and Conditions </Link>
            </Menu.Item >

            <Menu.Item key="Contact" className="item">
              <Link to="/contactUs"> Contact Us </Link>
            </Menu.Item>
        </Menu>
    );
  }