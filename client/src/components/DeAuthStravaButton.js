import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/userContext';

const DeAuthStravaButton = (props) => {
    const { user, setUser } = useContext(UserContext);
    const { stravaId, email, password, isAuthenticated } = user;

    const stravaLogout = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put('strava/deauth/:stravaId', stravaId);
            if(res.statusText === "OK") {
                setUser({
                    ...user,
                    stravaAuthenticated: false
                })
                return user;
            }
        } catch (err) {
            console.log("There was a problem with the deauth route");
            console.error(err.message);
        }
    }
    return (
        <button onClick={stravaLogout} className="btn btn-light"> Deauthorize Strava</button>
    )
}

export default DeAuthStravaButton;