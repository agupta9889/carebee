import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import * as FaIcons from "react-icons/fa";
import { Container, Row, Col, Table, Button, Badge, Input } from "reactstrap";
import Sidebar from "../components/Sidebar";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import ReactPaginate from "react-paginate";
import GLOBALS from '../constants/global';

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
	const [pageCount, setpageCount] =  useState(1);
	const limits = 10;
	const type = 'DOCTOR';
	
	useEffect(() => {
		getDoctor();
	}, []);
		
	const getDoctor = async (currentPage) => {
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
		 	// console.log('Response in doctor list:::', response.data.data);
		  	const filterDoctor = response.data.data.results;
		  	const total = response.data.total;
			//console.log('dsfasd',total);
			setpageCount(Math.ceil(total/limits));
		  	setState(filterDoctor);
		})
		.catch(function (error) {
		  console.log(error);
		});

	}
	const handlePageClick = async (data) =>{
		const currentPage = data.selected + 1
		//console.log('pageination Number', currentPage);
		const usersFromServer = await getDoctor(currentPage);
		setState(usersFromServer);
	}
	// Search API
	const search = async (data) => {
		if (data.length > 0) {

		var config = {
			method: 'get',
			url: `${GLOBALS.BASE_URL}/user/search/` + data,
			headers: { 
			  'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzY4YjlhYjgyYmQwMDJkMGU0ZmFhYiIsImlhdCI6MTYzNTE2NTk2NSwiZXhwIjo2ODE5MTY1OTY1fQ._Jy0lEA0y8ojQqauoDUKyEuujKxcZfzT55ISt2hMuZo', 
			  'Content-Type': 'application/json'
			},
		   
		  };
		  
		  axios(config)
		  .then(response => {
			//console.log('Search Data Response :::', response.data.data);
			const searchUser = response.data.data.filter((user) => user.type === "DOCTOR");
			setState(searchUser);
			
		  })
		  .catch(function (error) {
			console.log(error);
		  });
		} else {
			getDoctor();
		}
	}
	return (
		<>
			<Sidebar />
			<Container >
				<Row >
					<Col md={2} xs={1}></Col>
					<Col md={10} xs={10} className="table-container">
					<Row>
						<Col md={7} xs={12} >
							<h6>Doctor Records</h6>
						</Col>
						<Col md={5} xs={12} className="d-flex justify-content-end align-items-center mb-2">
							<Input name="search" 
							onChange={e=> search(e.target.value)} 
							className="form-control form-control-sm ml-3 w-75 shadow" type="text" placeholder="Search" aria-label="Search" />
							
						</Col>
					</Row>  
					<hr/>
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
									data.map((item, index) => {
										//console.log('item ::: ');
										return(
											<tr key={index}>
												<th scope="row">{index+1}</th>
												<td>Dr. { item.firstName } {item.lastName}</td>
												<td>{item.mobile}{item._id}</td>
												<td>{item.email}</td>
												<td>{item.gender}</td>
												<td>{
														(item.status === 0)   // 0-Active, 1-Inactive
														?<Badge className="shadow" style={{backgroundColor: "green"}}>Active</Badge>
														:<Badge className="shadow" style={{backgroundColor: "red"}}>Inactive</Badge>
													}
												</td>
												<td>
													<Button outline onClick={()=>hundleDoctorEdit(item.id)} className="shadow edit" data-tip data-for='editD'><FaIcons.FaPencilAlt /></Button> <Button outline onClick={()=>hundleDoctorInfo(item.id)} className="shadow view" data-tip data-for='viewD'><FaIcons.FaEye /></Button> 
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

export default ManageDoctor;
