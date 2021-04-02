import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const Header = ({ logo }) => {
    return ( 

    	
    	<Row className= 'justify-content-center'>
        <img  src={logo} alt="lhrl-logo" className='round-img' /> 
        </Row>
      

        
    )
}

export default Header;