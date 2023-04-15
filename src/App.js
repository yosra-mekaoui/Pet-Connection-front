//import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import { Suspense } from 'react';
import {  Route, Routes } from 'react-router-dom';

import { useScript } from 'usehooks-ts'
import Loading from "./Components/Pages/Loading";
import TwoFa from "./Components/User/TwoFa";
//import TwoFactorVerification from "./Components/User/TwoFactorVerification";

import { Cursor } from 'custom-pointer-react'

const Home = React.lazy(() => import('./Components/Pages/Home.js'))
const Header = React.lazy(() => import('./Components/Pages/Header'))
const Footer = React.lazy(() => import('./Components/Pages/Footer'))
const Market = React.lazy(()=> import ('./Components/Pages/Market'))
const About = React.lazy(() => import('./Components/Pages/About'))
const Login = React.lazy(() => import('./Components/User/login'))
const Register = React.lazy(()=> import ('./Components/User/register'))
const EnableTwoFactorAuth = React.lazy(()=> import('./Components/User/EnableTwoFactorAuth'))
const DisableTwoFactorAuth = React.lazy(()=> import('./Components/User/DisableTwoFactorAuth'))
const Event = React.lazy(()=> import ('./Components/Events/Event'))
const ForgetPwd = React.lazy(()=> import ('./Components/User/forgetPwd'))
const ResetPwd = React.lazy(()=> import ('./Components/User/resetPwd'))
const Profile = React.lazy(()=> import ('./Components/User/Profile'))

const EventDetails = React.lazy(()=> import ('./Components/Events/EventDetails'))
const UpdateEvent = React.lazy(()=> import ('./Components/Events/UpdateEvent'))
const CreateEvent = React.lazy(()=>import ('./Components/Events/CreateEvent'))

const Upgrade = React.lazy(() => import("./Components/Pages/Upgrade"));


function App() {
useScript("./assets/js/email-decode.min.js");

useScript("./assets/js/jquery-3.6.0.min.js"); 

useScript("./assets/js/jquery-ui.js");
useScript("./assets/js/jquery.timepicker.min.js");
useScript("./assets/js/bootstrap.bundle.min.js");
useScript("./assets/js/swiper-bundle.min.js");
useScript("./assets/js/jquery.nice-select.js");
useScript("./assets/js/jquery.fancybox.min.js");
useScript("./assets/js/morphext.min.js");
useScript("./assets/js/odometer.min.js")
useScript("./assets/js/jquery.marquee.min.js");
useScript("./assets/js/viewport.jquery.js");
useScript("./assets/js/isotope.pkgd.min.js");
useScript("./assets/js/SmoothScroll.js");
useScript("./assets/js/jquery.nice-number.min.js");
useScript("./assets/js/jquery.magnific-popup.min.js");
useScript("./assets/js/masonry.pkgd.min.js");
  useScript("./assets/js/main.js");
  
  const [isLoaded, setIsLoaded] = useState(false);

  const [user, setUser] = useState(null)
  useEffect(() => {
    if (localStorage.getItem("user") != null)
      setUser(localStorage.getItem("user"));
      setIsLoaded(true);
      setTimeout(() => {
        setIsLoaded(false);
      }, 1000);
   

    console.log(user)
  },[])



  return (
    <div className="App">
      {/* {isLoaded ? (
        <div className="loader-container">

       <Loading/>
      </div>
      ):( */}
      <Suspense fallback={<div></div>}>
            {/* <Cursor
  showRing={true}
  color="#000000"
  ringSize={50}
  cursorSize={10}
  ringBorder={2}
/> */}
        <Header />
        <Routes>
          <Route path="*" element={<Home />}></Route>
          <Route path="/shop" element={<Market />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Event" element={<Event />}></Route>
          <Route path="/EventDetails/:id" element={ <EventDetails/>}></Route>
          <Route path="/UpdateEvent/:id" element={<UpdateEvent/>}></Route>
          <Route path="/addEvent" element={<CreateEvent/>}></Route>

          {user == null && <Route path="/Login" element={<Login />}></Route>}
          {user == null && (
            <Route path="/Register" element={<Register />}></Route>
          )}
          {user &&(
          <Route path="/2faenable" element={<EnableTwoFactorAuth/>}></Route>)}
         {user &&( <Route path="/2fadisable" element={<DisableTwoFactorAuth/>}></Route>)}
         {user && JSON.parse(localStorage.getItem('user'))['twoFactorEnabled'] && (
  <Route path="/2faverify" element={<TwoFa />} />
)}         {user &&(<Route path='/profile' element={<Profile />}></Route>)}
         <Route path='/ForgetPwd' element={<ForgetPwd />}></Route>
          <Route path='/resetPwd/:t' element={<ResetPwd />}></Route>
          <Route exact path='/resetpassword/:token' element={<ResetPwd />}></Route>
          <Route path="/upgrade" element={<Upgrade />}></Route>

        </Routes>

        <Footer />
      </Suspense>
      {/* ) 
      } */}
      

    </div>
  );
}


export default App;
