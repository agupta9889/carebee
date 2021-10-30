import React, { useState} from "react";
import companyLogo from '../assets/images/Carebeewhite.png';
import companyLogoIcon from '../assets/images/Carebee-blue-icon.png';
import { Container, Row, Col, Button, FormGroup,Input } from "reactstrap";
import "../login/Login.css";
import axios from "axios";
import swal from "sweetalert";



function Login({ setToken }){
    
    // Login API Integration
    const [username, setUserName ] = useState('');
    const [password, setPassword] = useState('');
    
    const validation = () =>{
        
        const regex =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		if(username && password && regex.test(username.toLowerCase())){
			//console.log("hello");
			loginUser();
		} else{
			//console.log("enter valid info");
			swal({
				title: "Warning!",
				text: "Please fill the required field!",
				icon: "warning",
				dangerMode: true,
				timer: 3000
			});
		}
    }
    
    const loginUser = async () =>  {

        var data = JSON.stringify({
          "email": username,
          "type": "ADMIN",
          "password": password
        });
        
        var config = {
          method: 'post',
          url: 'http://192.168.1.29:5000/api/user/login',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        axios(config)
        .then(function (response) {
            console.log(response.data.data , response.data.token );
            setToken(response.data.token)
            localStorage.setItem('userdata', JSON.stringify(response.data))
            window.location.href = "/dashboard";
        })
        .catch(function (error) {
          console.log(error);
          swal({
            title: "Error!",
            text: "Your Username or Password is wrong!",
            icon: "error",
            dangerMode: true,
            timer: 3000
        });
        });
        
    }

    return(
       
        <Container className="login-container">  
            <Row>
                <Col sm="6" className="ads">
                    <img src={companyLogo} className="logo" alt="logo" />   
                </Col>
                <Col sm="6" >
                    <div className="login-form">
                        <div className="profile-img">
                            <img src={companyLogoIcon} className="logo-icon" alt="logo" />    
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
                            <Button type="submit" onClick={validation} className="login-button btn btn-primary btn-lg btn-block">Sign In</Button>
                        </FormGroup>
                        <FormGroup className="forget-password">
                            <a href="/forgot">Forget Password</a>
                        </FormGroup>
                    {/* </Form> */}
                </Col>  
                
            </Row>
        </Container>    
       
    );

}

export default Login;