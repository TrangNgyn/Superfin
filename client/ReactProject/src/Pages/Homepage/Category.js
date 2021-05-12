import '../../_assets/CSS/pages/Homepage/Category.css';
import altImage from "../../_assets/Images/No_Image.jpg"

const Category = props => {
    const category  = props;
    const onClick = props.onClick;
    const img = props.image;

    return (
        <div className="Category-Container" onClick={() => {onClick(props.c_name)}}>
            <img className = "Category-Image-Text"
                src={img}
                alt={altImage}
            />
            <b className = "Category-Image-Text">{category.c_name}</b>
        </div>
    );
};

export default Category;