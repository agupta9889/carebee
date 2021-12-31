import React, { useState, useEffect } from "react";
import {Container, Row, Col, Table, FormGroup, Input,Label} from "reactstrap";
import Sidebar from "../components/Sidebar";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import availabilityService from "../services/availability";


const ManageAvailability = () => {
	
	// API Integration for Load data
	const [data, setData] = useState();
	const [fromTime, setFromTime] = useState();
	const [toTime, setToTime] = useState();
	const [availability, setAvailability] = useState([]);
	const [pageCount, setpageCount] = useState(1);
	const limit = 5;
	const type = "DOCTOR";

	useEffect(() => {
		getAvail(1, limit, type);

	}, []);

  const getAvail = async (currentPage, limit, type) => {
    if (currentPage === undefined) {
      currentPage = 1;
    }
    availabilityService.get(currentPage, limit, type)	
    .then((response) => {
      //console.log('Response in doctor list:::', response.data.data);
      let tempArray = [];
      tempArray.push(response.data.data.results);
      setAvailability(response.data.data.results);
      const filterDoctor = response.data.data.results;
      const total = response.data.total;
      setpageCount(Math.ceil(total / limit));
      setData(filterDoctor);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  };

  const handlePageClick = async (data) => {
    const currentPage = data.selected + 1;
    // console.log('pageination Number', currentPage, limit, type);
    const usersFromServer = await getAvail(currentPage, limit, type);
    setData(usersFromServer);
  };

  // Update API Integration----------

  const updateAvail = async (doctorID, availID, toValue, fromValue) => {
    setFromTime(fromValue);
    setToTime(toValue);
    console.log("doctor ID", doctorID, availID, toValue, fromValue);

    var data = JSON.stringify({
      fromTime: fromValue,
      toTime: toValue,
      availsId: availID,
    });
    availabilityService.update(doctorID, data)	
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
      swal({
        title: "Success!",
        text: "Records have been updated successfully!",
        icon: "success",
        dangerMode: true,
      });
      // getAvail();
    })
    .catch(function (error) {
      console.log(error);
      swal({
        title: "Error!",
        text: "Records have not been updated!",
        icon: "error",
        dangerMode: true,
      });
    });
  };

  	return (
	  <>
      <Sidebar />
      <Container>
        <Row>
          <Col md={2} xs={1}></Col>
          <Col md={10} xs={10} className="table-container">
            <h6>Availability</h6>
            <hr />
            <Table id="doctorTable" responsive>
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                  <th>Saturday</th>
                  <th>Sunday</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {availability.map((availdata, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        Dr. {availdata.firstName} {availdata.lastName}
                      </td>
                      {availdata.availabilities.map((data, index) => {
                        //console.log("available data :::::::::::::::::: ",availdata);
                        return (
                          <td key={index}>
                            <FormGroup>
                              <Label>From:</Label>
                              <Input
                                type="time"
                                name="fromTime"
                                onChange={(e) => setFromTime(e.target.value)}
                                value={data.fromTime || fromTime}
                              ></Input>
                            </FormGroup>
                            <FormGroup>
                              <Label>To:</Label>
                              <Input
                                type="time"
                                name="toTime"
                                onChange={(e) => {
                                  updateAvail(
                                    availdata.id,
                                    data._id,
                                    e.target.value,
                                    fromTime
                                  );
                                  setToTime(e.target.value);
                                }}
                                value={data.toTime || toTime}
                              ></Input>
                            </FormGroup>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <ReactPaginate
              previousLabel={"<< Pre"}
              nextLabel={"Next >>"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item shadow"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item shadow"}
              previousLinkClassName={"page-link "}
              nextClassName={"page-item shadow"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item shadow"}
              breakLinkClassName={"page-link"}
              activeClassName={"active shadow"}
            />
          </Col>
          <Col xs={1}></Col>
        </Row>
      </Container>
    </>
  );
};

export default ManageAvailability;
