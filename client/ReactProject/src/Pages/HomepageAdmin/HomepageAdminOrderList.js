import HomepageAdminOrder from './HomepageAdminOrder';
import '../../_assets/CSS/pages/HomepageAdmin/HomepageAdminOrderList.css';


//remove this later and replace with API call
const mockOrders = [];
let i;
for(i = 0; i < 9; i++){

    let mockOrder = {
        po_number:"123abc",
        c_email:"fakeemail@email.com",
        issued_date: "14-11-1993",
        status: "processing",
        items: [{name:"item1"}, {name:"item2"}, {name:"item3"}],
        tracking_number: "234def",
        carrier: "Star Track"
    };


    mockOrder.po_number = mockOrder.po_number.concat(i);
    if(i%2===0) mockOrder.status = "complete";
    mockOrders[i] = mockOrder;
} 









//gets completed orders from order list
const getCompleteOrders = (orders) => {
    let completeOrders = [];
    for(var i = 0; i < orders.length; i++){
        if(orders[i].status === "complete") completeOrders.push(orders[i]);
    }
    return completeOrders;
}

//gets incomplete orders from order list 
const getIncompleteOrders = (orders) => {
    let incompleteOrders = [];
    for(var i = 0; i < orders.length; i++){
        if(orders[i].status !== "complete") incompleteOrders.push(orders[i]);
    }
    return incompleteOrders;
}








const HomepageAdminOrderList = (props) => {
    //const [isLoading, setIsLoading] = useState(true);

    //populates orders[] based on which radio button on the admin homepage is selected 
    let orders = [];
    props.complete ? orders = getCompleteOrders(mockOrders) : orders = getIncompleteOrders(mockOrders);

    const renderableOrders = orders.map((o, i) => {
      return <div key={i}><HomepageAdminOrder {...o}/></div>
    }); 

    return (
      <>
        <div id="homepage-admin-orderlist-container">
          {renderableOrders}
        </div>

      </>
  );
};

export default HomepageAdminOrderList;