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
                window.location.reload()
                navigate("/home")
                console.log(data["data"])
            })
        }

        

    }

     useEffect(() => { 
        if (localStorage.getItem('user') != null) { 
            navigate("/home")
        }
     }, [])
    
    const back = {
        backgroundColor: '#F6DDDD',
        margin: '70px',
        paddingTop: '50px',
        width: '40%',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        borderRadius : '10px'
        
    }

    return (<>
        <center>
            <div style={back}>
            <h2 style={{  'margin-bottom' : '30px', 'color' : 'black'}}>Register</h2>
            <div style={{ 'width': '60%' , 'margin-bottom' : '200px'}}>
            <Form onSubmit={handleSubmit} >
                <Form.Group>
                    <Form.Label style={{'float' : 'left' , 'color' : 'black'}}>Username</Form.Label>
                    <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label style={{'float' : 'left', 'color' : 'black'}}>Full Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label style={{'float' : 'left', 'color' : 'black'}}>Email</Form.Label>
                    <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>    
                <Form.Group>
                    <Form.Label style={{'float' : 'left', 'color' : 'black'}}>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label style={{'float' : 'left', 'color' : 'black'}}>Retype Password</Form.Label>
                    <Form.Control type="password" value={repass} onChange={(e) => setRepass(e.target.value)} />
                </Form.Group>    
                
                    
                    <br></br>
                    <p>
                        You have an account already? 
                        <NavLink to="/Login" >Login</NavLink>
                    </p>
                <Button variant="primary" type="submit" style={{'marginBottom' : '60px'}}>
                    <i class="fa fa-paw" aria-hidden="true"></i>
                    &nbsp; Register
                </Button>

            </Form>
            </div>
            </div>
        </center>      
    
    </>);
}

export default Register;