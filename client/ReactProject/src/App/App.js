import './App.less';
import Navbar from '../Components/Navbar';
import MyAccount from '../Pages/MyAccount/MyAccount';

import "../_assets/CSS/style.scss";

const App = () => (

//test your components here inside this div....
<div className="container">
    <div className="header-div">
    <Navbar />
    </div>
    <div className="body-div">
    <MyAccount />
    </div>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
</div>
);

export default App;
