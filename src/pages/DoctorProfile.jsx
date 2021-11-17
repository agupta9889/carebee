import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import companyLogoIcon from '../assets/images/Carebee-blue-icon.png';
import { Container, Row, Col, Media, Card, CardBody, Badge } from "reactstrap";
import Sidebar from "../components/Sidebar";

const DoctorProfile = () => {

	const {id} = useParams();

	useEffect(() => {
		loadDoctorProfile();
	}, []);

	const[profile, setProfile] = useState({
		first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        status: "",
        gender: "",
        language: "",
        qualification: "",
        specialities: "",
        experience: "",
        about: ""
        
	});


	const loadDoctorProfile = async () => {
		
		var data = JSON.stringify({
		  "email": "p34892@gmail.com",
		  "type": "USER"
		});
			
		var config = {
		  method: 'get',
		  url: 'http://192.168.1.29:5000/api/user/login/getUserByID/' + id,
		  headers: { 
			'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzY4YjlhYjgyYmQwMDJkMGU0ZmFhYiIsImlhdCI6MTYzNTE2NTk2NSwiZXhwIjo2ODE5MTY1OTY1fQ._Jy0lEA0y8ojQqauoDUKyEuujKxcZfzT55ISt2hMuZo', 
			'Content-Type': 'application/json'
		  },
		  data : data
		};
		
		axios(config)
		.then(response => {
		  console.log('Response in doctor profile :::', response.data.data);
		  setProfile(response.data.data);
		  
		})
		.catch(function (error) {
		  console.log(error);
		});

	}	
	

return (
	<>
		<Sidebar />
		<Container >
			<Row >
				<Col md={2} xs={1}></Col>
				<Col md={10} xs={10} className="doctor-top">
					<Row>
						<Col md={7} xs={12} >
							<Media className="mb-2">
								<a href="/" className="mr-1">
									<img src={companyLogoIcon} alt="users view avatar" className="users-avatar-shadow rounded-circle" height="64" width="64"/>
								</a>
								<Media body className="pt-25">
									<Media heading>Dr. {profile.first_name} {profile.last_name}</Media>
									<span>Qualification : {profile.qualification}</span>
								</Media>
							</Media>
						</Col>
						{/* <Col md={5} xs={12} className="d-flex justify-content-end align-items-center mb-2">
							<Button outline color="info" size="sm" style={{ float: "right" }}>Edit</Button>
						</Col> */}
					</Row>   
					<Card className="shadow doctor-top">
						<CardBody>
							<Row className="bg-lighten-5 rounded mb-2 mx-25">
								<Col md={4} sm={12} className="p-2">
									<span><b>Mobile:</b> {profile.mobile}</span>
								</Col>
								<Col md={4} sm={12} className="p-2"><b>Email:</b> {profile.email}</Col>
								<Col md={4} sm={12} className="p-2"><b>Experience:</b> {profile.experience} Years</Col>
							</Row>
							<Row className="doctor-top mb-2 mx-25">
								<Col md={2}>Gender:</Col>
								<Col md={10}>{profile.gender}</Col>
								<Col md={2}>Qualification:</Col>
								<Col md={10}>{profile.qualification}</Col>
								<Col md={2}>Specialities:</Col>
								<Col md={10}>{profile.specialities}</Col>
								<Col md={2}>Language:</Col>
								<Col md={10}>{profile.language} </Col>
								<Col md={2}>Bio:</Col>
								<Col md={10}>{profile.about}</Col>
								<Col md={2}>Status:</Col>
								<Col md={10}>
									{
										(profile.status === 0)  // 0-Active, 1-Inactive
										?<Badge style={{backgroundColor: "green"}}>Active</Badge>
										:<Badge style={{backgroundColor: "red"}}>Inactive</Badge>
									}	
								</Col>
							</Row>
						</CardBody>
					</Card>
				</Col>
				<Col xs={1}></Col>
			</Row>
		</Container>
	</>
);
};

export default DoctorProfile;
