import '../../_assets/CSS/pages/HomepageAdmin/ProductListAdmin.css';
import ProductAdmin from './ProductAdmin';
import { getAllCategories } from '../../_actions/categoryActions';

import { useSelector  } from 'react-redux';
import { useEffect } from 'react'; 
import { Spin } from 'antd';
import { getCategoryName } from '../../_services/SharedFunctions';

const ProductList = props => {
    const categories = useSelector(state => state.categoryState.categories);

    useEffect(() => {             
        if(!categories.length) props.dispatch(getAllCategories());
    }, []);

    let rederableProducts;
    
    
    if(!props.productsList.length) rederableProducts = [];
    else{
        rederableProducts = props.productsList.map(p => {
            const productProps = {
                product: p,
                dispatch: props.dispatch,
                categoryName: getCategoryName(p.p_categories, categories)
            }
            return <div key={p._id}><ProductAdmin {...productProps}/></div>
        });
    }
    
    return (
        <div>  
            {props.errorLoading ? <h1 style = {{textAlign: 'center', color: 'red'}}>Could not load data, please try refreshing page</h1> : <></>}
            {props.loading ? <div style={{textAlign: 'center'}}><Spin size="large"/></div> : <></>}

            <div id="admin-product-list-container">
                {rederableProducts}
            </div>
        </div>
    );
};

export default ProductList;