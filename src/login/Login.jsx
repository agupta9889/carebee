import React from "react";
import companyLogo from '../assets/images/Carebeewhite.png';
import companyLogoIcon from '../assets/images/Carebee-blue-icon.png';
import { Container, Row, Col, Button,Form,FormGroup,Input } from "reactstrap";
import "../login/Login.css";

function Login(){

    return(
        <>
        <Container className="login-container">  
            <Row>
                <Col sm="6" className="ads">
                    <img src={companyLogo} className="logo" />   
                </Col>
                <Col sm="6" >
                    <div className="login-form">
                        <div class="profile-img">
                            <img src={companyLogoIcon} className="logo-icon" />    
                        </div>
                        <h3>Login</h3>
                    </div>
                    <Form>
                        <FormGroup>
                            <Input type="text" className="form-control" name="username" placeholder="Username" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" className="form-control" name="password" placeholder="Password" />
                        </FormGroup>
                        <FormGroup>
                            <Button type="button" className="login-button btn btn-primary btn-lg btn-block">Sign In</Button>
                        </FormGroup>
                        <FormGroup className="forget-password">
                            <a href="#">Forget Password</a>
                        </FormGroup>
                    </Form>
                </Col>  
            </Row>
        </Container>    
     </>
    );

}

export default Login;