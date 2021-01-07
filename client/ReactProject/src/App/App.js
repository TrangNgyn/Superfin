import './App.less';
import "../_assets/CSS/style.scss";
//import Homepage from '../Pages/Homepage/Homepage';
import AddEditProduct from '../Pages/AddEditProduct/AddEditProduct';
import Navbar from '../SharedComponents/Navbar/Navbar';
import FooterMain from '../SharedComponents/Footer/FooterMain';





const App = () => (
<div>
   <div className="Website-Header">
      <Navbar />
   </div>

   <div className="Website-Body">
      <AddEditProduct />
      </div>

 <div className="Website-Footer">
      <FooterMain />
</div>
</div>
);

export default App;
