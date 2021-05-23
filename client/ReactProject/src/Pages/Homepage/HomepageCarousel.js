import { Carousel, Button } from 'antd';
import image_1 from '../../_assets/Images/HomepageImages/Image_1.png';
import image_2 from '../../_assets/Images/HomepageImages/Image_2.png';
import image_3 from '../../_assets/Images/HomepageImages/Image_3.png';
import altImage from '../../_assets/Images/No_Image.jpg';
import { history } from '../../_helpers/history';

export const HomepageCarousel = () => {
    return(
        <div style = {{ position:'relative'}}>
                <Button onClick={() => history.push('/products')} Click type="default" className="homepage-carousel-button">SHOP NOW</Button>

                <Carousel autoplay>
                    <div>
                        <div className="homepage-carousel-background">
                            <u className="homepage-carousel-text">Environmentally Sustainable Packaging</u>
                            <img src = {image_1} className="homepage-carousel-image" alt = {altImage}/>
                        </div>
                    </div>
                    <div>
                        <div className="homepage-carousel-background">
                            <u className="homepage-carousel-text">Great Customer Satisfaction</u>
                            <img src = {image_2} className="homepage-carousel-image" alt = {altImage}/>
                        </div>
                    </div>
                    <div>
                        <div className="homepage-carousel-background">
                            <u className="homepage-carousel-text">Customizable Products</u>
                            <img src = {image_3} className="homepage-carousel-image" alt = {altImage}/>
                        </div>
                    </div>
                </Carousel>
            </div>
    );
} 