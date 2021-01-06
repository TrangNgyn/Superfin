import './App.less';
import "../_assets/CSS/style.scss";
import Login from '../Pages/Login/Login';
import EmailRequest from '../Pages/EmailRequest/EmailRequest';
import ResetPasswordConfirmation from '../Pages/ResetPasswordConfirmation/ResetPasswordConfirmation';
import ReenterPassword from '../Pages/ReenterPassword/ReenterPassword';
import Navbar from '../SharedComponents/Navbar/Navbar';
import FooterMain from '../SharedComponents/Footer/FooterMain';




const App = () => (
<div>
   <div className="Website-Header">
      <Navbar />
   </div>

   <div className="Website-Body">
      <ReenterPassword />
   </div>

 <div className="Website-Footer">
      <FooterMain />
</div>
</div>
);

export default App;
