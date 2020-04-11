import React, { Component } from "react";
import {connect} from "react-redux";
import store from '../../redux/Store';
import AuthService from '../../services/auth.service';
import Loader from "../../common/loader.component";
import CartService from "../../services/cart-service";
class Login extends Component {
    constructor() {
        super();
        this.state = {
            showLoader: false
        };
    }
    componentDidMount() {
        if(localStorage.getItem("isLoggedIn")) {
            this.props.history.push("/");
        }
    }
    
    getUserExistingCart() {
        CartService.getCart().then(response => {
            localStorage.setItem("cart", JSON.stringify(response[0]));
            this.props.dispatch({
                type: 'INITCART',
                payload: {
                    products: response[0].products
                }
            });
            this.props.history.push('/');
        })
        .catch(error => {
            this.props.history.push('/');
        });
    }

    loginUser() {
        this.setState({
            showLoader: true
        });
        var user = {};
        user["email"] = document.getElementById('email').value;
        user["password"] = document.getElementById('password').value;
        AuthService.login(user).then(response => {
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('username', response["name"]);
            localStorage.setItem('email', response["email"]);
            this.props.dispatch({
                type: 'LOGIN',
                payload:{
                    email: response["email"],
                    name: response["name"],
                    isLoggedIn: true
                }
            });
            this.getUserExistingCart();
            this.setState({
                showLoader: false
            });
            console.log(store.getState());  
        })
        .catch(error => {
            console.log(error);
        })
    }
    render() {
        return <div id="login'">
            <h3>Login here!!</h3>
            <div><input className="form-control" type="email" placeholder="Email Address" id="email" /></div>
            <div><input className="form-control" type="password" placeholder="Password" id="password" /></div>
            <div><button className="btn btn-primary" onClick={this.loginUser.bind(this)}>Login</button></div>
            <div style={{"color":"green"}}>Email:- vipin.tomar@testmail.com   Password:- Test@123</div>
            {this.state.showLoader && <Loader></Loader>}
        </div>;
    }
}

export default connect()(Login);