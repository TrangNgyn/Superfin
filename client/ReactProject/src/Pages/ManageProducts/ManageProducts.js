import '../../_assets/CSS/pages/ManageProducts/ManageProducts.css';
import { Select, Pagination, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { history } from '../../_helpers/history';
import { getAllProducts, setDefaultOrder } from '../../_actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { handleFilter, handleOrder } from './Functions';
import ProductTableRows from './ProductTableRows';

const { Option, OptGroup } = Select;





/*
    Tasks if time:
    Implement loading circle for the delete modal
    Implement 'item not deleted' modal
    Implement 'item deleted successful' message
*/

/*
    Tasks that still need to be done
    Implement filtering
    Upadate spelling error in 'productActions.js'. (Check the comments in that file)
*/

/*
export const TempHome = () => {
    const dispatch = useDispatch();
    const productsList = useSelector(state => state.productState.products);                 //Redux store product list

    
    useEffect(() => {                                                              //checks if the store is empty. If so, do an API request
        if(!productsList.length) dispatch(getAllProducts());
        else dispatch(setDefaultOrder());
    }, []);

    

    return(
        <>
            <button onClick = { () => {
                history.push('/manageProducts');
            }}>products</button>

            <button onClick = {() => {
                console.log(store.getState().productState.products);
            }}>Show products</button>
        </>)
    ;
}*/



const ManageProducts = () => {
    const dispatch = useDispatch();
    const productsList = useSelector(state => state.productState.products);                 //Redux store product list
    const errorLoading = useSelector(state => state.productState.error);
    const loading = useSelector(state => state.productState.isLoading);
     
    const [page, setPage] = useState(0);
    const itemsPerPage = 10;
    const maxNumberOfPages = (Math.ceil(productsList.length/itemsPerPage) - 1);             //pagination stuff

    const productTableRowsProps = {                                                         //props for the product table rows
        productsList: productsList,
        page: page,
        dispatch: dispatch
    }

    useEffect(() => {                                                     //checks if the store is empty. If so, do an API request
        if(!productsList.length) dispatch(getAllProducts());
        else dispatch(setDefaultOrder());
    }, []);

    return (
        <div >
            <div id="manage-products-header">Manage Products</div>

            <div>
                <table id="manage-products-select-table">
                    <tbody>
                        <tr>
                            <td>
                                <div style={{fontSize: "30px", fontWeight: "bold"}}>Products</div>
                            </td>
                            <td>
                                <Select placeholder="Filter by" style={{ width: "300px" }} onChange={handleFilter}>
                                    <OptGroup label="Stock Level">
                                        <Option value="in_stock">In Stock</Option>
                                        <Option value="out_stock">Out of Stock</Option>
                                    </OptGroup>

                                    <OptGroup label="Category">
                                        <Option value="category_1">category 1</Option>
                                        <Option value="category_2">category 2</Option>
                                        <Option value="category_3">category 3</Option>
                                        <Option value="category_4">category 4</Option>
                                    </OptGroup>    
                                </Select>
                            </td>
                            
                            <td>
                                <Select placeholder="Order By" style = {{width:"300px"}} onChange={v => handleOrder(v, dispatch)}>
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
                            <th>Number in Stock</th>
                            <th className="manage-products-icon" style ={{fontSize: "30px"}} onClick={() => {
                                history.push('/editAddProducts');
                            }}>+</th>
                        </tr>
                      
                      <ProductTableRows {...productTableRowsProps} />
                    </tbody>
                </table>  
            </div>
            
            <div style = {{textAlign: "center"}}>
                <Pagination  defaultCurrent={1} total={(maxNumberOfPages + 1) * 10} onChange = {p => {setPage(p - 1)}}/>
            </div>
        </div>
    );
}

export default ManageProducts;