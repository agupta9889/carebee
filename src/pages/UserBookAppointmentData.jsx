import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router";
import companyLogoIcon from "../assets/images/Carebee-blue-icon.png";
import { Container, Row, Col, Media, Card, CardBody, Button } from "reactstrap";
import moment from "moment";
import userService from "../services/user";

const UserBookAppointment = () => {
  const [userName, setUserName] = useState([]);
  const [userBookAppointment, setUserBookAppointment] = useState([]);
  const [doctorData, setDoctorData] = useState([]);
  const [hidenPage, SetHidenPage] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    userTracker();
  }, []);

  const userTracker = async () => {
    userService
      .userPersonalData(id)
      .then((response) => {
        // console.log(
        //   "User Mood Records:::::::",
        //   response.data.data.userMoodTraker
        // );
        if (response.data.data) {
          setUserName(response.data.data);
          setUserBookAppointment(response.data.data.bookingAppointment);
        }
        
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //doctor Id get and Name to show 
  const handleDoctorShowData = (id) => {
    userService
    .userPersonalData(id)
    .then((response) => {
    //   console.log(
    //      "User Mood Records:::::::",
    //      response.data.data
    //    );
      if (response.data.data) {
        setDoctorData(response.data.data);
      }
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <>
      <Sidebar />
      <Container>
        <Row>
          <Col md={2} xs={1}></Col>
          <Col md={10} xs={10} className="doctor-top">
            <Row>
              <Col md={7} xs={12}>
                <Media className="mb-2">
                  <div className="rounded-circle mr-1">
                      {/* {console.log('jvnivberbvr',userName.profileImage )} */}
                    <img
                    //   src={companyLogoIcon}
                     src={"http://43.204.6.247:5000/" + userName.profileImage}
                      className="users-avatar-shadow rounded-circle"
                      style={{
                        position: "acsolute",
                        width: "64px",
                        height: "64px",
                      }}
                    />
                  </div>
                  <Media body className="pt-25">
                    <Media heading>
                        {`${userName.firstName + " " + userName.lastName}` ===
                      null
                        ? "Private Profile"
                        : userName.firstName + " " + userName.lastName}
                    </Media>
                  </Media>
                </Media>
              </Col>
              {/* <Col md={5} xs={12} className="d-flex justify-content-end align-items-center mb-2"
              >
                <Button outline color="info" size="sm" style={{ float: "right" }}>Edit</Button>
              </Col> */}
            </Row>
            {userBookAppointment.length > 0 ? userBookAppointment.map((item, index) => {
              return (
                <Card className="shadow doctor-top doctor-bottom" key={index}>
                  <CardBody>
                    <Row className="bg-lighten-5 rounded mb-2 mx-25">
                      <Col md={3} sm={12} className="p-2">
                        <span>
                          <b>Date:</b>{" "}
                          {moment(item.date).format("ddd, D/M/Y, hh:mm:ss A")}
                        </span>
                      </Col>
                       <Col md={3} sm={12} className="p-2">
                        <span>
                          <b>Payment Mode:</b> {item.paymentMode}
                        </span>
                      </Col>
                      <Col md={3} sm={12} className="p-2">
                        <b>Session Slot:</b> {item.sessionSlot}
                     </Col> 
                      <Col md={3} sm={12} className="p-2">
                          {/* <button className="shadow view" ></button> */}
                        <Button  className="shadow" onClick={() => handleDoctorShowData(item.doctorID)}>Show Doctor</Button>
                                
                     </Col> 
                     {doctorData.firstName == undefined ? '' : 
                     <Row className="bg-lighten rounded mb-2 mx-25" >
                                <Col md={4} sm={12} className="p-2">
                                <span>
                                    <b>Doctor Name</b>{doctorData.firstName + ' '+ doctorData.lastName}
                                </span>
                                </Col>
                                <Col md={4} sm={12} className="p-2">
                                <span>
                                    <b>Mobile</b>{doctorData.mobile}
                                </span>
                                </Col>
                                </Row> }
                    </Row>
                    {item.slot.map((time, index) => {
                      return (
                        <Row className="bg-lighten-5 rounded mb-2 mx-25" key={index}>
                        <Col md={4} sm={12} className="p-2">
                          <span>
                            <b>To Time</b>{time.toTime}
                          </span>
                        </Col>
                         <Col md={4} sm={12} className="p-2">
                          <span>
                            <b>From Time</b> {time.fromTime}
                          </span>
                        </Col>
                      </Row>
                      );
                    })}
                  </CardBody>
                </Card>
              );
            }): <><h3 style={{textAlign:'center'}}>!Ops User Not Selected Any Appointment</h3></>}
          </Col>
          <Col xs={1}></Col>
        </Row>
      </Container>
    </>
  );
};
export default UserBookAppointment;
