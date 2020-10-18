import React , { useState, useRef } from 'react';
import '../App.css' ;
import axios from 'axios'
import {Link , Redirect} from 'react-router-dom';


function Signup() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState({ name: "", email: "" , password:"" , passwordConfirm:""});
  const [msg, setMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleName = (e) =>{


    const username = e.target.value;

    setUsername(username);

  }

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

      if(username.length < 3){

          setError(prevState => ({
              ...prevState,
              name: 'username must be at least 3 characters long!'
           }));
      }



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


      axios.post("http://localhost:4000/register" ,{name:username , email:email  , password:password , passwordConfirmation:passwordConfirm})
           .then( response => {
                setMsg(response.data.msg);
           })
           .catch(err => {

             setErrMsg(err.response.data.msg)

           })

  }

  return (

      <div style={{marginTop:'150px'}} className="col-md-6 offset-md-3 text-center"  >

        <div>

          <div style={{color: "green"}}>
            {msg}
          </div>
          <div style={{color: "red"}}>
            {errMsg}
          </div>

          <form onSubmit = {handleSubmit} >

              <h2>CREATE AN ACCOUNT</h2>

              <input id="name" name="name" type="text" min="3" onChange = {handleName} placeholder="Name"  required/>
              <div style={{color: "red"}}> {error.name}</div>


              <br/>
              <br/>

              <input id="email" name="email" type="email" min="8" onChange = {handleEmail} placeholder="Email"  required/>
              <div style={{color: "red"}}> {error.email}</div>

              <br/>
              <br/>

              <input id="password" name="password" min="8"  onChange = {handlePassword} type="password" placeholder="Password" required/>
              <div style={{color: "red"}}> {error.password}</div>

              <br/>
              <br/>

              <input id="passwordConfirm" name="passwordConfirm" min="8" onChange = {handlePasswordConfirm} type="password" placeholder="Password (Confirm)" required/>
              <div style={{color: "red"}}> {error.passwordConfirm}</div>

              <br/>
              <br/>

              <button type="submit" >CREATE ACCOUNT</button>
          </form>

        </div>

        <br/>
        <br/>


        <div >
            <span> Already have an account?</span>
            <Link  to = '/signin'>
                <span className="greenLink"> Log in </span>
            </Link>
        </div>



      </div>
    );
  }

  export default Signup;
