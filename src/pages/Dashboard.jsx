import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, CardBody } from "reactstrap";
import { Line, Pie, Doughnut} from "react-chartjs-2";
import Sidebar from "../components/Sidebar";
import axios from "axios";

function Dashboard() {

	const [userdata, setUserData] = useState();
	const [doctordata, setDoctorData] = useState();

	useEffect(() => {
		getUserDetails();
	}, []);

    const getUserDetails = async () => {
		var config = {
			method: "get",
			url: "http://192.168.1.29:5000/api/user/login/getUser",
			headers: {
					"x-auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzY4YjlhYjgyYmQwMDJkMGU0ZmFhYiIsImlhdCI6MTYzNTE2NTk2NSwiZXhwIjo2ODE5MTY1OTY1fQ._Jy0lEA0y8ojQqauoDUKyEuujKxcZfzT55ISt2hMuZo",
					"Content-Type": "application/json",
				},
		};

		axios(config)
		.then((response) => {
			//console.log('Userdata', response.data.data.results);
			const filterUserData = response.data.data.results.filter((user) => user.type === "USER");
			const filterDoctorData = response.data.data.results.filter((user) => user.type === "DOCTOR");
			//console.log('Userdata', filterUserData);
			if(filterUserData){
				setUserData(filterUserData);
			}
			
			if (filterDoctorData) {
				setDoctorData(filterDoctorData);
			}
			
		})
		.catch(function (error) {
			console.log(error);
		});
    };

	// Line Chart - Appointments Graph
	const booking = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
		datasets: [
		  {
			label: 'Appointments',
			fill: false,
			lineTension: 0.5,
			backgroundColor: '#1672ec',
			borderColor: 'rgba(0,0,0,1)',
			borderWidth: 2,
			data: [5, 10, 15, 20, 25]
		  }
		]
	  }
	// Pie Chart- Doctor Graph
	const doctor = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
		datasets: [
		  {
			label: 'Rainfall',
			backgroundColor: [
			  '#B21F00',
			  '#C9DE00',
			  '#2FDE00',
			  '#00A6B4',
			  '#6800B4'
			],
			hoverBackgroundColor: [
			'#501800',
			'#4B5000',
			'#175000',
			'#003350',
			'#35014F'
			],
			data: [65, 59, 80, 81, 56]
		  }
		]
	  }
	// Pie Chart- Patient Graph
	const Patient = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
		datasets: [
		  {
			label: 'Rainfall',
			backgroundColor: [
			  '#B21F00',
			  '#C9DE00',
			  '#2FDE00',
			  '#00A6B4',
			  '#6800B4'
			],
			hoverBackgroundColor: [
			'#501800',
			'#4B5000',
			'#175000',
			'#003350',
			'#35014F'
			],
			data: [65, 59, 80, 81, 56]
		  }
		]
	  }

    return(
       <>
	   <Sidebar />
        <Container>
			<Row>
				<Col md={2} xs={1}></Col>
				<Col md={4} xs={12} className="doctor-top">
					<Card className="shadow">
						<CardBody>
							<span>Appointments - 2021</span>
							<div>
								<Line data={booking} options={{ title:{ display:true, text:'Average Rainfall per month', fontSize:20 },
									legend:{ display:true, position:'right' } }} />
							</div>
						</CardBody>
					</Card>
				</Col>
				<Col md={3} xs={12} className="doctor-top">
					<Card className="shadow">
						<CardBody>
							<span>Total Doctors : {doctordata? doctordata.length : "-" } </span>
							<div>
							<Pie
								data={doctor}
								options={{
									title:{
									display:true,
									text:'Average Rainfall per month',
									fontSize:20
									},
									legend:{
									display:true,
									position:'right'
									}
								}}
								/>
							</div>	
						</CardBody>
					</Card>
				</Col>
				<Col md={3} xs={12} className="doctor-top">
					<Card className="shadow">
						<CardBody>
							<span>Total Users : {userdata? userdata.length : "-" } </span>
							<div>
							<Doughnut
								data={Patient}
								options={{
									title:{
									display:true,
									text:'Average Rainfall per month',
									fontSize:20
									},
									legend:{
									display:true,
									position:'right'
									}
								}}
								/>
							</div>
						</CardBody>
					</Card>	
				</Col>
				<Col xs={1}></Col>
			</Row>
		</Container>
	</>	
       
    );
}        

export default Dashboard;