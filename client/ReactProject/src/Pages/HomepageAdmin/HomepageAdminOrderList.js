import HomepageAdminOrder from './HomepageAdminOrder';
import '../../_assets/CSS/pages/HomepageAdmin/HomepageAdminOrderList.css';
import { Spin } from 'antd';





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
            const orderProps = {
                order: o,
                dispatch: dispatch,
                updateAuth: updateAuth,
                access_token: access_token
            }
            return <div key={o._id}><HomepageAdminOrder {...orderProps}/></div>
        }); 
    }
    
    return (
      <div>
        {loading ? <div style = {{textAlign: 'center'}}> <Spin size="large"/> </div> : <></>}
        
        {error ? <h1 style = {{textAlign: 'center', color: 'red'}}>Could not load data, please try refreshing page</h1> : <></>}
        
        <div id="homepage-admin-orderlist-container">
           {renderableOrders} 
        </div>
      </div>
  );
};

export default HomepageAdminOrderList;