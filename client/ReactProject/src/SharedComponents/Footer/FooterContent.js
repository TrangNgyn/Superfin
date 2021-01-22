import { Form, Input, Button } from 'antd';
import { 
    FacebookFilled, 
    InstagramFilled, 
    TwitterSquareFilled,
    YoutubeFilled 
} from '@ant-design/icons';
import FooterEmailInput from './FooterEmailInput';
export default function FooterMain(){
    return (
        <div class="footer-content-container">
            <div id="footer-email-input">
                <FooterEmailInput />
            </div>

            <div id="footer-social-media-links">
                <a className = "SocialMediaIcon" href="https://www.facebook.com/" title="Facebook Link">
                    <FacebookFilled />
                </a>
                <a className = "SocialMediaIcon" href="https://www.instagram.com/" title="Instagram Link">
                    <InstagramFilled />
                </a>
                <a className = "SocialMediaIcon" href="https://www.twitter.com/" title="Twitter Link">
                    <TwitterSquareFilled /> 
                </a>
                <a className = "SocialMediaIcon" href="https://www.youtube.com/" title="Youtube Link">
                    <YoutubeFilled />
                </a>
            </div>
            <div id="footer-support-details">
                <div>Email: support@supergfin.com</div>
                <div>Phone: 1800xxxx</div>
            </div>
        </div>
    );
}