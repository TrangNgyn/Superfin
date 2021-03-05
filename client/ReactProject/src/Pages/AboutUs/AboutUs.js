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
      <>
        <div className="page-title-holder fill center-text">
          <h2>About Our Company</h2>
        </div>
        <div id="about-us-text" className="container">
          <p>{companyInfo.c_about}</p>
        </div>
      </>
    )
}

export default AboutUs
