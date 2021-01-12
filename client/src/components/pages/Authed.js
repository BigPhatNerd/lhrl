import React, { useState, useEffect } from 'react';
import axios from 'axios';



const Authed = () => {
	const [url, setUrl] = useState('');
	useEffect(() =>{
		const fetchData = async () =>{
		const url = await axios.get(`/session`);
		console.log("url: ", url);
		const { team_id, api_app_id } = url.data[0];
		setUrl(`slack://app?team=${team_id}&id=${api_app_id}&tab=about`)
	};
	fetchData();
	}, [])


    return ( 

    	<>
        <h1> Strava has been successfully authorized.</h1>
      <a href={url}>Take me back to Slack</a>
        </>
    )
}

export default Authed;