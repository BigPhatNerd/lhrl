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
                    return prev + cur.squats;
                    break;
                case "miles":
                    return prev + cur.squats;
                    break;

            }
        }, 0);

        return total;
    },
    goalSummary: (string, variable, goalCount) => {

        if(goalCount >= variable && variable !== null) {
            return "👏 You have completed your goal of " + variable + " " + string + "👏 \nUpdate goals and keep going :arrow_up:\n"
        } else if(variable !== null) {
            return goalCount + " of " + variable + " " + string + "\n"
        } else {
            return ""
        }
    },
    // Sum all of the completed reps for each workout for the week that have a goal associated with them
    accumulatedReps: (repsComplete, weeklyGoals) => {
        const reduce = repsComplete.reduce((acc, obj) => {

            if(weeklyGoals.pushups === null || weeklyGoals.pushups === undefined) { obj.pushups = 0 };
            if(weeklyGoals.situps === null || weeklyGoals.pushups === undefined) { obj.situps = 0 };
            if(weeklyGoals.squats === null || weeklyGoals.squats === undefined) { obj.squats = 0 };
            if(weeklyGoals.miles === null || weeklyGoals.miles === undefined) { obj.miles = 0 };
            return acc + obj.pushups + obj.situps + obj.squats + obj.miles
        }, 0);
        return reduce;
    },
    graphPercentage: (reps, weeklyGoals) => {
        const goalsTotals = weeklyGoals.pushups + weeklyGoals.situps + weeklyGoals.squats + weeklyGoals.miles;
        return Math.round((reps / goalsTotals) * 100)

    }


}




//