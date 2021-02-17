import { deleteConfirm } from '../../SharedComponents/Modals/Modals';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { history } from '../../_helpers/history';

//All rows for the Product table

const ProductTableRows = props => {
    const productsList = props.productsList;
    const dispatch = props.dispatch;
    const page = props.page;
    const itemsPerPage = 10;

    let renderableProducts = productsList.slice( page * itemsPerPage, 
        ((page + 1) * itemsPerPage) > productsList.length ? productsList.length : ((page + 1) * itemsPerPage));

    const row = renderableProducts.map((p, i) => {
        return (
            <tr key = {p._id} className="manage-products-table-row">
                <td>{p.p_name}</td>
                <td>{p.p_code}</td>
                <td>${p.p_price}</td>
                <td>{i}</td>
                <td>{p.p_catagories}</td>
                <td>{10}</td>
                <td>
                    <EditOutlined props={p.p_code} className="manage-products-icon" onClick={() => {
                        history.push(`/editAddProducts/${p.p_code}`);
                    }}/> 
                    <DeleteOutlined className="manage-products-icon" onClick={() => { deleteConfirm(p.p_code, dispatch) }} style = {{paddingLeft: "15px"}}/> 
                </td>
            </tr>
        );
    });

    return row;
}

export default ProductTableRows;