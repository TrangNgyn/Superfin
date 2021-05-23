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
        <>
            <div className="page-title-holder fill">
                <h2>Delivery and Dispatch</h2>
            </div>
            <div className="container">
                <p style={{textAlign: 'center'}}>{companyInfo.c_delivery}</p>
            </div>
        </>
    )
};

export default DeliveryDispatch;
