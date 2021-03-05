import HomepageAdminOrder from './HomepageAdminOrder';
import '../../_assets/CSS/pages/HomepageAdmin/HomepageAdminOrderList.css';
import { Spin } from 'antd';





const HomepageAdminOrderList = props => {
    const orders = props.orders;
    const loading = props.loadingOrders;
    const error = props.errorLoadingOrders;


    let renderableOrders = [];
    if(orders.length !== 0){
        renderableOrders = orders.map(o => {
            return <div key={o._id}><HomepageAdminOrder {...o}/></div>
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