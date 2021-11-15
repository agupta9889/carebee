import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import * as FaIcons from "react-icons/fa";
import { Container, Row, Col, Table, Button, Badge } from "reactstrap";
import Sidebar from "../components/Sidebar";
import ReactTooltip from "react-tooltip";
import axios from "axios";

const ManageDoctor = () => {

	let history = useHistory();
	function hundleDoctorEdit(data) {
		history.push("/edit-doctor/" + data);
	}

  	function hundleDoctorInfo(data) {
		history.push("/doctor-profile/" + data);
	}

	

	// API Integration
	const [data, setState] = useState();

	useEffect(() => {
		getDoctor();
	}, []);
		
	const getDoctor = async () => {
		
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
		 // console.log('Response in doctor list:::', response.data.data);
		  const filterDoctor = response.data.data.filter(doctor => doctor.type ==='DOCTOR')
		  setState(filterDoctor);
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
					<Col md={10} xs={10} className="table-container">
					<h6>Doctor Records</h6><hr/>
						<Table id="doctorTable" responsive>
							<thead>
								<tr>
									<th>#</th>
									<th>Name</th>
									<th>Phone</th>
									<th>Email</th>
									<th>Gender</th>
									<th>Status</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{
									data ?
									data.map((i, index) => {
										//console.log('item ::: ');
										return(
											<tr key={index}>
												<th scope="row">{index+1}</th>
												<td>Dr. { i.first_name } { i.last_name }</td>
												<td>{i.mobile}{i._id}</td>
												<td>{i.email}</td>
												<td>{i.gender}</td>
												<td>{
														(i.status === 0)   // 0-Active, 1-Inactive
														?<Badge style={{backgroundColor: "green"}}>Active</Badge>
														:<Badge style={{backgroundColor: "red"}}>Inactive</Badge>
													}
												</td>
												<td>
													<Button outline onClick={()=>hundleDoctorEdit(i.id)} className="edit" data-tip data-for='editD'><FaIcons.FaPencilAlt /></Button> <Button outline onClick={()=>hundleDoctorInfo(i.id)} className="view" data-tip data-for='viewD'><FaIcons.FaEye /></Button> 
													<ReactTooltip id='editD' type='success'>
														<span>Edit Records</span>
													</ReactTooltip>
													<ReactTooltip id='viewD' type='info'>
														<span>View Records</span>
													</ReactTooltip>
													
												</td>
											</tr>
										);
									}):
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
};

export default ManageDoctor;
