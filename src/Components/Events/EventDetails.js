import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent,addAttendeeById, RemoveAttendeeById } from "./Services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const baseUrl = "http://localhost:3000/uploads/"; // Replace with your base URL

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isGoing, setIsGoing] = useState(false);
  const [error, setError] = useState(null);
  const [numParticipants, setNumParticipants] = useState(0);
  const user = JSON.parse(localStorage.getItem('user'))._id || JSON.parse(localStorage.getItem('user')).facebookId;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEvent(id);
        setEvent(res.data);
        setNumParticipants(res.data.attendees.length);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch event details.");
      }
    };
    fetchEvent();
  }, [id, event]); // Add event as a dependency

  const handleGoingClick = async () => {
    try {

      const userId = JSON.parse(localStorage.getItem("user"));
      let connectedUserId;
      if (userId._id) {
        connectedUserId = userId._id;
      } else if (userId.facebookId) {
        connectedUserId = userId.facebookId;
      } else {
        toast.error("User ID not found.");
        return;
      }
  
      if (event.attendees.includes(connectedUserId)) {
        // If user is already in attendees list, remove them
        const attendees = event.attendees.filter((attendeeId) => attendeeId !== connectedUserId);
        const res = await RemoveAttendeeById(id, connectedUserId);
        
        
        setIsGoing(false);
        setEvent(res.data);
        setNumParticipants(res.data.attendees.length);
        toast.success("Successfully removed RSVP from the event!");
      } else {
        // If user is not in attendees list, add them
        const res = await addAttendeeById(id, connectedUserId);
        setIsGoing(true);
        setEvent(res.data);
        setNumParticipants(res.data.attendees.length);
        toast.success("Successfully RSVP'd to the event!");
      }
  
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error(err.response.data.message);
    }
  };
  

  const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return Boolean(user);
  };
  

    return ( <>
         
         <ToastContainer />

    <div className="blog-details-pages pt-120 mb-120">
  <div className="container">
  {event && (
          
    <div className="row g-lg-4 gy-5 justify-content-center mb-70">
      <div className="col-lg-8">
        <div className="blog-details-wrap mb-120">
        <div className="post-thum">

    <img
      className="img-fluid"
      src={baseUrl + event.image}
      alt={event.title}
    />

 

</div>

          <div className="blog-meta">
            <ul>
              <li>
                <a href="blog-grid.html"> {event.date}</a>
              </li>
              <li>
                <a href="blog-grid.html">by : {event.organizer} </a>
              </li>
              <li>
                <a href="blog-grid.html"> {event.location}</a>
              </li>
              {!isAuthenticated() ? (
  <button className="account-btn" disabled>
    Please log in to RSVP
  </button>
) : (
  <button
    className="account-btn"
    onClick={handleGoingClick}
    disabled={!event}
  >
    {event && event.attendees.includes(user) ? "Not Going" : "I'm Going"}
  </button>
)}



                        </ul>
                        <p>
                        Participants: {numParticipants}
                      </p>
                      {event.attendees && event.attendees.length > 0 ? (
  <ul>
  
  </ul>
) : (
  <p>No attendees yet.</p>
)}


          </div>
          <h2 className="post-title">
            {event.title}
           
          </h2>
          <div className="post-content">
            <p>
              {event.description}
             
            </p>
           
         
            <div className="row g-4 align-items-center mb-10 pt-10">
              <div className="col-lg-6">
             
                <p>

                  
                </p>
              </div>
              <div className="col-lg-6">
                <img
                  className="img-fluid"
                  src="assets/images/blog/blog-dt-img2.png"
                  alt=""
                />
              </div>
            </div>
            <h2>
              
            </h2>
            <p>
              
            </p>
          </div>



          <div className="comment-area">
          <div className="blog-comments mb-120">
            <div className="comments-title">
              <h2>Comment</h2>
            </div>
            <ul className="comment-list">
              <li>
                <div className="single-comment mb-50 d-flex align-items-center justify-content-between flex-md-nowrap flex-wrap">
                  <div className="comment-content">
                    <div className="c-header d-flex align-items-center justify-content-between">
                      <div className="author-area">
                        <div className="author-img">
                          <img
                            src="assets/images/blog/blog-author.png"
                            alt=""
                          />
                        </div>
                        <div className="author-details">
                          <h5 className="mb-0">Angilano Cooper</h5>
                          <div className="c-date">
                            11 January, 2022 At 01.56 pm
                          </div>
                        </div>
                      </div>
                      <div className="replay-btn">
                        <a href="#">
                          <img
                            src="assets/images/icon/replay-icon.svg"
                            alt=""
                          />{" "}
                          Reply
                        </a>
                      </div>
                    </div>
                    <div className="c-body">
                      <p>
                        Pellentesque maximus augue orci, quis congue purus
                        iaculison id. Maecenas eu lorem quisesdoi massal
                        molestie vulputate in sitagi amet diam. Cras eu odio sit
                        amet ipsum cursus for that gone pellentesquea. thisaton
                        Vestibulum ut aliquet risus. In hac habitasse plateajoa
                        dictumst. Nuncet posuere scelerisque justo in
                        accumsan.Pellentesque
                      </p>
                    </div>
                  </div>
                </div>
                <ul className="comment-reply">
                  <li>
                    <div className="single-comment d-flex align-items-center justify-content-between flex-md-nowrap flex-wrap">
                      <div className="comment-content">
                        <div className="c-header d-flex align-items-center justify-content-between">
                          <div className="author-area">
                            <div className="author-img">
                              <img
                                src="assets/images/blog/blog-author1.png"
                                alt=""
                              />
                            </div>
                            <div className="author-details">
                              <h5 className="mb-0">Polard Girdet</h5>
                              <div className="c-date">
                                11 January, 2022 At 01.56 pm
                              </div>
                            </div>
                          </div>
                          <div className="replay-btn">
                            <a href="#">
                              <img
                                src="assets/images/icon/replay-icon.svg"
                                alt=""
                              />{" "}
                              Reply
                            </a>
                          </div>
                        </div>
                        <div className="c-body">
                          <p>
                            Pellentesque maximus augue orci, quis congue purus
                            iaculison id. Maecenas eu lorem quisesdoi massal
                            molestie vulputate in sitagi amet diam. Cras eu odio
                            sit amet ipsum cursus for that gone pellentesquea.
                            thisaton Vestibulum ut aliquet risus. In hac
                            habitasse plateajoa dictumst. Nuncet posuere
                            scelerisque justo in accumsan.Pellentesque
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="comment-form">
            <div className="comments-title">
              <h2>Leave a Comment</h2>
            </div>
            <form>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-inner name mb-40">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-inner email mb-40">
                    <input
                      type="text"
                      placeholder="Enter your email"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-inner mb-40">
                    <textarea placeholder="Your message" defaultValue={""} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-inner two">
                    <button className="primary-btn3 btn-lg" type="submit">
                      Submit Comment
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        </div>
       
      </div>
     
    </div>



  )}
    
    
  

 

  </div>
</div>

  

    </> );
}

export default EventDetails;