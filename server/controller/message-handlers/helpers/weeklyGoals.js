module.exports = {
    goalCount: (repsComplete, movement) => {
        //this is how many reps have been completed this week in each individual category
        var total = repsComplete.reduce((prev, cur) => {

            switch (movement) {
                case "pushups":
                    return prev + cur.pushups;
                    break;
                case "situps":
                    return prev + cur.situps;
                    break;
                case "squats":
                    console.log("sur.squats: ", cur.squats);
                    return prev + cur.squats;
                    break;
                case "miles":
                    return prev + cur.miles;
                    break;

            }
        }, 0);

        return total;
    },
    goalSummary: (string, variable, goalCount) => {

        if(goalCount >= variable && variable !== null) {
            return "\n👏 You have completed your goal of " + variable + " " + string + "\nUpdate goals and keep going 👏\n\n"
        } else if(variable !== null) {
            return goalCount + " of " + variable + " " + string + "\n"
        } else {
            return ""
        }
    },
    goalSummaryMessage: (string, variable, goalCount, username) => {
        if(goalCount >= variable && variable !== null) {
            return `\n👏  Weekly goal of ${variable} ${string} is complete. 👏\n`
        } else if(variable !== null) {
            return `${goalCount} of ${variable} ${string}`
        } else {
            return ""
        }
    },


    // Sum all of the completed reps for each workout for the week that have a goal associated with them
    //if the goal has been surpassed, repsComplete only counts up to that goal.
    accumulatedReps: (repsComplete, weeklyGoals) => {
        var reducePushups = repsComplete.reduce((acc, obj) => {
            if(weeklyGoals.pushups === null || weeklyGoals.pushups === undefined) { obj.pushups = 0 };
            return acc + obj.pushups
        }, 0);
        var reduceSitups = repsComplete.reduce((acc, obj) => {
            if(weeklyGoals.situps === null || weeklyGoals.situps === undefined) { obj.situps = 0 };
            return acc + obj.situps
        }, 0);
        var reduceSquats = repsComplete.reduce((acc, obj) => {
            if(weeklyGoals.squats === null || weeklyGoals.squats === undefined) { obj.squats = 0 };
            return acc + obj.squats
        }, 0);
        var reduceMiles = repsComplete.reduce((acc, obj) => {
            if(weeklyGoals.miles === null || weeklyGoals.miles === undefined) { obj.miles = 0 };
            return acc + obj.miles
        }, 0);

        if(reducePushups > weeklyGoals.pushups) { reducePushups = weeklyGoals.pushups };
        if(reduceSitups > weeklyGoals.situps) { reduceSitups = weeklyGoals.situps };
        if(reduceSquats > weeklyGoals.squats) { reduceSquats = weeklyGoals.squats };
        if(reduceMiles > weeklyGoals.miles) { reduceMiles = weeklyGoals.miles };
        return reducePushups + reduceSitups + reduceSquats + reduceMiles

    },
    graphPercentage: (reps, weeklyGoals) => {
        const goalsTotals = weeklyGoals.pushups + weeklyGoals.situps + weeklyGoals.squats + weeklyGoals.miles;
        return Math.round((reps / goalsTotals) * 100)

    }


}




//