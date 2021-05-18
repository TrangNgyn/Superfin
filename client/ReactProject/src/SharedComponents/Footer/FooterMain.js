import { useSelector } from 'react-redux';
import FooterMenu from './FooterMenu';
import FooterMenuMobile from './FooterMenuMobile';
import { useAuth } from '../AuthContext/AuthContext';
import { userConstants } from '../../_constants/user.constants';

export default function FooterMain(){
    const isLoading = useSelector(state => state.cartState.loading); // cart state
    const auth = useAuth();

    return (
        <>
            {   
                auth.roles[0] === userConstants.ROLE_ADMIN
                ?
                    <></>
                :
                isLoading 
                ?
                    <div id="copyright-background">
                        ©Copyright ©2020 Sungent Packaging | All rights reserved
                    </div>
                :
                    <>
                        <FooterMenu />
                        <FooterMenuMobile />
                        <div id="copyright-background">©Copyright ©2020 Sungent Packaging | All rights reserved</div>
                    </>
            }
        </>
    );
}