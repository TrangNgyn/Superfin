import ProductList from '../../SharedComponents/ProductList/ProductList';
import {HomepageCarousel} from './HomepageCarousel';
import '../../_assets/CSS/pages/Homepage/Homepage.css';

export default function Homepage(){
    return(
    	<>
	        <div className="homepage-product-list-outer-container-0">
                <HomepageCarousel />
                <h3>SHOWN BY CATEGORY</h3>

                <div id="homepage-product-list-outer-container-1">
                    <ProductList />
                </div>
	        </div>
        </>
    );
}