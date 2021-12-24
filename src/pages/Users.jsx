import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Badge, Button, Input } from "reactstrap";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import ReactPaginate from "react-paginate";
import GLOBALS from '../constants/global';


function User() {
	
	const [data, setdata] = useState();
	const [pageCount, setpageCount] =  useState(1);
	const limits = 10;
	const type = 'USER';
	// User API Integration
	useEffect(() => {
		getUserDetails();
	}, []);

	const getUserDetails = async (currentPage) => {
		if(currentPage == undefined){
			currentPage = 1 ;
		}
		var config = {
		method: "get",
		url: `${GLOBALS.BASE_URL}/user/get?page=${currentPage}&limit=${limits}&type=${type}`,
	 	headers: {
			"x-auth-token":
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzY4YjlhYjgyYmQwMDJkMGU0ZmFhYiIsImlhdCI6MTYzNTE2NTk2NSwiZXhwIjo2ODE5MTY1OTY1fQ._Jy0lEA0y8ojQqauoDUKyEuujKxcZfzT55ISt2hMuZo",
			"Content-Type": "application/json",
		},
		};

		axios(config)
		.then((response) => {
			
			const filterUser = response.data.data.results;
			const total = response.data.total;
			//console.log('dsfasd',total);
			setpageCount(Math.ceil(total/limits));
			setdata(filterUser);
			
		})
		.catch(function (error) {
			console.log(error);
		});
	 
	  }
 	const handlePageClick = async (data) =>{
		const currentPage = data.selected + 1
		//console.log('pageination Number', currentPage);
		const usersFromServer = await getUserDetails(currentPage);
		setdata(usersFromServer);
	}

	
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
			const searchUser = response.data.data.filter((user) => user.type === "USER");
			setdata(searchUser);
			
		  })
		  .catch(function (error) {
			console.log(error);
		  });
		} else {
			getUserDetails();
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
					<h6>User Records</h6>
				</Col>
				<Col md={5} xs={12} className="d-flex justify-content-end align-items-center mb-2">
					<Input name="search" 
					 onChange={e=> search(e.target.value)} 
					className="form-control form-control-sm ml-3 w-75 shadow" type="text" placeholder="Search" aria-label="Search" />
					
				</Col>
			</Row>   
            <hr />
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email Id</th>
                  <th>Gender</th>
				  <th>Anonymous</th>
                  <th>Status</th>
				  <th>View</th>
				</tr>
              </thead>
              <tbody>
                {data
                  ? data.map((item, index) => {
                      return (
                        <tr key={index}>
							<th scope="row">{index + 1}</th>
							<td>
								{item.firstName} {item.lastName}
							</td>
							<td>{item.mobile}</td>
							<td>{item.email}</td>
							<td>{item.gender}</td>
							<td>{
								// 0- Public Profile, 1- Private Profile
									(item.anonymous === 0) 
									?<Badge className="shadow" style={{backgroundColor: "red"}}>No</Badge>
									:<Badge className="shadow" style={{backgroundColor: "green"}}>Yes</Badge>
								}
							</td>
							<td>{
								// 0- Active, 1- Inactive
									(item.status === 0) 
									?<Badge className="shadow" style={{backgroundColor: "green"}}>Active</Badge>
									:<Badge className="shadow" style={{backgroundColor: "red"}}>Inactive</Badge>
								}
							</td>
							<td>
								
							</td>
						</tr>
                      );
                    })
                  : null}
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

export default User;
