import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  CardBody,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import { Line, Pie, Doughnut, Bar } from "react-chartjs-2";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import UserServices from "../services/user";
import MonthPicker from "simple-react-month-picker";
var moment = require("moment"); // require

function Dashboard() {
  const [userdata, setUserData] = useState();
  const [doctordata, setDoctorData] = useState();
  const type = "USER";
  const [getUserData, setGetUserData] = useState([]);
  const [curentDayWise, setCurentDayWise] = useState([]);
  const [curentDateWise, setCurentDateWise] = useState([]);
  const [countDateWaise, setCountDateWaise] = useState([]);
  const [countDateFemale, setCountDateFemale] = useState([]);
  const [countMorF, setCountMorF] = useState([]);
  const [maleAgeWaiseData, setMaleAgeWaiseData] = useState([]);
  const [femaleAgeWaiseData, setFemaleAgeWaiseData] = useState([]);
  const [maleAgeCountWaiseData, setMaleAgeCountWaiseData] = useState([]);
  const [femaleAgeCountWaiseData, setFemaleAgeCountWaiseData] = useState([]);
  const [totalCountWaiseData, setTotalCountWaiseData] = useState([]);
  const [monthsCountWaiseData, setMonthsCountWaiseData] = useState([]);
  const [countBookingSlot, setCountBookingSlot] = useState([0]);
  //   const [countF, setCountF] = useState([]);

  useEffect(() => {
    getUserDetails();
    getUserDetailswithout();
    getAllUserwithOm();
    getAllMaleCountAgeWaise();
    getAllFemaleCountAgeWaise();
    getAllDoctorAppointmentMonthWaise();
    // getAllDoctorbookingAppointmentMonthWaiseCount();
  }, []);

  const getUserDetails = async () => {
    var config = {
      method: "get",
      url: "http://192.168.1.29:5000/api/user/login/getUser",
      headers: {
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzY4YjlhYjgyYmQwMDJkMGU0ZmFhYiIsImlhdCI6MTYzNTE2NTk2NSwiZXhwIjo2ODE5MTY1OTY1fQ._Jy0lEA0y8ojQqauoDUKyEuujKxcZfzT55ISt2hMuZo",
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((response) => {
        //console.log('Userdata', response.data.data.results);
        const filterUserData = response.data.data.results.filter(
          (user) => user.type === "USER"
        );
        const filterDoctorData = response.data.data.results.filter(
          (user) => user.type === "DOCTOR"
        );
        //console.log('Userdata', filterUserData);
        if (filterUserData) {
          setUserData(filterUserData);
        }

        if (filterDoctorData) {
          setDoctorData(filterDoctorData);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Only get User all data without limit
  const getUserDetailswithout = async () => {
    UserServices.getAllUserwithOutLimt(type).then((response) => {
      var data = response.data.data;
      setGetUserData(response.data.data);
      FilterData(response.data.data);
    });
  };
  //filter date
  const FilterData = (data) => {
    const dateNew = new Date();
    let dayArr = [];
    let dateArr = [];
    for (let index = 0; index < 7; index++) {
      let element;
      if (index === 0) {
        element = dateNew.setDate(dateNew.getDate());
      } else {
        element = dateNew.setDate(dateNew.getDate() - 1);
        // console.log("element :::", element);
      }
      let curentDays = moment(element).format("dddd"); // given day
      dayArr.push(curentDays);
      let nextdates = moment(element).format("Do-MMM-YY");
      dateArr.push(nextdates);
    }
    setCurentDayWise(dayArr);
    setCurentDateWise(dateArr);
    let dataCreatedDateFormate = moment().format("Do-MMM-YY");
    //  let onlyCreatedDate = dataGivenArrUser.forEach((f) => f.createdAt)
    const filterUserMale = data.filter((f) => f.gender === "Male");
    const filterUserFemale = data.filter((f) => f.gender === "Female");
    if (filterUserMale || filterUserFemale) {
      //   let countM = [];
      //   let countF = [];
      //   countM.push(filterUserMale.length);
      //   countF.push(filterUserFemale.length);
      setCountMorF((...arr) => [
        filterUserMale.length,
        filterUserFemale.length,
      ]);
      //   setCountF(countF);
    } else {
      console.log("value not count properly");
    }
  };

  //male and user count gender
  const getAllUserwithOm = async () => {
    var gender = "Male";
    UserServices.getAllUserwithO(type, gender).then((response) => {
      let sortingDateWise = response.data.data.sort((a, b) => {
        if (a._id < b._id) {
          return 1;
        }
        if (a._id > b._id) {
          return -1;
        }
        return 0;
      });
      const totalMaleCount = [];
      sortingDateWise.forEach((data) => {
        //   let maleObj = {
        // 	  count: data.count
        //   }
        //   totalMaleCount.push(maleObj)
        totalMaleCount.push(data.count);
      });
      setCountDateWaise(totalMaleCount);
    });
    getAllUserwithOF();
  };
  //female and user count gender
  const getAllUserwithOF = async () => {
    var gender = "Female";
    UserServices.getAllUserwithO(type, gender).then((response) => {
      let sortingDateWise = response.data.data.sort((a, b) => {
        if (a._id < b._id) {
          return 1;
        }
        if (a._id > b._id) {
          return -1;
        }
        return 0;
      });
      const totaFemaleCount = [];
      sortingDateWise.forEach((data) => {
        totaFemaleCount.push(data.count);
      });
      setCountDateFemale(totaFemaleCount);
    });
  };
  //Male and female age Waise group data Show section Start
  const getAllMaleCountAgeWaise = async () => {
    let gender = "Male";
    UserServices.getAllUserWithAgeGroup(type, gender).then((response) => {
      // console.log('sjdbfiusdbferi', response.data.UserAgeData);
      const TotalMaleAgeCountOnly = [];
      const TotalMaleAgeOnly = [];
      response.data.UserAgeData.forEach((data) => {
        // console.log('&&&&&&&&&&&&&&', data.count);
        TotalMaleAgeCountOnly.push(data.count);

        TotalMaleAgeOnly.push(data.age);
      });
      const assending = TotalMaleAgeOnly.sort(function (a, b) {
        return a - b;
      });
      const assendingCount = TotalMaleAgeCountOnly.sort(function (a, b) {
        return a - b;
      });
      setMaleAgeWaiseData(assending);

      setMaleAgeCountWaiseData(assendingCount);
    });
  };
  const getAllFemaleCountAgeWaise = async () => {
    let gender = "Female";
    UserServices.getAllUserWithAgeGroup(type, gender).then((response) => {
      // console.log('sjdbfiusdbferi', response.data.UserAgeData);
      const TotalFemaleAgeCountOnly = [];
      const TotalFemaleAgeOnly = [];
      response.data.UserAgeData.forEach((data) => {
        // console.log('&&&&&&&&&&&&&&', data.count);
        TotalFemaleAgeCountOnly.push(data.count);

        TotalFemaleAgeOnly.push(data.age);
      });
      const assending = TotalFemaleAgeOnly.sort(function (a, b) {
        return a - b;
      });
      const assendingCount = TotalFemaleAgeCountOnly.sort(function (a, b) {
        return a - b;
      });
      setFemaleAgeWaiseData(assending);

      setFemaleAgeCountWaiseData(assendingCount);
    });
  };
  //Doctor bookingappointment Count
  const getAllDoctorAppointmentMonthWaise = async () => {
    let type = "DOCTOR";
    UserServices.getAllUserwithOutLimt(type).then((response) => {
      //  console.log('sjdbfiusdbferi', response.data.data);
      const allDoctor = response.data.data;
      for (let index = 0; index < allDoctor.length; index++) {
        const element = allDoctor[index];
        const bookingAppointmentNotEqualToNull = element.bookingAppointment;
        if (bookingAppointmentNotEqualToNull.length > 0) {
          const result = bookingAppointmentNotEqualToNull.reduce(
            (r, { createdAt }) => {
              //  console.log('count dashboard:::::::::::::::', moment(createdAt).format("MMM"));
              var key = createdAt.slice(0, 7);
              r[key] = (r[key] || 0) + 1;

              return r;
            },
            {}
          );
          // const months = moment().format("yyyy-MM")
          const mChg = Object.keys(result);
          const months = [];
          for (let index = 0; index < mChg.length; index++) {
            const el = mChg[index];
            const conertMont = moment(el).format("MMM");
            months.push(conertMont);
          }
          setMonthsCountWaiseData(months);
          const totalCount = Object.values(result);
          setTotalCountWaiseData(totalCount);
        }
      }
    });
  };
  //Doctor bookingappointment Count
  const getAllDoctorbookingAppointmentMonthWaiseCount = async (data) => {
    let type = "DOCTOR";
    // console.log('nitintin', data);
    UserServices.bookingAppointmentCountPerMonth(type, data).then((response) => {
      // console.log("sjdbfiusdbferi", response.data.data[0]);
      let arr = []
      if (response.data.data.length > 0 && response.data.data[0].count) {
        arr.push(response.data.data[0].count)
      }
      setCountBookingSlot(arr);

    });
  };
  
  //Male and female age Waise group data Show section End
  // Line Chart - Appointments Graph
  // const labelsAgeWise = ["0-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81-90", "91-100"]
  const booking = {
    labels: maleAgeWaiseData,
    datasets: [
      {
        label: "Male",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        // data: [2, 28, 5, 22, 31],
        data: maleAgeCountWaiseData,
      },
      {
        label: "Female",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 2,
        data: femaleAgeCountWaiseData,
      },
    ],
  };
  const bookingDoc = {
    labels: monthsCountWaiseData,
    datasets: [
      {
        label: "Doctors",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        // data: [2, 28, 5, 22, 31],
        data: totalCountWaiseData,
      },
    ],
  };
  // Pie Chart- Doctor Graph
//  console.log(countBookingSlot, 'nitnt:::::::::::::::::')

  const doctor = {
     labels: ['TotalCount'],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: [
          // "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
        ],
        hoverBackgroundColor: [
          // "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
        ],
        data: countBookingSlot,
      },
    ],
  };
  // Doughunt Chart- Pie Graph
  const Patient = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: [
          "#1672ec",
          "#FF6384",
          //   "#2FDE00",
          //   "#00A6B4",
          //   "#6800B4",
        ],
        hoverBackgroundColor: [
          "#2269c7",
          "#ab3e56",
          //   "#175000",
          //   "#003350",
          //   "#35014F",
        ],
        data: countMorF,
        // data: [5,5]
      },
    ],
  };
  // Bar Chart - user Type
  const labels = curentDayWise;
  const userRegisterCount = {
    labels,
    datasets: [
      {
        label: "Male Register",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#1672ec",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        // data: [5, 10, 15, 20, 25, 23, 30, 23, 99],
        data: countDateWaise,
        // data: labels.map(() => ({ min: 0, max: 1000 })),
      },
      {
        label: "Female Register",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 2,
        //  data: [1, 12, 13, 23, 24],
        data: countDateFemale,
        //    data: labels.map(() => ({ min: 0, max: 1000 })),
      },
    ],
  };

  return (
    <>
      <Sidebar />
      <Container>
        <Row>
          <Col md={3} xs={1}></Col>
          <Col md={6} xs={12} className="doctor-top">
            <Card className="shadow">
              <CardBody>
                <span>Booking Doctor Appointments</span>
                <div>
                  {/* <Line
                   data={bookingDoc}
                    options={{
                      title: {
                        display: true,
                        text: "Average Rainfall per month",
                        fontSize: 20,
                      },
                      legend: { display: true, position: "right" },
                    }}
                  /> */}
                  <Bar
                    data={bookingDoc}
                    options={{
                      title: {
                        display: true,
                        text: "Average Barfall per Week",
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: "right",
                      },
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={3} xs={12} className="doctor-top">
            <Card className="shadow">
              <CardBody>
                <span>
                  Doctor BookingAppoinment count months:{" "}
                  {doctordata ? doctordata.length : "-"}{" "}
                </span>
                <div>
                  <MonthPicker
                    style={{ width: 250, margin: "50px auto" }}
                    // presets={[
                    //   {
                    //     title: "This month",
                    //     start: moment().startOf("month").toDate(),
                    //     end: moment().endOf("month").toDate(),
                    //   },
                    //   {
                    //     title: "Past 3 months",
                    //     start: moment()
                    //       .subtract(2, "month")
                    //       .startOf("month")
                    //       .toDate(),
                    //     end: moment().endOf("month").toDate(),
                    //   },
                    //   {
                    //     title: "Past 6 months",
                    //     start: moment()
                    //       .subtract(5, "month")
                    //       .startOf("month")
                    //       .toDate(),
                    //     end: moment().endOf("month").toDate(),
                    //   },
                    //   {
                    //     title: "Past Year",
                    //     start: moment()
                    //       .subtract(12, "month")
                    //       .startOf("month")
                    //       .toDate(),
                    //     end: moment().endOf("month").toDate(),
                    //   },
                    //   {
                    //     title: "All time",
                    //     start: null,
                    //     end: null,
                    //   },
                    // ]}
                    onChange={(range) => getAllDoctorbookingAppointmentMonthWaiseCount(range)}
                    closeDelay={500}
                  />

                  <Pie
                    data={doctor}
                    options={{
                      title: {
                        display: true,
                        text: "Average Rainfall per month",
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: "right",
                      },
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={3} xs={1}></Col>
          <Col md={6} xs={12} className="doctor-top">
            <Card className="shadow">
              <CardBody>
                <span>Per Day User Register</span>
                <div>
                  <Bar
                    data={userRegisterCount}
                    options={{
                      title: {
                        display: true,
                        text: "Average Barfall per Week",
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: "right",
                      },
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={3} xs={12} className="doctor-top">
            <Card className="shadow">
              <CardBody>
                <span>
                  Total Users Register :-{" "}
                  {getUserData ? getUserData.length : "-"}{" "}
                </span>
                <div>
                  <Doughnut
                    data={Patient}
                    options={{
                      title: {
                        display: true,
                        text: "Average Rainfall per month",
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: "right",
                      },
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Age Waise Data Male and Female */}
        <Row>
          <Col md={3} xs={1}></Col>
          <Col md={9} xs={12} className="doctor-top">
            <Card className="shadow">
              <CardBody>
                <span>Age Group Waise User Register</span>
                <div>
                  <Line
                    data={booking}
                    options={{
                      title: {
                        display: true,
                        text: "Average Rainfall per month",
                        fontSize: 20,
                      },
                      legend: { display: true, position: "right" },
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
