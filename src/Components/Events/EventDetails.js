import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent,addAttendeeById } from "./Services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const baseUrl = "http://localhost:3000/uploads/"; // Replace with your base URL

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isGoing, setIsGoing] = useState(false);
  const [error, setError] = useState(null);
  const [numParticipants, setNumParticipants] = useState(0);

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
  }, [id]);

  const handleGoingClick = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      let connectedUserId;
    if (user._id) {
      connectedUserId = user._id;
    } else if (user.facebookId) {
      connectedUserId = user.facebookId;
    } else {
      toast.error("User ID not found.");
      return;
    }
      if (event.attendees.includes(connectedUserId)) {
        toast.error("You are already on the attendees list.");
      }
      const res = await addAttendeeById(id, connectedUserId);
      setIsGoing(true);
      setEvent(res.data);
      setNumParticipants(res.data.attendees.length);
      toast.success("Successfully RSVP'd to the event!");

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
              {!isAuthenticated() ? (
  <button className="account-btn" disabled>
    Please log in to RSVP
  </button>
) : (
  <button
    className="account-btn"
    onClick={handleGoingClick}
    disabled={isGoing}
  >
    {isGoing ? "Going" : "I'm Going"}
  </button>
)}

                        </ul>
                        <p>
                        Participants: {numParticipants}
                      </p>
                      {event.attendees && event.attendees.length > 0 ? (
  <ul>
    {event.attendees.map((attendeeId) => {
      const attendee = event.attendees.find((user) => user.id === attendeeId);
      return (
        <li key={attendeeId}>
          {attendee && attendee.name}
        </li>
      );
    })}
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





        </div>
       
      </div>
     
    </div>



  )}
    
    
  

 

  </div>
</div>

  

    </> );
}

export default EventDetails;