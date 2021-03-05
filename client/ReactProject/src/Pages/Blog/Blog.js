import '../../_assets/CSS/pages/Blog/Blog.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCompanyInfo } from '../../_actions/companyInfoActions';

const Blog = () => {

    const companyInfo = useSelector(state => state.companyInfoState.companyInfo);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(Object.keys(companyInfo).length === 0 && companyInfo.constructor === Object){
            dispatch(getCompanyInfo());
        }
    }, [dispatch, companyInfo]);

    return(
        <div>
            <div id="blog-window">
                Company Blog
            </div>
            <div id="blog-text">
                {companyInfo.c_blog}
            </div>
        </div>
    )
}

export default Blog;