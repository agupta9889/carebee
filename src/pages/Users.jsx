import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import ReactPaginate from "react-paginate";


function User() {
	
	const [data, setdata] = useState();
	const [pageCount, setpageCount] =  useState(0);
	let limit = 10;
	// User API Integration
	useEffect(() => {
		getUserDetails();
	}, []);

  	const getUserDetails = async () => {
		var data = JSON.stringify();
		var config = {
		method: "get",
		url: 'http://192.168.1.29:5000/api/user/login/getUser?page=1&limit=5',
		headers: {
			"x-auth-token":
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzY4YjlhYjgyYmQwMDJkMGU0ZmFhYiIsImlhdCI6MTYzNTE2NTk2NSwiZXhwIjo2ODE5MTY1OTY1fQ._Jy0lEA0y8ojQqauoDUKyEuujKxcZfzT55ISt2hMuZo",
			"Content-Type": "application/json",
		},
		data: data,
		};

		axios(config)
		.then((response) => {
			const filterUser = response.data.data.filter(
			(user) => user.type === "USER"
			);
			//const total = response.headers.get('x-total-count');
			//console.log('addddd', total);
			setdata(filterUser);
		})
		.catch(function (error) {
			console.log(error);
		});

	 
  	}
	
	const fetchUser = async (currentPage) => {
		
		var data = JSON.stringify();
	
			var config = {
			method: "get",
			url: 'http://192.168.1.29:5000/api/user/login/getUser?_page=${currentPage}&_limit={limit}',
			headers: {
				"x-auth-token":
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzY4YjlhYjgyYmQwMDJkMGU0ZmFhYiIsImlhdCI6MTYzNTE2NTk2NSwiZXhwIjo2ODE5MTY1OTY1fQ._Jy0lEA0y8ojQqauoDUKyEuujKxcZfzT55ISt2hMuZo",
				"Content-Type": "application/json",
			},
			data: data,
			};
	
			axios(config)
			.then((response) => {
				const data = response.data.data.filter(
				(user) => user.type === "USER"
				);
				//console.log('arun', data);
				return data

			})
	

	}
	const handlePageClick = async (data) =>{
		
		let currentPage = data.selected + 1
		//console.log('arun', currentPage);
		const usersFromServer = await fetchUser(currentPage);
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
				previousLabel={'< previous'}
				nextLabel={'next >'}
				breakLabel={'...'}
				//pageCount={pageCount}
				pageCount={10}
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
