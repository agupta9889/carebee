import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import swal from "sweetalert";
import companyLogoIcon from "../assets/images/Carebee-blue-icon.png";
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
} from "reactstrap";
import Sidebar from "../components/Sidebar";
import GLOBALS from "../constants/global";
import SocailPeerServices from "../services/doctor";
import doctorServices from "../services/doctor";


const SocialPeerProfile = (props) => {
  const [uploadImage, setUploadImages] = React.useState();
  const [profileData, setProfileData] = useState({});
  const BaseURL = "http://localhost:5000/";
  // const BaseURL = "http://43.204.6.247:5000/"
  const { id } = useParams();
  const [lan, setLan] = useState();
  const [user, setUser] = useState({});


  useEffect(() => {
    loadDoctorProfile();
  }, []);

  const loadDoctorProfile = async () => {
    SocailPeerServices.profile(id)
      .then((response) => {
        //console.log('Response in doctor profile :::', response.data.data);
        if (response.data.data) {
          setProfileData(response.data.data);
          const ln = response.data.data.language;
          const split = ln.join(", ");
          setLan(split);
          //console.log("language is ::::::::::: ",split);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const onChangeFile = (event) => {
    // for (let i = 0; i < event.target.files.length; i++) {
    //     images.push(event.target.files[i]);
    // }
    setUploadImages(event.target.files[0]);
    // console.log('onchagne', images)
  };

  const imageSubmit = (event) => {
    event.preventDefault();
    let data1 = new FormData();
    data1.append("file", uploadImage);
    const imgData = data1.get("file");
    console.log("RAJEEV DWIVEDI", imgData);

    var config = {
      method: "put",
      url: `${GLOBALS.BASE_URL}/user/uploadprofilebyid/` + id,
      data: imgData.file,
      headers: {
        "Content-Type": "multipart/form-data; boundary=MyBoundary",
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGQ4MGYxZjQ3NDE2M2M1ZWZkN2MwNCIsImlhdCI6MTY1MjY5ODUzNywiZXhwIjo2ODM2Njk4NTM3fQ._Jtd_uG05KVNVzYfHPdA9xMMblLB9oa2Mr3GibPXta0",
      },
    };
    console.log("form data ddddd", config);

    axios(config)
      .then(function (response) {
        console.log("SocialPeer Profile updated", response);
      })
      .catch(function (error) {
        console.log(error);
        swal({
          title: "Error!",
          text: "Records have not been updated!",
          icon: "error",
          dangerMode: true,
          timer: 3000,
        });
      });
  };

  //by nitin
  const fileUploadDoctor = (e) => {
    const { id, files } = e.target;
    setUser((preUserProfile) => ({
      ...preUserProfile,
      [id]: files[0],
    }));
  };
  const handlesubmitUserProfiles = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const field in user) {
      formData.append(field, user[field]);
    }
    doctorServices
      .updateProfiles(props.match.params.id, formData)
      .then(function (user) {
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
      })
      .catch(function (error) {
        console.log(error);
        swal({
          title: "Error!",
          text: "Profile have not been submitted!",
          icon: "error",
          dangerMode: true,
          timer: 300,
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
                {/* <Media className="mb-2">
								<input type="file" accept="image/*" onChange={handleImageUpload}
									ref={imageUploader} style={{ display: "none"}} />
								<div className="rounded-circle mr-1" 
									style={{ border: "1px dashed black" }} onClick={() => imageUploader.current.click()}>
									{
										(!profileData.profileImage)
										? <img src={companyLogoIcon} ref={uploadedImage}className="users-avatar-shadow rounded-circle" style={{position: "acsolute", width: "64px", height: "64px" }}
										/>
										: <img src={BaseURL+profileData.profileImage} ref={uploadedImage} className="users-avatar-shadow rounded-circle" style={{position: "acsolute", width: "64px", height: "64px" }} />
									}
									
								</div>
								
								<Media body className="pt-25">
									<Media heading>{profileData.firstName} {profileData.lastName}</Media>
									<span>Qualification : {profileData.qualification}</span>
								</Media>
							</Media> */}
              </Col>
              <Col
                md={5}
                xs={12}
                className="d-flex justify-content-end align-items-center mb-2"
              >
                {/* <Button outline color="info" size="sm" style={{ float: "right" }}>Edit</Button> */}
                {/* <Form method="post" onSubmit={imageSubmit} >
						<FormGroup className="col-md-3" >
						<input type="file" name="file" onChange={onChangeFile}/>
						</FormGroup>
						{' '}
						<FormGroup className="col-md-3" >
						<Button type="submit" className="btn-success">Upload Image</Button>
						</FormGroup>
                  	</Form> */}
                <Form method="post" encType="multipart/form-data">
                  <FormGroup className="col-md-3">
                    <input
                      type="file"
                      name="file"
                      id="profileImage"
                      onChange={fileUploadDoctor}
                    />
                  </FormGroup>{" "}
                  <FormGroup className="col-md-3">
                    <Button
                      type="submit"
                      onClick={(e) => handlesubmitUserProfiles(e)}
                      className="btn-success"
                    >
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
                  {/* <Col md={4} sm={12} className="p-2"><b>Experience:</b> {profileData.experience} Years</Col> */}
                </Row>
                <Row className="doctor-top mb-2 mx-25">
                  <Col md={2}>Gender:</Col>
                  <Col md={10}>{profileData.gender}</Col>
                  {/* <Col md={2}>Qualification:</Col>
								<Col md={10}>{profileData.qualification}</Col>
								<Col md={2}>Specialities:</Col>
								<Col md={10}>{profileData.specialties}</Col> */}
                  <Col md={2}>Language:</Col>
                  <Col md={10}>{lan ? lan : "English"}</Col>
                  {/* <Col md={2}>Bio:</Col>
								<Col md={10}>{profileData.about}</Col> */}
                  <Col md={2}>Status:</Col>
                  <Col md={10}>
                    {profileData.status === 0 ? ( // 0-Active, 1-Inactive
                      <Badge style={{ backgroundColor: "green" }}>Active</Badge>
                    ) : (
                      <Badge style={{ backgroundColor: "red" }}>Inactive</Badge>
                    )}
                  </Col>
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

export default SocialPeerProfile;
