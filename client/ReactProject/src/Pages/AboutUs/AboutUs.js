import '../../_assets/CSS/pages/AboutUs.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCompanyInfo } from '../../_actions/companyInfoActions';

const AboutUs = () =>{

    const companyInfo = useSelector(state => state.companyInfoState.companyInfo);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(Object.keys(companyInfo).length === 0 && companyInfo.constructor === Object){
            dispatch(getCompanyInfo());
        }
    }, [dispatch, companyInfo]);


    return (
        <div>
        <div id="about-us-window">
            About our company
        </div>
        <div id="about-us-text">
            {companyInfo.c_about}
        </div>
      </div>
    )
}

export default AboutUs
