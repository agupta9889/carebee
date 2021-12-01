import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import ReactPaginate from "react-paginate";


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
		url: `http://192.168.1.29:5000/api/user/login/get?page=${currentPage}&limit=${limits}&type=${type}`,
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
		console.log('pageination Number', currentPage);
		const usersFromServer = await getUserDetails(currentPage);
		setdata(usersFromServer);
	}


  return (
    <>
      <Sidebar />
      <Container>
        <Row>
          <Col md={2} xs={1}></Col>
          <Col md={10} xs={10} className="table-container">
            <h6>User Records</h6>
            <hr />
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Hight</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                {data
                  ? data.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            {item.first_name} {item.last_name}
                          </td>
                          <td>{item.mobile}</td>
                          <td>{item.email}</td>
                          <td>{item.gender}</td>
                          <td>{item.age} Years</td>
                          <td>{item.height} Inch</td>
                          <td>{item.weigth} Kg</td>
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
				pageClassName={'page-item'}
				pageLinkClassName={'page-link'}
				previousClassName={'page-item'}
				previousLinkClassName={'page-link'}
				nextClassName={'page-item'}
				nextLinkClassName={'page-link'}
				breakClassName={'page-item'}
				breakLinkClassName={'page-link'}
				activeClassName={'active'}
			/>
          </Col>
          <Col xs={1}></Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
