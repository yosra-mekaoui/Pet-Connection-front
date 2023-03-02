import React, { useState, useEffect } from "react";
import { Form, Button } from 'react-bootstrap';
import { login, register } from "./api";
import { useNavigate } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";


function Register() {
    const [username, setUsername] = useState(''); 
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [repass, setRepass] = useState('');   
    const [user, setUser] = useState('');   

    
    const navigate = useNavigate(); 

    const handleSubmit = (event) => {
        event.preventDefault(); 
        
        if (password == repass) {
            const user = {
                'username': username,
                'password': password,
                'name': name,
                'email': email,
            };
            
            register(user).then(data => {
                navigate("/home")
                console.log(data["data"])
            })
        }

        

    }

     useEffect(() => { 
        const test = JSON.parse(localStorage.getItem('user'))["username"] ;  
        if (test != null) { 
            navigate("/home")
        }
     }, [])
    
    return (<>
        <center>
            <h2 style={{ 'width': '30%' , 'margin-top' : '100px', 'margin-bottom' : '30px', 'color' : 'black'}}>Register</h2>
            <div style={{ 'width': '30%' , 'margin-bottom' : '200px'}}>
            <Form onSubmit={handleSubmit} >
                <Form.Group>
                    <Form.Label style={{'float' : 'left'}}>Username</Form.Label>
                    <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label style={{'float' : 'left'}}>Full Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label style={{'float' : 'left'}}>Email</Form.Label>
                    <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>    
                <Form.Group>
                    <Form.Label style={{'float' : 'left'}}>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label style={{'float' : 'left'}}>Retype Password</Form.Label>
                    <Form.Control type="password" value={repass} onChange={(e) => setRepass(e.target.value)} />
                </Form.Group>    
                
                    
                    <br></br>
                    <p>
                        You have an account already? 
                        <NavLink to="/Login" >Login</NavLink>
                    </p>
                <Button variant="primary" type="submit">
                    Register
                </Button>

            </Form>
            </div>
        </center>      
    
    </>);
}

export default Register;