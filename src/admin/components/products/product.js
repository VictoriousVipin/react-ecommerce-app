import React from 'react';
import { connect } from 'react-redux';
import ProductService from '../../../services/product.service';
import Modal from "../../../common/modal.component";
import Loader from '../../../common/loader.component';

class AdminProducts extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
            showModal: false,
            showLoader: false,
            productid: null,
            name: "",
            brand: "",
            image: "",
            price: "",
            isUpdate: false
        };
    }

    componentDidMount() {
        this.getProducts();
    }

    handleChage = (key, event) => {
        this.setState({[key]: event.target.value});
    };

    addProduct = (event) => {
        const payload = {
            name: this.state.name,
            brand: this.state.brand,
            image: this.state.image,
            price: this.state.price
        };
        this.setState({
            showLoader: true
        });
        ProductService.createProduct(payload)
        .then(response => {
            console.log("product created successfully",response);
            this.getProducts();
            this.setState({
                showModal: false,
                showLoader: false
            });
        })
        .catch(error => {
            this.setState({
                showModal: false,
                showLoader: false
            });
        });
        event.preventDefault();
    };

    addProductForm = (isUpdate) => {
        return (
        <div className="create-product-overlay-container">
            <div className="create-product-overlay">
                <div className="row">
                    <div className="col-12">
                        <div className="create-product-form">
                            <span className="close-modal-icon" onClick={this.closeModal.bind(this)}>X</span>
                            <form onSubmit={isUpdate ? this.updateProduct : this.addProduct}>
                                <div className="form-group">
                                    <label for="productname">Name</label>
                                    <input type="text" className="form-control" placeholder="Product Name" value={this.state.name} onChange={this.handleChage.bind(this, "name")}/>
                                </div>
                                <div className="form-group">
                                    <label for="productname">Brand</label>
                                    <input type="text" className="form-control" placeholder="Product Brand"  value={this.state.brand} onChange={this.handleChage.bind(this, "brand")}/>
                                </div>
                                <div className="form-group">
                                    <label for="productname">Image</label>
                                    <input type="text" className="form-control" placeholder="Enter image URL" value={this.state.image} onChange={this.handleChage.bind(this, "image")}/>
                                </div>
                                <div className="form-group">
                                    <label for="productname">Price</label>
                                    <input type="text" className="form-control" placeholder="Product Price" value={this.state.price} onChange={this.handleChage.bind(this, "price")}/>
                                </div>
                                {isUpdate ? <button className="btn btn-success">Edit Product</button> : <button className="btn btn-success">Add Product</button>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    };

    openModal = () => {
        this.setState({
            showModal: true
        });
    };

    closeModal = () => {
        this.setState({
            name: "",
            brand: "",
            image: "",
            price: "",
            showModal: false,
            isUpdate: false
        });
    };

    getProducts = () => {
        this.setState({
            showLoader: true
        });
        ProductService.getAllProducts()
        .then((data)=>{
            this.setState({
                products: data,
                showLoader: false
            });
        }).catch(error => {
            console.log("Failed with error", error);
        });
    };
    
    updateProduct = (event) => {
        const data = {
            name: this.state.name,
            brand: this.state.brand,
            image: this.state.image,
            price: this.state.price
        };
        this.setState({
            showLoader: true
        });
        ProductService.updateProduct(this.state.productid, data)
        .then(result => {
            console.log("Product updated successfully", result);
            this.setState({
                name: "",
                brand: "",
                image: "",
                price: "",
                showLoader: false,
                showModal: false,
                isUpdate: false
            });
            this.getProducts();
        })
        .catch(error => {
            console.log("Error while updating product", error);
            this.setState({
                name: "",
                brand: "",
                image: "",
                price: "",
                showLoader: false,
                showModal: false,
                isUpdate: false
            });
        });
        event.preventDefault();
    }
    
    editProduct = (productId) => {
        this.setState({
            showLoader: true
        });
        ProductService.getProductDetail(productId)
        .then(result => {
            console.log("Product details", result);
            this.setState({
                productid: productId,
                name: result.name,
                brand: result.brand,
                image: result.image,
                price: result.price,
                showModal: true,
                showLoader: false,
                isUpdate: true
            });
        }).catch(error => {
            this.setState({
                showLoader: false
            });
        });
    };

    removeProduct = (productId) => {
        this.setState({
            showLoader: true
        });
        ProductService.removeProduct(productId)
        .then(result => {
            console.log("Product removed successfully", result);
            this.getProducts();
        }).catch(error => {
            this.setState({
                showLoader: false
            });
        });
    };

    render() {
        return <div className="admin-product-listing">
            {this.state.showModal && <Modal JSX_MODAL={this.addProductForm(this.state.isUpdate)}></Modal>}
            <h3>MANAGE PRODUCTS</h3>
            <div className="row add-product-row">
                <div className="col-md-6">
                    <button className="btn btn-success" onClick={this.openModal.bind(this)}>ADD PRODUCT</button>
                </div>
            </div>
            <div className="row heading-row">
                <div className="col col-md-1">
                    S/N
                </div>
                <div className="col col-md-2">
                    Name
                </div>
                <div className="col col-md-2">
                    Brand
                </div>
                <div className="col col-md-2">
                    Picture
                </div>
                <div className="col col-md-2">
                    Price
                </div>
                <div className="col col-md-3">
                    Edit / Delete
                </div>
            </div>  
            {  
               this.state.products.map((product, index) => {
                   return <div className="row product-row" key={product.productid}>
                       <div className="col col-md-1">
                            {index + 1}
                        </div>
                        <div className="col col-md-2">
                            {product.name}
                        </div>
                        <div className="col col-md-2">
                            {product.brand}
                        </div>
                        <div className="col col-md-2">
                            <img width="30px" height="30px" alt={product.name} src={product.image}></img>
                        </div>
                        <div className="col col-md-2">
                            {product.price}
                        </div>
                        <div className="col col-md-3">
                            <button className="btn btn-primary" onClick={this.editProduct.bind(this, product.productid)}>EDIT</button> &nbsp;
                            <button className="btn btn-danger" onClick={this.removeProduct.bind(this, product.productid)}>DELETE</button>
                        </div>
                    </div>
               }) 
            }
            {this.state.showLoader && <Loader></Loader>}
        </div>
    }
}


export default connect()(AdminProducts);