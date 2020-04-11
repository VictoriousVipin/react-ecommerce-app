import {Config} from "../common/config";
import axios from 'axios';

class ProductService {
    static createProduct = (data) => {
        // let url = Config.myApiUrl + "/allProducts";
        let url = Config.myApiUrl + "/product/create";
        return new Promise((resolve, reject) =>{
            data.productid = Math.floor(Math.random()*100000000);
            axios({
                    method: 'POST',
                    url: url,
                    data,
                    headers: {
                        authtoken: localStorage.getItem("authToken")
                    }
                }).then(response => {
                    resolve(response["data"]["data"]);
                }, error => {
                    reject(error);
                });
        });
    };
    static getAllProducts = () => {
        // let url = Config.myApiUrl + "/allProducts";
        let url = Config.myApiUrl + "/product/list";
        return new Promise((resolve, reject) =>{
            axios({
                method: 'GET',
                url: url
                }).then(response => {
                    resolve(response["data"]["data"]);
                }, error => {
                    reject(error);
                });
        });
    };

    static getProductDetail = (id) => {
        // let url = Config.myApiUrl + "/allProducts";
        let url = Config.myApiUrl + "/product/list/" + id;
        return new Promise((resolve, reject) =>{
            axios({
                method: 'GET',
                url: url
                }).then(response => {
                    if(response["data"]["data"][0]) {
                        resolve(response["data"]["data"][0]);
                    } else {
                        reject("No Product Found");
                    }
                }, error => {
                    reject(error);
                });
        });
    };

    static removeProduct = (productid) => {
        let url = Config.myApiUrl + "/product/delete";
        return new Promise((resolve, reject) =>{
            axios({
                    method: 'DELETE',
                    url: url,
                    data: {productid},
                    headers: {
                        authtoken: localStorage.getItem("authToken")
                    }
                }).then(response => {
                    if(response["data"]) {
                        resolve(response["data"].message);
                    } else {
                        reject("No Product Found");
                    }
                }, error => {
                    reject(error);
                });
        });
    };

    static updateProduct = (productid, data) => {
        let url = Config.myApiUrl + "/product/update/" + productid;
        return new Promise((resolve, reject) =>{
            axios({
                    method: 'PUT',
                    url: url,
                    data: data,
                    headers: {
                        authtoken: localStorage.getItem("authToken")
                    }
                }).then(response => {
                    if(response["data"]) {
                        resolve(response["data"].message);
                    } else {
                        reject("No Product Found");
                    }
                }, error => {
                    reject(error);
                });
        });      
    }
}


export default ProductService;