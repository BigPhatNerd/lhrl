import React from 'react';
import { Container, Row } from 'react-bootstrap';


const Contact = () => {
	return(
		<Container>
			<Row>
				 <div style={{ marginBottom: "2rem"}}>If you have any questions about the use of the app, please contact us at <a style={{fontSize:"1rem"}}href = "mailto: app@liftheavyrunlong.com">app@liftheavyrunlong.com</a></div>
			</Row>
		</Container>
		)
}

export default Contact;