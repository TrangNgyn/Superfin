import './App.less';
import "../_assets/CSS/style.scss";
import {HomepageAdmin} from '../Pages/HomepageAdmin/HomepageAdmin';
import Navbar from '../SharedComponents/Navbar/Navbar';
import FooterMain from '../SharedComponents/Footer/FooterMain';




const App = () => (
<div>
   <div className="Website-Header">
      <Navbar />
   </div>

   <div className="Website-Body">
      <HomepageAdmin />
   </div>

 <div className="Website-Footer">
      <FooterMain />
</div>
</div>
);

export default App;
