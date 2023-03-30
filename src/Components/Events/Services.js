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
        await axios.post(`${url}/addAttendees/${id}`, { userId: connectedUserId });
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
    
    export const addComment = async (eventId, userId, text) => {
      try {
        const response = await axios.post(`${url}/addComment/${eventId}`, {
          userId,
          text,
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

  
    export const addReply = async (eventId, commentId, userId, text) => {
      try {
        const response = await axios.post(`${url}/addReply/${eventId}/${commentId}`, {
          userId,
          text,
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    
    export const getCommentById = async (eventId, commentId) => {
      try {
        const response = await axios.get(`${url}/getCommentById/${eventId}/${commentId}`);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    