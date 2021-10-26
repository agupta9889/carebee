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
	title: "Users",
	path: "/users",
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
		path: "#",
		icon: <IoIcons.IoIosPerson />,
	},
	{
		title: "LogOut",
		path: "#",
		icon: <IoIcons.IoIosLogOut />,
	},
	],
},
];
