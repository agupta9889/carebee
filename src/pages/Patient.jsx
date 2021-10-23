import React from "react";
import { Container, Row, Col, Table, Button } from "reactstrap";
//Bootstrap and jQuery libraries
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 


const Patient = () => {
	//initialize datatable
    $(document).ready(function () {
        $('#patientTable').DataTable();
    });

	const arr = [
		{
			name : 'Ankit',
			mobile : '9889286610',
			email : 'ankit@gmail.com',
			gender : 'Male',
			age : '26',
			height : '5.3',
			weight : '62' 
		},
		{
			name : 'Arun',
			mobile : '9889286611',
			email : 'arun@gmail.com',
			gender : 'Male',
			age : '28',
			height : '5.4',
			weight : '65' 
		},
		{
			name : 'Rajeev',
			mobile : '9889286612',
			email : 'rajeev@gmail.com',
			gender : 'Male',
			age : '28',
			height : '5.3',
			weight : '68' 
		},
		{
			name : 'Prathvi',
			mobile : '9889286613',
			email : 'prathvi@gmail.com',
			gender : 'Male',
			age : '23',
			height : '6',
			weight : '52' 
		},
		{
			name : 'Nitin',
			mobile : '9889286614',
			email : 'nitin@gmail.com',
			gender : 'Male',
			age : '28',
			height : '6.1',
			weight : '70' 
		},
		{
			name : 'Princy',
			mobile : '9889286615',
			email : 'princy@gmail.com',
			gender : 'Female',
			age : '29',
			height : '5.3',
			weight : '60' 
		},
	]


	return (
		<>
			<Container >
				<Row >
					<Col md={2} xs={1}></Col>
					<Col md={10} xs={10} className="table-container">
					<h5>Patient Records</h5><hr/>
						<Table id="patientTable" responsive>
							<thead>
								<tr>
									<th>#</th>
									<th>Patient Name</th>
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
									arr.map((i, index) => {
									return(
											<tr>
												<th scope="row">{index+1}</th>
												<td>{i.name}</td>
												<td>{i.mobile}</td>
												<td>{i.email}</td>
												<td>{i.gender}</td>
												<td>{i.age} Years</td>
												<td>{i.height} Inch</td>
												<td>{i.weight} Kg</td>
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
		</>
	);
};

export default Patient;
