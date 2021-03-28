import '../../_assets/CSS/pages/Homepage/CategoryList.css';
import { getAllProducts } from '../../_actions/productActions';
import { useState, useEffect } from "react";
import { Pagination, Spin, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const itemsPerPage = 12;

const AllProducts = () => {
    const dispatch = useDispatch(); // In charge of getting data from productActions.

    const [page, setPage] = useState(0);

    const products = useSelector(state => state.productState.products);
    const productsLoading = useSelector(state => state.productState.productsLoading);
    const productsError = useSelector(state => state.productState.productsError);

    const maxNumberOfPages = (Math.ceil(products.length/itemsPerPage) - 1);

    const productsList = products.slice( page * itemsPerPage,
        ((page + 1) * itemsPerPage) > products.length ? products.length : ((page + 1) * itemsPerPage));

    const productView = productsList.map((item, index) => {
        return (
        <div key={index}>
            <Card
                hoverable
                style={{ width: 120 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <Card title={item.p_name} description={item.p_code} />
            </Card>
        </div>);
    });
    useEffect(() => {         
        if(!products.length){
            dispatch(getAllProducts());
        }
    }, [products.length, dispatch]);

    const onChange = p => { setPage(p - 1) };

    return (
        <>
            {
                productsError 
                ?   <h1 style = {{textAlign: 'center', color: 'red'}}>Could not load data, please try refreshing page</h1>:<></>
            }
            {
                productsLoading
                ?   <Spin size='large'/> 
                :   <>
                        <div className="Category-List-Container">{productView}</div>
                        <Pagination defaultCurrent={1} total={(maxNumberOfPages + 1) * 10} onChange = {onChange}/>
                    </>  
            }  
        </>
    );
};

export default AllProducts;