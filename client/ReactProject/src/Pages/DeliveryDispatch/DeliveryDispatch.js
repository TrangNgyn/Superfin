import '../../_assets/CSS/pages/DeliveryDispatch.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCompanyInfo } from '../../_actions/companyInfoActions';




const DeliveryDispatch = () =>{

    const companyInfo = useSelector(state => state.companyInfoState.companyInfo);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(Object.keys(companyInfo).length === 0 && companyInfo.constructor === Object){
            dispatch(getCompanyInfo());
        }
    }, [dispatch, companyInfo]);

    return (
        <div>
            <div id="deliverydispatch-window">
                Delivery and Dispatch
            </div>
            <div id="deliverydispatch-text">
                {companyInfo.c_delivery}
            </div>
        </div>
    )
};

export default DeliveryDispatch;
