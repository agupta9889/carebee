import React from "react";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

export const EditDoctor = () => {
return (
	<>
		<Container >
			<Row >
				<Col md={2} xs={1}></Col>
				<Col md={10} xs={10} className="form-container">
			<Form>
			<h5>Edit Doctor</h5><hr/>
				<Row>
					<Col md={6}>
						<FormGroup>
							<Label>First Name</Label>
							<Input type="text" name="first_name" placeholder="First Name" />
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label>Last Name</Label>
							<Input type="text" name="last_name" placeholder="Last Name" />
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<FormGroup>
							<Label>Email ID</Label>
							<Input type="email" name="email" placeholder="Email ID" />
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label>Mobile Number</Label>
							<Input type="text" name="mobile" placeholder="Mobile Number" />
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
					<FormGroup tag="fieldset">
						{/* <legend>Gender</legend> */}
						<Label>Gender</Label>
						<FormGroup check>
							<Label check>
								<Input type="radio" name="gender" />{' '}
								Male
							</Label>
						</FormGroup>
						<FormGroup check>
							<Label check>
								<Input type="radio" name="gender" />{' '}
								Female
							</Label>
						</FormGroup>
						<FormGroup check>
							<Label check>
								<Input type="radio" name="gender" />{' '}
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
				<Button>Update</Button>
			</Form>
			</Col>
			<Col xs={1}></Col>
			</Row>
		</Container>
	</>	
);
};

export default EditDoctor;

