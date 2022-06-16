import React, { useEffect, useState } from "react";
import "./assets/css/Style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddDoctor from "./pages/AddDoctor";
import ManageDoctor from "./pages/ManageDoctor";
import EditDoctor from "./pages/EditDoctor";
import DoctorProfile from "./pages/DoctorProfile";
import SocialPeerProfile from "./pages/SocialPeerProfile";
import User from "./pages/Users";
import Login from "./login/Login";
import Dashboard from "./pages/Dashboard";
import AddAvailability from "./pages/AddAvailability";
// import EditAvailability from "./pages/EditAvailability";
import ManageAvailability from "./pages/ManageAvailability";
import Appointments from "./pages/Appointments";
import MoodTracker from "./pages/MoodTracker";
import AddSocialPeer from "./pages/AddSocialPeer";
import ManageSocialPeer from "./pages/ManageSocialPeer";
import EditSocialPeer from "./pages/EditSocialPeer";
import UserPersonalData from "./pages/UserPersonalData";
import UserPromptData from "./pages/UserPromptData";
import UserGoalData from "./pages/UserGoalData";
import UserBookAppointment from "./pages/UserBookAppointmentData";
import UserJournalsData from "./pages/UserJournalsData";
import UserProfilesDetails from "./pages/UserProfilesDetails";
import UserMemberShip from "./pages/UserMemberShip";

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
					<Route path="/edit-doctor/:id" exact component={EditDoctor} />
					<Route path="/manage-doctor" exact component={ManageDoctor} />
					<Route path="/doctor-profile/:id" exact component={DoctorProfile} />
					<Route path="/user-profileData/:id" exact component={UserProfilesDetails}/>
					<Route path="/doctor-socialPeerProfile/:id" exact component={SocialPeerProfile} />
					<Route path="/add-availability" exact component={AddAvailability} />
					<Route path="/member-ship/:id" exact component={UserMemberShip} />
					{/* <Route path="/edit-availability/:id" exact component={EditAvailability} /> */}
					<Route path="/manage-availability" exact component={ManageAvailability} />
					<Route path="/users" exact component={User} />
					<Route path="/appointments" exact component={Appointments} />
					<Route path="/mood-tracker/:id" exact component={MoodTracker} />
					<Route path="/personal-data/:id" exact component={UserPersonalData} />
					<Route path="/userPrompt-data/:id" exact component={UserPromptData} />
					<Route path="/bookAppointment-data/:id" exact component={UserBookAppointment} />
					<Route path="/goal-data/:id" exact component={UserGoalData} />
					<Route path="/userjournals-data/:id" exact component={UserJournalsData} />
					<Route path="/add-socialpeer" exact component={AddSocialPeer} />
					<Route path="/manage-socialPeer" exact component={ManageSocialPeer} />
					<Route path="/edit-socialPeer/:id" exact component={EditSocialPeer} />
				</Switch>
			</Router>
			
		</>
	);
  
}

export default App;