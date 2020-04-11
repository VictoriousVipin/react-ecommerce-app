import React from 'react';
import {Route, Redirect } from 'react-router-dom';
// import AuthService from '../services/auth.service';
const PrivateRoute = ({ component: Component,isAuthorized, ...rest }) => {
    
    return <Route {...rest} render={(props) => {
    //   return AuthService.isAdmin()
      return localStorage.getItem("isLoggedIn")
        ? <Component {...props} />
        : <Redirect to='/login' />
    }} />
};

export default PrivateRoute;