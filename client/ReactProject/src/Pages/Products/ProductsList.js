import Product from './Product';
import { List } from 'antd';

const ProductsList = props => {

   // const [page, setPage] = useState(0);
    return (
        <>
            <List className="container"
                grid={{
                    gutter: 6, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 5
                }}
                pagination={{
                    showSizeChanger: true,
                    position: 'both',
                   // onChange: page => { setPage(page - 1) }
                }}
                dataSource={Object.values(props)}
                renderItem={item => (
                    <List.Item>
                        <Product {...item} />
                    </List.Item>
                )}
            />
        </>
    );
};

export default ProductsList;
