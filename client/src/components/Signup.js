import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import { Alert } from 'react-alert';
import { useAlert } from 'react-alert';

const Signup = (props) => {
    const alert = useAlert();
    const { user, setUser } = useContext(UserContext);
    const { stravaId, email, password, isAuthenticated } = user;
    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }
    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/signup', {
                stravaId: stravaId,
                email: email,
                password: password,
                isAuthenticated: true
            }, {
                withCredentials: true
            });
          
            if(res.statusText === "OK") {
                setUser({
                    ...user,
                    isAuthenticated: true
                })
                return props.history.push("/")
            }
            console.log("Something went wrong with login.")

        } catch (err) {
            alert.show("There was a problem signing you up!");
            setUser({
                ...user,
                stravaid: '',
                email: '',
                password: ''
            })
            console.error(err.message);

        }
    }
    return (
        <Fragment>

<h1 className='large text-primary'>Sign Up</h1>
<p className="lead">
<i className="fas fa-user" /> Create Your Account
</p>
<form className='form' onSubmit={e => onSubmit(e)}>
<div className='form-group'>
<input
type="stravaId"
placeholder="Strava ID"
name="stravaId"
value={stravaId}
onChange={handleChange}
required
    />
    </div>
    <div className='form-group'>
<input 
type="email"
placeholder="Email Address"
name="email"
value={email}
onChange={handleChange}
/>
</div>
<div className="form-group">
<input 
type="password"
placeholder="Password"
name="password"
value={password}
onChange={handleChange}
/>
</div>
<input type="submit" className="btn btn-primary" value="Signup" />
</form>
<p className="my-1">
Already have an account? <Link to='/login'>Sign In</Link>
</p>
</Fragment>
    );
};

export default Signup