import React, {useState} from "react";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input} from "reactstrap";
// import axios from "axios";
// import swal from "sweetalert";
import Sidebar from "../components/Sidebar";

export const AddAvvailability = () => {

return (
	<>
		<Sidebar />
		<Container >
			<Row>
				<Col md={4} xs={1}></Col>
				<Col md={4} xs={10} className="form-container">
					<Form>
						<h5>Add Availability</h5><hr/>
						<FormGroup>
							<Label>Doctors</Label>
							<Input type="select" name="doctor" >
								<option value="">Select Doctor</option>
								<option value="AB">Dr. AB Singh</option>
								<option value="BP">Dr. BP Singh</option>
								<option value="KB">Dr. KB Singh</option>
								<option value="DP">Dr. DP Singh</option>
							</Input>
						</FormGroup>
						<FormGroup>
							<Row>
								<Col md={3}>
									<FormGroup  check>
										<Label check>
											<Input type="checkbox" name="monday"/>
											Moday
										</Label>
									</FormGroup>
								</Col>
								<Col md={4}>
									<Input type="time" name="from_time"/>
								</Col>
								<Col md={4}>
									<Input type="time" name="to_time"/>
								</Col>
							</Row>
						</FormGroup>
						<FormGroup>
							<Row>
								<Col md={3}>
									<FormGroup  check>
										<Label check>
											<Input type="checkbox" name="tuesday"/>
											Tuesday
										</Label>
									</FormGroup>
								</Col>
								<Col md={4}>
									<Input type="time" name="from_time"/>
								</Col>
								<Col md={4}>
									<Input type="time" name="to_time"/>
								</Col>
							</Row>
						</FormGroup>
						<FormGroup>
							<Row>
								<Col md={3}>
									<FormGroup  check>
										<Label check>
											<Input type="checkbox" name="wednesday"/>
											Wednesday
										</Label>
									</FormGroup>
								</Col>
								<Col md={4}>
									<Input type="time" name="from_time"/>
								</Col>
								<Col md={4}>
									<Input type="time" name="to_time"/>
								</Col>
							</Row>
						</FormGroup>
						<FormGroup>
							<Row>
								<Col md={3}>
									<FormGroup  check>
										<Label check>
											<Input type="checkbox" name="thursday"/>
											Thursday
										</Label>
									</FormGroup>
								</Col>
								<Col md={4}>
									<Input type="time" name="from_time"/>
								</Col>
								<Col md={4}>
									<Input type="time" name="to_time"/>
								</Col>
							</Row>
						</FormGroup>
						<FormGroup>
							<Row>
								<Col md={3}>
									<FormGroup  check>
										<Label check>
											<Input type="checkbox" name="friday"/>
											Friday
										</Label>
									</FormGroup>
								</Col>
								<Col md={4}>
									<Input type="time" name="from_time"/>
								</Col>
								<Col md={4}>
									<Input type="time" name="to_time"/>
								</Col>
							</Row>
						</FormGroup>
						<FormGroup>
							<Row>
								<Col md={3}>
									<FormGroup  check>
										<Label check>
											<Input type="checkbox" name="saturday"/>
											Saturday
										</Label>
									</FormGroup>
								</Col>
								<Col md={4}>
									<Input type="time" name="from_time"/>
								</Col>
								<Col md={4}>
									<Input type="time" name="to_time"/>
								</Col>
							</Row>
						</FormGroup>
						<FormGroup>
							<Row>
								<Col md={3}>
									<FormGroup  check>
										<Label check>
											<Input type="checkbox"  name="sunday"/>
											Sunday
										</Label>
									</FormGroup>
								</Col>
								<Col md={4}>
									<Input type="time" name="from_time"/>
								</Col>
								<Col md={4}>
									<Input type="time" name="to_time"/>
								</Col>
							</Row>
						</FormGroup>
						<Button type="submit">Submit</Button>
					</Form>
				</Col>
				<Col xs={1}></Col>
			</Row>
		</Container>
	</>
);
};

export default AddAvvailability;

