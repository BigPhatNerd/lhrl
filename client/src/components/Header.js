import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const Header = ({ logo }) => {
    return ( 

    	
    	<Container className= 'text-center mt-3'>
        <img  src={logo} alt="lhrl-logo" className='round-img' style={{textAlign: "center"}} /> 
        </Container>
      

        
    )
}

export default Header;