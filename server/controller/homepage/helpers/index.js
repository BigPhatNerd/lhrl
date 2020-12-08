module.exports = {
    currentlySubscribed: (userProgram) => {
        console.log("userProgram.data[0].selectedProgram: ", userProgram.data[0].selectedProgram.length);
        console.log(userProgram.data[0].selectedProgram === []);

        const program = (userProgram.data[0].selectedProgram.length === 0) ? "" : userProgram.data[0].selectedProgram[0].name;
        console.log("program: ", program);
        const noProgram = {
            "type": "section",
            "text": {
                "type": "plain_text",
                "text": "You are currently not subscribed to any programs.",
                "emoji": true
            }
        };

        const hasProgram = {
            "type": "section",
            "text": {
                "type": "plain_text",
                "text": "Currently subscribed to: " + program,
                "emoji": true
            },
            "accessory": {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "View Program Workouts",
                    "emoji": true
                },
                "value": "program_workouts",
                "action_id": "program_workouts"
            }
        };
        if(program === "") {
            return noProgram
        }

        return hasProgram
    },

    removeFromProgram: (userProgram) => {
        const program = (userProgram.data[0].selectedProgram.length === 0) ? "" : userProgram.data[0].selectedProgram[0].name;
        const divider = {
            "type": "section",
            "text": {
                "type": "plain_text",
                "text": "Figure out how to remove later"
            }
        };
        const removeProgram = {

            "type": "section",
            "text": {
                "type": "plain_text",
                "text": "Remove me from program: " + program,
                "emoji": true
            },
            "accessory": {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Remove Plan",
                    "emoji": true
                },
                "value": "remove_workouts",
                "action_id": "remove_workouts"
            }
        };

        if(program === "") {
            return divider
        }

        return removeProgram

    }





}





//