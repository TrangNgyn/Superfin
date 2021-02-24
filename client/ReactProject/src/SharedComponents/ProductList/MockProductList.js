import image_1 from '../../_assets/Images/Temp_Images/product_image_1.jpg';
import image_2 from '../../_assets/Images/Temp_Images/product_image_2.jpg';
import image_3 from '../../_assets/Images/Temp_Images/product_image_3.jpg';
import image_4 from '../../_assets/Images/Temp_Images/product_image_4.jpg';
import image_5 from '../../_assets/Images/Temp_Images/product_image_5.jpg';
import image_6 from '../../_assets/Images/Temp_Images/product_image_6.jpg';
import image_7 from '../../_assets/Images/Temp_Images/product_image_7.jpg';
import image_8 from '../../_assets/Images/Temp_Images/product_image_8.jpg';
import image_9 from '../../_assets/Images/Temp_Images/product_image_9.jpg';
import image_10 from '../../_assets/Images/Temp_Images/product_image_10.jpg';
import image_11 from '../../_assets/Images/Temp_Images/product_image_11.jpg';


 const products = [
    {
        id: "123abc",
        name: "Paper Bag Standard",
        image: image_1,
        description: "A wonderful exciting paper bag to put over your head",
        category: "Bags",
        price: 10
    },

    {
        id: "124abc",
        name: "Paper Clam Standard",
        image: image_2,
        description: "A wonderful exciting paper bag to put over your head",
        category: "Clams",
        price: 50
    },

    {
        id: "125abc",
        name: "Paper Cup Standard",
        image: image_3,
        description: "A wonderful exciting paper bag to put over your head",
        category: "Cups",
        price: 30
    },

    {
        id: "126abc",
        name: "Paper Box Standard",
        image: image_4,
        description: "A wonderful exciting paper bag to put over your head",
        category: "Boxs",
        price: 25
    },

    {
        id: "127abc",
        name: "Paper Calm Handles",
        image: image_5,
        description: "A wonderful exciting paper bag to put over your head",
        category: "Clams",
        price: 60
    },

    {
        id: "129abc",
        name: "Paper Tray Standard",
        image: image_6,
        description: "A wonderful exciting paper bag to put over your head",
        category: "Trays",
        price: 75
    },

    {
        id: "123bbc",
        name: "Chinese Takeaway Box",
        image: image_7,
        description: "A wonderful exciting paper bag to put over your head",
        category: "Boxs",
        price: 97
    },

    {
        id: "123cbc",
        name: "Paper Bag White",
        image: image_8,
        description: "A wonderful exciting paper bag to put over your head",
        category: "Bags",
        price: 22
    },

    {
        id: "123dbc",
        name: "Paper Bag Thick Handles",
        image: image_9,
        description: "A wonderful exciting paper bag to put over your head",
        category: "Bags",
        price: 33
    },

    {
        id: "123ebc",
        name: "Paper Cup White",
        image: image_10,
        description: "A wonderful exciting paper bag to put over your head",
        category: "Cups",
        price: 44
    },

    {
        id: "123fbc",
        name: "Paper Tray Enclosed",
        image: image_11,
        description: "A wonderful exciting paper bag to put over your head",
        category: "Trays",
        price: 66
    },

    {
        id: "126fbc",
        name: "Paper Tray Enclosed",
        image: image_11,
        description: "A wonderful exciting paper bag to put over your head",
        category: "Trays",
        price: 66
    },
    {
        id: "123e000c",
        name: "Paper Cup White",
        image: image_10,
        description: "A wonderful exciting paper bag to put over your head",
        category: "Cups",
        price: 44
    }
];

export function fetchProducts(){

    return products;
}

export const getNumberOfproducts = () => {
 
    return products.length;
}