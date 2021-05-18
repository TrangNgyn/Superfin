import { deleteConfirm } from '../../SharedComponents/Modals/Modals';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { history } from '../../_helpers/history';
import { getCategoryName } from '../../_services/SharedFunctions';
import { getAllCategories } from '../../_actions/categoryActions';
import { useEffect } from 'react';
import { useAuthUpdate, useAuth } from '../../SharedComponents/AuthContext/AuthContext';

//All rows for the Product table

const ProductTableRows = props => {
    const categories = props.categories;
    const productsList = props.productsList;
    const dispatch = props.dispatch;
    const page = props.page;
    const itemsPerPage = 10;
    const updateAuth = useAuthUpdate();             //authorization data
    const auth = useAuth();

    useEffect(() => {             
        if(!categories.length) dispatch(getAllCategories());
    }, [categories.length, dispatch]);

    


    let renderableProducts;
    let row;
    
    if(!productsList.length)row = [];             //wait until data is loaded before performing operations it
    else{
        renderableProducts = productsList.slice( page * itemsPerPage, 
            ((page + 1) * itemsPerPage) > productsList.length ? productsList.length : ((page + 1) * itemsPerPage));
        
        row = renderableProducts.map((p, i) => {
            return (
                <tr key = {p._id} className="manage-products-table-row">
                    <td>{p.p_name}</td>
                    <td>{p.p_code}</td>
                    <td>${p.p_price}</td>
                    <td>{p.p_units_sold}</td>
                    <td>{ getCategoryName(p.p_categories, categories) }</td>
                    <td>
                        <EditOutlined props={p.p_code} className="manage-products-icon" onClick={() => {
                            history.push(`/editAddProducts/${p.p_code}`);
                        }}/> 
                        <DeleteOutlined className="manage-products-icon" onClick={() => { deleteConfirm(p.p_code, dispatch, auth.access_token, updateAuth) }} style = {{paddingLeft: "15px"}}/> 
                    </td>
                </tr>
            );
        });
    }

    return row;
}

export default ProductTableRows;