import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCompanyInfo } from '../../_actions/companyInfoActions';

const TermsConditions = () =>{
    const companyInfo = useSelector(state => state.companyInfoState.companyInfo);
    const dispatch = useDispatch();
    console.log(companyInfo);
    
    useEffect(() => {
        if(Object.keys(companyInfo).length === 0 && companyInfo.constructor === Object){
            dispatch(getCompanyInfo());
        }
    }, [dispatch, companyInfo]);

    return (
		<>
			<div className="page-title-holder fill">
				<h2>Terms {"&"} Conditions</h2>
			</div>
			<div className="container">
				<p style={{textAlign: 'center'}}>{`${companyInfo.c_TandC}`}</p>
			</div>
		</>
    )
}

export default TermsConditions
