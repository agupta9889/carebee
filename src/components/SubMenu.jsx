import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
display: flex;
color: #e1e9fc;
justify-content: space-between;
align-items: center;
padding: 20px;
list-style: none;
height: 60px;
text-decoration: none;
font-size: 18px;

&:hover {
	background: #fff;
	border-left: 4px solid #0A3977;
	cursor: pointer;
}
`;

const SidebarLabel = styled.span`
margin-left: 16px;
`;

const DropdownLink = styled(Link)`
background: #1672ec;
height: 60px;
padding-left: 3rem;
display: flex;
align-items: center;
text-decoration: none;
color: #f5f5f5;
font-size: 18px;

&:hover {
	background: #fff;
	cursor: pointer;
}
`;

const SubMenu = ({ item }) => {
const [subnav, setSubnav] = useState(false);

const showSubnav = () => setSubnav(!subnav);

const logout = () => {
	localStorage.clear()
}
return (
	<>
	<SidebarLink to={item.path}
	onClick={item.subNav && showSubnav}>
		<div>
		{item.icon}
		<SidebarLabel>{item.title}</SidebarLabel>
		</div>
		<div>
		{item.subNav && subnav
			? item.iconOpened
			: item.subNav
			? item.iconClosed
			: null}
		</div>
	</SidebarLink>
	{subnav &&
		item.subNav.map((item, index) => {
		return (
			<DropdownLink to={item.path} key={index} onClick={()=>item.title === 'LogOut' ? logout(): console.log("logout fail")}>
			{item.icon}
			<SidebarLabel>{item.title}</SidebarLabel>
			</DropdownLink>
		);
		})}
	</>
);
};

export default SubMenu;
