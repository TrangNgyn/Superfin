import HomepageAdminOrder from './HomepageAdminOrder';
import { Spin, List } from 'antd';

const HomepageAdminOrderList = props => {
    const orders = props.orders;
    const loading = props.loadingOrders;
    const error = props.errorLoadingOrders;
    const dispatch = props.dispatch;
    const access_token = props.access_token;
    const updateAuth = props.updateAuth;



    let renderableOrders = [];
    if(orders.length !== 0){
        renderableOrders = orders.map(o => {
            return {
                order: o,
                dispatch: dispatch,
                updateAuth: updateAuth,
                access_token: access_token
            }
        }); 
    }
    
    return (
      <>
        {loading ? <div style = {{textAlign: 'center'}}> <Spin size="large"/> </div> : <></>}
        
        {error ? <h1 style = {{textAlign: 'center', color: 'red'}}>Could not load data, please try refreshing page</h1> : <>
                <List
                    grid={{
                        gutter: 6, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 5
                    }}
                    pagination={{
                        position: 'bottom',
                        defaultPageSize: 8
                    }}
                    dataSource={renderableOrders}
                    renderItem={orderProps => {
                    return(
                        <List.Item>                        
                            <HomepageAdminOrder {...orderProps}/>
                        </List.Item>
                    )}}
                />
            </>}
      </>
  );
};

export default HomepageAdminOrderList;