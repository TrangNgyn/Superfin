import { Menu } from 'antd';
import { Link } from 'react-router-dom';





export default function FooterMenu(){

      return (
        <Menu className="footer-menubar"
              mode="horizontal" >

            <Menu.Item key="Terms" className="item">
              <Link to="/termsConditions"> Terms and Conditions </Link>
            </Menu.Item >

            <Menu.Item key="Contact" className="item">
              <Link to="/contactUs"> Contact Us </Link>
            </Menu.Item>
        </Menu>
    );
}
