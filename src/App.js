import React, { useEffect, useState } from "react";
import "./assets/css/Style.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddDoctor from "./pages/AddDoctor";
import ManageDoctor from "./pages/ManageDoctor";
import EditDoctor from "./pages/EditDoctor";
import DoctorProfile from "./pages/DoctorProfile";
import User from "./pages/Users";
import Login from "./login/Login";
import Forgot from "./login/Forgot";
import Dashboard from "./pages/Dashboard";


// function setToken(userToken){
// 	sessionStorage.setItem('token', JSON.stringify(userToken));
// }
// function getToken(){
// 	const tokenString = sessionStorage.getItem('token');
// 	const userToken = JSON.parse(tokenString);
//   	return userToken?.token
// }


function App() {

	const [token, setToken] = useState();
	const [data, setdata] = useState()
	useEffect(() => {
		const data = localStorage.getItem('userdata');
		// console.log("data in effect :::: ",JSON.parse(data));
		setToken(JSON.parse(data))
	})
  if(token) {
	return (
		<>
			{/* <Forgot /> */}
			<Router>
				<Sidebar />
				<Switch>
					<Route path="/" exact component={Dashboard} />
					<Route path="/add-doctor" exact component={AddDoctor} />
					<Route path="/manage-doctor" exact component={ManageDoctor} />
					<Route path="/edit-doctor" exact component={EditDoctor} />
					<Route path="/doctor-profile" exact component={DoctorProfile} />
					<Route path="/users" exact component={User} />
				</Switch>
			</Router>
			
		</>
	);
  }
 
return <Login setToken={setToken} />
}

export default App;
