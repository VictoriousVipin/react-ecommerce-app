import React, { Component } from 'react';
import Product from './components/product/Product';
import Carousel from './components/carousel/Carousel';

// Service
import ProductService from './services/product.service';

// CSS
import './style/style.scss';
import Loader from './common/loader.component';


class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      showLoader: false
    };
  }

  componentDidMount() {
    // if (!localStorage.getItem("isLoggedIn")) {
    //   this.props.history.push("/login");
    // }
    this.setState({
        showLoader: true
    });
    ProductService.getAllProducts()
      .then((data) => {
        this.setState({
          products: data,
          showLoader: false
        });
      }).catch(error => {
        console.log("Failed with error", error);
        this.setState({
          showLoader: false
      });
      });
  }
  
  render() {
    return (
      <div className="App">
        <Carousel />
        <h3>Products</h3>
        <div className="row">
          {this.state.products.map((product) => {
            return <Product product={product} history={this.props.history} />
          })}
        </div>
        {this.state.showLoader && <Loader></Loader>}
      </div>
    );
  }
}

export default App;
