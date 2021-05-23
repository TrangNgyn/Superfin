import altImage from "../../_assets/Images/No_Image.jpg"
import { Card } from 'antd';

const { Meta } = Card;
const Category = props => {
    const category  = props;
    const onClick = props.onClick;
    const img = props.image;

    return (
        <Card className="card-shadow-hoverable"
            tabIndex={0}
            cover={
                <img className="cover-img fixed-size" 
                    style={{ cursor: 'pointer' }} 
                    src={img}
                    alt={altImage}
                    onClick={() => {onClick(props.c_name)}}
                />
            }>
            <Meta
                title={
                    <span
                        id="view-product-title"
                        onClick={() => {onClick(props.c_name)}}>
                        {category.c_name}
                    </span>
                }
            />
        </Card>
    );
};

export default Category;