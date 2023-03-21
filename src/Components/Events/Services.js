import axios from "axios";
const url = "http://localhost:3000/event";



export const getEvents = async () => {
    return await axios.get(`${url}/getAll`);
    }
export const getEvent = async (id) => {
    return await axios.get(`${url}/get/${id}`);
    }
export const addEvent = async (event) => {
    return await axios.post(`${url}/add`, event);
    }
export const updateEvent = async (id, event) => {
    return await axios.put(`${url}/update/${id}`, event);

}

export const deleteEvent = async (id) => {
    return await axios.delete(`${url}/delete/${id}`);
    }
