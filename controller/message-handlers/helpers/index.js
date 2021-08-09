module.exports = {
    createGoalsMessage: (movement, movementValue) => {
        if(typeof movement === "undefined" || movementValue === null) {
            return ''
        }
        return movementValue + " " + movement + "\n"

    },

    addRepsMessage: (movement, movementValue) => {
        if(typeof movement === 'undefined') {
            return ''
        }
        return "Test later"
    },
    //intValidation is currently not being used.
    intValidation: (value, blockId) => {
        
        if(!value) {
            
            return Promise.resolve({
                response_action: "errors",
                errors: {
                    minutes: "Must enter an integer"
                }
            })
        }
    },
    postString: (channel, text, data) => {
//   var string = `🏋️‍♀️ ${passUser.real_name} just finished a new workout 🏋\n`;
  var string = ''
  string += text;
  for (const [key, value] of Object.entries(data)) {
	   if (key === "description") {
        string += `*${key.toUpperCase()}:*\n ${value}\n\n`;
     } else {
		  string += `*${key.toUpperCase()}:* ${value}\n`;
	 }
   
  }
  

 return {	
	 channel: channel,
	text: text,
	blocks: [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": string
				
			}
		}
	]
}
}


}