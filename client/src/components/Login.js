import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Login = (props) => {
    const { user, setUser } = useContext(UserContext);
    const { email, password, isAuthenticated } = user;
    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
            isAuthenticated: true
        })
    }
    const onSubmit = async e => {
        e.preventDefault();
        console.log("Here!!");
        props.history.push('/');

    }
    return (
        <Fragment>

		<h1 className="large text-primary">Sign In  </h1>
		<p className="lead">
		<i className="fas fa-user" /> Sign Into Your Account</p>
	<form className="form" onSubmit={e => onSubmit(e)}>
	
	<div className='form-group'>
	<input
	type="email"
	placeholder="Email Address"
	name="email"
	value={email}
	onChange={handleChange}
	required
	/>
	</div>
	<div className="form-group">
	<input 
	type="password"
	placeholder="Password"
	name="password"
	value={password}
	onChange={handleChange}
	minLength='6'
	/>
	</div>
	<input type="submit" className="btn btn-primary" value="Login" />
	</form>
	<p className="my-1">
	Don't have an account? <Link to="/signup">Sign Up</Link>
	</p>
	</Fragment>
    )
}

export default Login;