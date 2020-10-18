import React ,{ useState, useRef } from 'react';
import '../App.css' ;
import axios from 'axios'
import {Link , Redirect} from 'react-router-dom';



function Forgot() {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");


  const handleEmail = (e) =>{

    const email = e.target.value;
    setEmail(email);

  }


  const handleSubmit = (e) =>{

      e.preventDefault();

      axios.post("http://localhost:4000/forgot-password" ,{email : email})
           .then( response => {
              setMsg(response.data.msg);
            })
            .catch(err => {
              setError(err.response.data.msg)
            })
  }

  return (

      <div style={{marginTop:'150px'}} className="col-md-6 offset-md-3 text-center"  >

        <div style={{color: "green"}}>
          {msg}
        </div>
        <div style={{color: "red"}}>
          {error}
        </div>

        <div>
          <form onSubmit = {handleSubmit} >

              <h2>RECOVER YOUR PASSWORD</h2>

              <input id="email" name="email" type="email" min="8" onChange = {handleEmail} placeholder="Email"  required/>

              <br/>
              <br/>


              <button type="submit" >SEND RESET LINK</button>
          </form>

        </div>

        <br/>
        <br/>


        <div >
            <Link  to = '/signin'>
                <span > Go back to login </span>
            </Link>
        </div>



      </div>
    );
  }

  export default Forgot;
