import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
{
	title: "Dashboard",
	path: "/",
	icon: <AiIcons.AiFillHome />,
},
{
	title: "Doctors",
	path: "#",
	icon: <FaIcons.FaUserMd />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Add Doctor",
		path: "/add-doctor",
		icon: <IoIcons.IoIosPeople />,
	},
	{
		title: "Manage Doctor",
		path: "/manage-doctor",
		icon: <IoIcons.IoIosPaper />,
	},
	],
},
{
	title: "Patients",
	path: "/patient",
	icon: <FaIcons.FaUsers/>,
},
{
	title: "My Account",
	path: "#",
	icon: <FaIcons.FaUser/>,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Profile",
		path: "/about-us/aim",
		icon: <IoIcons.IoIosPerson />,
	},
	{
		title: "LogOut",
		path: "/about-us/vision",
		icon: <IoIcons.IoIosLogOut />,
	},
	],
},
// {
// 	title: "Services",
// 	path: "/services",
// 	icon: <IoIcons.IoIosPaper />,
// 	iconClosed: <RiIcons.RiArrowDownSFill />,
// 	iconOpened: <RiIcons.RiArrowUpSFill />,

// 	subNav: [
// 	{
// 		title: "Service 1",
// 		path: "/services/services1",
// 		icon: <IoIcons.IoIosPaper />,
// 		cName: "sub-nav",
// 	},
// 	{
// 		title: "Service 2",
// 		path: "/services/services2",
// 		icon: <IoIcons.IoIosPaper />,
// 		cName: "sub-nav",
// 	},
// 	{
// 		title: "Service 3",
// 		path: "/services/services3",
// 		icon: <IoIcons.IoIosPaper />,
// 	},
// 	],
// },
// {
// 	title: "Contact",
// 	path: "/contact",
// 	icon: <FaIcons.FaPhone />,
// },
// {
// 	title: "Events",
// 	path: "/events",
// 	icon: <FaIcons.FaEnvelopeOpenText />,

// 	iconClosed: <RiIcons.RiArrowDownSFill />,
// 	iconOpened: <RiIcons.RiArrowUpSFill />,

// 	subNav: [
// 	{
// 		title: "Event 1",
// 		path: "/events/events1",
// 		icon: <IoIcons.IoIosPaper />,
// 	},
// 	{
// 		title: "Event 2",
// 		path: "/events/events2",
// 		icon: <IoIcons.IoIosPaper />,
// 	},
// 	],
// },
// {
// 	title: "Support",
// 	path: "/support",
// 	icon: <IoIcons.IoMdHelpCircle />,
// },
];
