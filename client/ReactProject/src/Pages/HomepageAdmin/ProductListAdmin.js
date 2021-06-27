import ProductAdmin from './ProductAdmin';
import { getAllCategories } from '../../_actions/categoryActions';

import { useSelector  } from 'react-redux';
import { useEffect } from 'react'; 
import { Spin, List } from 'antd';
import { getCategoryName } from '../../_services/SharedFunctions';

const ProductList = props => {
    const categories = useSelector(state => state.categoryState.categories);
    const dispatch = props.dispatch;
    
    useEffect(() => {             
        if(!categories.length) dispatch(getAllCategories());
    }, [categories.length, dispatch]);

    let renderableProducts;
    
    
    if(!props.productsList.length) renderableProducts = [];
    else{
        renderableProducts = props.productsList.map(p => {
            return {
                product: p,
                dispatch: props.dispatch,
                categoryName: getCategoryName(p.p_categories, categories),
                updateAuth: props.updateAuth,
                access_token: props.access_token
            }
        });
    }
    
    return (
        <>  
            {props.errorLoading ? <h1 style = {{textAlign: 'center', color: 'red'}}>Could not load data, please try refreshing page</h1> : <></>}
            {props.loading ? <div style={{textAlign: 'center'}}><Spin size="large"/></div> : <>
                <List
                    grid={{
                        gutter: 6, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 5
                    }}
                    pagination={{
                        position: 'bottom',
                        defaultPageSize: 8
                    }}
                    dataSource={renderableProducts}
                    renderItem={productProps => {
                    return(
                        <List.Item>                        
                            <ProductAdmin {...productProps}/>
                        </List.Item>
                    )}}
                />
            </>}
        </>
    );
};

export default ProductList;