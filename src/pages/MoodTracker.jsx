import React from "react";
import Sidebar from "../components/Sidebar";
import companyLogoIcon from '../assets/images/Carebee-blue-icon.png';
import { Container, Row, Col, Media, Card, CardBody} from "reactstrap";



const MoodTracker = () => {
   
    return(
        <>
        <Sidebar/>
        <Container >
			<Row >
				<Col md={2} xs={1}></Col>
				<Col md={10} xs={10} className="doctor-top">
					<Row>
						<Col md={7} xs={12} >
							<Media className="mb-2">
								<div className="rounded-circle mr-1">
									<img src={companyLogoIcon} className="users-avatar-shadow rounded-circle" style={{position: "acsolute", width: "64px", height: "64px" }}
										/>
								</div>
								
								<Media body className="pt-25">
									<Media heading>User1 </Media>
									<span>dddd </span>
								</Media>
							</Media>
						</Col>
						<Col md={5} xs={12} className="d-flex justify-content-end align-items-center mb-2">
							{/* <Button outline color="info" size="sm" style={{ float: "right" }}>Edit</Button> */}
						</Col>
					</Row>   
					<Card className="shadow doctor-top">
						<CardBody>
							<Row className="bg-lighten-5 rounded mb-2 mx-25">
								<Col md={4} sm={12} className="p-2">
									<span><b>Date:</b> 25-Dec-21</span>
								</Col>
                                <Col md={4} sm={12} className="p-2">
									<span><b>Feeling:</b> Strong</span>
								</Col>
								<Col md={4} sm={12} className="p-2"><b>Rating:</b> 9</Col>
							</Row>
							<Row className="doctor-top mb-2 mx-25">
								<Col md={12}><b>Ques:</b> <span>What is your Name?</span></Col>
								<Col md={12}><b>Ans:</b> <span>Arun</span></Col>
							</Row>
						</CardBody>
					</Card>
				</Col>
				<Col xs={1}></Col>
			</Row>
		</Container>

        </>
    );

};
export default MoodTracker;
