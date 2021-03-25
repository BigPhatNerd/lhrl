import React from 'react';
import demoObject from './demoObject';
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
	
	return(<div style={{marginTop: "2rem"}}>
		<hr style={{height:"2px", borderWidth:0, color:"gray",backgroundColor:"gray", width:"80%", margin:"auto", marginBottom:"2rem"}} />
		{demoObject.map((obj,i) =>{

return(
		<div style={{display: "flex", justifyContent: "space-around",  width: "80%", margin: "auto", marginBottom: "2rem"}}>

		<img style={{order: isEven(i)}} src={obj.img} alt={obj.alt} className="photo"  /> 
		<div class="text-box" >
		<div style={{ textDecoration: "underline", fontSize: "1.2em", marginTop: "1rem", marginBottom: "4rem"}}>{obj.title}</div>
		{obj.text.map(point =>(
		<div style={{textAlign: "left", marginLeft: "1rem", marginRight: "1rem", marginTop: "1.5rem"}}>{point}</div>
	))}
		</div>

		</div>
		)})}
		</div>)
}

export default Demo;