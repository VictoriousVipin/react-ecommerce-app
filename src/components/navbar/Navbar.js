import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from '../../redux/Store';

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            isUserLoggedIn: localStorage.getItem("isLoggedIn"),
            cartItemCount: 0
        };
    }
    componentDidMount() {
        store.subscribe(() => {
            const storeData = store.getState();
            if (storeData["isLoggedIn"]) {
                this.setState({
                    isUserLoggedIn: localStorage.getItem("isLoggedIn")
                });
            }
            this.setState({
                cartItemCount: storeData["cart"] && storeData["cart"].length
            });
        });
    }
    logout() {
        localStorage.clear();
        this.setState({
            isUserLoggedIn: false
        });
    }
    render() {
        return <div>
            <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
                <Link to="/" className="navbar-brand">Shopping Site</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        {this.state.isUserLoggedIn && <li className="nav-item">
                            <Link to="/admin" className="nav-link">Admin Dashboard <span className="sr-only">(current)</span></Link>
                        </li>}
                    </ul>
                </div>
                {/* <div className="g-signin2" data-onsuccess="onSignIn"></div> */}
                {this.state.cartItemCount}
                {<Link to="/cart"><i className="fas fa-shopping-cart" style={{ color: "white" }}></i></Link>}
                <div className="form-inline my-2 my-lg-0">
                    {!this.state.isUserLoggedIn && <Link to="/login">
                        <button className="btn btn-outline-success my-2 my-sm-0">Login</button>
                    </Link>}
                    {this.state.isUserLoggedIn && <Link to="/login">
                        <button onClick={this.logout.bind(this)} className="btn btn-outline-success my-2 my-sm-0">Logout</button>
                    </Link>}
                </div>

            </nav>
        </div>;
    }
}


export default Navbar;