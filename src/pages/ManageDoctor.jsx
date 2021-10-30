import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import * as FaIcons from "react-icons/fa";
import { Container, Row, Col, Table, Button } from "reactstrap";
import Sidebar from "../components/Sidebar";
//Bootstrap and jQuery libraries
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
//import swal from 'sweetalert';
import ReactTooltip from "react-tooltip";

const ManageDoctor = () => {

	let history = useHistory();
	function hundleDoctorEdit(data) {
	 // console.log(data);
     history.push("/edit-doctor");
  }
  function hundleDoctorInfo(data) {
	 // console.log(data);
     history.push("/doctor-profile");
  }

	//initialize datatable
    $(document).ready(function () {
        $('#doctorTable1').DataTable();
    });

	// Sweet alert validation
	// const notify = () => swal({
	// 		title: "Are you sure?",
	// 		text: "Are you sure that you want to leave this page?",
	// 		icon: "warning",
	// 		dangerMode: true,
	// 	})

	// API Integration
	const [data, setstate] = useState();

	useEffect(() => {
		getDoctor();
	}, []);
		
	const getDoctor = async () => {
		
		var axios = require('axios');
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
		  console.log('Response in doctor data:::', response.data.data);
		  const filterDoctor = response.data.data.filter(doctor => doctor.type ==='DOCTOR')
		 setstate(filterDoctor);
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
				<h5>Doctor Records</h5><hr/>
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
										<td>{i.mobile}</td>
										<td>{i.email}</td>
										<td>{i.gender}</td>
										<td>{
												(i.status === 0)   // 0-Active, 1-Inactive
												?<Button outline color="success" className="round btn-sm">Active</Button>
												:<Button outline color="danger" className="round btn-sm">Inactive</Button>
											}
										</td>
										<td className="text-center">
											<Button outline onClick={()=>hundleDoctorEdit(i)} className="edit" data-tip data-for='editD'><FaIcons.FaPencilAlt /></Button> <Button outline onClick={()=>hundleDoctorInfo(i)} className="view" data-tip data-for='viewD'><FaIcons.FaEye />
											</Button>
											<ReactTooltip id='editD' type='warning'>
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
