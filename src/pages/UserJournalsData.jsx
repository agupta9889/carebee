import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router";
import companyLogoIcon from "../assets/images/Carebee-blue-icon.png";
import { Container, Row, Col, Media, Card, CardBody } from "reactstrap";
import moment from "moment";
import userService from "../services/user";


const UserJournalsData = () => {
  const [userName, setUserName] = useState([]);
  const [UserJournals, setUserJournals] = useState([]);
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
          setUserJournals(response.data.data.journals);
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
            {UserJournals.length > 0 ? UserJournals.map((item, index) => {
              return (
                <Card className="shadow doctor-top doctor-bottom" key={index}>
                  <CardBody>
                    <Row className="bg-lighten-5 rounded mb-2 mx-25">
                      <Col md={4} sm={12} className="p-2">
                        <span>
                          <b>Create Date Journals</b>
                          {moment(item.journalCreateDate).format("ddd, D/M/Y, hh:mm:ss A")}
                        </span>
                      </Col>
                      <Col md={4} sm={12} className="p-2">
                        <span>
                          <b>Journal Emoji Title </b> {item.journalEmojiImage}
                        </span>
                      </Col>
                      <Col md={4} sm={12} className="p-2">
                        <b>journal Note Text</b> {item.journalNoteText}
                      </Col>
                    </Row>
                    <Row className="bg-lighten-5 rounded mb-2 mx-25">
                      <Col md={4} sm={12} className="p-2">
                        <span>
                          <b>Journal Note background Color</b>
                          &nbsp;
                          &nbsp;
                          <b style={{backgroundColor: item.journalNoteBgColor, padding: '3px 30px'}}></b>
                          {/* {item.journalNoteBgColor} */}
                        </span>
                      </Col>
                      <Col md={4} sm={12} className="p-2">
                        <span>
                          <b>Journal Note font color</b> &nbsp;
                          &nbsp;<b style={ {backgroundColor: item.journalNoteFontColor, padding: '3px 30px'}}></b>
                        </span>
                      </Col>
                    </Row>
                    <Row className="bg-lighten-5 rounded mb-2 mx-25">
                      <Col md={4} sm={12} className="p-2">
                        <span>
                          <b>Journal Note Image</b>
                          &nbsp;
                          &nbsp;
                          {/* {item.journalNoteBgColor} */}
                          <img src={"http://localhost:5000/api/" + item.journalNoteImage} style={{padding: '3px 30px'}} />
                        </span>
                      </Col>
                      <Col md={4} sm={12} className="p-2">
                        <span>
                          <b>Journal Note Aduio</b> &nbsp;
                          <audio src={"http://localhost:5000/api/" + item.journalNoteAudio} />
                        </span>
                      </Col>
                    </Row>
                    {item.journalActivityImage.map((comment, index) => {
                        return (
                            <Row className="bg-lighten-5 rounded mb-2 mx-25" key={index}>
                          <Col md={12} className="p-2">
                            <b>User Activity Journals</b> <span>{comment.slice(1,-1)}</span>
                          </Col>
                        </Row>
                      );
                    })}
                  </CardBody>
                </Card>
              );
            }): <><h3 style={{textAlign:'center'}}>!Ops User Not Provide Journals Data</h3></>}
          </Col>
          <Col xs={1}></Col>
        </Row>
      </Container>
    </>
  );
};
export default UserJournalsData;
