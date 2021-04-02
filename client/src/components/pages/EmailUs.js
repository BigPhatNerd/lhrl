import React, { useState } from 'react'
import axios from 'axios';
import Header from '../Header'
import { Container, Form, Button } from 'react-bootstrap';



const EmailUs = () => {
	const [info, setInfo] = useState({
	name: '',
	email: '',
	subject: '',
	message: ''
})
	const validate = (infoKey, messageItem) =>{
		if(infoKey === null || infoKey === ""){
			alert(`Please enter a ${messageItem}`)
			return false
		}
		return true

	}

const submitEmail = async (e) =>{
	e.preventDefault();
if(!validate(info.name, "name")) return;
if(!validate(info.email, "email")) return;
if(!validate(info.subject, "subject")) return;
if(!validate(info.message, "message")) return
		const postEmail = await axios.post('/nodemailer/send', info);

		if(postEmail.data.status === 'success'){
			alert("Message Sent");
			resetForm()
			return
		} else {
			alert("We seem to be having some technical difficulty.");
			resetForm()
			return
		}
}
const resetForm = () =>{
	setInfo({
			name: '', 
			email: '',
			subject: '',
			message: ''
		})
}	
	
	const handleInputChange = (event =>{
		let value = event.target.value;
		const name = event.target.name;

		setInfo({
			...info, [name]: value 
		})
	})
	

	return (
		<Container>
			<Header />
			<Form>
				<Form.Group controlId="formBasicName">
					<Form.Label>Name</Form.Label>
					<Form.Control 
					type="name" 
					placeholder="Enter name"
					name="name"
					value={info.name}
					onChange={handleInputChange}
					 />
					
					
					<Form.Text className="text-muted">
						Please enter your name
					</Form.Text>
				</Form.Group>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control 
					type="email" 
					placeholder="Enter email"
					name="email"
					value={info.email}
					onChange={handleInputChange}
					 />
					
					
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>
				<Form.Group controlId="formBasicSubject">
					<Form.Label>Subject </Form.Label>
					<Form.Control 
					type="subject" 
					placeholder="Enter Subject"
					name="subject"
					value={info.subject}
					onChange={handleInputChange}
					 />
					
					
					<Form.Text className="text-muted">
						Please enter subject.
					</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicMessage">
					<Form.Label>Message</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						placeholder="Message"
						name="message"
						value={info.message}
						onChange={handleInputChange}
					/>
				</Form.Group>

				<Button 
				variant="primary" 
				type="submit"
				onClick={submitEmail}
				>
					Send Email
				</Button>
			</Form>
		</Container>
	)
}

export default EmailUs
