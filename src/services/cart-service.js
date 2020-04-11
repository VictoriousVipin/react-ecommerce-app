import {Config} from "../common/config";
import axios from 'axios';

class CartService {
    static createCart = (data) => {
        // let url = Config.myApiUrl + "/allProducts";
        let url = Config.myApiUrl + "/cart/create";
        data = {
            email: localStorage.email,
            products: data
        };
        return new Promise((resolve, reject) =>{
            data.cartId = Math.floor(Math.random()*100000000);
            axios({
                method: 'POST',
                url: url,
                data: data,
                headers: {
                    authtoken: localStorage.getItem("authToken")
                }
            }).then((response) => {
                resolve(response["data"]);
            }, (error) => {
                if(error.code === 400 && error.code === 403) {
                    localStorage.clear();
                    window.location.href = "/login";
                }
                reject(error);
            })
        });
    };
    static getCart = () => {
        const data = {
            email: localStorage.email,
            isActive: true
        };
        let url = Config.myApiUrl + "/cart/get";
        return new Promise((resolve, reject) =>{
            axios({
                method: 'POST',
                url: url,
                data: data,
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

    static updateCart = (data) => {
        let url = Config.myApiUrl + "/cart/update";
        return new Promise((resolve, reject) => {
            axios({
                    method: 'PUT',
                    url: url,
                    data: data,
                    headers: {
                        authtoken: localStorage.getItem("authToken")
                    }
                }).then(response => {
                    resolve(response["data"]);
                }, error => {
                    if(error.code === 400 && error.code === 403) {
                        localStorage.clear();
                        window.location.href = "/login";
                    }
                    reject(error);
                });
        });      
    }

    static removeCart = (productid) => {
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
}


export default CartService;