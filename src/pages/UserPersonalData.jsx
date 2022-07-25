import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router";
import companyLogoIcon from "../assets/images/Carebee-blue-icon.png";
import { Container, Row, Col, Media, Card, CardBody } from "reactstrap";
import moment from "moment";
import userService from "../services/user";

const UserPersonalData = () => {
  const [userName, setUserName] = useState([]);
  const [personalData, setPersonalData] = useState([]);
  const [personalImagesUser, setPersonalImagesUser] = useState("");
  const { id } = useParams();

  useEffect(() => {
    userTracker();
  }, []);

  const userTracker = async () => {
    userService
      .userPersonalData(id)
      .then((response) => {
        // console.log(
        //   "User Personldata Records:::::::",
        //   response.data.data.socialPeers,
        //   response.data.data
        // );
        if (response.data.data) {
          setUserName(response.data.data);
          setPersonalData(response.data.data.socialPeers);

          if (response.data.data.socialPeers !== undefined) {
            let data = response.data.data.socialPeers.map(
              (item) => item.socialRegImage
            );
            if (data !== undefined) {
              let B = data;
              setPersonalImagesUser(B);
            }
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // console.log('Nitintintntnit xhexkk',personalData);
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
                      // uri: 'data:image/jpeg;base64,' + filePath.data
                      src={"http://43.204.6.247:5000/" + personalImagesUser}
                      //   src={"data:image/jpeg;base64," + personalImagesUser}
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
            {personalData.length > 0 ? (
              personalData.map((item, index) => {
                return (
                  <Card className="shadow doctor-top doctor-bottom" key={index}>
                    {item.socialPersonalData.map((perData, i) => {
                      return (
                        <CardBody key={i}>
                          <h3>Personal Data</h3>
                          <Row className="bg-lighten-5 rounded mb-2 mx-25">
                            <Col md={4} sm={12} className="p-2">
                              <span>
                                {/* <b>Age:</b> {moment(item.moodCreatedDate).format('ddd, D/M/Y')} */}
                                <b>Age:</b> {perData.age}
                              </span>
                            </Col>
                            <Col md={4} sm={12} className="p-2">
                              <span>
                                <b>Gender:</b> {perData.gender}
                              </span>
                            </Col>
                            <Col md={4} sm={12} className="p-2">
                              <b>LanguageKnow:</b> {perData.languageKnown}
                            </Col>
                          </Row>
                          <Row className="bg-lighten-5 rounded mb-2 mx-25">
                            <Col md={4} sm={12} className="p-2">
                              <span>
                                <b>LanguageKnow:</b> {perData.languageKnown}
                              </span>
                            </Col>
                            <Col md={4} sm={12} className="p-2">
                              <span>
                                <b>Relationship:</b> {perData.relationship}
                              </span>
                            </Col>
                          </Row>
                        </CardBody>
                      );
                    })}
                    {/* Physical Data */}
                    {item.socialPhysicalData.map((phyData, i) => {
                      return (
                        <CardBody key={i}>
                          <h3> Physical Data</h3>
                          <Row className="bg-lighten-5 rounded mb-2 mx-25">
                            <Col md={4} sm={12} className="p-2">
                              <span>
                                <b>Drug Allergy:</b> {phyData.drugAllergy}
                              </span>
                            </Col>
                            <Col md={4} sm={12} className="p-2">
                              <span>
                                <b>Environment Allergy:</b>{" "}
                                {phyData.environmentAllergy}
                              </span>
                            </Col>
                            <Col md={4} sm={12} className="p-2">
                              <span>
                                <b>Family Allergy:</b> {phyData.familyAllergy}
                              </span>
                            </Col>
                          </Row>
                          <Row className="bg-lighten-5 rounded mb-2 mx-25">
                            <Col md={4} sm={12} className="p-2">
                              <span>
                                <b>Family Disease:</b> {phyData.familydisease}
                              </span>
                            </Col>
                            <Col md={4} sm={12} className="p-2">
                              <span>
                                <b>Family History:</b> {phyData.familyhistory}
                              </span>
                            </Col>
                            <Col md={4} sm={12} className="p-2">
                              <span>
                                <b>Known Condition:</b> {phyData.knownCondition}
                              </span>
                            </Col>
                          </Row>
                        </CardBody>
                      );
                    })}
                    {/* professional Data */}
                    {item.socialProfessionalData.map((profData, i) => {
                      return (
                        <CardBody key={i}>
                          <h3>Professional Data</h3>
                          <Row className="bg-lighten-5 rounded mb-2 mx-25">
                            <Col md={4} sm={12} className="p-2">
                              <span>
                                <b>Education:</b> {profData.education}
                              </span>
                            </Col>
                            <Col md={4} sm={12} className="p-2">
                              <span>
                                <b>Income Range:</b> {profData.incomeRange}
                              </span>
                            </Col>
                            <Col md={4} sm={12} className="p-2">
                              <span>
                                <b>Profession:</b> {profData.profession}
                              </span>
                            </Col>
                          </Row>
                          <Row className="bg-lighten-5 rounded mb-2 mx-25">
                            <Col md={4} sm={12} className="p-2">
                              <span>
                                <b>Sector:</b> {profData.sector}
                              </span>
                            </Col>
                          </Row>
                        </CardBody>
                      );
                    })}
                    {/* social Data */}
                    {item.socialSocialData.map((socialData, i) => {
                      return (
                        <CardBody key={i}>
                          <h3>Social Data</h3>
                          <Row className="bg-lighten-5 rounded mb-2 mx-25">
                            <Col md={4} sm={12} className="p-2">
                              <span>
                                <b>Activity:</b> {socialData.activity}
                              </span>
                            </Col>
                            <Col md={4} sm={12} className="p-2">
                              <span>
                                <b>Fitness:</b> {socialData.fitness}
                              </span>
                            </Col>
                            <Col md={4} sm={12} className="p-2">
                              <span>
                                <b>Food:</b> {socialData.food}
                              </span>
                            </Col>
                          </Row>
                          <Row className="bg-lighten-5 rounded mb-2 mx-25">
                            <Col md={4} sm={12} className="p-2">
                              <span>
                                <b>Music Type:</b> {socialData.musicType}
                              </span>
                            </Col>
                          </Row>
                        </CardBody>
                      );
                    })}
                    {/* Emotional Data */}
                    {item.socialEmotionalData.map((emotionalData, i) => {
                      return (
                        <CardBody key={i}>
                          <h3>Emotional Data</h3>
                          {/* <Row className="bg-lighten-5 rounded mb-2 mx-25">
                            <Col md={4} sm={12} className="p-2">
                              <span>
                                <b></b>
                              </span>
                            </Col>
                          </Row> */}
                          <Row className="mb-2 mx-25">
                            <Col md={12}>
                              <b>Ques:</b> <span>{emotionalData.question1}</span>
                            </Col>
                            <Col md={12}>
                              <b>Ans:</b> <span>{emotionalData.answer1}</span>
                            </Col>
                            <Col md={12}>
                              <b>Ques:</b> <span>{emotionalData.question2}</span>
                            </Col>
                            <Col md={12}>
                              <b>Ans:</b> <span>{emotionalData.answer2}</span>
                            </Col>
                            <Col md={12}>
                              <b>Ques:</b> <span>{emotionalData.question3}</span>
                            </Col>
                            <Col md={12}>
                              <b>Ans:</b> <span>{emotionalData.answer3}</span>
                            </Col>
                            <Col md={12}>
                              <b>Ques:</b> <span>{emotionalData.question4}</span>
                            </Col>
                            <Col md={12}>
                              <b>Ans:</b> <span>{emotionalData.answer4}</span>
                            </Col>
                            <Col md={12}>
                              <b>Ques:</b> <span>{emotionalData.question5}</span>
                            </Col>
                            <Col md={12}>
                              <b>Ans:</b> <span>{emotionalData.answer5}</span>
                            </Col>
                          </Row>
                        </CardBody>
                      );
                    })}
                  </Card>
                );
              })
            ) : (
              <>
                <h3 style={{ textAlign: "center" }}>
                  !Ops User Not Provide Personal Data
                </h3>
              </>
            )}
          </Col>
          <Col xs={1}></Col>
        </Row>
      </Container>
    </>
  );
};
export default UserPersonalData;
