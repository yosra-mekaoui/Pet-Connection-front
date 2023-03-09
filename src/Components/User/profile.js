import React, { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { login, register ,editProfil} from "./api";
import { useNavigate } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";

import axios from "axios";



function Profile() {

  const [user, setUser] = useState({});
  const [imageSrc, setImageSrc] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    location: '',
    phone: '',
    image: null
  });

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    
    console.log("iduserconnecte "+userFromLocalStorage._id)

    //////////////get connected user////////////////
    // const userconnecte = editProfil(user._id,formDataToSend)






    //////////////////////////////////////////////


    setUser(userFromLocalStorage);
    setFormData({
      "username": userFromLocalStorage.username,
      "name": userFromLocalStorage.name,
      "email": userFromLocalStorage.email,
      "location": userFromLocalStorage.location,
      "phone": userFromLocalStorage.phone,
      "image": null,
      "password": userFromLocalStorage.password,
    });


    if (userFromLocalStorage.image) {
      axios.get(`http://localhost:3000/user/imageUser/${userFromLocalStorage._id}/image`, { responseType: 'blob' })
        .then(res => {
          const url = URL.createObjectURL(res.data);
          setImageSrc(url);
          console.log("url image--->"+ url)

        })
        .catch(error => {
          console.error(error);
        });
    }






    //console.log("user id ---> "+ user._id)
  }, []);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = e => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { username, name, email, location, phone, image,password } = formData;

    const updatedUser = {
      username,
      name,
      email,
      location,
      phone,
      image,
      password

      
    

    };


    const formDataToSend = new FormData();

    for (let key in updatedUser) {
      formDataToSend.append(key, updatedUser[key]);
    }

    //console.log(user._id)
  //  console.log(updatedUser)
    try {
      const res = editProfil(user._id,formDataToSend)

      console.log("--> "+ JSON.stringify(res.data.user));




      localStorage.setItem("user", res.data.user);



      // const res = await axios.put(`/updateuser/${user._id}`, formDataToSend);
    console.log(res);
      // Do something with the updated user data, e.g. set it in state
     // setUser(res.data.user);
    //  : localStorage.setItem('user', JSON.stringify(res.data.user));

    } catch (error) {
      console.log(error);
     
    }
  };



  return (
    <>
    <div>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
        <div className="main-content">
          {/* Top navbar */}
          <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
            <div className="container-fluid">
              {/* Brand */}
              {/* <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" href="https://www.creative-tim.com/product/argon-dashboard" target="_blank">User profile</a> */}
              {/* Form */}
              <form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                <div className="form-group mb-0">
                  <div className="input-group input-group-alternative">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fas fa-search" /></span>
                    </div>
                    <input className="form-control" placeholder="Search" type="text" />
                  </div>
                </div>
              </form>
              {/* User */}
              <ul className="navbar-nav align-items-center d-none d-md-flex">
                <li className="nav-item dropdown">
                  <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div className="media align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img alt="Image placeholder" src="https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg" />
                      </span>
                      <div className="media-body ml-2 d-none d-lg-block">
                        <span className="mb-0 text-sm  font-weight-bold">Jessica Jones</span>
                      </div>
                    </div>
                  </a>
                  <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                    <div className=" dropdown-header noti-title">
                      <h6 className="text-overflow m-0">Welcome!</h6>
                    </div>
                    <a href="../examples/profile.html" className="dropdown-item">
                      <i className="ni ni-single-02" />
                      <span>My profile</span>
                    </a>
                    <a href="../examples/profile.html" className="dropdown-item">
                      <i className="ni ni-settings-gear-65" />
                      <span>Settings</span>
                    </a>
                    <a href="../examples/profile.html" className="dropdown-item">
                      <i className="ni ni-calendar-grid-58" />
                      <span>Activity</span>
                    </a>
                    <a href="../examples/profile.html" className="dropdown-item">
                      <i className="ni ni-support-16" />
                      <span>Support</span>
                    </a>
                    <div className="dropdown-divider" />
                    <a href="#!" className="dropdown-item">
                      <i className="ni ni-user-run" />
                      <span>Logout</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          {/* Header */}
          <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{height:"30vh", backgroundImage: 'url(https://raw.githubusercontent.com/creativetimofficial/argon-dashboard/gh-pages/assets-old/img/theme/profile-cover.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
            {/* Mask */}
            <span className="mask bg-gradient-default opacity-8" />
            {/* Header container */}
            <div className="container-fluid d-flex align-items-center">
              <div className="row">
                <div className="col-lg-7 col-md-10">
                  <h2 className="display-2 text-white">Hello,  {user.username}</h2>
                  <p className="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
                  <a href="#!" className="btn btn-info">Edit profile</a>
                </div>
              </div>
            </div>
          </div>
          {/* Page content */}
          <div className="container-fluid mt--7">
            <div className="row">
              <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                <div className="card card-profile shadow">
                  <div className="row justify-content-center">
                    <div className="col-lg-3 order-lg-2">
                      <div className="card-profile-image">
                        <a>
                          <img src={imageSrc} alt={user.name} className="rounded-circle" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                    {/* <div className="d-flex justify-content-between">
                      <a href="#" className="btn btn-sm btn-info mr-4">Connect</a>
                      <a href="#" className="btn btn-sm btn-default float-right">Message</a>
                    </div> */}
                  </div>
                  <div className="card-body pt-0 pt-md-4">
                    <div className="row">
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                          <div>
                            <span className="heading">22</span>
                            <span className="description">Publication</span>
                          </div>
                          <div>
                            <span className="heading">10</span>
                            <span className="description">Animaux</span>
                          </div>
                          <div>
                            <span className="heading">89</span>
                            <span className="description">Commentaires</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3>
                       {user.name}<span className="font-weight-light"></span>
                      </h3>
                      <div className="h5 font-weight-300">
                        <i className="ni location_pin mr-2" /> {user.email}
                      </div>
                      <div className="h5 mt-4">
                        <i className="ni business_briefcase-24 mr-2" />Phone number : {user.phone}

                      </div>
                      <div className="h5 mt-4">
                        <i className="ni business_briefcase-24 mr-2" />User Name : {user.username}

                      </div>
                      <div>
                        <i className="ni education_hat mr-2" />Location : {user.location} 
                      </div>
                      <hr className="my-4" />
                      <a style={{color: 'white'}}>Show more</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-xl-8 order-xl-1">
                <div className="card bg-secondary shadow">
                  <div className="card-header bg-white border-0">
                    <div className="row align-items-center">
                      <div className="col-8">
                        <h3 className="mb-0">Mon compte</h3>
                      </div>

                      {/*  */}
{/* -------------------------------------------------------------------------------------------------------------------------------- */}
{/* -------------------------------------------------------------------------------------------------------------------------------- */}

                      <div className="col-4 text-right">
                        {/* <a href="#!" className="btn btn-sm btn-primary">Modifier Profile</a> */}
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form  onSubmit={handleSubmit} enctype="multipart/form-data">
                      <h6 className="heading-small text-muted mb-4">INFORMATIONS DE L'UTILISATEUR</h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group focused">
                              <label className="form-control-label" htmlFor="input-username">Username</label>
                              <input type="text" name="username" value={formData.username}onChange={handleChange}  id="input-username" className="form-control form-control-alternative" placeholder="Username"/>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="form-control-label" htmlFor="input-email">Email address</label>
                              <input type="email" name="email" value={formData.email}onChange={handleChange} id="input-email"   className="form-control form-control-alternative"  placeholder="Email" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group focused">
                              <label className="form-control-label" htmlFor="input-first-name">Name</label>
                              <input  type="text" name="name" value={formData.name} onChange={handleChange} id="input-first-name" className="form-control form-control-alternative" placeholder="name"/>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group focused">
                              <label className="form-control-label" htmlFor="input-last-name">Location</label>
                              <input type="text" name="location" value={formData.location} onChange={handleChange} id="input-last-name" className="form-control form-control-alternative" placeholder="Location"  />
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="form-group focused">
                              <label className="form-control-label" htmlFor="input-last-name">Phone number</label>
                              <input   type="text" name="phone" value={formData.phone} onChange={handleChange} id="input-last-name" className="form-control form-control-alternative" placeholder="phone number" />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group focused">
                              <label className="form-control-label" htmlFor="input-last-name">Image</label>
                              <input type="file"name="image"accept="image/*"onChange={handleFileChange} id="input-last-name" className="form-control form-control-alternative" placeholder="image"/>
                            </div>
                          </div>
                        </div>
                      </div>
                       <div className="col-12 text-right mr-5">
                        <button type="submit"   className="btn btn-sm btn-primary">Modifier Profile</button >
                      </div>
                    </form>
 {/*-------------------------------------------------------------------------------------------------------------------  */}
  {/*-------------------------------------------------------------------------------------------------------------------  */}

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
    
      </div>

   

    



    </>
  );




                    }

export default Profile;



