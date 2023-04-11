import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent, addAttendeeById, RemoveAttendeeById, getCommentById, addComment,addReply ,deleteComment,updateComment} from "./Services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import "./style.css";
import "./comment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { formatDistanceToNow } from 'date-fns';

import axios from "axios";




const baseUrl = "http://localhost:3000/uploads/"; // Replace with your base URL
const url ="http://localhost:3000/public/uploads/"

function EventDetails() {
  const [event, setEvent] = useState({});

  const [isGoing, setIsGoing] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const { id, commentId } = useParams();
   const {eventId} =useParams();
 const [users,setUsers] = useState('');
 const [imageSrc, setImageSrc] = useState(''); // importer image user 
 const [replyToCommentId, setReplyToCommentId] = useState(null);
 const [replyingTo, setReplyingTo] = useState(false);
 const [replyText, setReplyText] = useState("");
  const user = JSON.parse(localStorage.getItem('user'));
const [isEditing,setIsEditing] = useState(false);
  const [numParticipants, setNumParticipants] = useState(0);
  const [text, setText] = useState({ text: "" });
  const [commentsUpdated, setCommentsUpdated] = useState(false);
 const [isCommentSectionHidden, setIsCommentSectionHidden] = useState(false);
 const [buttonLabel, setButtonLabel] = useState("Join");
 const [showFullImage, setShowFullImage] = useState(false);
 const [likes, setLikes] = useState(event?.Like || 0);
 const [liked, setLiked] = useState(false);
 const [disliked, setDisliked] = useState(false);
 
 const handleLike = async (eventId) => {
   const userId = JSON.parse(localStorage.getItem('user'))["_id"];
   console.log('handleLike called');
   console.log('liked:', liked);
   console.log('disliked:', disliked);
   try {
     const response = await fetch(`http://localhost:3000/event/likeEvent/${eventId}`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ userId })
     });
     const data = await response.json();
     if (response.status === 404) {
       console.log(data.message); // handle Event not found error
     } else if (response.status === 400) {
       console.log(data.message); // handle You have already liked this event error
     } else {
       setLiked(true);
       setDisliked(false);
       setLikes(prevLikes => prevLikes + 1);
     }
   } catch (error) {
     console.error(error);
   }
 };
 
 const handleDislike = async (eventId) => {
  const userId = JSON.parse(localStorage.getItem('user'))._id;
  console.log('handleDisLike called');
  console.log('liked:', liked);
  console.log('disliked:', disliked);
  try {
    const response = await fetch(`http://localhost:3000/event/dislikeEvent/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    });
    const data = await response.json();
    if (response.status === 400) {
      if (data.message === 'User has not liked the event') {
        // User has not liked the event
        console.log('User has not liked the event');
        // TODO: display error message or disable the dislike button
      } else {
        // Other 400 error
        console.log(data.message);
      }
    } else if (response.status === 200) {
      setDisliked(true);
      setLiked(false);
      setLikes(prevLikes => prevLikes - 1);
    } else {
      console.log(data.message); // handle other errors
    }
  } catch (error) {
    console.error(error);
  }
};

 
 useEffect(() => {
   const userId = JSON.parse(localStorage.getItem('user'))["_id"];
   const userLikes = event.Like && event.Like.filter(like => like === userId);
   if (userLikes && userLikes.length > 0) {
     setLiked(true);
   } else {
     setLiked(false);
   }
   setLikes(event?.Like || 0);
 }, [event]);







  const handleClick = () => {
    setShowFullImage(true);
  };

  const handleClose = () => {
    setShowFullImage(false);
  };

  const toggleCommentSection = () => {
    setIsCommentSectionHidden(!isCommentSectionHidden);
  };

  const handleEdit = (comment) => {
    setText({ id: comment._id, text: comment.text });
    setIsEditing(true);
  };
  
  const handleTextChange = (comment) => {
    setText({ id: comment._id, text: comment.text });
    setIsEditing(true);
  };
  

    const handleSaveClick = async () => {
          console.log("text:", text);

      const res = await updateComment(text.id, text.text, user.username);
      setIsEditing(false);
      setCommentsUpdated(!commentsUpdated); // Force a re-render

    };
  
  
  
    const handleCancelClick = () => {
    setIsEditing(false);
    setText(comment.text);
  };

  
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
  }, [id,event]); // Remove event as a dependency
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUsers(user);
    const fetchComments = async () => {
      try {
        const res = await getCommentById(id);
        setComments(res);
        console.log(res)
      } catch (err) {
        console.error(err);
        setError("Failed to fetch comments.");
      }
    };
    fetchComments();
  }, [commentsUpdated]);
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        text: comment,
        eventId: id,
        username: user.username,
        image : user.image
      };
  
 
      const res = await addComment(formData);
      console.log(formData)
      setComments((prevComments) => {
        if (Array.isArray(prevComments)) {
          return [...prevComments, res];
        }
       
        return [res];
      });
            setComment("");


      toast.success("Successfully added comment!");
    } catch (err) {
      setError(err.message);
    }
  };
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
        console.log("remove attendee response", res);
        setButtonLabel("Join");
        setEvent(res);
        if (res && res.attendeesCount) {
          setNumParticipants(res.attendeesCount);
          toast.success("Successfully removed  from the event!");
        } else {
          toast.error("Failed to remove  from the event.");
        }
      } else {
        // If user is not in attendees list, add them
        const res = await addAttendeeById(id, connectedUserId);
        console.log("add attendee response", res);
        setButtonLabel("Not Going");
        setEvent(res);
        if (res && res.attendeesCount) {
          setNumParticipants(res.attendeesCount);
          toast.success("Successfully joined the event!");
        } else {
          toast.error("Failed to join  the event.");
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error(err.response);
    }
  };
  
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"));
    let connectedUserId;
    if (userId._id) {
      connectedUserId = userId._id;
    } else if (userId.facebookId) {
      connectedUserId = userId.facebookId;
    } else {
      return;
    }

    if (event.attendees?.includes(connectedUserId)) {
      setButtonLabel("Not Going");
    }
    
    
  }, [event]);
  

  const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return Boolean(user);
  };

  const handleChange = e => {
    try {
      setComment(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };
  const [replyInputsVisible, setReplyInputsVisible] = useState({});

  const handleReplyClick = (commentId) => {
    setReplyInputsVisible((prevState) => ({
      ...prevState,
      [commentId]: true,
    }));
  };
  
  const handleReplyCancelClick = (commentId) => {
    setReplyInputsVisible((prevState) => ({
      ...prevState,
      [commentId]: false,
    }));
  };
  const handleReplySubmit = async (commentId) => {
    try {
      const response = await addReply(commentId, replyText, user.image, user.username);
      // Add the new reply to the comment's replies array
      const updatedComments = comments.map((comment) => {
        if (comment._id === commentId) {
          return { ...comment, replies: [...comment.replies, response] };
        } else {
          return comment;
        }
      });
      setComments(updatedComments);
    } catch (error) {
      console.error(error);
      // handle the error, e.g. show an error message to the user
    }
    setReplyingTo(false);
    setReplyText("");
  };
  
  const handleDelete = async (id) => {
    try {
      console.log(id, user.username);
      await deleteComment(id, user.username);
        
      setComments((prevComments) => {
        return prevComments.filter((comment) => comment._id !== id);
      });
    } catch (err) {
      console.error(err);
    }
  };
  

    const handleReport = async (commentId) => {
      try {
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        await axios.post(`http://localhost:3000/event/reportComment/${commentId}`,{userId});
        toast.success("Comment reported successfully.");
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };
    
    const handleEditReply = async (reply) => {
      try {
        const response = await fetch(`http://localhost:3000/event/editReply/${commentId}/${reply.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: reply.text,
            username: reply.username
          })
        });
        const updatedReply = await response.json();
        setCommentsUpdated(!commentsUpdated); // Force a re-render

        console.log('Updated reply:', updatedReply);
      } catch (error) {
        console.error(error);
      }
    };
    
    const handleDeleteReply = async (replyId) => {
      try {
        const response = await fetch(`http://localhost:3000/event/deleteReply/${commentId}/${replyId}`, {
          method: 'DELETE'
        });
        const deletedReply = await response.json();
        setCommentsUpdated(!commentsUpdated); // Force a re-render

        console.log('Deleted reply:', deletedReply);
      } catch (error) {
        console.error(error);
      }
    };
    function timeAgo(date) {
      const now = new Date();
      const diff = now - new Date(date);
    
      // Define time intervals in milliseconds
      const minute = 60 * 1000;
      const hour = 60 * minute;
      const day = 24 * hour;
    
      // Choose the appropriate time interval and format the string
      let interval, count;
      if (diff < minute) {
        interval = "second";
        count = Math.floor(diff / 1000);
      } else if (diff < hour) {
        interval = "minute";
        count = Math.floor(diff / minute);
      } else if (diff < day) {
        interval = "hour";
        count = Math.floor(diff / hour);
      } else {
        interval = "day";
        count = Math.floor(diff / day);
      }
      return `${count} ${interval}${count !== 1 ? "s" : ""} ago`;
    }
    

  return (<>

    <ToastContainer />

    <div className="blog-details-pages pt-120 mb-120">
      <div className="container">
        {event &&  event.attendees&&(

          <div className="row g-lg-4 gy-5 justify-content-center mb-70">
            <div className="col-lg-8">
              <div className="blog-details-wrap mb-120">
              <div className="post-thum">
        <div style={{margin: 0, padding: 0}}>
          <img
            className="img-fluid"
            src={baseUrl + event.image}
            alt={event.title}
            style={{
              width: '400vw',
              height: '300px', // Change this to adjust the height of the banner
              objectFit: 'cover',
              borderRadius: '10px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
            }}
          />
        </div>
      </div>
      {showFullImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
          onClick={handleClose}
        >
          <img
            src={baseUrl + event.image}
            alt={event.title}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              borderRadius: '10px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
            }}
          />
        </div>
      )}
      <button className="btn2" onClick={handleClick}><span className="span2">Show Full Image</span></button>
  
    
                <div className="blog-meta">
                  <ul>
                    <li>
                      <a href="blog-grid.html"> {format(new Date(event.date), "dd/MM/yyyy,HH:MM")}</a>
                    </li>
                    <li>
                      <a href="blog-grid.html">by : {event.organizer} </a>
                    </li>
                    <li>
                      <a href="blog-grid.html"> {event.location}</a>
                    </li>
                    <button 
   className={`like-btn ${liked ? 'liked' : ''}`}

  onClick={() => {
    if (liked) {
      handleDislike(event._id);
      setLiked(false);
      setDisliked(true);
    } else if (disliked) {
      handleLike(event._id);
      setDisliked(false);
      setLiked(true);
    } else {
      handleLike(event._id);
      setLiked(true);
    }
  }}
>
  <svg viewBox="0 0 17.503 15.625" height="20.625" width="20.503" xmlns="http://www.w3.org/2000/svg" className="icon">
    <path 
      transform="translate(0 0)" 
      d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z" 
      id="Fill"
   

      >
    </path>
  </svg>
</button>

 
     {!isAuthenticated() ? (
                      <button className="primary-btn3 btn-lg" disabled>
                        Please log in to Join
                      </button>
                    ) : (
                                     
<button
  onClick={handleGoingClick}
  disabled={!event}
  style={{
    width: '170px',
    height: '60px',
    color: '#fff',
    background: '#000',
    fontSize: '17px',
    textDecoration: 'none',
    margin: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 0px 0 #000',
    transition: '0.5s',
    position: 'relative',
    border: 'none',
  }}
  onMouseEnter={(e) => {
    e.target.style.boxShadow = '8px 10px 0 #000';
    e.target.style.background = 'transparent';
    e.target.style.border = '2px solid #000';
    e.target.style.color = '#000';
    e.target.style.marginTop = '5px';
    e.target.children[0].style.width = '30px';
  }}
  onMouseLeave={(e) => {
    e.target.style.boxShadow = '0px 0px 0 #000';
    e.target.style.background = '#000';
    e.target.style.border = 'none';
    e.target.style.color = '#fff';
    e.target.style.marginTop = '50px';
    e.target.children[0].style.width = '0';
  }}
>
{buttonLabel}
  <span
    style={{
      marginLeft: '10px',
      width: '0',
      overflow: 'hidden',
      transition: '0.4s',
      display: 'inline-block',
    }}
  >
    ⟶
  </span>
</button>
                    
                  



                    )}




                  </ul>
                
                  <p className="m-0">
  {event.attendeesCount} Participant{event.attendeesCount === 1 ? "" : "s"}
</p>
                  
                  {event.attendees && event.attendeesCount > 0 ? (
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


               
                </div>

              </div>

            </div>

          </div>



        )}


<button onClick={toggleCommentSection}
className="comment-button"
>
          {isCommentSectionHidden ? <BiChevronDown /> : <BiChevronUp />}
        </button>
       
<div className="comment-area">
  
  <div className="blog-comments mb-120">
   
    <div className="comments-title">
      <h2>Comment</h2>
    </div>
    {comments && comments.length > 0 ? (
  <ul className="comment-list">
    {comments.map((comment) => (
      <li key={comment._id}>
              {!isCommentSectionHidden && (

        <div className="single-comment mb-50 d-flex align-items-center justify-content-between flex-md-nowrap flex-wrap">
          <div className="comment-content">
            <div className="c-header d-flex align-items-center justify-content-between">
              <div className="author-area">
                <div className="author-img">
                <img src={url + comment.image} alt="" width="50" height="50" />
                </div>
                <div className="author-details">
                  <h5 className="mb-0">{comment.username}</h5>
                  <div className="c-date">{timeAgo(comment.createdAt)}</div>
         
  

                </div>
              </div>
              <div className="replay-btn">
              {!replyingTo && (
    <a
      className="reply-btn"
      onClick={() => handleReplyClick(comment._id)}
    >
     
      <img src="assets/images/icon/replay-icon.svg" alt="" />
      <i className="bi bi-reply"></i> Reply
    </a>
  )}
  
  <div className="comment-actions">
  {user && comment.username === user.username && (
    <div className="dropdown">
      <button className="primary-btn1 btn-sm dropdown-toggle" data-bs-toggle="dropdown">
        <i className="bi bi-three-dots"></i>
      </button>
      <ul className="dropdown-menu">
        <li><button className="dropdown-item" onClick={() => handleEdit(comment)}>Edit</button></li>
        <li><button className="dropdown-item" onClick={() => handleDelete(comment._id)}>Delete</button></li>
        {comment.username !== user.username && (
          <li><button className="dropdown-item" onClick={() => handleReport(comment._id)}>Report</button></li>
        )}
      </ul>
    </div>
  )}
  {comment.username !== user.username && (
    <button className="primary-btn3 btn-sm" onClick={() => handleReport(comment._id)}>
      <i className="bi bi-flag"></i>
    </button>
  )}
</div>


</div>
            </div>

            <div className="c-body">
            {isEditing && text.id === comment._id ? (
  <div className="comment-edit">
<textarea value={text.text} onChange={(e) => setText({ ...text, text: e.target.value })} />
    <button className="primary-btn1 btn-sm" onClick={handleSaveClick}>
      Save
    </button>
    <button className="primary-btn1 btn-sm" onClick={handleCancelClick}>
      Cancel
    </button>
  </div>
) : (
  <div>{comment.text}</div>
)}

 





{comment.replies && (
  <ul className="comment-reply">
    {comment.replies.map((reply) => (
      <li key={reply.id}>
        <div className="single-comment d-flex align-items-center justify-content-between flex-md-nowrap flex-wrap">
          <div className="comment-content">
            <div className="c-header d-flex align-items-center justify-content-between">
              <div className="author-area">
                <div className="author-img">
                  <img src={url+ reply.image} alt="" width="50" height="50" />
                </div>
                <div className="author-details">
                  <h5 className="mb-0">{reply.username}</h5>
                  <div className="c-date">{timeAgo(reply.createdAt)}</div>
                </div>
              </div>
              {user && reply.username === user.username && (
                <div className="comment-actions">
                  <button className="primary-btn1 btn-sm" onClick={() => handleDeleteReply(reply._id)}>
                    <i className="bi bi-trash-fill"></i>
                  </button>
                  <button className="primary-btn1 btn-sm" onClick={() => handleEditReply(reply)}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </div>
              )}
            </div>
            <div className="c-body">
              <p>{reply.text}</p>
            </div>
          </div>
        </div>
      </li>
    ))}
  </ul>
)}

      <div className="form-group">
      {replyInputsVisible[comment._id] ? (
        <>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button className="primary-btn1 btn-sm" onClick={() => handleReplySubmit(comment._id)}>
            Save
          </button>
          <button className="primary-btn1 btn-sm" onClick={() => handleReplyCancelClick(comment._id)}>
            Cancel
          </button>
        </>
      ) : null}
    </div>
            </div>
          
          </div>
        </div>
        )}
      </li>
    ))} 
  </ul>
) : (
  <p>No comments yet.</p>
)}



         
  </div>
  <div className="comment-form">
      <h2 className="mb-3">Leave a Comment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="comment" className="form-label visually-hidden">
            Your comment
          </label>
          <textarea
            className="form-control"
            id="comment"
            placeholder="Your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
         
        </div>
        <button className="button2">
  <div class="svg-wrapper-1">
    <div class="svg-wrapper">
      <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
      </svg>
    </div>
  </div>
  <span>Send</span>
</button>
      </form>
    </div>

</div>
       {/* {comments && comments.length > 0 ? (
  <ul className="comment-list">
  {comments.map((comment) => (
      <li key={comment._id}>
              {!isCommentSectionHidden && (
      <div className="card">
  <span className="title">Comments</span>
 
  <div className="comments">
    <div className="comment-react">
      <button>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          height={16}
          width={16}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#707277"
            strokeLinecap="round"
            strokeWidth={2}
            stroke="#707277"
            d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
          />
        </svg>
      </button>
      <hr />
      <span>14</span>
    </div>
    <div className="comment-container">
      <div className="user">
        <div className="user-pic">
        <img src={url + comment.image} alt="" width="50" height="50" />

        </div>
        <div className="user-info">
          <span>{comment.username}</span>
          <p>{comment.date}</p>
        </div>
      </div>
      <p className="comment-content">
        {comment.text}
      </p>
    </div>
  </div>
  <div className="text-box">
    <div className="box-container">
      <textarea placeholder="Reply" defaultValue={""} />
      <div>
        <div className="formatting">
       
       
          
      
        
          <button type="submit" className="send" title="Send">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height={18}
              width={18}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                stroke="#ffffff"
                d="M12 5L12 20"
              />
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                stroke="#ffffff"
                d="M7 9L11.2929 4.70711C11.6262 4.37377 11.7929 4.20711 12 4.20711C12.2071 4.20711 12.3738 4.37377 12.7071 4.70711L17 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

</div>
      )}
      </li>
  ))}
  </ul>
) : (
  <div className="text-center">
    <p className="text-muted">No comments yet</p>
    </div>
)}
  */}      

    
  </div> 
</div>


</>
);
}

export default EventDetails;
  