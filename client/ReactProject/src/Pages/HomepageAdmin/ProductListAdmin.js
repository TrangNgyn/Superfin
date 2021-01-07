import ProductAdmin from './ProductAdmin';
import {fetchProducts} from '../../SharedComponents/ProductList/MockProductList';
import '../../_assets/CSS/pages/HomepageAdmin/ProductListAdmin.css';

const prods = fetchProducts();

const ProductList = () => {
    //const [isLoading, setIsLoading] = useState(true);

    const rederableProducts = prods.map((p) => {
      return <div key={p.id}><ProductAdmin {...p}/></div>
    });

    return (
      <>
        <div id="admin-product-list-container">
          {rederableProducts}
        </div>

      </>
  );
};

export default ProductList;