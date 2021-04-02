import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () =>{

	return(
		<nav style={{fontSize: "1rem", textAlign: "center", margin: "auto"}}>
			
			<NavLink style={{ color: "white", textDecoration: "underline", fontSize: "1em", marginRight: "1em", marginLeft: "1em"}} exact activeClassName="active" to='/'>Home</NavLink>
		<NavLink style={{ color: "white", textDecoration: "underline", fontSize: "1em", marginRight: "1em", marginLeft: "1em"}} activeClassName="active" to='/privacy'>Privacy</NavLink>
		<NavLink style={{ color: "white", textDecoration: "underline", fontSize: "1em", marginRight: "1em", marginLeft: "1em"}} activeClassName="active" to='/support'>Support</NavLink>
		<NavLink style={{ color: "white", textDecoration: "underline", fontSize: "1em", marginRight: "1em", marginLeft: "1em"}} activeClassName="active" to='/contact'>Contact</NavLink>
			
		</nav>
		)
}

export default Navbar


// element.style {
// }
// nav {
//     font-size: 12px;
//     text-align: center;
//     width: 50;
//     width: 50%;
//     margin: auto;
// }