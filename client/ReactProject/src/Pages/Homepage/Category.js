import '../../_assets/CSS/pages/Homepage/Category.css';
import altImage from "../../_assets/Images/No_Image.jpg"
import { history } from '../../_helpers/history';

const Category = props => {
    const category  = props;
   
    return (
        <div className="Category-Container" onClick = {() => { history.push(`products/${category.c_name}`)}}>
            <img className = "Category-Image-Text"
                src= {category.c_image}
                alt={altImage}
            />
            <b className = "Category-Image-Text">{category.c_name}</b>
        </div>
    );
};

export default Category;