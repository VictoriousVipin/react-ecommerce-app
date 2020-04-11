import {Config} from "../common/config";
import axios from 'axios';

class AuthService {
    constructor() {
        this.role = "";
    }
    login(user) {
        return new Promise((resolve, reject) => {
            let url = Config.myApiUrl + "/user/login";
            axios({
                method: 'POST',
                url: url,
                data: user
            }).then(response => {
                console.log("Logged-in user", response["data"]);
                if(response["data"]["token"]) {
                    localStorage.setItem("authToken", response["data"]["token"]);
                    this.role = response["data"]["user"]["role"];
                    resolve(response["data"]["user"]);              
                }
            }, error => {
                reject(error);
            }); 
        });
    }
    getRole(data) {
        // let url = Config.myApiUrl + "/allProducts";
        let url = Config.myApiUrl + "/role/get";
        return new Promise((resolve, reject) =>{
            axios({
                    method: 'POST',
                    url: url,
                    data
                }).then(response => {
                    resolve(response["data"]["data"]);
                }, error => {
                    reject(error);
                });
        });
    };

    isAdmin() {
        return this.role === "admin";
    };
}


export default new AuthService();