import React, {useState, useEffect } from "react";
import { useHistory } from "react-router";
import * as FaIcons from "react-icons/fa";
import { Container, Row, Col, Table, Button, FormGroup, Input, Label } from "reactstrap";
import Sidebar from "../components/Sidebar";
import swal from "sweetalert";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import ReactPaginate from "react-paginate";
import GLOBALS from '../constants/global';
import moment from "moment";


const ManageAvailability = () => {

	let history = useHistory();
	// function hundleAvailabilityEdit(data) {
	// 	//alert(data);
	// 	history.push("/edit-availability/" + data);
  	// }

	// API Integration for  Load data
	// API Integration
	const [data, setData] = useState();
	const [availability, setAvailability] = useState([]);
	const [pageCount, setpageCount] =  useState(1);
	const limits = 10;
	const type = 'DOCTOR';

	useEffect(() => {
		getAvail();
	}, []);
		
	const getAvail = async (currentPage) => {
		
		if(currentPage == undefined){
			currentPage = 1 ;
		}
		var config = {
		  method: 'get',
		  url: `${GLOBALS.BASE_URL}/user/get?page=${currentPage}&limit=${limits}&type=${type}`,
		  headers: { 
			'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzY4YjlhYjgyYmQwMDJkMGU0ZmFhYiIsImlhdCI6MTYzNTE2NTk2NSwiZXhwIjo2ODE5MTY1OTY1fQ._Jy0lEA0y8ojQqauoDUKyEuujKxcZfzT55ISt2hMuZo', 
			'Content-Type': 'application/json'
		  },
		};
		
		axios(config)
		.then(response => {
		 	console.log('Response in doctor list:::', response.data.data);
			let tempArray = [];
			tempArray.push(response.data.data.results)
			setAvailability(response.data.data.results);
		  	const filterDoctor = response.data.data.results;
		  	const total = response.data.total;
			//console.log('dsfasd',total);
			setpageCount(Math.ceil(total/limits));
			setData(filterDoctor);
			// setAvailability(tempArray);
		})
		.catch(function (error) {
		  console.log(error);
		});

	}	

	const handlePageClick = async (data) =>{
		const currentPage = data.selected + 1
		//console.log('pageination Number', currentPage);
		const usersFromServer = await getAvail(currentPage);
		setData(usersFromServer);
	}

	// // API integration for delete
	// function hundleAvailablityDelete(id) {
		
	// 	swal({
	// 		title: "Are you sure?",
	// 		text: "You will not be able to recover this record!",
	// 		icon: "warning",
	// 		buttons: [
	// 		'No, cancel it!',
	// 		'Yes, I am sure!'
	// 		],
	// 		dangerMode: true,
	// 	}).then(function(isConfirm) {
	// 	if (isConfirm) {
	// 		swal({
	// 		title: 'Success!',
	// 		text: 'Records have not been deleted!',
	// 		icon: 'success'
	// 		}).then(function() {
	// 		//form.submit();
	// 		deleteAvail(id);
	// 		});
	// 	} else {
	// 		swal("Cancelled", "Your record is safe :)", "error");
	// 	}
	// 	});
	// }

	// const deleteAvail = async (id) => {
		
	// 	var config = {
	// 		method: 'delete',
	// 		url: `${GLOBALS.BASE_URL}/availability/login/deletebyid/` + id,
	// 		headers: { 
	// 		  'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzY4YjlhYjgyYmQwMDJkMGU0ZmFhYiIsImlhdCI6MTYzNTE2NTk2NSwiZXhwIjo2ODE5MTY1OTY1fQ._Jy0lEA0y8ojQqauoDUKyEuujKxcZfzT55ISt2hMuZo', 
	// 		  'Content-Type': 'application/json'
	// 		},
	// 		data : data
	// 	};
		  
	// 	axios(config)
	// 	.then(response => {
	// 		console.log('Data has been deleted:::', response.data.data);
	// 	})
	// 	.catch(function (error) {
	// 		console.log(error);
	// 	});
	// 	getAvail();
	// }
	
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
								<th>Monday</th>
								<th>Tuesday</th>
								<th>Wednesday</th>
								<th>Thursday</th>
								<th>Friday</th>
								<th>Saturday</th>
								<th>Sunday</th>
								{/* <th>Action</th> */}
							</tr>
						</thead>
						<tbody>
						{
							availability.map((availdata, index) => {
								return (
									<tr key={index}>
										<td>Dr. { availdata.firstName } {availdata.lastName}</td>
										{	
											availdata.availabilities.map((data) => {
												return (
													<td>
														<FormGroup>
															<Label>From:</Label>
															<Input type="time" value={ moment(data.fromTime, ["h:mm A"]).format("HH:mm")}></Input>
														</FormGroup>
														<FormGroup>
															<Label>To:</Label>
															<Input type="time" value={ moment(data.toTime, ["h:mm A"]).format("HH:mm")}></Input>
														</FormGroup>
													</td>
												)
											})
										}
										{/* <td className="text-center" style={{width: "12%"}}>
											<Button outline onClick={()=>hundleAvailabilityEdit(availdata.id)} className="shadow edit" data-tip data-for='editD'><FaIcons.FaPencilAlt /></Button> <Button outline onClick={()=>hundleAvailablityDelete(availdata.id)} className="shadow view" data-tip data-for='viewD'><FaIcons.FaTrash />
											</Button>
											<ReactTooltip id='editD' type='warning'>
												<span>Edit</span>
											</ReactTooltip>
											<ReactTooltip id='viewD' type='info'>
												<span>Delete</span>
											</ReactTooltip>
										</td> */}
									</tr>
								);
							})
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
};

export default ManageAvailability;
