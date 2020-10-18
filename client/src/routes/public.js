import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import  isLogedIn  from '../middleware/isLoged';

const PublicRoute = ({component: Component, ...rest}) => {

   return (

       <Route {...rest} render={props => (isLogedIn () ? <Redirect to="/home" />  : <Component {...props} /> )} />
   );


};

export default PublicRoute;
