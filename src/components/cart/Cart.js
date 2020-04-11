import React from 'react';
import { connect } from 'react-redux';
import store from '../../redux/Store';
import axios from 'axios';
import CartService from '../../services/cart-service';

class Cart extends React.Component {
    constructor() {
        super()
        this.state = {
            cart: store.getState()["cart"]
        }
    }

    componentDidMount() {
        if (!store.getState()["cartinitialised"]) {
            if(localStorage.isLoggedIn) {
                CartService.getCart().then(
                    (response) => {
                        console.log("response from get cart api", response.data)
                        this.props.dispatch({
                            type: 'INITCART',
                            payload: {
                                products: response[0].products
                            }
                        })

                        this.setState(
                            { cart: store.getState()["cart"] }
                        )
                    }, (error) => {

                    }
                )
            } else {
                if(localStorage.cart) {
                    const cartData = JSON.parse(localStorage.cart)
                    this.props.dispatch({
                        type: 'INITCART',
                        payload: {
                            products: cartData.products
                        }
                    })
                }
                
                this.setState({
                    cart: store.getState()["cart"]
                });
            }
        }
        else {
            this.setState({
                cart: store.getState()["cart"]
            });
        }
    }

    removeFromCart(productToRemove) {
        this.props.dispatch({
            type: 'REMOVEFROMCART',
            payload: {
                product: productToRemove
            }
        });
    }
    render() {
        return <div>
            <h3>Cart</h3>
            {!this.state.cart.length && <div>Cart is empty</div>}
            {this.state.cart.map(product => {
                return <div className="row">
                    <div className="col-md-6">
                        <img src={product.image} width="100px" height="100px" />
                        <label>{product.name}</label>
                        <label>{product.price}</label>
                    </div>
                    <div className="col-md-6">
                        <button className="btn btn-danger" onClick={this.removeFromCart.bind(this, product)}>Remove</button>
                    </div>
                </div>;
            })}
        </div>
    }
}


export default connect()(Cart);