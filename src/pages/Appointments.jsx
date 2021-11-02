import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Badge } from "reactstrap";
import axios from "axios";
import Sidebar from "../components/Sidebar";


function Appointments() {

	// Booking API Integration
	const [data, setdata] = useState();

	useEffect(() => {
		getUserDetails();
	}, []);

	const getUserDetails = async () => {

		var data = JSON.stringify({
			"email": "p34892@gmail.com",
			"type": "USER"
		  });
		  
		  var config = {
			method: 'get',
			url: 'http://192.168.1.29:5000/api/user/login/getUser',
			headers: { 
			  'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzY4YjlhYjgyYmQwMDJkMGU0ZmFhYiIsImlhdCI6MTYzNTE2NTk2NSwiZXhwIjo2ODE5MTY1OTY1fQ._Jy0lEA0y8ojQqauoDUKyEuujKxcZfzT55ISt2hMuZo', 
			  'Content-Type': 'application/json'
			},
			data : data
		  };
		  
		  axios(config)
		  .then(response => {
			  console.log("response in user data::: ", response.data.data);
			  const filterUser = response.data.data.filter(user => user.type === 'USER');
			  setdata(filterUser)
		  })
		  .catch(function (error) {
			console.log(error);
		  });
	}
	const data1 = [{
		name : "Patient-1",
		service : "Fever",
		doctor : "Doctor-1",
		date : "27-Nov-21",
		time : "10:30 am",
		status : "Booked",

	},
	{
		name : "Patient-2",
		service : "Pain",
		doctor : "Doctor-2",
		date : "27-Nov-21",
		time : "10:50 am",
		status : "Canceled",

	},]

	return (
		<>
			<Sidebar />
			<Container>
				<Row>
					<Col md={2} xs={1}></Col>
					<Col md={10} xs={10} className="table-container">
						<h5>Appointments</h5><hr />
						<Table id="patientTable" responsive>
							<thead>
								<tr>
									<th>#</th>
									<th>User</th>
									<th>Psychological intervention</th>
									<th>Doctor</th>
									<th>Date</th>
									<th>Time</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{
									data1 ? 
									data1.map((i, index) => {

										return (
											
												<tr key={index}>
													<th scope="row">{index + 1}</th>
													<td>{i.name}</td>
													<td>{i.service}</td>
													<td>{i.doctor}</td>
													<td>{i.date}</td>
													<td>{i.time}</td>
													<td><Badge style={{backgroundColor: "green"}}>{i.status}</Badge></td>
												</tr>
										);
									}) : 
									null
								}
							</tbody>
						</Table>
					</Col>
					<Col xs={1}></Col>
				</Row>
			</Container>
		</>
	);
}

export default Appointments;
