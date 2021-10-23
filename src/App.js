import "./assets/css/Style.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddDoctor from "./pages/AddDoctor";
import EditDoctor from "./pages/EditDoctor";
import DoctorProfile from "./pages/DoctorProfile";
import { Services, ServicesOne, ServicesTwo, ServicesThree} from "./pages/Services";
import { Events, EventsOne, EventsTwo } from "./pages/Events";
import ManageDoctor from "./pages/ManageDoctor";
import Patient from "./pages/Patient";
import Login from "./login/Login";
import Forgot from "./login/Forgot";

function App() {
return (
		
	<Router>
		{/* <Login /> */}
		{/* <Forgot /> */}
		<Sidebar />
		<Switch>
			<Route path="/add-doctor" exact component={AddDoctor} />
			<Route path="/edit-doctor" exact component={EditDoctor} />
			<Route path="/doctor-profile" exact component={DoctorProfile} />
			<Route path="/services" exact component={Services} />
			<Route path="/services/services1" exact component={ServicesOne} />
			<Route path="/services/services2" exact component={ServicesTwo} />
			<Route path="/services/services3" exact component={ServicesThree} />
			<Route path="/manage-doctor" exact component={ManageDoctor} />
			<Route path="/events" exact component={Events} />
			<Route path="/events/events1" exact component={EventsOne} />
			<Route path="/events/events2" exact component={EventsTwo} />
			<Route path="/patient" exact component={Patient} />
	 	</Switch>
	</Router>
);
}

export default App;
