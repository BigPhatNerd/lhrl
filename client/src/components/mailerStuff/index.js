import axios from 'axios';
export default{
	submitEmail: async function(event, info, resetForm, setState){
		event.preventDefault();
console.log("\n\n\nI was hittttt\n\n\n")
		const postEmail = axios.post('/nodemailer/send', info);

		if(postEmail.data.status === 'success'){
			alert("Message Sent");
			resetForm(setState)
		}

	},
	resetForm: function(setState){
		setState({
			name: '', 
			email: '',
			subject: '',
			message: ''
		})
	}

}


