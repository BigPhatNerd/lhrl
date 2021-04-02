import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const Header = ({ logo }) => {
    return ( 

    	
    	<Row className= 'justify-content-center mb-3'>
        <img  src={logo} alt="lhrl-logo" className='round-img' style={{textAlign: "center"}} /> 
        </Row>
      

        
    )
}

export default Header;