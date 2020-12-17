import '../../_assets/CSS/layouts/Footer/FooterMain.css';
import FooterMenu from './FooterMenu';
import FooterEmailInput from './FooterEmailInput';
import FooterSocialMediaLinks from './FooterSocialMediaLinks';

export default function FooterMain(){
    return (
        <div id="footer">
            <FooterMenu />
            
            <div id="signup-text-background">
                <div id="signup-text">SIGN UP FOR SPEACIAL OFFERS</div>
            </div>

            <div id="email-input-background">
                <FooterEmailInput />
                <div id="support-details">
                    <div>Email: support@supergfin.com</div>
                    <div>Phone: 1800xxxx</div>
                </div>
            </div>

            <div id="social-media-links-background">
                <FooterSocialMediaLinks />
            </div>

            <div id="copyright-background">©Copyright ©2020 Sungent Packaging | All rights reserved</div>
        </div>
    );
  }