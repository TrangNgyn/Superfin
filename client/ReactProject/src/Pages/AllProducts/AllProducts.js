import ProductList from '../../SharedComponents/ProductList/ProductList';
import '../../_assets/CSS/pages/Homepage/Homepage.css';

export default function AllProducts(){
    return(
    	<>
	        <div className="homepage-product-list-outer-container-0">
            <h3>All Product</h3>
                <div id="homepage-product-list-outer-container-1">
                    <ProductList />
                </div>
	        </div>
        </>
    );
}