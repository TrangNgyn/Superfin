import { Card } from 'antd';
import { EditOutlined, ShoppingOutlined } from '@ant-design/icons';
import placeholderImg from '../../_assets/Images/No_Image.jpg';
import { history } from '../../_helpers/history';
import { formatNumber } from '../../_helpers/utils';
const { Meta } = Card;

const Product = props => {
    const productDetails = props;
    var descriptionWithPrice = null;
    if (productDetails.p_description === null ||
            (productDetails.p_description !== null && 
            productDetails.p_description.trim().length === 0 &&
            productDetails.p_description.length === 0)) {

        descriptionWithPrice = <>
            <span>
                <strong>{formatNumber(productDetails.p_price)}</strong>
            </span>
            <p>&zwnj;</p>
        </>;
    
    } else {
        descriptionWithPrice = <>
            <span>
                <strong>{formatNumber(productDetails.p_price)}</strong>
            </span>
            <p>{productDetails.p_description}</p>
        </>;
    }
    return (
        <Card className="card-shadow-hoverable"
            tabIndex={0}
            cover={
                <img className="cover-img fixed-size" 
                    style={{ cursor: 'pointer' }} 
                    alt={productDetails.p_name} 
                    src={productDetails.p_image_uri[0]} 
                    onClick={() => { 
                        history.push(`productDetails?p_code=${productDetails.p_code}&price_id=${productDetails.p_price_id}`) 
                    }}
                />
            }
            actions={[
                <ShoppingOutlined key="addToCart" />,
                <EditOutlined key="customizeBag" />
            ]}>
            <Meta 
                title={
                    <span 
                        id="view-product-title"
                        onClick={() => { 
                            history.push(`productDetails?p_code=${productDetails.p_code}&price_id=${productDetails.p_price_id}`) 
                        }}>
                        {productDetails.p_name}
                    </span>
                } 
                description={descriptionWithPrice} 
            />
        </Card>
    );
};

export default Product;