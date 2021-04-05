import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCompanyInfo } from '../../_actions/companyInfoActions';

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
            <div id="footer-support-details">
                <div>Email: {companyInfo.c_email}</div>
                <div>Phone: {companyInfo.c_number}</div>
            </div>
        </div>
    );
}