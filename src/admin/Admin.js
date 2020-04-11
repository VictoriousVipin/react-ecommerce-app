import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Admin extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        // if (!localStorage.getItem("isLoggedIn")) {
        //     this.props.history.push("/login");
        // }
    }
    render() {
        return <div className="admin-dashboard">
            <div className="row">
                <div className="col-md-6"><Link to="admin/product">
                        <button className="btn btn-success">MANAGE PRODUCTS</button>
                    </Link></div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    {/* <label>{product.price}</label> */}
                </div>
                <div className="col-md-6">
                    {/* <button className="btn btn-danger" onClick={this.removeFromCart.bind(this, product)}>Remove</button> */}
                </div>
            </div>
        </div>
    }
}


export default connect()(Admin);