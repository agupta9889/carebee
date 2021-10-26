import React, { useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import { Container, Row, Col, Table, Button } from "reactstrap";
//Bootstrap and jQuery libraries
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import swal from 'sweetalert';

const ManageDoctor = () => {

	//initialize datatable
    $(document).ready(function () {
        $('#doctorTable').DataTable();
    });

	// Sweet alert validation
	const notify = () => swal({
			title: "Are you sure?",
			text: "Are you sure that you want to leave this page?",
			icon: "warning",
			dangerMode: true,
		})
	// Doctor records
	const arr = [
		{
			name : 'Arun Gupta',
			phone : '9889286601',
			email : 'arun@gmail.com',
			gender : 'Male',
			status : 'Active'

		},
		{
			name : 'Rajeev',
			phone : '9889286602',
			email : 'rajeev@gmail.com',
			gender : 'Male',
			status : 'Inactive'
		},
		{
			name : 'Princy',
			phone : '9889286603',
			email : 'princy@gmail.com',
			gender : 'Male',
			status : 'Active'
		},
		{
			name : 'Nitin',
			phone : '9889286604',
			email : 'nitin@gmail.com',
			gender : 'Male',
			status : 'Inactive'
		},
		{
			name : 'Prathvi',
			phone : '9889286605',
			email : 'prathvi@gmail.com',
			gender : 'Male',
			status : 'Active'
		},
		{
			name : 'Kiran',
			phone : '9889286605',
			email : 'kiran@gmail.com',
			gender : 'Female',
			status : 'Inactive'
		},
		{
			name : 'Arun Gupta',
			phone : '9889286606',
			email : 'arun@gmail.com',
			gender : 'Male',
			status : 'Active'

		},
		{
			name : 'Rajeev',
			phone : '9889286607',
			email : 'rajeev@gmail.com',
			gender : 'Male',
			status : 'Active'
		},
		{
			name : 'Princy',
			phone : '9889286608',
			email : 'princy@gmail.com',
			gender : 'Male',
			status : 'Active'
		},
		{
			name : 'Nitin',
			phone : '9889286609',
			email : 'nitin@gmail.com',
			gender : 'Male',
			status : 'Active'
		},
		{
			name : 'Prathvi',
			phone : '98892866010',
			email : 'prathvi@gmail.com',
			gender : 'Male',
			status : 'Active'
		},
		{
			name : 'Nidhi',
			phone : '98892866010',
			email : 'nidhi@gmail.com',
			gender : 'Female',
			status : 'Active'
		},
	]
	
	useEffect(() => {
		arr.map(i => console.log("item :: ",i))
	}, [])

return (

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
								arr.map((i, index) => {
									//console.log('item ::: ');
									 return(
									<tr>
										<th scope="row">{index+1}</th>
										<td>Dr. { i.name }</td>
										<td>{i.phone}</td>
										<td>{i.email}</td>
										<td>{i.gender}</td>
										<td>{
												(i.status === 'Active')
												?<Button outline color="success" className="round btn-sm">Active</Button>
												:<Button outline color="danger" className="round btn-sm">Inactive</Button>
											}
										</td>
										<td className="text-center"><a href="/edit-doctor" className="edit"><FaIcons.FaPencilAlt /></a> <a href="/doctor-profile" onClick={notify} className="view"><FaIcons.FaEye /></a></td>
									</tr>
								 )
								})
							}
						</tbody>
					</Table>
				</Col>
				<Col xs={1}></Col>
			</Row>
		</Container>

);
};

export default ManageDoctor;
