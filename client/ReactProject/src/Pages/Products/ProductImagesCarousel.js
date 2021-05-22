import { Carousel } from 'antd';
import placeholderImg from '../../_assets/Images/No_Image.jpg';

const ProductImagesCarousel = props => {
    const productDetails = props.productDetails;
    
    const contentCarousel = () => {
        var returnVal = [];
        if (productDetails && productDetails.p_image_uri && productDetails.p_image_uri.length > 0){
            productDetails.p_image_uri.forEach(uri => {
                returnVal.push(<div>
                    <img src={uri} alt={productDetails.p_code}/>
                </div>)
            });
        } else {
            returnVal.push(
                <div>
                    <img src={placeholderImg} 
                        alt={`Product Number: ${productDetails.p_code}`} 
                    />
                </div>
            )
        }
        return returnVal;
    }
    return (
        <div className="product-details-images box-shadow div-box">
            <Carousel dotPosition="bottom">
                {contentCarousel()}
            </Carousel>
        </div>
    );
};

export default ProductImagesCarousel;
