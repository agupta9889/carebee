import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router";
import companyLogoIcon from "../assets/images/Carebee-blue-icon.png";
import * as FaIcons from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  Container,
  Row,
  Col,
  Media,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
} from "reactstrap";
import moment from "moment";
import userService from "../services/user";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const MemberShipSelectDocAppoint = () => {
  const [doctorlst, setDoctorList] = useState();
  const [personalImagesUser, setPersonalImagesUser] = useState("");
  const [userName, setUserName] = useState([]);
  const [userMemberShip, setUserMemberShip] = useState([]);
  const { id } = useParams();
  const [doctorIdAssing, setDoctorIdAssing] = useState({
    doctorID: "",
    mobile:"",
    memberShipStatus: "",
  });

  useEffect(() => {
    userTracker();
    getAllDoctorList();
  }, []);

  const userTracker = async () => {
    userService
      .userPersonalData(id)
      .then((response) => {
        if (response.data.data) {
          setUserName(response.data.data);
          if (response?.data?.data?.memberShip) {
              setUserMemberShip(response.data.data.memberShip);
              console.log(':::::::::::::::::::::::::', response.data.data.memberShip)
          }
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

  const getAllDoctorList = async () => {
    const type = "DOCTOR";
    userService
      .getAllUserwithOutLimt(type)
      .then((res) => {
        setDoctorList(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //onclick function memberShip
  const memberShipassing = async () => {
    userService
      .memberShipCreate(id, doctorIdAssing)
      .then((response) => {
        console.log("Data Show User Submited", response);
        swal({
          title: "Success!",
          text: " Member Ship User Submited",
          icon: "success",
          dangerMode: true,
          confirmButtonColor: "#1672ec",
          timer: 3000,
        }).then(() => {
          window.location.reload();
        });
      })
      .catch(function (error) {
        console.log(error);
        swal({
          title: "Error!",
          text: "Records have not been submitted!",
          icon: "error",
          dangerMode: true,
          timer: 3000000,
        });
      });
  };
  const handleInput = (e) => {
    const { id, value } = e.target;
    setDoctorIdAssing((doctorIdAssing) => ({
      ...doctorIdAssing,
      [id]: value,
    }));
  };
  const DeactiveUserMemberShip = (membershipID, doctorId, memberShipStatus) => {
      let data = {
          membershipID: membershipID,
          doctorId:doctorId,
          memberShipStatus: memberShipStatus,
        }
        console.log("Deactive checker", data, id );
        userService.memberShipUpdate(id, data).then((response) => {
      console.log("Deactive checker", response);
      swal({
        title: "Success!",
        text: " Member Ship User Finish time",
        icon: "success",
        dangerMode: true,
        confirmButtonColor: "#1672ec",
        timer: 3000,
      }).then(() => {
        window.location.reload();
      });
     }) .catch(function (error) {
        console.log(error);
        swal({
          title: "Error!",
          text: "Records have not been submitted!",
          icon: "error",
          dangerMode: true,
          timer: 3000000,
        });
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

                    {/* <FormGroup check>
                            <Label check>
                              <Input type="checkbox" id = "memberShipStatus" value= {1} onChange={handleInput}/> Member Ship Active
                            </Label>
                          </FormGroup>
                           <FormGroup check>
                          <Label check>
                            <Input type="checkbox" id = "memberShipStatus" value= {0} onChange={handleInput}/> Member Ship Deactive
                          </Label>
                        </FormGroup> */}
                  </Media>
                </Media>
              </Col>
            </Row>
            <Card className="shadow doctor-top doctor-bottom">
              <Row>
                <Col md={1} xs={1}></Col>
                <Col md={8} xs={8}>
                  <FormGroup tag="fieldset">
                    <legend>Assign The Doctor</legend>
                    {doctorlst &&
                      doctorlst.map((item, index) => (
                        <>
                          <Row>
                            {/* <Col md={1} xs={1}></Col> */}
                            <Col md={4} xs={8}>
                              <FormGroup check key={index}>
                                <Label check>
                                  <Input
                                    type="radio"
                                    name="radio1"
                                    id="doctorID"
                                    value={item.id}
                                    onChange={handleInput}
                                  />{" "}
                                  {`${
                                    item.firstName +
                                    " " +
                                    item.lastName 
                                  }`}
                                </Label>
                              </FormGroup>
                            </Col>
                            <Col md={4} xs={3}>
                              <FormGroup check>
                              <Label check>
                                  <Input
                                    type="radio"
                                    name="radio1"
                                    id="mobile"
                                    value={item.mobile}
                                    onChange={handleInput}
                                  />{" "}
                                  {`${
                                    item.mobile
                                  }`}
                                </Label>
                              </FormGroup>
                            </Col>
                            <Col md={4} xs={3}>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    id="memberShipStatus"
                                    value={1}
                                    onChange={handleInput}
                                  />{" "}
                                  Member Ship
                                </Label>
                              </FormGroup>
                            </Col>
                          </Row>
                        </>

                        // <ListGroup >
                        //     <ListGroupItem tag="button" action type="checkbox">
                        //     {`${item.firstName + " " + item.lastName}`}
                        //       <Input type="checkbox" />
                        //     </ListGroupItem>
                        //      <ListGroupItem tag="button" action>
                        //     Dapibus ac facilisis in
                        //     </ListGroupItem>
                        //     <ListGroupItem tag="button" action>
                        //     Morbi leo risus
                        //     </ListGroupItem>
                        //     <ListGroupItem tag="button" action>
                        //     Porta ac consectetur ac
                        //     </ListGroupItem>
                        //     <ListGroupItem disabled tag="button" action>
                        //     Vestibulum at eros
                        //     </ListGroupItem>
                        // </ListGroup>
                      ))}
                  </FormGroup>
                </Col>
                <Col md={2} xs={2}></Col>
              </Row>
            </Card>
            <Row>
              <Col md={5} xs={1}></Col>
              <Col md={3} xs={8}>
                <Button onClick={() => memberShipassing()}>Submit</Button>
              </Col>
              <Col md={1} xs={1}></Col>
            </Row>
            <Card className="shadow doctor-top doctor-bottom">
              <Row>
                <Col md={1} xs={1}></Col>
                <Col md={10} xs={8}>
                  <FormGroup tag="fieldset">
                    <legend>Check Member Ship List</legend>
                  </FormGroup>

                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        {/* <th>Doctor ID</th> */}
                        <th>Mobile Number</th>
                        <th>MemberShip yes</th>
                        <th>Created At</th>
                        <th>MemberShip Deactivate Button</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userMemberShip &&
                        userMemberShip.map((item, index) => {
                            return (
                          <tr>
                            <th scope="row" key={index}>{item._id}</th>
                            {/* <td>{item.doctorID}</td> */}
                            <td>{item.mobile}</td>
                            <td
                              style={{
                                backgroundColor:
                                  item.memberShipStatus === 1
                                    ? "#c6e5c6"
                                    : "#edbcc1",
                              }}
                            >
                              {item.memberShipStatus === 1 ? 'Active' : 'Deactive'}
                            </td>
                            <td>{item.createdAt}</td>
                            <td onClick={() => DeactiveUserMemberShip(item._id, item.doctorID, item.memberShipStatus === 1 ? 2 : 1 )}>    
                                <FaIcons.FaPencilRuler />
                                </td>
                          </tr>
                        )})}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default MemberShipSelectDocAppoint;
