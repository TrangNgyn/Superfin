import FooterMenu from './FooterMenu';
import FooterMenuMobile from './FooterMenuMobile';
import FooterContent from './FooterContent';



export default function FooterMain(){
    return (
        <>
            <FooterMenu />
            <FooterMenuMobile />
            {/* <FooterContent /> */}
            <div id="copyright-background">©Copyright ©2020 Sungent Packaging | All rights reserved</div>
        </>
    );
  }