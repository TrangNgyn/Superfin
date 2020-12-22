import React from "react";
import '../../_assets/CSS/layouts/Product.css';
import { pageConstants } from "../../_constants";
import { userConstants } from "../../_constants";
import altImage from "../../_assets/Images/No_Image.jpg"

const currentPage = pageConstants.HOMEPAGE_CUSTOMER;            //Will be initialized using Redux later
const userType = userConstants.GUEST;






const Product = props => {
    const product  = props;
   
    const viewCategory = () => {
        console.log("View product info for " + product.name);
        //This will link to product info page
    } 

    if(currentPage === pageConstants.HOMEPAGE_CUSTOMER && (userType === userConstants.GUEST || userType === userConstants.CUSTOMER)){
        return (
            <div className="Product-Container">
                <img className = "Product-Image-Text"
                    src= {product.image}
                    alt={altImage}
                    onClick={viewCategory}
                />
                <b className = "Product-Image-Text">{product.category}</b>
            </div>
      );
    } 
    else{
        return (
            <div className="Product-Container">
                <img className = "Product-Image-Text"
                    src= {product.image}
                    alt={altImage}
                    onClick={viewCategory}
                />
                <b className = "Product-Image-Text">{product.name}</b>
            </div>
      );
    }
};

export default Product;