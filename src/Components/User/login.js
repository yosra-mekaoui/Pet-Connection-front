import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { login } from "./api";
import { useNavigate } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate(); 

    const handleSubmit = (event) => {
        event.preventDefault(); 
        
        const user = {
            'username': username,
            'password': password
        }; 

        login(user).then(data => {
            navigate("/home")
            console.log(data["data"])
        })

    }

    return (<> 
        <center>
            <h2 style={{ 'width': '30%' , 'margin-top' : '100px', 'margin-bottom' : '30px', 'color' : 'black'}}>Login</h2>
            <div style={{ 'width': '30%' , 'margin-bottom' : '200px'}}>
            <Form onSubmit={handleSubmit} >
                <Form.Group>
                    <Form.Label style={{'float' : 'left'}}>Username</Form.Label>
                    <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label style={{'float' : 'left'}}>Password</Form.Label>
                    <Form.Control type="text" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </Form.Group>
                    <br></br>
                    <p>
                        You don't have an account yet? 
                        <NavLink to="/Register" >Register</NavLink>
                    </p>
                <Button variant="primary" type="submit">
                    Login
                </Button>

            </Form>
            </div>
        </center>
    </>);
}

export default Login;