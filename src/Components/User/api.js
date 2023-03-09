import axios from "axios";
import Cookies from 'js-cookie';

const url = "http://localhost:3000/user";

export const login = async (user) => {
    return axios.post(`${url}/login`, user).then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
    }) ;
}

export const register = async (user) => {
    return await axios.post(`${url}/register`, user)
}


export const editProfil = async (id, xx) => {

    //const accessToken = localStorage.getItem("access-token");
    return await axios.put(`${url}/updateuser/${id}`,xx).then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
    }) ;



}



