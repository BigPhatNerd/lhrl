import React, { Fragment, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/userContext';
const Logout = () => {
    const { user, setUser } = useContext(UserContext);
    const { stravaId, email, password, isAuthenticated, } = user;
    const logout = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get('/api/logout');
            console.log("res in logout: ", res);
            setUser({
                ...user,
                email: '',
                password: '',
                isAuthenticated: false
            })
        } catch (err) {

            console.error(err.message);

        }
    }
    return (
        <Fragment>
        <br />
		<br />
 <button onClick={logout} className="btn btn-light"> Logout</button>
 </Fragment>
    )
}

export default Logout