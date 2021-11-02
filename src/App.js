import React, { useEffect, useState } from "react";
import "./assets/css/Style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddDoctor from "./pages/AddDoctor";
import ManageDoctor from "./pages/ManageDoctor";
import EditDoctor from "./pages/EditDoctor";
import DoctorProfile from "./pages/DoctorProfile";
import User from "./pages/Users";
import Login from "./login/Login";
import Dashboard from "./pages/Dashboard";
import AddAvailability from "./pages/AddAvailability";
import EditAvailability from "./pages/EditAvailability";
import ManageAvailability from "./pages/ManageAvailability";
import Appointments from "./pages/Appointments";

function App() {

	const [token, setToken] = useState();
	
	useEffect(() => {
		const data = localStorage.getItem('userdata');
		// console.log("data in effect :::: ",JSON.parse(data));
		setToken(JSON.parse(data))
	}, []);

  	if(!token) {
		return <Login setToken={setToken} />
	}
	return (
		<>
			<Router>
				<Switch>
					<Route path="/" exact component={Login} />
					<Route path="/dashboard" exact component={Dashboard} />
					<Route path="/add-doctor" exact component={AddDoctor} />
					<Route path="/edit-doctor" exact component={EditDoctor} />
					<Route path="/manage-doctor" exact component={ManageDoctor} />
					<Route path="/doctor-profile" exact component={DoctorProfile} />
					<Route path="/add-availability" exact component={AddAvailability} />
					<Route path="/edit-availability" exact component={EditAvailability} />
					<Route path="/manage-availability" exact component={ManageAvailability} />
					<Route path="/users" exact component={User} />
					<Route path="/appointments" exact component={Appointments} />
				</Switch>
			</Router>
			
		</>
	);
  
}

export default App;