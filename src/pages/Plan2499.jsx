import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Badge } from "reactstrap";
import Sidebar from "../components/Sidebar";
import userService from "../services/user";


function Plan2499() {
	const [data, setdata] = useState();
	const type = '2499';
	useEffect(() => {
		getPlanDetails(type);
	}, []);
	const getPlanDetails = async () => {
		userService.getPlanData(type)
		.then((response) => {
			const filterUser = response.data.data;
			setdata(filterUser);
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

export default Plan2499;
