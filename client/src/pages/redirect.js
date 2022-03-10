import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    return <Route {...rest} component={(props) => {
        const user = window.localStorage.getItem('user');
        if(user){
		 return <Redirect to={"/userdetails"} />
            
        }else{
           return <Component {...props} />
        }
    }} />
}

export default PrivateRoute;


