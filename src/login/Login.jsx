import React, { useEffect, useState} from "react";
import companyLogo from '../assets/images/Carebeewhite.png';
import companyLogoIcon from '../assets/images/Carebee-blue-icon.png';
import { Container, Row, Col, Button,Form,FormGroup,Input } from "reactstrap";
import "../login/Login.css";
import Axios from "axios";



function Login({ setToken }){
    
    const [username, setUserName ] = useState('');
    const [password, setPassword] = useState('');
    
    const loginUser = async () =>  {

        var data = JSON.stringify({
          "email": username,
          "type": "ADMIN",
          "password": password
        });
        
        var config = {
          method: 'post',
          url: 'http://localhost:5000/api/user/login',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        Axios(config)
        .then(function (response) {
          console.log(response.data.data , response.data.token );
          setToken(response.data.token)
          localStorage.setItem('userdata', JSON.stringify(response.data))
        })
        .catch(function (error) {
          console.log(error);
        });
        
    }

    return(
       
        <Container className="login-container">  
            <Row>
                <Col sm="6" className="ads">
                    <img src={companyLogo} className="logo" />   
                </Col>
                <Col sm="6" >
                    <div className="login-form">
                        <div className="profile-img">
                            <img src={companyLogoIcon} className="logo-icon" />    
                        </div>
                        <h3>Login</h3>
                    </div>
                    {/* <Form > */}
                        <FormGroup>
                            <Input type="text" onChange={e=> setUserName(e.target.value)} className="form-control" name="username" placeholder="Username" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" onChange={e=> setPassword(e.target.value)} className="form-control" name="password" placeholder="Password" />
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" onClick={loginUser} className="login-button btn btn-primary btn-lg btn-block">Sign In</Button>
                        </FormGroup>
                        <FormGroup className="forget-password">
                            <a href="#">Forget Password</a>
                        </FormGroup>
                    {/* </Form> */}
                </Col>  
            </Row>
        </Container>    
     
    );

}

export default Login;