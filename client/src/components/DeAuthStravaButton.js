import React from 'react';


const DeAuthStravaButton = () => {
    const stravaLogout = () => {
        //Perform axios request and set user Tokens to ''
        console.log("Need to do axios to set tokens to null")
    }
    return (
        <button onClick={stravaLogout} className="btn btn-primary"> Authorize Strava</button>
    )
}

export default DeAuthStravaButton;