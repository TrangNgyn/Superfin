import { useSelector } from 'react-redux';
import FooterMenu from './FooterMenu';
import FooterMenuMobile from './FooterMenuMobile';
//import FooterContent from './FooterContent';

export default function FooterMain(){
    
    // cart state
    const isLoading = useSelector(state => state.cartState.loading);

    return (<>
        {
            isLoading ?
                <div id="copyright-background">
                    ©Copyright ©2020 Sungent Packaging | All rights reserved
                </div>
            :
                <>
                    <FooterMenu />
                    <FooterMenuMobile />
                    {/* <FooterContent /> */}
                    <div id="copyright-background">©Copyright ©2020 Sungent Packaging | All rights reserved</div>
                </>
        }
    </>);
  }