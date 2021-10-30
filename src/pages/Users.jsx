import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table} from "reactstrap";
//Bootstrap and jQuery libraries
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import axios from "axios";
import Sidebar from "../components/Sidebar";


function User() {

	//initialize datatable
	$(document).ready(function () {
		$('#patientTable1').DataTable();
	});

	// User API Integration
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


	return (
		<>
			<Sidebar />
			<Container>
				<Row>
					<Col md={2} xs={1}></Col>
					<Col md={10} xs={10} className="table-container">
						<h5>User Records</h5><hr />
						<Table id="patientTable" responsive>
							<thead>
								<tr>
									<th>#</th>
									<th>User Name</th>
									<th>Phone</th>
									<th>Email</th>
									<th>Gender</th>
									<th>Age</th>
									<th>Hight</th>
									<th>Weight</th>

								</tr>
							</thead>
							<tbody>
								{
									data ? 
									data.map((i, index) => {

										return (
											
												<tr key={index}>

													<th scope="row">{index + 1}</th>
													<td>{i.first_name} {i.last_name}</td>
													<td>{i.mobile}</td>
													<td>{i.email}</td>
													<td>{i.gender}</td>
													<td>{i.age} Years</td>
													<td>{i.height} Inch</td>
													<td>{i.weight} Kg</td>
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

export default User;
