import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table} from "reactstrap";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import _ from "loads";

//const pageSize = 10;
function User() {

	// User API Integration
	const [data, setdata] = useState();

	useEffect(() => {
		getUserDetails();
	}, []);

	const getUserDetails = async () => {

		var data = JSON.stringify({
			"email": "p34892@gmail.com",
			"type": "USER"
		  });
		  
		  var config = {
			method: 'get',
			url: 'http://192.168.1.29:5000/api/user/login/getUser',
			headers: { 
			  'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzY4YjlhYjgyYmQwMDJkMGU0ZmFhYiIsImlhdCI6MTYzNTE2NTk2NSwiZXhwIjo2ODE5MTY1OTY1fQ._Jy0lEA0y8ojQqauoDUKyEuujKxcZfzT55ISt2hMuZo', 
			  'Content-Type': 'application/json'
			},
			data : data
		  };
		  
		  axios(config)
		  .then(response => {
			  console.log("response in user data::: ", response.data.data);
			  const filterUser = response.data.data.filter(user => user.type === 'USER');
			  setdata(filterUser)
		  })
		  .catch(function (error) {
			console.log(error);
		  });
	}

	// const pageCount = data? Math.ceil(data.length/pageSize) : 0;
	// if(pageCount === 1) return null;
	// //const pages = _.range(1, pageCount + 1);

	return (
		<>
			<Sidebar />
			<Container>
				<Row>
					<Col md={2} xs={1}></Col>
					<Col md={10} xs={10} className="table-container">
						<h6>User Records</h6><hr />
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
								{
									data ? 
									data.map((i, index) => {

										return (
											
												<tr key={index}>

													<th scope="row">{index + 1}</th>
													<td>{i.first_name} {i.last_name}</td>
													<td>{i.mobile}</td>
													<td>{i.email}</td>
													<td>{i.gender}</td>
													<td>{i.age} Years</td>
													<td>{i.height} Inch</td>
													<td>{i.weigth} Kg</td>
												</tr>
											
										);
									}) : 
									null
								}
							</tbody>
						</Table>
						<nav className="d-flex justify-content-center"> 
							<ul className="pagination">
								<li className="page-link">1</li>
								<li className="page-link">2</li>
							</ul>
						</nav>
					</Col>
					<Col xs={1}></Col>
				</Row>
			</Container>
		</>
	);
}

export default User;
