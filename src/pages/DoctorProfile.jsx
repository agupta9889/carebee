import React, { useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import { Container, Row, Col, Table, Button, Media, Card, CardBody } from "reactstrap";

const DoctorProfile = () => {


	// Doctor Profile records
	const arr = [
		{
			name : 'Arun Gupta',
			phone : '9889286601',
			email : 'arun@gmail.com',
			gender : 'Male',
			status : 'Active'

		},
	]
	
	useEffect(() => {
		arr.map(i => console.log("item :: ",i))
	}, [])

return (
	<>
		<Container >
			<Row >
				<Col md={2} xs={1}></Col>
				<Col md={10} xs={10} className="doctor-top">
					<Row>
						<Col md={7} xs={12} >
							<Media className="mb-2">
								<a href="#" className="mr-1">
									<img src="https://pixinvent.com/modern-admin-clean-bootstrap-4-dashboard-html-template/app-assets/images/portrait/small/avatar-s-26.png" alt="users view avatar" class="users-avatar-shadow rounded-circle" height="64" width="64"/>
								</a>
								<Media body className="pt-25">
									<Media heading>Dr. Princy Gupta</Media>
									<span>Qualification : MBBS, MD</span>
								</Media>
							</Media>
						</Col>
						<Col md={5} xs={12} className="d-flex justify-content-end align-items-center mb-2">
							<Button outline color="info" size="sm" style={{ float: "right" }}>Edit</Button>
						</Col>
					</Row>   
					<Card className="shadow doctor-top">
						<CardBody>
							<Row className="bg-lighten-5 rounded mb-2 mx-25">
								<Col md={4} sm={12} className="p-2">
									<span><b>Mobile:</b> 9889286610</span>
								</Col>
								<Col md={4} sm={12} className="p-2"><b>Email:</b> princy@gmail.com</Col>
								<Col md={4} sm={12} className="p-2"><b>Experience:</b> 5 Years</Col>
							</Row>
							<Row className="doctor-top mb-2 mx-25">
								<Col md={2}>Gender:</Col>
								<Col md={10}>Female</Col>
								<Col md={2}>Qualification:</Col>
								<Col md={10}>MBBS, MD </Col>
								<Col md={2}>Specialities:</Col>
								<Col md={10}>Dentist</Col>
								<Col md={2}>Language:</Col>
								<Col md={10}>Hindi, English, Punjabi </Col>
								<Col md={2}>Bio:</Col>
								<Col md={10}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Col>
								<Col md={2}>Status:</Col>
								<Col md={10}><Button color="success" className="btn-sm">Active</Button></Col>
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
