import React from 'react';
import { Row, Container } from 'react-bootstrap';
import Header from '../Header';

const SuccessfulInstall = () => {

    return ( 
<Container>
<Header />
    	 <Row className="justify-content-center mt-3">
             <h2>🥳 Congratulations 🥳</h2>
             </Row>
             <Row className="justify-content-center mt-2">
             <p>You have successfully installed the LHRL® App on Slack. Enjoy! </p>
             </Row>
             </Container>

    )
}

export default SuccessfulInstall;