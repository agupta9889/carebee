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
					<Route path="/manage-doctor" exact component={ManageDoctor} />
					<Route path="/edit-doctor" exact component={EditDoctor} />
					<Route path="/doctor-profile" exact component={DoctorProfile} />
					<Route path="/users" exact component={User} />
				</Switch>
			</Router>
			
		</>
	);
  
}

export default App;