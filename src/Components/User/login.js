import React, { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { login } from "./api";
import { useNavigate } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { facebookSuccess, loginSuccess } from './authActions';
import { useDispatch } from 'react-redux';

function Login() {
    
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [user, setUser] = useState(''); 
    const [redirectTo, setRedirectTo] = useState(null);
    const navigate = useNavigate(); 
    const dispatch = useDispatch();


    const handleSubmit = (event) => {
        event.preventDefault(); 
        
        const user = {
            'username': username,
            'password': password
        }; 

        login(user).then(data => {
          const twoFactorEnabled = localStorage.getItem('twoFactorEnabled');
          if (twoFactorEnabled ) {
            window.location.href = '/home';
          } else {
            // redirect user to 2FA verification page
            window.location.href = '/2faverify';
          }
        
       
            // dispatch(loginSuccess(data))
            
            // window.location.reload();
            // console.log(data["data"].twoFactorEnabled)
        })
      

    }

    useEffect(() => {   
        if (localStorage.getItem('user') != null) { 
            navigate("/home")
            window.location.reload();

        }
    },[])

    const back = {
        backgroundColor: '#F6DDDD',
        margin: '70px',
        paddingTop: '50px',
        width: '40%',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        borderRadius : '10px'
        
  }
  
 // ====== google =====
  function handleCallbackResponse(response) {
    //console.log("Encoded JWT : " + response.credential); 
    var userObject = jwt_decode(response.credential); 
    //console.log(userObject["family_name"]);
    
     

    localStorage.setItem(
      "user",
      JSON.stringify({
        username: userObject["family_name"],
        email: userObject["email"],
        name: userObject["name"],
        image: userObject["picture"],
      })
    );
    navigate("/home")
  
    window.location.reload();
  }




  
  useEffect(() => {
    const google = window.google;  
    google.accounts.id.initialize({
      client_id:
        "607985557534-jakbgo8aau3rdivantjud5kji6o77560.apps.googleusercontent.com",
      callback : handleCallbackResponse
    });

    google.accounts.id.renderButton (
      document.getElementById("signInDiv"),
        {theme : "outline" , size : "large"}
    ); 

    google.accounts.id.prompt()
  }, [])




  const responseFacebook = (response) => {

    console.log(response);
    console.log(response.name);
    console.log(response.email);
    console.log(response.picture.data.url);
    const payload = {
     // _id: response.userID,
      facebookId: response.id,
      name: response.name,
      email: response.email,
      image: response.picture.data.url,
      username: response.name,
      password:"12345",
      role:"simple"
    };
   
    localStorage.setItem(
      "user",
      JSON.stringify({
        //_id:response.UserID,
        facebookId: response.id,
        username: response.name,
        email: response.email,
        name: response.name,
        image: response.picture.data.url,
      password:"12345",
      role:"simple"

      })
    );

    fetch("http://localhost:3000/user/facebook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Data sent successfully");
          dispatch(facebookSuccess(user));
          const twoFactorEnabled = localStorage.getItem('twoFactorEnabled');
          if (twoFactorEnabled ) {
            window.location.href = '/home';
          } else {
            // redirect user to 2FA verification page
            window.location.href = '/2faverify';
          }
       
        } else {
          console.error("Failed to send data");
        }
      })
      .catch((err) => console.error(err));
  };
  
    
  

    return (
      <>
      
   
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>

        <div className="inner-page-banner">
          <div className="breadcrumb-vec-btm">
            <img
              className="img-fluid"
              src="assets/images/bg/inner-banner-btm-vec.png"
              alt=""
            />
          </div>
          <div className="container">
            <div className="row justify-content-center align-items-center text-center">
              <div className="col-lg-6 align-items-center">
                <div className="banner-content">
                  <h1>Login</h1>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="/">Home</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Login
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="banner-img d-lg-block d-none">
                  <div className="banner-img-bg">
                    <img
                      className="img-fluid"
                      src="assets/images/bg/inner-banner-vec.png"
                      alt=""
                    />
                  </div>
                  <img
                    className="img-fluid"
                    src="assets/images/bg/inner-banner-img.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <center>
          <div className="login-section pt-120 pb-120">
            <div className="container">
              <div className="row d-flex justify-content-center g-4">
                <div className="col-xl-6 col-lg-8 col-md-10">
                  <div
                    className="form-wrapper wow fadeInUp"
                    data-wow-duration="1.5s"
                    data-wow-delay=".2s"
                  >
                    <div className="form-title">
                      <h3>Log In</h3>
                      <p>
                        New Member? <NavLink to="/Register"> Sign Up</NavLink>
                      </p>
                    </div>
                    <form className="w-100" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-inner">
                            <label style={{ float: "left" }}>Username </label>
                            <input
                              type="text"
                              placeholder="Enter Your Username..."
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-inner">
                            <label style={{ float: "left" }}>Password </label>
                            <input
                              type="password"
                              name="password"
                              id="password"
                              placeholder="Enter Password..."
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <i
                              className="bi bi-eye-slash"
                              id="togglePassword"
                            ></i>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                            <div className="form-group">
                              <input type="checkbox" id="html" />
                              <label for="html">
                                I agree to the <a href="#">Terms & Policy</a>
                              </label>
                            </div>
                            <a href="#" className="forgot-pass">
                              Forgotten Password
                            </a>
                          </div>
                        </div>
                      </div>
                      <button className="account-btn">
                        {" "}
                        <i className="fa fa-paw" aria-hidden="true"></i>
                        &nbsp;Log in
                      </button>
                    </form>
                    <div className="alternate-signup-box">
                      <h6>or signup WITH</h6>
                      <div className="btn-group gap-4">
                        {/* <a
                          id="signInDiv"
                          href="#"
                          className="eg-btn google-btn d-flex align-items-center"
                        >
                          <i className="bx bxl-google"></i>
                          <span>signup with google</span>
                        </a> */}
                        <div id="signInDiv"></div>
                     
        <FacebookLogin
appId="976252610201144"
autoLoad={false}
fields="name,email,picture"
callback={responseFacebook}
cssClass="eg-btn facebook-btn d-flex align-items-center"
icon="bx bxl-facebook"
/>
                       
                      </div>
                    </div>
                    <div className="form-poicy-area">
                      <p>
                        By clicking the "signup" button, you create a Cobiro
                        account, and you agree to Cobiro's{" "}
                        <a href="#">Terms & Conditions</a> &{" "}
                        <a href="#">Privacy Policy.</a>
                      </p>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </center>
    
      </>
        
    );
  }
 

  
export default Login;