import React from 'react';
import { Row, Image } from 'react-bootstrap';
import logo from '../img/lhrl.png';
const Header = () => {
    return ( 

    	
    	<Row className= 'justify-content-center'>
        <Image  src={logo} width={171} height={180}alt="lhrl-logo" roundedCircle /> 
        </Row>
      

        
    )
}

export default Header;