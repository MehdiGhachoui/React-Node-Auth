import React , { useState, useRef } from 'react';
import '../App.css' ;
import axios from 'axios'
import {Link , Redirect} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import {GoogleID} from '../config/google';
import {APP_ID} from '../config/facebook';
import styled from 'styled-components';



const BtnGoogle = styled.button`
    margin:5px;
    width: 165px;
    height:35px;
    border-radius: 4px;
    background: #db3236;
    color:white;
    border:0px transparent;
    text-align: center;

    &:hover{
        background: #3b5998;
        opacity: 0.6;
    }
`



function Signin(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmail = (e) =>{

    const email = e.target.value;
    setEmail(email);

  }

  const handlePassword = (e) =>{

    const password = e.target.value;
    setPassword(password);

  }




  const responseSuccessGoogle = (response) => {

    axios.post("http://localhost:4000/google-login" ,{tokenId : response.tokenId})
         .then( rps => {

             if(rps.status=200){

              localStorage.setItem('token' , rps.data.token)
              window.location = "/home"
            }
          })
          .catch( err => {

            console.log(err)
          })

  }

  const responseFailureGoogle = (response) => {

  }

  const responseFacebook = (response) => {

    axios.post("http://localhost:4000/facebook-login" ,{accessToken : response.accessToken  , userID: response.userID})
         .then( rps => {

             if(rps.status=200){

              localStorage.setItem('token' , rps.data.token)
              window.location = "/home"
            }
          })

  }


  const componentClicked = () => {

  }


  const handleSubmit = (e) =>{

      e.preventDefault();

      axios.post("http://localhost:4000/login" ,{email : email  , password: password})
           .then( rps => {

               if(rps.status=200){

                localStorage.setItem('token' , rps.data.token)
                 window.location = "/home"
              }

            })
            .catch(err => {
                setError(err.response.data.msg)
            })

  }

  return (

      <div style={{marginTop:'150px'}} className="col-md-6 offset-md-3 text-center"  >

        <div>

          <div style={{color: "red"}}>
            {error}
          </div>
          <form onSubmit = {handleSubmit} >

              <h2>Login to your account</h2>

              <input id="email" name="email" type="email" min="8" onChange = {handleEmail} placeholder="Email"  required/>

              <br/>
              <br/>

              <input id="password" name="password" min="8" onChange = {handlePassword} type="password" placeholder="Password" required/>
              <br/>
              <br/>

              <button type="submit" >LOG IN</button>
          </form>

        </div>

        <br/>
        <div >
          <Link  to = '/forgot-password'>
            <span> Forgot Password ?</span>
          </Link>
        </div>



        <br/>
        <br/>
        <GoogleLogin
            clientId={GoogleID}
            onSuccess={responseSuccessGoogle}
            onFailure={responseFailureGoogle}
            render={renderProps => (
              <BtnGoogle onClick={renderProps.onClick}>
                  <i className="fa fa-google-plus" style={{ marginLeft: '5px' }} />
                  &nbsp;&nbsp;Sign In with Google
              </BtnGoogle>
             )}
            />

        <FacebookLogin
            appId={APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
            icon="fa fa-facebook"
            cssClass="btnFacebook"
            textButton = "&nbsp;&nbsp;Sign In with Facebook"
            />

            <br/>
            <br/>

            <div >
                <span> Don't have an account yet?</span>
                <Link  to = '/signup'>
                    <span > Sign up </span>
                </Link>
            </div>

      </div>


  );
}

export default Signin;
