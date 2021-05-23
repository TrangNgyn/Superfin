import React from "react";
import altImage from "../../_assets/Images/No_Image.jpg"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteConfirm } from '../../SharedComponents/Modals/Modals';
import { history } from '../../_helpers/history';
import { Card } from 'antd';

const { Meta } = Card;

const Product = props => {
    const dispatch = props.dispatch;
    const product = props.product;
    const categoryName = props.categoryName;

    const viewCategory = () => {
        console.log("View product info for " + product.name);
        //This will link to product info page
    }
    
    return (
        <Card className="card-shadow-hoverable"
            tabIndex={0}
            cover={
                <img className="cover-img fixed-size" 
                    style={{ cursor: 'pointer' }} 
                    alt={altImage}
                    src={(product.p_image_uri[0] === null || product.p_image_uri[0] === undefined || (product.p_image_uri[0] !== null && product.p_image_uri[0] !== undefined && product.p_image_uri[0].length === 0)) ? altImage : product.p_image_uri[0]}
                    onClick={() => { history.push(`/editAddProducts/${product.p_code}`)}}
                />
            }
            actions={[
                <DeleteOutlined onClick={() => {deleteConfirm(product.p_code, dispatch, props.access_token, props.updateAuth)}} style={{color: 'red'}}/>,
                <EditOutlined onClick={() => { history.push(`/editAddProducts/${product.p_code}`)}}/>
            ]}
            >
            <Meta
                title={
                    <span
                        id="view-product-title"
                        onClick={() => { history.push(`/editAddProducts/${product.p_code}`)}}>
                        {product.p_name}
                    </span>
                }
                description={<>
                    <p><b>Product Code: </b>{product.p_code}</p>
                    <p><b>Unit Price: </b>${product.p_price}</p>
                    <p><b>Category: </b>{ categoryName }</p>
                </>}
            />
        </Card>
    );
};

export default Product;