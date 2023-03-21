import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap"; 
import { useNavigate } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import FacebookLogin from "react-facebook-login";
import axios from "axios"; 
import { useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";

function Upgrade() {

    function handleSubmit() {

    }
  return (
    <>
       
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
                             
                             
                          />
                        </div>
                         
                      </div>
                                          

 
                    </div>
                    <button className="account-btn">
                      {" "}
                      <i className="fa fa-paw" aria-hidden="true"></i>
                      &nbsp;Log in
                    </button>
                  </form>
                   
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

export default Upgrade;
