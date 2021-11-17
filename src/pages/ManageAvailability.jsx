import React, {useState, useEffect } from "react";
import { useHistory } from "react-router";
import * as FaIcons from "react-icons/fa";
import { Container, Row, Col, Table, Button } from "reactstrap";
import Sidebar from "../components/Sidebar";
import swal from "sweetalert";
import ReactTooltip from "react-tooltip";
import axios from "axios";


const ManageAvailability = () => {

	let history = useHistory();
	function hundleAvailabilityEdit(data) {
		alert(data);
		history.push("/edit-availability/" + data);
  	}

	// API Integration for  Load data
	const [data, setstate] = useState();

	useEffect(() => {
		getAvail();
	}, []);
		
	const getAvail = async () => {
		
		var data = JSON.stringify({
		  "email": "p34892@gmail.com",
		  "type": "USER"
		});
			
		var config = {
		  method: 'get',
		  url: 'http://192.168.1.29:5000/api/availability/login/get',
		  headers: { 
			'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzY4YjlhYjgyYmQwMDJkMGU0ZmFhYiIsImlhdCI6MTYzNTE2NTk2NSwiZXhwIjo2ODE5MTY1OTY1fQ._Jy0lEA0y8ojQqauoDUKyEuujKxcZfzT55ISt2hMuZo', 
			'Content-Type': 'application/json'
		  },
		  data : data
		};
		
		axios(config)
		.then(response => {
		    //console.log('Response in availability data:::', response.data.data);
			setstate(response.data.data);
		})
		.catch(function (error) {
		  console.log(error);
		});

	}	

	// API integration for delete
	function hundleAvailablityDelete(id) {
		
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
			deleteAvail(id);
			});
		} else {
			swal("Cancelled", "Your record is safe :)", "error");
		}
		});
	}

	const deleteAvail = async (id) => {
		
		var config = {
			method: 'delete',
			url: 'http://192.168.1.29:5000/api/availability/login/deletebyid/' + id,
			headers: { 
			  'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzY4YjlhYjgyYmQwMDJkMGU0ZmFhYiIsImlhdCI6MTYzNTE2NTk2NSwiZXhwIjo2ODE5MTY1OTY1fQ._Jy0lEA0y8ojQqauoDUKyEuujKxcZfzT55ISt2hMuZo', 
			  'Content-Type': 'application/json'
			},
			data : data
		};
		  
		axios(config)
		.then(response => {
			console.log('Data has been deleted:::', response.data.data);
		})
		.catch(function (error) {
			console.log(error);
		});
		getAvail();
	}

	// const data1 = [
	// {
	// 	name: "Arun Gupta",
	// 	dates: "[Mon, from: 9:00 AM to: 3:00 PM] - [Tue, from: 9:00 AM to: 3:00 PM] - [Wed, from: 9:00 AM to: 3:00 PM] - [Thu, from: 9:00 AM to: 3:00 PM] - [Fri, from: 9:00 AM to: 3:00 PM] - [Sat, from: 9:00 AM to: 3:00 PM] - [Sun, from: 9:00 AM to: 3:00 PM]"
	// }
	// ]

return (
	<>
		<Sidebar />
		<Container >
			<Row >
				<Col md={2} xs={1}></Col>
				<Col md={10} xs={10} className="table-container">
				<h6>Availability</h6><hr/>
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
								data ?
								data.map((availdata, index) => {
									//console.log('item ::: ', availdata );
									return(
									<tr key={index}>
										<td>Dr. { availdata.doctor_name }</td>
										<td>[{availdata.monday}, from:{availdata.mon_from_time} to: {availdata.mon_to_time}] - [{availdata.tuesday}, from:{availdata.tue_from_time} to: {availdata.tue_to_time}] - [{availdata.wednesday}, from:{availdata.wed_from_time} to: {availdata.wed_to_time}] - [{availdata.thursday}, from:{availdata.thur_from_time} to: {availdata.thur_to_time}] - [{availdata.friday}, from:{availdata.fri_from_time} to: {availdata.fri_to_time}] - [{availdata.saturday}, from:{availdata.sat_from_time} to: {availdata.sat_to_time}] - [{availdata.sunday}, from:{availdata.sun_from_time} to: {availdata.sun_to_time}]</td>
										<td className="text-center" style={{width: "12%"}}>
											<Button outline onClick={()=>hundleAvailabilityEdit(availdata.id)} className="edit" data-tip data-for='editD'><FaIcons.FaPencilAlt /></Button> <Button outline onClick={()=>hundleAvailablityDelete(availdata.id)} className="view" data-tip data-for='viewD'><FaIcons.FaTrash />
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
