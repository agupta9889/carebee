import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router";
import companyLogoIcon from "../assets/images/Carebee-blue-icon.png";
import * as FaIcons from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import {
  Container,
  Row,
  Col,
  Media,
  Card,
  CardBody,
  Badge,
  Input,
  Button,
  Form,
  FormGroup,
  Label,
  Table,
} from "reactstrap";
import Sidebar from "../components/Sidebar";
import GLOBALS from "../constants/global";
import doctorServices from "../services/doctor";

const DoctorProfile = (props) => {
  const [profileData, setProfileData] = useState({});
  const [dataCustomerId, setDataCustomerId] = useState({})
  const [dataCustomerIdValid, setDataCustomerIdValid] = useState({})
  const BaseURL = "http://43.204.6.247:5000/";
  const { id } = useParams();
  const [lan, setLan] = useState();
  const [user, setUser] = useState({});

  useEffect(() => {
    loadDoctorProfile();
  }, []);
  const loadDoctorProfile = async () => {
    doctorServices
      .profile(id)
      .then((response) => {
        if (response.data.data) {
          setProfileData(response.data.data);
		//   setDataCustomerId(response.data.dataCustomer)
          console.log("Response in doctor profile :::", response.data.data, response.data.dataCustomer);
          const ln = response.data.data.language;
          const split = ln.join(", ");
          setLan(split);
        //   console.log("language is ::::::::::: ", split);
		 customerName(response.data.dataCustomer)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

//   const uploadedImage = React.useRef(null);
//   const imageUploader = React.useRef(null);

//   const handleImageUpload = (e) => {
//     const [file] = e.target.files;
//     if (file) {
//       const reader = new FileReader();
//       const { current } = uploadedImage;
//       current.file = file;
//       reader.onload = (e) => {
//         current.src = e.target.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   };

  //file upload data add by nitin section start
  const fileUploadDoctor = (e) => {
	const {id, files} = e.target;
	setUser((preUserProfile) => ({
		...preUserProfile,
		[id]: files[0],

	}))
  };
  const handlesubmitUserProfiles = (e) => {
	  e.preventDefault();
	  const formData = new FormData();
	  for (const field in user) {
		  formData.append(field, user[field])
	  }
	  doctorServices.updateProfiles(props.match.params.id, formData).then(function (user) {
        if (user) {
          swal({
            title: "Success!",
            text: "Profile Update successfully!",
            icon: "success",
            dangerMode: true,
            confirmButtonColor: "#1672ec",
            timer: 9000,
          }).then(() => {
            setUser(user);
            window.location.reload();
          });
        }
      }) .catch(function (error) {
        console.log(error);
        swal({
          title: "Error!",
          text: "Profile have not been submitted!",
          icon: "error",
          dangerMode: true,
          timer: 300,
        });
      });
  }

  const customerName = (user) => {
	//  dataCustomerId.length > 0 && dataCustomerId.map((ite) =>{
	 user.length > 0 && user.map((ite) =>{
		if (ite.length > 0) {
			ite.forEach((a) => {
				setDataCustomerIdValid(a)
			})
			//  console.log('Nitin::::::::::', dataCustomerIdValid);
		}
	}
	);
  }
//file upload data add by nitin section End


//   const onChangeFile = (event) => {
//     // for (let i = 0; i < event.target.files.length; i++) {
//     //     images.push(event.target.files[i]);
//     // }
//     setUploadImages(event.target.files[0]);
//     // console.log('onchagne', images)
//   };

//   const imageSubmit = (event) => {
//     event.preventDefault();
//     let data1 = new FormData();
//     data1.append("file", uploadImage);
//     const imgData = data1.get("file");
//     // console.log("RAJEEV DWIVEDI", imgData);

//     var config = {
//       method: "put",
//       url: `${GLOBALS.BASE_URL}/user/uploadprofilebyid/` + id,
//       data: imgData.file,
//       headers: {
//         "Content-Type": "multipart/form-data; boundary=MyBoundary",
//         "x-auth-token":
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzY4YjlhYjgyYmQwMDJkMGU0ZmFhYiIsImlhdCI6MTYzNTE2NTk2NSwiZXhwIjo2ODE5MTY1OTY1fQ._Jy0lEA0y8ojQqauoDUKyEuujKxcZfzT55ISt2hMuZo",
//       },
//     };
//     console.log("form data ddddd", config);

//     axios(config)
//       .then(function (response) {
//         console.log("Doctor Profile updated", response);
//       })
//       .catch(function (error) {
//         console.log(error);
//         swal({
//           title: "Error!",
//           text: "Records have not been updated!",
//           icon: "error",
//           dangerMode: true,
//           timer: 3000,
//         });
//       });
//   };


 //user Show details
 let history = useHistory();
 function hundleUserProfiles(data) {
	history.push("/user-profileData/" + data);
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
                  <input
                    type="file"
                    accept="image/*"
                    // onChange={handleImageUpload}
                    // ref={imageUploader}
					// onChange={fileUploadDoctor}
                    style={{ display: "none" }}
                  />
                  <div
                    className="rounded-circle mr-1"
                    style={{ border: "1px dashed black" }}
                    // onClick={() => imageUploader.current.click()}
					// onClick={(e) => handlesubmitUserProfiles(e)}
                  >
                    {!profileData.profileImage ? (
                      <img
                        // src={companyLogoIcon}
                        // ref={uploadedImage}
                        className="users-avatar-shadow rounded-circle"
                        style={{
                          position: "acsolute",
                          width: "100px",
                          height: "100px",
                        }}
                      />
                    ) : (
                      <img
                        src={BaseURL + profileData.profileImage}
                        // ref={uploadedImage}
                        className="users-avatar-shadow rounded-circle"
                        style={{
                          position: "acsolute",
                          width: "100px",
                          height: "100px",
                        }}
                      />
                    )}
                  </div>

                  <Media body className="pt-25">
                    <Media heading>
                      Dr. {profileData.firstName} {profileData.lastName}
                    </Media>
                    <span>Qualification : {profileData.qualification}</span>
                  </Media>
                </Media>
              </Col>
              <Col
                md={5}
                xs={12}
                className="d-flex justify-content-end align-items-center mb-2"
              >
                {/* <Button outline color="info" size="sm" style={{ float: "right" }}>Edit</Button> */}
                <Form method="post" encType="multipart/form-data">
                  <FormGroup className="col-md-3">
                    <input type="file" name="file" id="profileImage" onChange={fileUploadDoctor} />
                  </FormGroup>{" "}
                  <FormGroup className="col-md-3">
                    <Button type="submit" onClick={(e) => handlesubmitUserProfiles(e)} className="btn-success">
                      Upload Image
                    </Button>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
            <Card className="shadow doctor-top">
              <CardBody>
                <Row className="bg-lighten-5 rounded mb-2 mx-25">
                  <Col md={4} sm={12} className="p-2">
                    <span>
                      <b>Mobile:</b> {profileData.mobile}
                    </span>
                  </Col>
                  <Col md={4} sm={12} className="p-2">
                    <b>Email:</b> {profileData.email}
                  </Col>
                  <Col md={4} sm={12} className="p-2">
                    <b>Experience:</b> {profileData.experience} Years
                  </Col>
                </Row>
                <Row className="doctor-top mb-2 mx-25">
                  <Col md={2}>Gender:</Col>
                  <Col md={10}>{profileData.gender}</Col>
                  <Col md={2}>Qualification:</Col>
                  <Col md={10}>{profileData.qualification}</Col>
                  <Col md={2}>Specialities:</Col>
                  <Col md={10}>{profileData.specialties}</Col>
                  <Col md={2}>Language:</Col>
                  <Col md={10}>{lan ? lan : "English"}</Col>
                  <Col md={2}>Bio:</Col>
                  <Col md={10}>{profileData.about}</Col>
                  <Col md={2}>Status:</Col>
                  <Col md={10}>
                    {profileData.status === 0 ? ( // 0-Active, 1-Inactive
                      <Badge style={{ backgroundColor: "green" }}>Active</Badge>
                    ) : (
                      <Badge style={{ backgroundColor: "red" }}>Inactive</Badge>
                    )}
                  </Col>
                </Row>
                {/* {profileData.bookingAppointment ? profileData.bookingAppointment.map((item, index) => {
					return( */}
                &nbsp; &nbsp;
                <Row className="bg-lighten-5 rounded mb-2 mx-25">
                  &nbsp; &nbsp;
                  <h4>Book Appointment</h4>
                  <Table id="doctorTable" responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Customer Name</th>
                        <th>Date /Time</th>
                        <th>Session</th>
                        <th>payment</th>
						<th>Start Time</th>
						<th>End Time</th>
                        <th>View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profileData.bookingAppointment
                        ? profileData.bookingAppointment.map((item, index) => {
							console.log('Customer Data:::::',item);
							return (
								<tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td> {item.customerID === dataCustomerIdValid.id ? dataCustomerIdValid.firstName + ' ' + dataCustomerIdValid.lastName : item.customerID }</td>
                                <td>{item.date}</td>
                                <td>{item.sessionSlot}</td>
                                <td>{item.paymentMode}</td>
                                
								{item.slot.map((time) => {
									return (
										<>
										<td>{time.startTime}</td>
										<td>{time.endTime}</td>
										
										</>
									)
								})}
								<td>
                                  <Button
                                    outline
                                    className="shadow view"
                                    data-tip
                                    data-for="viewD"
									onClick={()=> hundleUserProfiles(item.customerID)}
                                  >
                                    <FaIcons.FaEye />
                                  </Button>
                                  <ReactTooltip id="viewD" type="info">
                                    <span>View Records</span>
                                  </ReactTooltip>
                                </td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  </Table>
                  {/* <Col md={4} sm={12} className="p-2">
                    <span>
                      <b>To Time</b>
                      {time.toTime}
                    </span>
                  </Col>
                  <Col md={4} sm={12} className="p-2">
                    <span>
                      <b>From Time</b> {time.fromTime}
                    </span>
                  </Col> */}
                </Row>
                {/* )
				})} */}
              </CardBody>
            </Card>
          </Col>
          <Col xs={1}></Col>
        </Row>
      </Container>
    </>
  );
};

export default DoctorProfile;
