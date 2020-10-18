import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import  isLogedIn  from '../middleware/isLoged';

const PrivateRoute = ({component: Component, ...rest}) => {

   return (

       <Route {...rest} render={props => (isLogedIn () ? <Component {...props} /> : <Redirect to="/signin" /> )} />
   );

   
};

export default PrivateRoute;
