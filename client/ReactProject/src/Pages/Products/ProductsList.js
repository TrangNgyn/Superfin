import Product from './Product';
import { List } from 'antd';

const ProductsList = props => {
    const productDetails = props.productDetails;

    return (
        <>
            <List className="container"
                grid={{
                    gutter: 6, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 5
                }}
                pagination={{
                    showSizeChanger: true,
                    position: 'both',
                }}
                dataSource={Object.values(productDetails)}
                renderItem={item => {
                  return(
                    <List.Item>                        
                        <Product key={item} productDetails={item} />
                    </List.Item>
                )}}
            />
        </>
    );
};

export default ProductsList;
