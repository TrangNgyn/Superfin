import '../../_assets/CSS/pages/ManageProducts/ProductList.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchProducts } from '../../SharedComponents/ProductList/MockProductList';
import { Select } from 'antd';



const { Option } = Select;


const ProductList = (props) => {

    const mockProducts = fetchProducts();               //get this from props later

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    const row = mockProducts.map((p, i) => {
        return (
            <tr key = {p.id} className="manage-products-table-row">
                <td>{p.name}</td>
                <td>{p.id}</td>
                <td>${p.price}</td>
                <td>{i}</td>
                <td>{p.category}</td>
                <td>{10}</td>
                <td>
                    <EditOutlined className="manage-products-icon"/> 
                    <DeleteOutlined className="manage-products-icon" style = {{paddingLeft: "15px"}}/> 
                </td>
            </tr>
        );
    });

    return (
        <>
            <div id="manage-products-header">Manage Products</div>

            <div>
                <table style={{width:"50%", textAlign: "left", marginBottom: "20px", marginLeft: "1%"}}>
                    <tbody>
                        <tr>
                            <td>
                                <div style={{fontSize: "30px", fontWeight: "bold"}}>Products</div>
                            </td>
                            <td>
                            <Select defaultValue="jack" style={{ width: "300px" }} onChange={handleChange}>
                                <Option value="jack">Jack</Option>
                                <Option value="John">John</Option>
                            </Select>
                            </td>
                            <td>
                                <Select defaultValue="instock" style = {{width:"300px"}}>
                                    <Select.Option value="instock">Item name</Select.Option>
                                </Select>
                            </td>
                        </tr>
                    </tbody>
                </table>  
            </div>

            <table style={{width:"100%", textAlign: "center"}}>
                <tbody>
                    <tr style = {{border: "solid black 1px"}}>
                        <th>Product Name</th>
                        <th>Product Code</th> 
                        <th>Price</th>
                        <th>Units Sold</th>
                        <th>Category</th> 
                        <th>Number in Stock</th>
                        <th className="manage-products-icon" style ={{fontSize: "30px"}}>+</th>
                    </tr>
                    {row}
                </tbody>
            </table>
        </>
    );
}

export default ProductList;