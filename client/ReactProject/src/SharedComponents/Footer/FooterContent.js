import { 
    FacebookFilled, 
    InstagramFilled, 
    TwitterSquareFilled,
    YoutubeFilled
} from '@ant-design/icons';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCompanyInfo } from '../../_actions/companyInfoActions';

import FooterEmailInput from './FooterEmailInput';

export default function FooterContent(){

    const companyInfo = useSelector(state => state.companyInfoState.companyInfo);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(Object.keys(companyInfo).length === 0 && companyInfo.constructor === Object){
            dispatch(getCompanyInfo());
        }
    }, [dispatch, companyInfo]);

    return (
        <div className="footer-content-container">
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
                <div>Email: {companyInfo.c_email}</div>
                <div>Phone: {companyInfo.c_number}</div>
            </div>
        </div>
    );
}