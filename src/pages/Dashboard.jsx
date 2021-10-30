import React from "react";
import { Card, Container, Row, Col, CardBody } from "reactstrap";
import { Line, Pie, Doughnut} from "react-chartjs-2";
import Sidebar from "../components/Sidebar";

function Dashboard() {

    // Line Chart - Booking Graph
	const booking = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
		datasets: [
		  {
			label: 'Booking',
			fill: false,
			lineTension: 0.5,
			backgroundColor: '#1672ec',
			borderColor: 'rgba(0,0,0,1)',
			borderWidth: 2,
			data: [10, 15, 20, 30, 50]
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
							<span>Booking - 2021</span>
							<div>
								<Line data={booking} options={{ title:{ display:true, text:'Average Rainfall per month', fontSize:20 },
									legend:{ display:true, position:'right' } }} />
							</div>
						</CardBody>
					</Card>
				</Col>
				<Col md={3} xs={6} className="doctor-top">
					<Card className="shadow">
						<CardBody>
							<span>Total Doctors : 15 </span>
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
				<Col md={3} xs={6} className="doctor-top">
					<Card className="shadow">
						<CardBody>
							<span>Total Users : 10 </span>
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