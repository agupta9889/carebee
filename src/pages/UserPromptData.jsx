import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router";
import companyLogoIcon from "../assets/images/Carebee-blue-icon.png";
import { Container, Row, Col, Media, Card, CardBody } from "reactstrap";
import moment from "moment";
import userService from "../services/user";

const UserPromptData = () => {
  const [userName, setUserName] = useState([]);
  const [userPrompt, setUserPrompt] = useState([]);
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
          setUserPrompt(response.data.data.userPrompt);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
            {userPrompt.length > 0 ? userPrompt.map((item, index) => {
              return (
                <Card className="shadow doctor-top doctor-bottom" key={index}>
                  <CardBody>
                    <Row className="bg-lighten-5 rounded mb-2 mx-25">  
                      <Col md={4} sm={12} className="p-2">
                        <span>
                          <b>Date:-</b>{" "}
                          {moment(item.promptCreatedDate).format("ddd, D/M/Y")}
                        </span>
                        
                      </Col>
                    </Row>
                    {item.promptData.map((comment, index) => {
                      return (
                        <Row className="mb-2 mx-25" key={index}>
                          <Col md={12}>
                            <b>Question:-</b> <span>{comment.que}</span>
                          </Col>
                          <Col md={12}>
                            <b>Answer:-</b> <span>{comment.ans}</span>
                          </Col>
                          {comment.comment ? (
                            <Col md={12}>
                              <b>Comment:-</b> <span> {comment.comment}</span>
                            </Col>
                          ) : null}
                        </Row>
                      );
                    })}
                  </CardBody>
                </Card>
              );
            }): <><h3 style={{textAlign:'center'}}>!Ops User Not Provide Prompt Data </h3></>}
          </Col>
          <Col xs={1}></Col>
        </Row>
      </Container>
    </>
  );
};
export default UserPromptData;
