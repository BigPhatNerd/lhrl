import React from 'react';
import demoObject from './demoObject';
import { Container, Row, Col } from 'react-bootstrap';
const test = [
{
	one: "hello", 
	two: "world"
}]
const isEven = (i) =>{
	if(i % 2 === 0){
		return 0
	}
	return 1
}

const Demo = ({order}) =>{
	
	return(<Container>
		<Row>
		<hr style={{height:"2px", borderWidth:0, color:"gray",backgroundColor:"gray", width:"80%"}} />
		</Row>
		{demoObject.map((obj,i) =>{

return(
		<Row className="mb-3 align-items-center">
		<Col xs={12} md={6} md={{order: isEven(i)}} className="mb-3">
		<img  style={{maxWidth:"100%"}} src={obj.img} alt={obj.alt}   /> 
		</Col >
		<Col xs={12} md={6}className="text-center mb-3">
		<div style={{ textDecoration: "underline", fontSize: "1.2em"}}>{obj.title}</div>
		{obj.text.map(point =>(
		<div style={{textAlign: "left", marginLeft: "1rem", marginRight: "1rem", marginTop: "1.5rem"}}>{point}</div>
	))}
		</Col>

		</Row>
		)})}
		</Container>)
}

export default Demo;