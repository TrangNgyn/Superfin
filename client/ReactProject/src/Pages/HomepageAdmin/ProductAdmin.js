import React from "react";
import '../../_assets/CSS/pages/HomepageAdmin/ProductAdmin.css';
import altImage from "../../_assets/Images/No_Image.jpg"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Product = props => {
    const product  = props;
   
    const viewCategory = () => {
        console.log("View product info for " + product.name);
        //This will link to product info page
    } 

    return (
        <div id="admin-product-container">
            <img id="admin-product-image"
                src= {product.image}
                alt={altImage}
                onClick={viewCategory}
                style={{height: '310px', width:'310px'}}
            />
        
            <table id="admin-product-text-container">
                <tbody>
                    <tr>
                        <td>Product Code: {product.id}</td>
                    </tr>
                    <tr>
                        <td>Product Name: {product.name}</td>
                    </tr>
                    <tr>
                        <td>Unit Price: ${product.price}</td>
                    </tr>
                    <tr>
                        <td>Category: {product.category}</td>
                    </tr>
                </tbody>
            </table>

            <div id="admin-product-icon-container">
                <DeleteOutlined className="admin-product-icon"/>
                <EditOutlined className="admin-product-icon"/>
            </div>  
        </div>
    );
};

export default Product;