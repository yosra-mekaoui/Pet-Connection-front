import React from "react";

const initialState = {
 
  email: "",
  password: "",
  passError: "",
  emailError: "",
  passwordError: ""
};

export default class Login extends React.Component {
  state = initialState;

  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
  };

  validate = () => {
    let passError = "";
    let emailError = "";
    // let passwordError = "";

    if (!this.state.password) {
      passError = "password cannot be blank";
    }

    if (!this.state.email.includes("@")) {
      emailError = "invalid email";
    }

    if (emailError || passError) {
      this.setState({ emailError, passError });
      return false;
    }

    return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      // clear form
      this.setState(initialState);
    }
  };

  render() {
    return (
        <div>
            <div class="inner-page-banner">
<div class="breadcrumb-vec-btm">
<img class="img-fluid" src="assets/images/bg/inner-banner-btm-vec.png" alt="" />
</div>
<div class="container">
<div class="row justify-content-center align-items-center text-center">
<div class="col-lg-6 align-items-center">
<div class="banner-content">
<h1>Login</h1>
<nav aria-label="breadcrumb">
<ol class="breadcrumb">
<li class="breadcrumb-item"><a href="index.html">Home</a></li>
<li class="breadcrumb-item active" aria-current="page">Login</li>
</ol>
</nav>
</div>
</div>
<div class="col-lg-6">
<div class="banner-img d-lg-block d-none">
<div class="banner-img-bg">
<img class="img-fluid" src="assets/images/bg/inner-banner-vec.png" alt="" />
</div>
<img class="img-fluid" src="assets/images/bg/inner-banner-img.png" alt="" />
</div>
</div>
</div>
</div>
</div>

<div class="login-section pt-120 pb-120">
<div class="container">
<div class="row d-flex justify-content-center g-4">
<div class="col-xl-6 col-lg-8 col-md-10">
<div class="form-wrapper wow fadeInUp" data-wow-duration="1.5s" data-wow-delay=".2s">
<div class="form-title">
<h3>Log In</h3>
<p>New Member? <a href="sign-up.html">signup here</a></p>
</div>
<form class="w-100" onSubmit={this.handleSubmit}>
<div class="row">
 <div class="col-12">
<div class="form-inner">
<label>Enter Your Email *</label>
<input type="email" placeholder="Enter Your Email" 

name="email"
value={this.state.email}
onChange={this.handleChange}
/>

</div>
<div style={{ fontSize: 12, color: "red" }}>
            {this.state.emailError}
          </div>
</div>
<div class="col-12">
<div class="form-inner">
<label>Password *</label>
<input type="password" name="password" id="password" placeholder="Password" 
 
value={this.state.password}
onChange={this.handleChange}/>
<i class="bi bi-eye-slash" id="togglePassword"></i>
</div>
<div style={{ fontSize: 12, color: "red" }}>
            {this.state.passError}
          </div>
</div>
<div class="col-12">
<div class="form-agreement form-inner d-flex justify-content-between flex-wrap">
<div class="form-group">
<input type="checkbox" id="html" />
<label for="html">I agree to the <a href="#">Terms & Policy</a></label>
</div>
<a href="#" class="forgot-pass">Forgotten Password</a>
</div>
</div>
</div>
<button class="account-btn" type="submit">Log in</button>
</form>
<div class="alternate-signup-box">
<h6>or signup WITH</h6>
<div class="btn-group gap-4">
<a href="#" class="eg-btn google-btn d-flex align-items-center"><i class='bx bxl-google'></i><span>signup whit google</span></a>
<a href="#" class="eg-btn facebook-btn d-flex align-items-center"><i class='bx bxl-facebook'></i>signup whit facebook</a>
</div>
</div>
<div class="form-poicy-area">
<p>By clicking the "signup" button, you create a Cobiro account, and you agree to Cobiro's <a href="#">Terms & Conditions</a> & <a href="#">Privacy Policy.</a></p>
</div>
</div>
</div>
</div>
</div>
</div>

        </div>
    );
  }}
