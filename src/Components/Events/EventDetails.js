import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent,addAttendeeById } from "./Services";



const baseUrl = "http://localhost:3000/uploads/"; // Replace with your base URL

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isGoing, setIsGoing] = useState(false);
  const [ error,setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEvent(id);
        setEvent(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch event details.");
    
  
      }
    };
    fetchEvent();
  }, [id]);


  const handleGoingClick = async () => {
    try {
      const res = await addAttendeeById(id);
      setEvent(res.data); // Update the event object with the returned data
      setIsGoing(true);
    } catch (err) {
      console.error(err);
      setError("Failed to update event details.");
    }
  };

  
  

    return ( <>
          {event && (

    <div className="blog-details-pages pt-120 mb-120">
  <div className="container">
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
              <li> <button
                          className="account-btn"
                          onClick={handleGoingClick}
                          disabled={isGoing}
                        >
                          {isGoing ? "Going" : "I'm Going"}
                        </button>
                      </li>
            </ul>
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
  </div>
</div>
  )
}

    </> );
}

export default EventDetails;