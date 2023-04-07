import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent, addAttendeeById, RemoveAttendeeById, getCommentById, addComment,addReply ,deleteComment,updateComment} from "./Services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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
        setNumParticipants(res.attendeesCount);
        toast.success("Successfully removed RSVP from the event!");
      } else {
        // If user is not in attendees list, add them
        const res = await addAttendeeById(id, connectedUserId);
        console.log("add attendee response", res);
        setButtonLabel("Not Going");
        setEvent(res);
        setNumParticipants(res.attendeesCount);
        toast.success("Successfully RSVP'd to the event!");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error(err.response);
    }
  };
  
  

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
    
  return (<>

    <ToastContainer />

    <div className="blog-details-pages pt-120 mb-120">
      <div className="container">
        {event &&  event.attendees&&(

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
                      <button className="primary-btn3 btn-lg" disabled>
                        Please log in to RSVP
                      </button>
                    ) : (
                      <button
  className="primary-btn3 btn-lg"
  onClick={handleGoingClick}
  disabled={!event}
>
  <i className="fa fa-paw" aria-hidden="true">
    {buttonLabel}
  </i>
</button>

                    )}



                  </ul>
                
                  <p className="m-0">
  {event.attendeesCount} participant{event.attendeesCount === 1 ? "" : "s"}
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
                  <div className="c-date">{comment.createdAt}</div>
         
  

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
                  <div className="c-date">{reply.createdAt}</div>
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
        <button type="submit" className="btn btn-secondary">
          <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
          Send
        </button>
      </form>
    </div>

</div>
      


      </div>
        

    
  </div>


</>
);
}

export default EventDetails;
  