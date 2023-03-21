import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { getEvents } from "./Services";

function Event() {
    const [events, setEvents] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const promises = events.map((event) =>
      axios
        .get(`http://localhost:3000/event/uploads/${event.image}`, {
          responseType: "blob",
        })
        .then((res) => {
          const url = URL.createObjectURL(res.data);
          return { id: event._id, url };
        })
    );
    Promise.all(promises).then(setImageUrls);
  }, [events]);

  const getImageUrlById = (id) =>
    imageUrls.find((imageUrl) => imageUrl.id === id)?.url;
    
    return ( <>
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
            <h1>Events</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Events
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
  <div className="blog-grid-pages pt-120 mb-120">
        <div className="container">
          <div className="row g-lg-4 gy-5 justify-content-center mb-70">
            {events.map((event) => (
              <div className="col-lg-8" key={event._id}>
                <div className="blog-st-card mb-60">
                <div className="blog-img">
  {imageUrls.length > 0 && (
    <img
      className="img-fluid"
      src={getImageUrlById(event._id)}
      alt={event.title}
    />
  )}
</div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <ul>
                        <li>
                          <a href="#">{event.date}</a>
                        </li>
                        <li>
                          <a href="#">By, {event.organizer}</a>
                        </li>
                      </ul>
                    </div>
                    <h4>
                      <a href="#">{event.title}</a>
                    </h4>
                    <p>{event.description}</p>
                    <div className="more-btn">
                      <NavLink to="/EventDetails">
                        <span>Read More</span>
                      </NavLink>
              </div>
            </div>
          </div>
          
        
       
        </div>
       ))}
        </div>  
        </div>
        </div>
      

</>

    </> );
}

export default Event;