import '../../_assets/CSS/pages/ManageProducts/ManageProducts.css';
import { Select, Pagination, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../_helpers/history';
import { getAllProducts, setDefaultOrder } from '../../_actions/productActions';
import { handleFilter, handleOrder } from './Functions';
import ProductTableRows from './ProductTableRows';

const { Option, OptGroup } = Select;





const ManageProducts = () => {
    const dispatch = useDispatch();

    const productsList = useSelector(state => state.productState.products);                 //Redux store product list
    const errorLoading = useSelector(state => state.productState.error);
    const loading = useSelector(state => state.productState.isLoading);
    const categories = useSelector(state => state.categoryState.categories);
    
    const [filter, setFilter] = useState(null);             //filtering and current page number
    const [order, setOrder] = useState(null);
    const [page, setPage] = useState(0);

    let processedProductsList = [...productsList];         

    if(filter !== null && filter !== 'default') processedProductsList = handleFilter(processedProductsList, filter);        //filtering and ordering the product list
    if(order !== null) processedProductsList = handleOrder(processedProductsList, order);

    const itemsPerPage = 10;
    const maxNumberOfPages = (Math.ceil(processedProductsList.length/itemsPerPage) - 1);             //pagination stuff

    const productTableRowsProps = {                                                         //props for the product table rows
        productsList: processedProductsList,
        page: page,
        dispatch: dispatch,
        categories: categories,
    }

    useEffect(() => {                                                     //checks if the store is empty. If so, do an API request
        if(!productsList.length) dispatch(getAllProducts());
        else dispatch(setDefaultOrder());
    }, [productsList.length, dispatch]);

    let selectCategories = <></>;                                           //dynamically loading categories to filter products in select bar
    if(categories.length !== 0){
        selectCategories = categories.map(p => {
            return <Option key={p._id} value={p._id}>{p.c_name}</Option>
        })
    }

    return (
        <div >
            <div id="manage-products-header">Manage Products</div>

            <div>
                <table id="manage-products-select-table" className="center-content">
                    <tbody>
                        <tr>
                            <td>
                                <div style={{fontSize: "30px", fontWeight: "bold"}}>Products</div>
                            </td>
                            <td>
                                <Select placeholder="Filter by" style={{ width: "300px" }} onChange={e => {setFilter(e); setPage(0)}}>
                                    <Option key={'default'} value={'default'}>{'Remove Filter'}</Option>
                                    
                                    <OptGroup label="Category">
                                        {selectCategories}
                                    </OptGroup>    
                                </Select>
                            </td>
                            
                            <td>
                                <Select placeholder="Order By" style = {{width:"300px"}} onChange={v => setOrder(v)}>
                                    <OptGroup label="Price">
                                        <Option value="p_decending">high to low</Option>
                                        <Option value="p_ascending">low to high</Option>
                                    </OptGroup>
                                    <OptGroup label="Name">
                                        <Option value="n_ascending">A-Z</Option>
                                        <Option value="n_decending">Z-A</Option>
                                    </OptGroup>
                                    <OptGroup label="Item Code">
                                        <Option value="i_ascending">A-Z</Option>
                                        <Option value="i_decending">Z-A</Option>
                                    </OptGroup>  
                                </Select>
                            </td>
                        </tr>
                    </tbody>
                </table>  
            </div>

            {errorLoading ? <h1 style = {{textAlign: 'center', color: 'red'}}>Could not load data, please try again</h1> : <></>}
            {loading ? <div style={{textAlign: 'center'}}><Spin size="large"/></div> : <></>}
      
            <div style = {{height: "500px", display: "table"}}>
                <table style={{width:"100%", textAlign: "center", tableLayout: "fixed"}}>
                    <tbody>
                        <tr style = {{border: "solid black 1px"}}>
                            <th>Product Name</th>
                            <th>Product Code</th> 
                            <th>Price</th>
                            <th>Units Sold</th>
                            <th>Category</th> 
                            <th className="manage-products-icon" style ={{fontSize: "30px"}} onClick={() => {
                                history.push('/editAddProducts');
                            }}>+</th>
                        </tr>
                      
                      <ProductTableRows {...productTableRowsProps} />
                    </tbody>
                </table>  
            </div>
            
            <div style = {{textAlign: "center"}}>
                <Pagination current={page + 1} total={(maxNumberOfPages + 1) * 10} onChange = {p => {setPage(p - 1)}}/>
            </div>
        </div>
    );
}

export default ManageProducts;