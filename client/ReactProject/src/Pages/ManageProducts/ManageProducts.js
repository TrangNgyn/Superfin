import '../../_assets/CSS/pages/ManageProducts/ManageProducts.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchProducts } from '../../SharedComponents/ProductList/MockProductList';
import { Select, Modal, Pagination } from 'antd';
import { useState, useEffect } from 'react';
import { history } from '../../_helpers/history';

const { Option, OptGroup } = Select;




const ManageProducts = () => {
    const mockProducts = fetchProducts();
    const [productsList, setProductsList] = useState(mockProducts);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [page, setPage] = useState(0);







    //modal stuff
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        //delete the product
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    /*
    useEffect(() => {
        console.log("This will get called every time the page is rendered");
    });

    useEffect(() => {
        console.log("This will get called evertime the product list changes state");
    }, [productsList]);*/

    




    //renderable items
    const onChange = p => { setPage(p - 1) };
    const itemsPerPage = 10;
    const maxNumberOfPages = (Math.ceil(productsList.length/itemsPerPage) - 1);

    let renderableProducts = productsList.slice( page * itemsPerPage, 
        ((page + 1) * itemsPerPage) > productsList.length ? productsList.length : ((page + 1) * itemsPerPage));

    const row = renderableProducts.map((p, i) => {
        return (
            <tr key = {p.id} className="manage-products-table-row">
                <td>{p.name}</td>
                <td>{p.id}</td>
                <td>${p.price}</td>
                <td>{i}</td>
                <td>{p.category}</td>
                <td>{10}</td>
                <td>
                    <EditOutlined props={p.id} className="manage-products-icon" onClick={() => {
                        history.push('/editAddProducts/' + p.id);
                    }}/> 
                    <DeleteOutlined className="manage-products-icon" onClick={showModal} style = {{paddingLeft: "15px"}}/> 
                </td>
            </tr>
        );
    });






    //filtering stuff
    const handleFilter = value => {
        console.log(`selected ${value}`);

        switch(value){
            case "in_stock": {
                //fetch from db all products in stock
                break;
            }
            case "out_stock": {
                break;
            }
            case "category_1": {
                break;
            }
            case "category_2": {
                break;
            }
            case "i_ascending": {
                break;
            }
            case "category_4": {
                break;
            }
            default:{
                //return all products
            }
        }
    }

    const handleOrder = value => {
        console.log(`selected ${value}`);

        switch(value){
            case "p_decending": {
                //re order state array
                break;
            }
            case "p_ascending": {
                break;
            }
            case "n_ascending": {
                break;
            }
            case "n_decending": {
                break;
            }
            case "i_ascending": {
                break;
            }
            case "i_decending": {
                break;
            }
            default: return;
        }
    }



    



    return (
        <div >
            <Modal title="Delete Product" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Are you sure you want to delete this product?</p>
            </Modal>

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
                                <Select placeholder="Order By" style = {{width:"300px"}} onChange={handleOrder}>
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
            <div style = {{height: "400px", display: "table"}}>
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
                        {row}
                    </tbody>
                </table>  
            </div>
            <div style = {{textAlign: "center"}}>
                <Pagination  defaultCurrent={1} total={(maxNumberOfPages + 1) * 10} onChange = {onChange}/>
            </div>  
        </div>
    );
}

export default ManageProducts;