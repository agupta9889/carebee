import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Input } from "reactstrap";
import Sidebar from "../components/Sidebar";
import userService from "../services/user";
import ReactPaginate from "react-paginate";
import filterServices from "../services/filter";

function Appointments() {

	const [data, setdata] = useState();
	const [pageCount, setpageCount] =  useState(1);
	const limit = 10;
	const type = 'USER';
	
	useEffect(() => {
		getAppointmentData(1, limit, type);
	}, []);
	

	const getAppointmentData = async (currentPage, limit, type) => {
		if(currentPage == undefined){
			currentPage = 1 ;
		}
		userService.getAppointmentDetails(currentPage, limit, type)
		.then((response) => {
			const filterUser = response.data.data;
			const total = response.data.total;
			setpageCount(Math.ceil(total/limit));
			setdata(filterUser);
		})
		.catch(function (error) {
			console.log(error);
		});	 
	}
	const handlePageClick = async (data) =>{
		const currentPage = data.selected + 1
		const usersFromServer = await getAppointmentData(currentPage, limit, type);
		setdata(usersFromServer);
	}
	// Search API
	const search = async (data) => {
		if (data.length > 0) {
			filterServices.searchAppointment(data)
			.then(response => {
				const searchUser = response.data.data;
				const total = response.data.total;
				setpageCount(Math.ceil(total/limit));
				setdata(searchUser);
			})
			.catch(function (error) {
				console.log(error);
			});
		} else {
			getAppointmentData(1, limit, type);
		}
	}
	return (
		<>
			<Sidebar />
			<Container>
			<Row>
					<Col md={2} xs={1}></Col>
					<Col md={10} xs={10} className="table-container">
					<Row>
						<Col md={7} xs={12} >
							<h6>Appointment</h6>
						</Col>
						<Col md={5} xs={12} className="d-flex justify-content-end align-items-center mb-2">
							<Input name="search" 
							onChange={e=> search(e.target.value)} 
							className="form-control form-control-sm ml-3 w-75 shadow" type="text" placeholder="Search" aria-label="Search" />
						</Col>
					</Row>
						<Table id="patientTable" responsive>
							<thead>
								<tr>
								<th>#</th>
									<th>User Name</th>
									<th>Plan</th>
									<th>Date</th>
									<th>Start Time</th>
									<th>End Time</th>
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
											<td>{i.date}</td>
											<td>{i.startTime}</td>
											<td>{i.endTime}</td>
											<td>{i.doctorName}</td>
										</tr>
										);
									}) : 
									null
								}
							</tbody>
						</Table>
						<ReactPaginate
							previousLabel={'<< Pre'}
							nextLabel={'Next >>'}
							breakLabel={'...'}
							pageCount={pageCount}
							marginPagesDisplayed={2}
							pageRangeDisplayed={3}
							onPageChange={handlePageClick}
							containerClassName={'pagination justify-content-center'}
							pageClassName={'page-item shadow'}
							pageLinkClassName={'page-link'}
							previousClassName={'page-item shadow'}
							previousLinkClassName={'page-link '}
							nextClassName={'page-item shadow'}
							nextLinkClassName={'page-link'}
							breakClassName={'page-item shadow'}
							breakLinkClassName={'page-link'}
							activeClassName={'active shadow'}
						/>
					</Col>
					<Col xs={1}></Col>
				</Row>
			</Container>
		</>
	);
}

export default Appointments;
