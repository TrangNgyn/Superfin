import '../../_assets/CSS/pages/HomepageAdmin/ProductListAdmin.css';
import ProductAdmin from './ProductAdmin';
import { Spin } from 'antd'; 

const ProductList = props => {

    const rederableProducts = props.productsList.map(p => {
        const productProps = {
            product: p,
            dispatch: props.dispatch
        }
        return <div key={p._id}><ProductAdmin {...productProps}/></div>
    });

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