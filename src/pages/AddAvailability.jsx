import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";
import swal from "sweetalert";
import * as FaIcons from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import GLOBALS from "../constants/global";
import { AppointmentPicker } from 'react-appointment-picker';



export const AddAvailability = () => {
  const [doctorlist, setDoctorList] = useState();
  const [inputFieldsMon, setInputFieldsMon] = useState([
    { mon_from_time: "", mon_to_time: "" },
  ]);
  const [hiddenButton, setHiddenButton] = useState(1)
  const type = "DOCTOR";
  useEffect(() => {
    getDoctorList();
  }, []);

  const getDoctorList = async () => {
    var config = {
      method: "get",
      url: `${GLOBALS.BASE_URL}/user/get?type=${type}`,
      headers: {
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzY4YjlhYjgyYmQwMDJkMGU0ZmFhYiIsImlhdCI6MTYzNTE2NTk2NSwiZXhwIjo2ODE5MTY1OTY1fQ._Jy0lEA0y8ojQqauoDUKyEuujKxcZfzT55ISt2hMuZo",
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((response) => {
        // console.log('Response in doctor list:::', response.data.data);
        const filterDoctor = response.data.data.results;
        setDoctorList(filterDoctor);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //add per day multiple solt availability
  const handleFromChangeinput = (index, event) => {
    let data = [...inputFieldsMon];
    data[index][event.target.mon_from_time] = event.target.value;
    setInputFieldsMon(data);
  };
  //Add button check will start
  const addFields = () => {
	let newfield = { mon_from_time: '', mon_to_time: '' }
	console.log('nvwn', newfield);
	setInputFieldsMon([...inputFieldsMon, newfield])
	}
	//Remove buttton after add inputfiled
	const removeFields = (index) => {
		let data = [...inputFieldsMon];
		console.log('nvwn', data);
		data.splice(index, 1)
		setInputFieldsMon(data)
	} 
  // Add Availability
  const [doctor_id, setDoctor] = useState();
  const [monday, setMonday] = useState();
  const [mon_from_time, setMonFromTime] = useState();
  const [mon_to_time, setMonToTime] = useState();
  const [tuesday, setTuesday] = useState();
  const [tue_from_time, setTueFromTime] = useState();
  const [tue_to_time, setTueToTime] = useState();
  const [wednesday, setWednesday] = useState();
  const [wed_from_time, setWedFromTime] = useState();
  const [wed_to_time, setWedToTime] = useState();
  const [thursday, setThursday] = useState();
  const [thur_from_time, setThurFromTime] = useState();
  const [thur_to_time, setThurToTime] = useState();
  const [friday, setFriday] = useState();
  const [fri_from_time, setFriFromTime] = useState();
  const [fri_to_time, setFriToTime] = useState();
  const [saturday, setSaturday] = useState();
  const [sat_from_time, setSatFromTime] = useState();
  const [sat_to_time, setSatToTime] = useState();
  const [sunday, setSunday] = useState();
  const [sun_from_time, setSunFromTime] = useState();
  const [sun_to_time, setSunToTime] = useState();

  // const doctorAvail = async () =>{
  // 	console.log('doctor data', doctor_id);
  // 	var data = JSON.stringify({
  // 		"doctor_id": doctor_id,
  // 		"monday": monday,
  // 		"mon_from_time": mon_from_time,
  // 		"mon_to_time": mon_to_time,
  // 		"tuesday": tuesday,
  // 		"tue_from_time": tue_from_time,
  // 		"tue_to_time": tue_to_time,
  // 		"wednesday": wednesday,
  // 		"wed_from_time": wed_from_time,
  // 		"wed_to_time": wed_to_time,
  // 		"thursday": thursday,
  // 		"thur_from_time": thur_from_time,
  // 		"thur_to_time": thur_to_time,
  // 		"friday": friday,
  // 		"fri_from_time": fri_from_time,
  // 		"fri_to_time": fri_to_time,
  // 		"saturday": saturday,
  // 		"sat_from_time": sat_from_time,
  // 		"sat_to_time": sat_to_time,
  // 		"sunday": sunday,
  // 		"sun_from_time": sun_from_time,
  // 		"sun_to_time": sun_to_time,
  // 	});

  // 	var config = {
  // 		method: 'post',
  // 		url: `${GLOBALS.BASE_URL}/availability/login/create`,
  // 		headers: {
  // 			'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxN2NlNThiZmY4M2M5ZmJiNWJhNDYwYiIsImlhdCI6MTYzNjQ1NDI1OSwiZXhwIjo2ODIwNDU0MjU5fQ.sFo7yCFjaOJkE_mJ_RHVsd1zqx8QbF6OhjI1UCYXz74',
  // 			'Content-Type': 'application/json'
  // 		},
  // 		data : data
  // 	};

  // 	axios(config)
  // 	.then(function (response) {

  // 		console.log(JSON.stringify(response.data));
  // 		//Reset Form Field
  // 		setDoctor();
  // 		setMonday();
  // 		setMonFromTime();
  // 		setMonToTime();
  // 		setTuesday();
  // 		setTueFromTime();
  // 		setTueToTime();
  // 		setWednesday();
  // 		setWedFromTime();
  // 		setWedToTime();
  // 		setThursday();
  // 		setThurFromTime();
  // 		setThurToTime();
  // 		setFriday();
  // 		setFriFromTime();
  // 		setFriToTime();
  // 		setSaturday();
  // 		setSatFromTime();
  // 		setSatToTime();
  // 		setSunday();
  // 		setSunFromTime();
  // 		setSunToTime();
  // 		// Sweet alert validation
  // 		swal({
  // 			title: "Success!",
  // 			text: "Records have been submitted successfully!",
  // 			icon: "success",
  // 			dangerMode: true
  // 		});

  // 	})
  // 	.catch(function (error) {
  // 	console.log(error);
  // 		swal({
  // 			title: "Error!",
  // 			text: "Records have not been submitted!",
  // 			icon: "error",
  // 			dangerMode: true,
  // 			timer: 3000
  // 		});
  // 	});

  // }

  return (
    <>
      <Sidebar />
      <Container>
        <Row>
          <Col md={4} xs={1}></Col>
          <Col md={6} xs={10} className="form-container">
            {/* <Form> */}
            <h6>Add Availability</h6>
            <hr />
            <FormGroup>
              <Label>Doctors</Label>
              <Input
                type="select"
                name="doctor_id"
                onChange={(e) => setDoctor(e.target.value)}
              >
                <option value="default">Select Doctor</option>
                {doctorlist
                  ? doctorlist.map((data, index) => {
                      return (
                        <option value={data.id} key={index}>
                          Dr. {data.firstName} {data.lastName}
                        </option>
                      );
                    })
                  : null}
              </Input>
           </FormGroup>
		   
             {/*
			  <FormGroup>
              <Row>
                <Col md={3}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        onChange={(e) => setMonday(e.target.value)}
                        name="monday"
                        value="Mon"
                      />
                      Moday
                    </Label>
                  </FormGroup>
                </Col>
                {inputFieldsMon.map((input, index) => {
                  return (
                    <Col md={9} >
                      <Row key={index}>
                        <Col md={5}>
                           <Input type="time" onChange={e=> setMonFromTime(e.target.value)} name="mon_from_time" value={ mon_from_time || ''}/>
                          <Input
                            type="time"
                            name="mon_from_time"
                            onChange={(event) =>
                              handleFromChangeinput(index, event)
                            }
                            value={input.mon_from_time}
                          />
						  
                        </Col>
                        <Col md={5}>
                           <Input type="time" onChange={e=> setMonToTime(e.target.value)} name="mon_to_time" value={ mon_to_time || ''} /> 
                          <Input
                            type="time"
                            name="mon_to_time"
                            onChange={(event) =>
                              handleFromChangeinput(index, event)
                            }
                            value={input.mon_to_time}
                          />
                        </Col>
						<Col md ={1} onClick={addFields}><FaIcons.FaPlus style={{width: "100%", height:"25px" }}  /></Col>
						<Col md ={1} onClick={() => removeFields(index)}><FaIcons.FaMinus style={{width: "100%", height:"25px" }}  /></Col>
                      </Row>
                    </Col>
                  );
                })}
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col md={3}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        onChange={(e) => setTuesday(e.target.value)}
                        name="tuesday"
                        value="Tue"
                      />
                      Tuesday
                    </Label>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <Input
                    type="time"
                    onChange={(e) => setTueFromTime(e.target.value)}
                    name="tue_from_time"
                    value={tue_from_time || ""}
                  />
                </Col>
                <Col md={4}>
                  <Input
                    type="time"
                    onChange={(e) => setTueToTime(e.target.value)}
                    name="tue_to_time"
                    value={tue_to_time || ""}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col md={3}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        onChange={(e) => setWednesday(e.target.value)}
                        name="wednesday"
                        value="Wed"
                      />
                      Wednesday
                    </Label>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <Input
                    type="time"
                    onChange={(e) => setWedFromTime(e.target.value)}
                    name="wed_from_time"
                    value={wed_from_time || ""}
                  />
                </Col>
                <Col md={4}>
                  <Input
                    type="time"
                    onChange={(e) => setWedToTime(e.target.value)}
                    name="wed_to_time"
                    value={wed_to_time || ""}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col md={3}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        onChange={(e) => setThursday(e.target.value)}
                        name="thursday"
                        value="Thur"
                      />
                      Thursday
                    </Label>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <Input
                    type="time"
                    onChange={(e) => setThurFromTime(e.target.value)}
                    name="thur_from_time"
                    value={thur_from_time || ""}
                  />
                </Col>
                <Col md={4}>
                  <Input
                    type="time"
                    onChange={(e) => setThurToTime(e.target.value)}
                    name="thur_to_time"
                    value={thur_to_time || ""}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col md={3}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        onChange={(e) => setFriday(e.target.value)}
                        name="friday"
                        value="Fri"
                      />
                      Friday
                    </Label>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <Input
                    type="time"
                    onChange={(e) => setFriFromTime(e.target.value)}
                    name="fri_from_time"
                    value={fri_from_time || ""}
                  />
                </Col>
                <Col md={4}>
                  <Input
                    type="time"
                    onChange={(e) => setFriToTime(e.target.value)}
                    name="fri_to_time"
                    value={fri_to_time || ""}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col md={3}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        onChange={(e) => setSaturday(e.target.value)}
                        name="saturday"
                        value="Sat"
                      />
                      Saturday
                    </Label>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <Input
                    type="time"
                    onChange={(e) => setSatFromTime(e.target.value)}
                    name="sat_from_time"
                    value={sat_from_time || ""}
                  />
                </Col>
                <Col md={4}>
                  <Input
                    type="time"
                    onChange={(e) => setSatToTime(e.target.value)}
                    name="sat_to_time"
                    value={sat_to_time || ""}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col md={3}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        onChange={(e) => setSunday(e.target.value)}
                        name="sunday"
                        value="Sun"
                      />
                      Sunday
                    </Label>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <Input
                    type="time"
                    onChange={(e) => setSunFromTime(e.target.value)}
                    name="sun_from_time"
                    value={sun_from_time || ""}
                  />
                </Col>
                <Col md={4}>
                  <Input
                    type="time"
                    onChange={(e) => setSunToTime(e.target.value)}
                    name="sun_to_time"
                    value={sun_to_time || ""}
                  />
                </Col>
              </Row>
            </FormGroup>
			 */}
            {/* <Button type="submit" onClick={doctorAvail} >Submit</Button> */}
            {/* </Form> */}
          </Col>
          <Col xs={1}></Col>
        </Row>
      </Container>
    </>
  );
};
export default AddAvailability;
