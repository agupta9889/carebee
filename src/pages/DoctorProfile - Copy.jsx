import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import swal from "sweetalert";
import companyLogoIcon from '../assets/images/Carebee-blue-icon.png';
import { Container, Row, Col, Media, Card, CardBody, Badge, Input, Button, Form, FormGroup, Label } from "reactstrap";
import Sidebar from "../components/Sidebar";
import GLOBALS from '../constants/global';

const DoctorProfile = () => {
	
	const [uploadImage, setUploadImages] = React.useState();

	const BaseURL = "http://192.168.137.1:5000/"
	const {id} = useParams();
	const [lan, setLan] = useState();

	useEffect(() => {
		loadDoctorProfile();
	}, []);

	const[profile, setProfile] = useState({});
	
	const loadDoctorProfile = async () => {
			
		var config = {
		  method: 'get',
		  url: `${GLOBALS.BASE_URL}/user/getbyid/` + id,
		  headers: { 
			'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzY4YjlhYjgyYmQwMDJkMGU0ZmFhYiIsImlhdCI6MTYzNTE2NTk2NSwiZXhwIjo2ODE5MTY1OTY1fQ._Jy0lEA0y8ojQqauoDUKyEuujKxcZfzT55ISt2hMuZo', 
			'Content-Type': 'application/json'
		  },
		 
		};
		
		axios(config)
		.then(response => {
		  console.log('Response in doctor profile :::', response.data.data);
		  if (response.data.data) {
			setProfile(response.data.data);
			const ln = response.data.data.language;
			const split = ln.join(", ")
			setLan(split);
			//console.log("language is ::::::::::: ",split);
		  }
		})
		.catch(function (error) {
		  console.log(error);
		});

	}	

	const uploadedImage = React.useRef(null);
	const imageUploader = React.useRef(null);
	

	const handleImageUpload = e => {
		const [file] = e.target.files;
		if (file) {
		const reader = new FileReader();
		const { current } = uploadedImage;
		current.file = file;
		reader.onload = e => {
			current.src = e.target.result;
		};
		reader.readAsDataURL(file);
		}
 	};


	 const onChangeFile = (event) => {
		// for (let i = 0; i < event.target.files.length; i++) {
		//     images.push(event.target.files[i]);
		// }
		setUploadImages(event.target.files[0]);
		// console.log('onchagne', images)
	}
	
   
	const imageSubmit = (event) => {
	
		event.preventDefault();
		// let data1 = new FormData();
		// data1.append('file', uploadImage);

		let formData1 = new FormData();

		formData1.append("username", "Groucho");
		formData1.append("accountnum", 123456); 

		// HTML file input, chosen by user
		formData1.append("userfile", uploadImage);



		// uploadImage.forEach((element, i) => {
		//   data.append("theFiles[]", element);
		// });
		console.log('RAJEEV DWIVEDI', formData1)

	    var config = {
		method: 'put',
		url: `${GLOBALS.BASE_URL}/user/uploadprofilebyid/` + id,
		data: formData1,
		headers: {
			// "Content-Type": "multipart/form-data; boundary=MyBoundary",
			'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzY4YjlhYjgyYmQwMDJkMGU0ZmFhYiIsImlhdCI6MTYzNTE2NTk2NSwiZXhwIjo2ODE5MTY1OTY1fQ._Jy0lEA0y8ojQqauoDUKyEuujKxcZfzT55ISt2hMuZo' 		  
		  },
		};
		console.log('form data ddddd', config)

		// axios(config)
		// .then(function (response) {
		// 	console.log('Doctor Profile updated', response);
			
		// })
		// .catch(function (error) {
		// console.log(error);
		// 	swal({
		// 		title: "Error!",
		// 		text: "Records have not been updated!",
		// 		icon: "error",
		// 		dangerMode: true,
		// 		timer: 3000
		// 	});
		// });
	   
	};
   
	
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
								{/* <input type="file" accept="image/*" onChange={handleImageUpload}
									ref={imageUploader} style={{ display: "none"}} />
								<div className="rounded-circle mr-1" 
									style={{ border: "1px dashed black" }} onClick={() => imageUploader.current.click()}>
									{
										(!profile.profileImage)
										? <img src={companyLogoIcon} ref={uploadedImage}className="users-avatar-shadow rounded-circle" style={{position: "acsolute", width: "64px", height: "64px" }}
										/>
										: <img src={BaseURL+profile.profileImage} ref={uploadedImage} className="users-avatar-shadow rounded-circle" style={{position: "acsolute", width: "64px", height: "64px" }} />
									}
									
								</div> */}
								
								<Media body className="pt-25">
									<Media heading>Dr. {profile.firstName} {profile.lastName}</Media>
									<span>Qualification : {profile.qualification}</span>
								</Media>
							</Media>
						</Col>
						<Col md={5} xs={12} className="d-flex justify-content-end align-items-center mb-2">
							{/* <Button outline color="info" size="sm" style={{ float: "right" }}>Edit</Button> */}
					<Form method="post" onSubmit={imageSubmit} >
						<FormGroup className="col-md-3" >
						<input type="file" name="file" onChange={onChangeFile}/>
						</FormGroup>
						{' '}
						<FormGroup className="col-md-3" >
						<Button type="submit" className="btn-success">Upload Image</Button>
						</FormGroup>
                  	</Form>
  
						</Col>
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
								<Col md={10}>{profile.specialties}</Col>
								<Col md={2}>Language:</Col>
								
								<Col md={10}>
									{lan ? lan : "English" }	

								</Col>
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
