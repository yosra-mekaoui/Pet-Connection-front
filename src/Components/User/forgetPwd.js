import React, { useState, useEffect } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { forgetPwd } from "./api";
import { NavLink, Routes, Route } from "react-router-dom";

 


function ForgetPwd() {
  
    const [email, setEmail] = useState(''); 
    const [message, setMessage] = useState("");
    
    const navigate = useNavigate();

   
    const handleSubmit = async () => {
     // event.preventDefault(); 
      
      try {
         const response = await forgetPwd(email) ;
      }catch(error){
        console.log(error.message)
      }
          
         /* forgetPwd(user).then(data => {
              
              console.log(data["data"])
          })*/
      

      

  }

        


    useEffect(() => { 
        if (localStorage.getItem('user') != null) { 
            navigate("/home")
        }
     }, [])
    
    const back = {
        backgroundColor: '#F6DDDD',
        margin: '70px',
        paddingTop: '50px',
        width: '40%',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        borderRadius : '10px'
        
    }

    return (
      <>
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
                  <h1>Forget Password</h1>
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
          <div class="login-section pt-120 pb-120">
            <div class="container">
              <div class="row d-flex justify-content-center g-4">
                <div class="col-xl-6 col-lg-8 col-md-10">
                  <div
                    class="form-wrapper wow fadeInUp"
                    data-wow-duration="1.5s"
                    data-wow-delay=".2s"
                  >
                    <div class="form-title">
                      <h3>Enter Your Email</h3>
                      
                    </div>
                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>pasword reset link send Succsfully in Your Email</p> : ""}
                    <form class="w-100" >
                      <div class="row">
                        <div class="col-12">
                          <div class="form-inner">
                            <label style={{ float: "left" }}>Email </label>
                            <input
                              type="email"
                              placeholder="Enter Your Email..."
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <button className="account-btn">
                        {" "}
                        <i className="fa fa-paw" aria-hidden="true" ></i>
                        &nbsp;Send
                      </button>
                    </form>
                   
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </center>
      </>
    );
}

export default ForgetPwd;