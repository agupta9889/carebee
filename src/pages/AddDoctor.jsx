import React, {useState} from "react";
import { Container, Row, Col, Button, FormGroup, Label, Input} from "reactstrap";
import axios from "axios";
import swal from "sweetalert";

export const AddDoctor = () => {

	const [first_name, setFirstName] = useState();
	const [last_name, setLastName] = useState();
	const [mobile, setMobile] = useState();
	const [email, setEmail] = useState();
	const [gender, setGender] = useState('male');

	//console.log('adsfasdfasdfa:::::',first_name);
	
	const addUser = async () =>{
		
		var data = JSON.stringify({
			"first_name": first_name,
			"last_name": last_name,
			"mobile": mobile,
			"email": email,
			"gender": gender,
			"type": "DOCTOR",
			"password": "doctor"
		});

		var config = {
			method: 'post',
			url: 'http://192.168.1.29:5000/api/user/create',
			headers: { 
				'Content-Type': 'application/json'
			},
			data : data
		};

		axios(config)
		.then(function (response) {

			console.log(JSON.stringify(response.data));
			//Reset Form Field
			setFirstName('');
			setLastName('');
			setMobile('');
			setEmail('');
			setGender('Male');
			// Sweet alert validation
			swal({
				title: "Success!",
				text: "Records have been submitted successfully!",
				icon: "success",
			//	dangerMode: true,
				confirmButtonColor: '#1672ec',
				timer: 3000
			});

		})
		.catch(function (error) {
		console.log(error);
		});

	}
	
	//console.log("gender before return ::: ",gender);
return (

		<Container >
			<Row >
				<Col md={2} xs={1}></Col>
				<Col md={10} xs={10} className="form-container">
			{/* <Form> */}
			<h5>Add Doctor</h5><hr/>
				<Row>
					<Col md={6}>
						<FormGroup>
							<Label>First Name</Label>
							<Input type="text" onChange={e=> setFirstName(e.target.value)} name="first_name" value={first_name || ''} placeholder="First Name" />
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label>Last Name</Label>
							<Input type="text" onChange={e=> setLastName(e.target.value)} name="last_name" value={last_name || ''} placeholder="Last Name" />
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<FormGroup>
							<Label>Email ID</Label>
							<Input type="email" onChange={e=> setEmail(e.target.value)} name="email" value={email || ''} placeholder="Email ID" />
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label>Mobile Number</Label>
							<Input type="text" onChange={e=> setMobile(e.target.value)} name="mobile" value={mobile || ''} placeholder="Mobile Number" />
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
					<FormGroup tag="fieldset">
						{/* <legend>Gender</legend> */}
						<Label>Gender</Label>
						<FormGroup  check>
							<Label check>
								<Input type="radio" onChange={e=> setGender(e.target.value)} name="gender" value="Male"  checked={gender === 'Male'}/>
								Male
							</Label>
						</FormGroup>
						<FormGroup check>
							<Label check>
								<Input type="radio" onChange={e=> setGender(e.target.value)} name="gender" value="Female" checked={gender === 'Female'}  />
								Female
							</Label>
						</FormGroup>
						<FormGroup check>
							<Label check>
								<Input type="radio" onChange={e=> setGender(e.target.value)} name="gender" value="Others" checked={gender === 'Others'} />
								Others
							</Label>
						</FormGroup>
					</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label>Language</Label>
							<Input type="select" name="language" multiple>
							<option>Hindi</option>
							<option>English</option>
							<option>Punjabi</option>
							<option>Urdu</option>
							<option>Gujrati</option>
							</Input>
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col md={4}>
						<FormGroup>
							<Label>Qualification</Label>
							<Input type="text" name="qualification" placeholder="Qualification" />
						</FormGroup>
					</Col>
					<Col md={4}>
						<FormGroup>
							<Label>Specialities</Label>
							<Input type="text" name="specialities" placeholder="Specialities" />
						</FormGroup>
					</Col>
					<Col md={4}>
						<FormGroup>
							<Label>Experience</Label>
							<Input type="text" name="experience" placeholder="Experience" />
						</FormGroup>
					</Col>
				</Row>
				<FormGroup>
					<Label>Bio-About</Label>
					<Input type="textarea" name="bio" />
				</FormGroup>
				<Button type="submit" onClick={addUser} >Submit</Button>
			{/* </Form> */}
			</Col>
			<Col xs={1}></Col>
			</Row>
		</Container>
	
);
};

export default AddDoctor;

