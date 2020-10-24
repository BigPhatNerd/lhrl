import React from 'react';
import axios from 'axios';


const StravaButton = (props) => {
    const stravaLogin = () => {
        window.open('http://lhrlslacktest.ngrok.io/strava/login')
    }
    return (
        <button onClick={stravaLogin} className="btn btn-primary"> Authorize Strava</button>
    )
}

export default StravaButton