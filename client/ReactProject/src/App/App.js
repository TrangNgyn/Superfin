import './App.less';
import '../_assets/CSS/style.scss'
import Navbar from '../SharedComponents/Navbar/Navbar';
import { history } from '../_helpers/history';
import { Router, Route, Switch } from 'react-router-dom';
import config from '../_routers/config';
import PrivateRoute from '../_routers/PrivateRoute';
import AuthProvider from '../SharedComponents/AuthContext/AuthContext';
import Footer from '../SharedComponents/Footer/FooterMain';

const App = () => {
    return(
        <>
            <AuthProvider>
                <Router history = {history}>
                    <div className="Website-Header">
                        <Navbar />
                    </div>
                        <div className="Website-Body" >
                            <Switch>
                                {
                                    config.routes.map(({component, url, roles, exact}) => roles === null 
                                        ? <Route key={url} path={url} component={component}/> 
                                        : exact 
                                        ? <PrivateRoute key={url} exact path={url} component={component} roles={roles} />
                                        : <PrivateRoute key={url} path={url} component={component} roles={roles} /> 
                                    )
                                }
                            </Switch>
                        </div>
                    <footer className="Website-Footer">
                        <Footer />
                    </footer>
                </Router>
            </AuthProvider>
        </>
    );
};

export default App;