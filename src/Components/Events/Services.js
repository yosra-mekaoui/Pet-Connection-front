import axios from "axios";
const url = "http://localhost:3000/event";



export const getEvents = async () => {
    return await axios.get(`${url}/getAll`);
    }
export const getEvent = async (id) => {
    return await axios.get(`${url}/get/${id}`);
    }
    export const addEvent = async (event) => {
      try {
        console.log(event); // Add this line to log the event object

       return  await axios.post(`${url}/add`, event )
     
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    
export const updateEvent = async (id, event) => {
  try {
    
  return await axios.put(`${url}/update/${id}`, event)
   
  } catch (error) {
    console.error(error);
    throw error;
  }


}
export const deleteEvent = async (id, connectedUserId) => {
  try {
    const { data } = await axios.delete(`${url}/delete/${id}`,   {
      data: 
        { connectedUserId },
      
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export const addAttendeeById = async (id, connectedUserId) => {
  try {
    const { data } = await axios.post(`${url}/addAttendees/${id}`, { userId: connectedUserId });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


    export const RemoveAttendeeById = async (id, connectedUserId) => {
      try {
        const { data } = await axios.delete(`${url}/deleteAttendees/${id}`, {
          data: 
            { connectedUserId },
          
        });
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    
    export const addComment = async (formData) => {
      try {
        const response = await axios.post(`${url}/addComment`, formData);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    
    export const addReply = async (commentId, text, image, username) => {
      try {
        const response = await axios.post(`${url}/addReply/${commentId}`, {
          text,
          image,
          username
        });
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    
    export const getCommentById = async (eventId) => {
      try {
        const response = await axios.get(`${url}/getCommentsEvent/${eventId}`);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
     export const deleteComment = async (id,username) =>
     {
        try {
          const { data } = await axios.delete(`${url}/deleteComment/${id}`, {
            data: 
              { username },
            
          });
          return data;
        } catch (error) {
          console.error(error);
          throw error;
        }
     }

     export const updateComment = async (id, text, username) => {
      try {
        const response = await axios.put(`${url}/updateComment/${id}`, {
          text,
          username
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    export const updateReply = async (commentId, replyId, text, username) => {
      try {
        console.log("commentId:", commentId);
        console.log("replyId:", replyId);
        const response = await axios.put(`${url}/editReply/${commentId}/${replyId}`, {
          text,
          username
        });
        console.log("Response:", response);
        
        return response;
      } catch (error) {
        console.error(error);
        console.log(error);
        throw error;
      }
    };
    
    
    
    
    export const deleteReply = async (commentId, replyId) => {
      try {
        const response = await axios.delete(`${url}/deleteReply/${commentId}/${replyId}`);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    
    