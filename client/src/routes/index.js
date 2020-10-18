import React , {Fragment}from 'react';
import { Route , Switch , Redirect } from 'react-router-dom';
import Signin from '../auth/Signin';
import Signup from '../auth/Signup';
import Forgot from '../auth/Forgot';
import Reset from '../auth/Reset';
import ConfirmationPage from '../active/ConfirmationPage';
import PrivateRoute from './private';
import PublicRoute from './public';
import Dashboard from '../component/Dashboard';


const Routes = () => {
  return (
    <Fragment >
      <Switch>

        <Redirect exact from="/" to="/signin" />
        <PublicRoute  path='/signup' component={Signup} />
        <PublicRoute  path='/signin' component={Signin} />
        <Route  path='/forgot-password' component={Forgot} />
        <Route  path='/activate' component={ConfirmationPage} />
        <Route  path='/reset-password' component={Reset} />
        <PrivateRoute  path='/home' component={Dashboard} />


      </Switch>


    </Fragment>
  );
};

export default Routes;
