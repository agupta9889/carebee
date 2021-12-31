import React, {useState} from "react";
import { Container, Row, Col, Button, FormGroup, Label, Input, Form} from "reactstrap";
import swal from "sweetalert";
import Sidebar from "../components/Sidebar";
import doctorServices from "../services/doctor";

export const AddDoctor = () => {

	const [first_name, setFirstName] = useState();
	const [last_name, setLastName] = useState();
	const [mobile, setMobile] = useState();
	const [email, setEmail] = useState();
	const [gender, setGender] = useState('Male');
	const [language, setLanguage] = useState(['English']);
	const [qualification, setQualification] = useState();
	const [specialities, setSpecialities] = useState();
	const [experience, setExperience] = useState();
	const [about, setAbout] = useState();

    const handleSelect = function(selectedItems) {
        const options = [];
        for (let i=0; i<selectedItems.length; i++) {
            options.push(selectedItems[i].value);
        }
        setLanguage(options);
    }
	//console.log("selected is :::::::::::",language);
	
	const validation = (value) =>{
		value.preventDefault();
		const regex =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		if(first_name && last_name && mobile && mobile.length == 10 && email && regex.test(email.toLowerCase()) 
			&& gender && language && qualification && specialities && experience && about
		){
			//console.log("hello");
			addUser();
		} else{
			//console.log("enter valid info");
			swal({
				title: "Warning!",
				text: "Please fill the required field",
				icon: "warning",
				dangerMode: true,
				timer: 3000
			});
		}
		

	}
	
	const addUser = async () =>{
		
		var data = JSON.stringify({
			"firstName": first_name,
			"lastName": last_name,
			"mobile": mobile,
			"email": email,
			"gender": gender,
			"type": "DOCTOR",
			"language": language,
			"qualification": qualification,
			"specialties": specialities,
			"experience": experience,
			"about": about,
		});

		doctorServices.insert(data)
		.then(function (response) {

			console.log(JSON.stringify(response.data));
			//Reset Form Field
			setFirstName('');
			setLastName('');
			setMobile('');
			setEmail('');
			setGender('Male');
			setLanguage('English');
			setQualification('');
			setSpecialities('');
			setExperience('');
			setAbout('');
			// Sweet alert validation
			swal({
				title: "Success!",
				text: "Records have been submitted successfully!",
				icon: "success",
				dangerMode: true,
			//	confirmButtonColor: '#1672ec',
				timer: 3000
			});

		})
		.catch(function (error) {
		console.log(error);
			swal({
				title: "Error!",
				text: "Records have not been submitted!",
				icon: "error",
				dangerMode: true,
				timer: 3000
			});
		});

	}

return (
	<>
	<Sidebar />
		<Container >
			<Row >
				<Col md={2} xs={1}></Col>
				<Col md={10} xs={10} className="form-container">
			<Form onSubmit={validation}>
			<h6>Add Doctor</h6><hr/>
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
							<Input type="select" multiple={true} value={language} onChange={(e)=> {handleSelect(e.target.selectedOptions)}}>	
								<option value="English">English</option>
								<option value="Hindi" >Hindi</option>
								<option value="Punjabi" >Punjabi</option>
								<option value="Urdu" >Urdu</option>
								<option value="Gujrati" >Gujrati</option>
							</Input>
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col md={4}>
						<FormGroup>
							<Label>Qualification</Label>
							<Input type="text" name="qualification" onChange={e=> setQualification(e.target.value)} value={qualification || ''} placeholder="Qualification" />
						</FormGroup>
					</Col>
					<Col md={4}>
						<FormGroup>
							<Label>Specialities</Label>
							<Input type="text" name="specialities" onChange={e=> setSpecialities(e.target.value)} value={specialities || ''} placeholder="Specialities" />
						</FormGroup>
					</Col>
					<Col md={4}>
						<FormGroup>
							<Label>Experience</Label>
							<Input type="text" name="experience" onChange={e=> setExperience(e.target.value)} value={experience || ''} placeholder="Experience" />
						</FormGroup>
					</Col>
				</Row>
				<FormGroup>
					<Label>Bio-About</Label>
					<Input type="textarea" name="about" onChange={e=> setAbout(e.target.value)} value={about || ''} />
				</FormGroup>
				
				<Button type="submit" >Submit</Button>
			</Form>
			</Col>
			<Col xs={1}></Col>
			</Row>
		</Container>
	</>
);
};

export default AddDoctor;

