import React from 'react';
import demoObject from './demoObject';
const test = [
{
	one: "hello", 
	two: "world"
}]

const Demo = ({order}) =>{
	
	return(<div>
		{demoObject.map(obj =>(
		<div style={{display: "flex", justifyContent: "space-around", border: "1px solid", width: "80%", margin: "auto"}}>

		<img src={obj.img} alt={obj.alt} className="photo"  /> 
		<div class="text-box" >
		<div style={{order: order, textDecoration: "underline", fontSize: "1.2em", marginTop: "1rem", marginBottom: "4rem"}}>{obj.title}</div>
		{obj.text.map(point =>(
		<div style={{textAlign: "left", marginLeft: "1rem", marginRight: "1rem", marginTop: "1.5rem"}}>{point}</div>
	))}
		</div>

		</div>
		))}
		</div>)
}

export default Demo;