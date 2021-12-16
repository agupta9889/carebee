import React, { useState, useEffect } from "react";
import FormData from "form-data";
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

const DoctorProfile = () => {
	const [uploadImage, setUploadImages] = React.useState();

	const BaseURL = "http://192.168.137.1:5000/";
	const { id } = useParams();

	// const onChangeFile = (event) => {
	//   // if (alert('Are you want to update image')) {		
	// 	  console.log('onchagne', event.target.files[0])
	// 		setUploadImages(event.target.files[0]);
	// 	// }
  //   var config = {
  //     method: 'put',
  //     url: `${GLOBALS.BASE_URL}/user/uploadprofilebyid/` + id,
  //     data: event.target.files[0],
  //     headers: {
  //        "Content-Type": 'multipart/form-data',
  //       'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzY4YjlhYjgyYmQwMDJkMGU0ZmFhYiIsImlhdCI6MTYzNTE2NTk2NSwiZXhwIjo2ODE5MTY1OTY1fQ._Jy0lEA0y8ojQqauoDUKyEuujKxcZfzT55ISt2hMuZo' 		  
  //       },
  //     };
  //     console.log('form data ddddd', config)
  
  //     axios(config)
  //     .then(function (response) {
  //     	console.log('Doctor Profile updated', response);
        
  //     })
  //     .catch(function (error) {
  //     console.log(error);
  //     	swal({
  //     		title: "Error!",
  //     		text: "Records have not been updated!",
  //     		icon: "error",
  //     		dangerMode: true,
  //     		timer: 3000
  //     	});
  //     });
	// };

  const onChangeFile = (event) => {
    setUploadImages(event.target.files[0]);
  }

  const imageSubmit = (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append('file', uploadImage);
    console.log('RAJEEV DWIVEDI', uploadImage, data)
  }



 

  return (
    <>
      <Form method="post" onSubmit={imageSubmit} >
            <FormGroup className="col-md-3" >
              <Label for="cPasswod" hidden></Label>
              <input type="file" name="file" onChange={onChangeFile}/>
            </FormGroup>
            {' '}
            <FormGroup className="col-md-3" >
              <Label for="cPasswod" hidden></Label>
              <Button type="submit" className="btn-success">Upload Image</Button>
            </FormGroup>
          </Form>
    </>
  );
};

export default DoctorProfile;
