import React , { useState, useRef } from 'react';
import '../App.css' ;
import axios from 'axios'
import {Link , Redirect} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
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




function Reset() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState({ email: "" , password:"" , passwordConfirm:""});
  const [msg, setMsg] = useState("");
  const [ermsg, setErmsg] = useState("");




  const handleEmail = (e) =>{

    const email = e.target.value;
    setEmail(email);

  }

  const handlePassword = (e) =>{

    const password = e.target.value;
    setPassword(password);

  }

  const handlePasswordConfirm = (e) =>{

    const passwordConfirm = e.target.value;
    setPasswordConfirm(passwordConfirm);

  }


  const handleSubmit = (e) =>{

      e.preventDefault();

      if(password.length < 8){

          setError(prevState => ({
              ...prevState,
              password: 'Password must be 8 characters long!'
           }));
      }

      if(passwordConfirm != password){

          setError(prevState => ({
              ...prevState,
              passwordConfirm: 'Passwords must be the same'
           }));
      }


      let search = window.location.search;
      let params = new URLSearchParams(search);
      let token = params.get('token');



      axios.post(`http://localhost:4000/reset-password?token=${token}` ,{email : email  , password: password , passwordConfirmation:passwordConfirm})
           .then( response => {

              setMsg(response.data.msg)
            }).catch(err => {
              setErmsg(err.response.data.msg)
            })

  }


  return (

      <div style={{marginTop:'150px'}} className="col-md-6 offset-md-3 text-center"  >

        <div>

          <div style={{color: "green"}}> {msg}</div>
          <div style={{color: "red"}}> {ermsg}</div>

          <form onSubmit = {handleSubmit} >

              <h2>Login to your account</h2>

              <input id="email" name="email" type="email" min="8" onChange = {handleEmail} placeholder="Email"  required/>
              <div style={{color: "red"}}> {error.email}</div>

              <br/>
              <br/>

              <input id="password" name="password" min="8" onChange = {handlePassword} type="password" placeholder="Password" required/>
              <div style={{color: "red"}}> {error.password}</div>

              <br/>
              <br/>

              <input id="passwordConfirm" name="passwordConfirm" min="8" onChange = {handlePasswordConfirm} type="password" placeholder="Password (Confirm)" required/>
              <div style={{color: "red"}}> {error.passwordConfirm}</div>

              <br/>
              <br/>

              <button type="submit" >RESET PASSWORD</button>
          </form>

        </div>


        <br/>
        <br/>


        <div >

            <Link  to = '/signin'>
                <span > Go back to login</span>
            </Link>
        </div>

      </div>


  );
}

export default Reset;
