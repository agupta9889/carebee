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

	const onChangeFile = (event) => {
	  if (alert('Are you want to update image')) {		
		  console.log('onchagne', event.target.files[0])
			setUploadImages(event.target.files[0]);
		}
	};

 

  return (
    <>
      <Container>
        <Row>
          <Form>
            <FormGroup className="col-md-3">
              <input type="file" name="file" onChange={onChangeFile} />
            </FormGroup>{" "}
            <FormGroup className="col-md-3">
              {/* <Button type="submit" className="btn-success">
                Upload Image
              </Button> */}
            </FormGroup>
          </Form>
        </Row>
      </Container>
    </>
  );
};

export default DoctorProfile;
