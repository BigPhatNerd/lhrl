import React from 'react';
import axios from 'axios';


const urlString = process.env.NODE_ENV === "production" ? "https://immense-shelf-69979.herokuapp.com" : "http://lhrlslacktest.ngrok.io"
console.log("URLSTRING IN RECT: ", urlString);
const AuthStravaButton = (props) => {
    const stravaLogin = () => {
        window.open(urlString)
    }
    return (
        <button onClick={stravaLogin} className="btn btn-primary"> Authorize Strava</button>
    )
}

export default AuthStravaButton