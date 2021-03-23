import '../../_assets/CSS/pages/Homepage/Category.css';
import altImage from "../../_assets/Images/No_Image.jpg"

const Category = props => {
    const category  = props;
   
    return (
        <div className="Category-Container">
            <img className = "Category-Image-Text"
                src= {category.c_image}
                alt={altImage}
            />
            <b className = "Category-Image-Text">{category.c_name}</b>
        </div>
    );
};

export default Category;