import React from "react";
import '../../_assets/CSS/pages/HomepageAdmin/ProductAdmin.css';
import altImage from "../../_assets/Images/No_Image.jpg"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteConfirm } from '../../SharedComponents/Modals/Modals';
import { history } from '../../_helpers/history';





const Product = props => {
    const dispatch = props.dispatch;
    const product = props.product;
    const categoryName = props.categoryName;



    const viewCategory = () => {
        console.log("View product info for " + product.name);
        //This will link to product info page
    }





    return (
        <div id="admin-product-container">
            <img id="admin-product-image"
                src= {product.p_image_uri[0]}
                alt={altImage}
                onClick={viewCategory}
                style={{height: '310px', width:'310px'}}
            />

            <table id="admin-product-text-container">
                <tbody>
                    <tr>
                        <td>Product Code: {product.p_code}</td>
                    </tr>
                    <tr>
                        <td>Product Name: {product.p_name}</td>
                    </tr>
                    <tr>
                        <td>Unit Price: ${product.p_price}</td>
                    </tr>
                    <tr>
                        <td>Category: { categoryName }</td>
                    </tr>
                </tbody>
            </table>

            <div id="admin-product-icon-container">
                <DeleteOutlined title="Delete product" onClick={() => {deleteConfirm(product.p_code, dispatch, props.access_token, props.updateAuth)}} className="admin-product-icon"/>
                <EditOutlined titel="Edit product"onClick={() => { history.push(`/editAddProducts/${product.p_code}`)}} className="admin-product-icon"/>
            </div>
        </div>
    );
};

export default Product;
