import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import GLOBALS from "../constants/global";
import { useParams } from "react-router";
import axios from "axios";
import companyLogoIcon from "../assets/images/Carebee-blue-icon.png";
import { Container, Row, Col, Media, Card, CardBody } from "reactstrap";
import moment from "moment";

const MoodTracker = () => {
  const [userName, setUserName] = useState();
  const [moodTracker, setMoodTracker] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    userTracker();
  }, []);

  const userTracker = async () => {
    var config = {
      method: "get",
      url: `${GLOBALS.BASE_URL}/user/getbyid/` + id,
      headers: {
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzY4YjlhYjgyYmQwMDJkMGU0ZmFhYiIsImlhdCI6MTYzNTE2NTk2NSwiZXhwIjo2ODE5MTY1OTY1fQ._Jy0lEA0y8ojQqauoDUKyEuujKxcZfzT55ISt2hMuZo",
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((response) => {
        console.log("User Records:::::::", response.data.data);
        console.log(
          "User Mood Records:::::::",
          response.data.data.userMoodTraker
        );
        if (response.data.data) {
			setUserName(response.data.data.firstName);
          	setMoodTracker(response.data.data.userMoodTraker);
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
                    <img
                      src={companyLogoIcon}
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
                    {
						userName === null ? 'Private Profile' : userName
					}
                    </Media>
                  </Media>
                </Media>
              </Col>
              {/* <Col md={5} xs={12} className="d-flex justify-content-end align-items-center mb-2"
              >
                <Button outline color="info" size="sm" style={{ float: "right" }}>Edit</Button>
              </Col> */}
            </Row>
            {moodTracker.map((item, index) => {
              return (
                <Card className="shadow doctor-top doctor-bottom" key={index}>
                  <CardBody>
                    <Row className="bg-lighten-5 rounded mb-2 mx-25">
                      <Col md={4} sm={12} className="p-2">
                        <span>
                          <b>Date:</b> {moment(item.moodCreatedDate).format('ddd, D/M/Y')}
                        </span>
                      </Col>
                      <Col md={4} sm={12} className="p-2">
                        <span>
                          <b>Feeling:</b> {item.moodEmojiName}
                        </span>
                      </Col>
                      <Col md={4} sm={12} className="p-2">
                        <b>Rating:</b> {item.moodRating}
                      </Col>
                    </Row>
                    {item.moodRatingComment.map((comment, index) => {
                      return (
                        <Row className="mb-2 mx-25" key={index}>
                          <Col md={12}>
                            <b>Ques:</b> <span>{comment.que}</span>
                          </Col>
                          <Col md={12}>
                            <b>Ans:</b> <span>{comment.ans}</span>
                          </Col>
						  {comment.comment ? 
						  	<Col md={12}>
						  	<b>Comment:</b> <span> {comment.comment}</span>
				  			</Col> 
							: null
						  }
						   	
						</Row>
                      );
                    })}
                  </CardBody>
                </Card>
              );
            })}
          </Col>
          <Col xs={1}></Col>
        </Row>
      </Container>
    </>
  );
};
export default MoodTracker;
