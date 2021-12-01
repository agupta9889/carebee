import React, {useState, useEffect} from "react";
import { useParams } from "react-router";
import moment from "moment";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input} from "reactstrap";
import axios from "axios";
import swal from "sweetalert";
import Sidebar from "../components/Sidebar";

export const EditAvailability = () => {

	const {id} = useParams();
	//alert(id);
	const[first_name, setFirstName] = useState();
	const[last_name, setLastName] = useState();
	const[monday, setMonday] = useState();
	const[mon_from_time, setMonFromTime] = useState();
	const[mon_to_time, setMonToTime] = useState();
	const[tuesday, setTuesday] = useState();
	const[tue_from_time, setTueFromTime] = useState();
	const[tue_to_time, setTueToTime] = useState();
	const[wednesday, setWednesday] = useState();
	const[wed_from_time, setWedFromTime] = useState();
	const[wed_to_time, setWedToTime] = useState();
	const[thursday, setThursday] = useState();
	const[thur_from_time, setThurFromTime] = useState();
	const[thur_to_time, setThurToTime] = useState();
	const[friday, setFriday] = useState();
	const[fri_from_time, setFriFromTime] = useState();
	const[fri_to_time, setFriToTime] = useState();
	const[saturday, setSaturday] = useState();
	const[sat_from_time, setSatFromTime] = useState();
	const[sat_to_time, setSatToTime] = useState();
	const[sunday, setSunday] = useState();
	const[sun_from_time, setSunFromTime] = useState();
	const[sun_to_time, setSunToTime] = useState();

	useEffect(() => {
		loadAvail();
	}, []);
	
	const loadAvail = async () => {
		
		var data = JSON.stringify({
		  "email": "p34892@gmail.com",
		  "type": "USER"
		});
			
		var config = {
		  method: 'get',
		  url: 'http://192.168.1.29:5000/api/availability/login/getbyid/' + id,
		  headers: { 
			'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzY4YjlhYjgyYmQwMDJkMGU0ZmFhYiIsImlhdCI6MTYzNTE2NTk2NSwiZXhwIjo2ODE5MTY1OTY1fQ._Jy0lEA0y8ojQqauoDUKyEuujKxcZfzT55ISt2hMuZo', 
			'Content-Type': 'application/json'
		  },
		  data : data
		};
		
		axios(config)
		.then(response => {
		  console.log('Response in availability data:::', response.data.data);
		  setFirstName(response.data.data.doctor_id.first_name);
		  setLastName(response.data.data.doctor_id.last_name);
		  setMonday(response.data.data.monday);
		  setMonFromTime(response.data.data.mon_from_time);
		  setMonToTime(response.data.data.mon_to_time);
		  setTuesday(response.data.data.tuesday);
		  setTueFromTime(response.data.data.tue_from_time);
		  setTueToTime(response.data.data.tue_to_time);
		  setWednesday(response.data.data.wednesday);
		  setWedFromTime(response.data.data.wed_from_time);
		  setWedToTime(response.data.data.wed_to_time);
		  setThursday(response.data.data.thursday);
		  setThurFromTime(response.data.data.thur_from_time);
		  setThurToTime(response.data.data.thur_to_time);
		  setFriday(response.data.data.friday);
		  setFriFromTime(response.data.data.fri_from_time);
		  setFriToTime(response.data.data.fri_to_time);
		  setSaturday(response.data.data.saturday);
		  setSatFromTime(response.data.data.sat_from_time);
		  setSatToTime(response.data.data.sat_to_time);
		  setSunday(response.data.data.sunday);
		  setSunFromTime(response.data.data.sun_from_time);
		  setSunToTime(response.data.data.sun_to_time);
		})
		.catch(function (error) {
		  console.log(error);
		});

	}	

	// Updated Availability
	
	const doctorAvail = async () =>{
		
		var data = JSON.stringify({
			"monday": monday,
			"mon_from_time": mon_from_time,
			"mon_to_time": mon_to_time,
			"tuesday": tuesday,
			"tue_from_time": tue_from_time,
			"tue_to_time": tue_to_time,
			"wednesday": wednesday,
			"wed_from_time": wed_from_time,
			"wed_to_time": wed_to_time,
			"thursday": thursday,
			"thur_from_time": thur_from_time,
			"thur_to_time": thur_to_time,
			"friday": friday,
			"fri_from_time": fri_from_time,
			"fri_to_time": fri_to_time,
			"saturday": saturday,
			"sat_from_time": sat_from_time,
			"sat_to_time": sat_to_time,
			"sunday": sunday,
			"sun_from_time": sun_from_time,
			"sun_to_time": sun_to_time,
		});

		var config = {
			method: 'put',
			url: 'http://192.168.1.29:5000/api/availability/login/updatebyid/' + id,
			headers: { 
				'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxN2NlNThiZmY4M2M5ZmJiNWJhNDYwYiIsImlhdCI6MTYzNjQ1NDI1OSwiZXhwIjo2ODIwNDU0MjU5fQ.sFo7yCFjaOJkE_mJ_RHVsd1zqx8QbF6OhjI1UCYXz74', 
    			'Content-Type': 'application/json'
			},
			data : data
		};

		axios(config)
		.then(function (response) {

			console.log(JSON.stringify(response.data));
			// Sweet alert validation
			swal({
				title: "Success!",
				text: "Records have been updated successfully!",
				icon: "success",
				dangerMode: true,
				timer: 3000
			});

		})
		.catch(function (error) {
		console.log(error);
			swal({
				title: "Error!",
				text: "Records have not been updated!",
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
			<Row>
				<Col md={4} xs={1}></Col>
				<Col md={6} xs={10} className="form-container">
					{/* <Form> */}
						<h6>Edit Availability</h6><hr/>
						<FormGroup>
							<Label>Doctor: <span style={{fontWeight: "600" }}>Dr. {first_name} {last_name}</span></Label>
						</FormGroup>
						<FormGroup>
							<Row>
								<Col md={3}>
									<FormGroup  check>
										<Label check>
											<Input type="checkbox" onChange={e=> setMonday(e.target.value)} name="monday" value="Mon" checked={monday === 'Mon'}/>
											Moday
										</Label>
									</FormGroup>
								</Col>
								<Col md={4}>
									
									<Input type="time"  onChange={e=> setMonFromTime(e.target.value)} name="mon_from_time" value={ moment(mon_from_time, ["h:mm A"]).format("HH:mm")} />
								</Col>
								<Col md={4}>
									<Input type="time" onChange={e=> setMonToTime(e.target.value)} name="mon_to_time" value={ moment(mon_to_time, ["h:mm A"]).format("HH:mm")}/>
								</Col>
							</Row>
						</FormGroup>
						<FormGroup>
							<Row>
								<Col md={3}>
									<FormGroup  check>
										<Label check>
											<Input type="checkbox" onChange={e=> setTuesday(e.target.value)} name="tuesday" value="Tue" checked={tuesday==='Tue'}/>
											Tuesday
										</Label>
									</FormGroup>
								</Col>
								<Col md={4}>
									<Input type="time" onChange={e=> setTueFromTime(e.target.value)} name="tue_from_time" value={ moment(tue_from_time, ["h:mm A"]).format("HH:mm")} />
								</Col>
								<Col md={4}>
									<Input type="time" onChange={e=> setTueToTime(e.target.value)} name="tue_to_time" value={ moment(tue_to_time, ["h:mm A"]).format("HH:mm")} />
								</Col>
							</Row>
						</FormGroup>
						<FormGroup>
							<Row>
								<Col md={3}>
									<FormGroup  check>
										<Label check>
											<Input type="checkbox" onChange={e=> setWednesday(e.target.value)} name="wednesday" value="Wed" checked={wednesday==='Wed'}/>
											Wednesday
										</Label>
									</FormGroup>
								</Col>
								<Col md={4}>
									<Input type="time" onChange={e=> setWedFromTime(e.target.value)} name="wed_from_time" value={ moment(wed_from_time, ["h:mm A"]).format("HH:mm")}/>
								</Col>
								<Col md={4}>
									<Input type="time" onChange={e=> setWedToTime(e.target.value)} name="wed_to_time" value={moment (wed_to_time, ["h:mm A"]).format("HH:mm")}/>
								</Col>
							</Row>
						</FormGroup>
						<FormGroup>
							<Row>
								<Col md={3}>
									<FormGroup  check>
										<Label check>
											<Input type="checkbox" onChange={e=> setThursday(e.target.value)} name="thursday" value="Thur" checked={thursday==='Thur'} />
											Thursday
										</Label>
									</FormGroup>
								</Col>
								<Col md={4}>
									<Input type="time" onChange={e=> setThurFromTime(e.target.value)} name="thur_from_time" value={moment(thur_from_time, ["h:mm A"]).format("HH:mm")} />
								</Col>
								<Col md={4}>
									<Input type="time" onChange={e=> setThurToTime(e.target.value)} name="thur_to_time" value={moment(thur_to_time, ["h:mm A"]).format("HH:mm") } />
								</Col>
							</Row>
						</FormGroup>
						<FormGroup>
							<Row>
								<Col md={3}>
									<FormGroup  check>
										<Label check>
											<Input type="checkbox" onChange={e=> setFriday(e.target.value)} name="friday" value="Fri" checked={friday==='Fri'}/>
											Friday
										</Label>
									</FormGroup>
								</Col>
								<Col md={4}>
									<Input type="time" onChange={e=> setFriFromTime(e.target.value)} name="fri_from_time" value={moment(fri_from_time, ["h:mm A"]).format("HH:mm")} />
								</Col>
								<Col md={4}>
									<Input type="time" onChange={e=> setFriToTime(e.target.value)} name="fri_to_time" value={moment(fri_to_time, ["h:mm A"]).format("HH:mm")} />
								</Col>
							</Row>
						</FormGroup>
						<FormGroup>
							<Row>
								<Col md={3}>
									<FormGroup  check>
										<Label check>
											<Input type="checkbox" onChange={e=> setSaturday(e.target.value)} name="saturday" value="Sat" checked={saturday ==='Sat'}/>
											Saturday
										</Label>
									</FormGroup>
								</Col>
								<Col md={4}>
									<Input type="time" onChange={e=> setSatFromTime(e.target.value)} name="sat_from_time" value={moment(sat_from_time, ["h:mm A"]).format("HH:mm")} />
								</Col>
								<Col md={4}>
									<Input type="time" onChange={e=> setSatToTime(e.target.value)} name="sat_to_time" value={moment(sat_to_time, ["h:mm A"]).format("HH:mm")} />
								</Col>
							</Row>
						</FormGroup>
						<FormGroup>
							<Row>
								<Col md={3}>
									<FormGroup  check>
										<Label check>
											<Input type="checkbox" onChange={e=> setSunday(e.target.value)} name="sunday" value="Sun" checked={sunday === 'Sun'}/>
											Sunday
										</Label>
									</FormGroup>
								</Col>
								<Col md={4}>
									<Input type="time" onChange={e=> setSunFromTime(e.target.value)} name="sun_from_time" value={moment(sun_from_time, ["h:mm A"]).format("HH:mm")} />
								</Col>
								<Col md={4}>
									<Input type="time" onChange={e=> setSunToTime(e.target.value)} name="sun_to_time" value={moment(sun_to_time,["h:mm A"]).format("HH:mm")} />
								</Col>
							</Row>
						</FormGroup>
						<Button type="submit" onClick={doctorAvail} >Update</Button>
					{/* </Form> */}
				</Col>
				<Col xs={1}></Col>
			</Row>
		</Container>
	</>
);
};

export default EditAvailability;

