import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import * as FaIcons from "react-icons/fa";
import { Container, Row, Col, Table, Button } from "reactstrap";
import Sidebar from "../components/Sidebar";
import swal from "sweetalert";
import ReactTooltip from "react-tooltip";

const ManageAvailability = () => {

	let history = useHistory();
	function hundleAvailabilityEdit(data) {
	 // console.log(data);
     history.push("/edit-availability");
  }
  function hundleAvailablityDelete(data) {
	 // console.log(data);
	
	swal({
		title: "Are you sure?",
		text: "You will not be able to recover this record!",
		icon: "warning",
		buttons: [
		  'No, cancel it!',
		  'Yes, I am sure!'
		],
		dangerMode: true,
	  }).then(function(isConfirm) {
		if (isConfirm) {
		  swal({
			title: 'Success!',
			text: 'Records have not been deleted!',
			icon: 'success'
		  }).then(function() {
			//form.submit();
		  });
		} else {
		  swal("Cancelled", "Your record is safe :)", "error");
		}
	  });
  }

	// API Integration
	// const [data, setstate] = useState();

	// useEffect(() => {
	// 	getDoctor();
	// }, []);
		
	// const getDoctor = async () => {
		
	// 	var axios = require('axios');
	// 	var data = JSON.stringify({
	// 	  "email": "p34892@gmail.com",
	// 	  "type": "USER"
	// 	});
			
	// 	var config = {
	// 	  method: 'get',
	// 	  url: 'http://192.168.1.29:5000/api/user/login/getUser',
	// 	  headers: { 
	// 		'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzY4YjlhYjgyYmQwMDJkMGU0ZmFhYiIsImlhdCI6MTYzNTE2NTk2NSwiZXhwIjo2ODE5MTY1OTY1fQ._Jy0lEA0y8ojQqauoDUKyEuujKxcZfzT55ISt2hMuZo', 
	// 		'Content-Type': 'application/json'
	// 	  },
	// 	  data : data
	// 	};
		
	// 	axios(config)
	// 	.then(response => {
	// 	  console.log('Response in doctor data:::', response.data.data);
	// 	  const filterDoctor = response.data.data.filter(doctor => doctor.type ==='DOCTOR')
	// 	 setstate(filterDoctor);
	// 	})
	// 	.catch(function (error) {
	// 	  console.log(error);
	// 	});

	// }	
	const data1 = [
	{
		name: "Arun Gupta",
		dates: "[Mon, from: 9:00 AM to: 3:00 PM] - [Tue, from: 9:00 AM to: 3:00 PM] - [Wed, from: 9:00 AM to: 3:00 PM] - [Thu, from: 9:00 AM to: 3:00 PM] - [Fri, from: 9:00 AM to: 3:00 PM] - [Sat, from: 9:00 AM to: 3:00 PM] - [Sun, from: 9:00 AM to: 3:00 PM]"
	},
	{
		name: "Arun Kumar",
		dates: "[Mon, from: 9:00 AM to: 3:00 PM] - [Tue, from: 9:00 AM to: 3:00 PM] - [Wed, from: 9:00 AM to: 3:00 PM] - [Thu, from: 9:00 AM to: 3:00 PM] - [Fri, from: 9:00 AM to: 3:00 PM] - [Sat, from: 9:00 AM to: 3:00 PM] - [Sun, from: 9:00 AM to: 3:00 PM]"
	},
	{
		name: "Arun Kumar Gupta",
		dates: "[Mon, from: 9:00 AM to: 3:00 PM] - [Tue, from: 9:00 AM to: 3:00 PM] - [Wed, from: 9:00 AM to: 3:00 PM] - [Thu, from: 9:00 AM to: 3:00 PM] - [Fri, from: 9:00 AM to: 3:00 PM] - [Sat, from: 9:00 AM to: 3:00 PM] - [Sun, from: 9:00 AM to: 3:00 PM]"
	},
	]

return (
	<>
		<Sidebar />
		<Container >
			<Row >
				<Col md={2} xs={1}></Col>
				<Col md={10} xs={10} className="table-container">
				<h5>Availability</h5><hr/>
					<Table id="doctorTable" responsive>
						<thead>
							<tr>
								<th>Doctor</th>
								<th>Available Dates</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{
								data1 ?
								data1.map((i, index) => {
									//console.log('item ::: ');
									 return(
									<tr key={index}>
										<td>Dr. { i.name }</td>
										<td>{i.dates}</td>
										<td className="text-center" style={{width: "10%"}}>
											<Button outline onClick={()=>hundleAvailabilityEdit(i)} className="edit" data-tip data-for='editD'><FaIcons.FaPencilAlt /></Button> <Button outline onClick={()=>hundleAvailablityDelete(i)} className="view" data-tip data-for='viewD'><FaIcons.FaTrash />
											</Button>
											<ReactTooltip id='editD' type='warning'>
												<span>Edit</span>
											</ReactTooltip>
											<ReactTooltip id='viewD' type='info'>
												<span>Delete</span>
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

export default ManageAvailability;
