import { 
    FacebookFilled, 
    InstagramFilled, 
    TwitterSquareFilled,
    YoutubeFilled 
} from '@ant-design/icons';
import '../../_assets/CSS/layouts/Footer/FooterSocialMediaLinks.css';

const FooterSocialMediaLinks = () => {
    return(
        <>
            <a className = "SocialMediaIcon" href="https://www.google.com/" title="Facebook Link">
                <FacebookFilled />
            </a>
            <a className = "SocialMediaIcon" href="https://www.google.com/" title="Instagram Link">
                <InstagramFilled />
            </a>
            <a className = "SocialMediaIcon" href="https://www.google.com/" title="Twitter Link">
                <TwitterSquareFilled /> 
            </a>
            <a className = "SocialMediaIcon" href="https://www.google.com/" title="Youtube Link">
                <YoutubeFilled />
            </a>
        </>
    );
}
export default FooterSocialMediaLinks;