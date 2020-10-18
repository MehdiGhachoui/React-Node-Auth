import React from "react";
import {Link} from 'react-router-dom';
import '../App.css' ;



class Dashboard extends React.Component {


  handleLogout = () =>{

    localStorage.removeItem('token');
    window.location = "/"

  }

  render() {


    return (
      <div style={{marginTop:'150px'}} className="col-md-6 offset-md-3 text-center">
          Welcome To  My Application

          <div>
            <a href="" onClick={this.handleLogout}>Log out</a>
          </div>

      </div>


    );
  }
  }


  export default Dashboard;
