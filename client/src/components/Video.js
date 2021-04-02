import React from 'react'
import video from '../img/slack_app_movie_converted.mp4'

const Video = () => {
	return (
		<video style={{width: "100%"}} autoPlay loop muted playsInline>
			<source src={video} type="video/mp4" />
		</video>
	)
}

export default Video