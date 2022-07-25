import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Badge } from "reactstrap";
import Sidebar from "../components/Sidebar";
import userService from "../services/user";

function Appointments() {
	
	const [data, setdata] = useState();
	useEffect(() => {
		getAppointmentData();
	}, []);
	const getAppointmentData = async () => {
		userService.getAppointmentDetails()
		.then((response) => {
			const filterUser = response.data.data;
			setdata(filterUser);
		})
		.catch(function (error) {
			console.log(error);
		});	 
	}

	// const data1 = [{
	// 	name : "Patient-1",
	// 	service : "Fever",
	// 	doctor : "Doctor-1",
	// 	date : "27-Nov-21",
	// 	time : "10:30 am",
	// 	status : "Booked",

	// },
	// {
	// 	name : "Patient-2",
	// 	service : "Pain",
	// 	doctor : "Doctor-2",
	// 	date : "27-Nov-21",
	// 	time : "10:50 am",
	// 	status : "Canceled",

	// },]
	// console.log(data1);

	return (
		<>
			<Sidebar />
			<Container>
			<Row>
					<Col md={2} xs={1}></Col>
					<Col md={10} xs={10} className="table-container">
						<h6>Appointments</h6><hr />
						<Table id="patientTable" responsive>
							<thead>
								<tr>
								<th>#</th>
									<th>User Name</th>
									<th>Plan</th>
									<th>Created At</th>
									<th>Expiry Date</th>
									<th>Doctor Name</th>							
								</tr>
							</thead>
							<tbody>
								{
									data ? 
									data.map((i, index) => {

										return (
											
											<tr key={index}>
											<th scope="row">{index + 1}</th>
											<td>{i.name}</td>
													<td>{i.amount}</td>
													<td>{i.createdAt}</td>
													<td>{i.expiry_date}</td>
													<td>{i.doctorName}</td>
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
