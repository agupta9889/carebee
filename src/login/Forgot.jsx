import React from "react";
import companyLogo from '../assets/images/Carebeewhite.png';
import companyLogoIcon from '../assets/images/Carebee-blue-icon.png';
import { Container, Row, Col, Button,Form,FormGroup,Input } from "reactstrap";
import "./Login.css";


function Forgot(){

    return(

        <>
        <Container className="login-container">  
            <Row>
                <Col sm="6" className="ads">
                    <img src={companyLogo} className="logo"  alt="logo" />   
                </Col>
                <Col sm="6" >
                    <div className="login-form">
                        <div className="profile-img">
                            <img src={companyLogoIcon} className="logo-icon" alt="logo" />    
                        </div>
                        <h3>Forgot Password</h3>
                    </div>
                    <Form>
                        <FormGroup>
                            <Input type="text" className="form-control" name="username" placeholder="Username" />
                        </FormGroup>
                        <FormGroup>
                            <Button type="button" className="login-button btn btn-primary btn-lg btn-block">Submit</Button>
                        </FormGroup>
                        <FormGroup className="forget-password">
                            <a href="/login">Login</a>
                        </FormGroup>
                    </Form>
                </Col>  
            </Row>
        </Container>    
     </>

    );
}

export default Forgot;