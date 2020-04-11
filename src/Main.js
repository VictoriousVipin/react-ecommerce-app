import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import Signup from './components/signup/Signup';
import ProductDetail from './components/product/ProductDetail';
import Cart from './components/cart/Cart';
import Admin from './admin/Admin';
import AdminProduct from './admin/components/products/product';
import PrivateRoute from './common/private-route.component';
class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            isAuthorized: false
        }
    }

    componentDidMount() {
        // const email = localStorage.getItem("email");
        // if(email) {
        //     AuthService.getRole({email: email}).then(response => {
        //         console.log(response);
        //         if(response && response[0] && response[0].role === "admin") {
        //             this.setState({
        //                 isAuthorized: true
        //             });
        //         }
        //     }).catch(error => {
                
        //     });
        // }
    }

    render() {
        return <div id="Main">
            <Router>
                <Navbar />
                <Route exact path="/" component={App} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/product-detail/:id" component={ProductDetail} />
                <Route exact path="/cart" component={Cart} />
                <PrivateRoute exact path="/admin" component={Admin}/>
                <PrivateRoute exact path="/admin/product" component={AdminProduct}/>
            </Router>
            <div id="overlay"></div>
        </div>;
    }
}

export default Main;