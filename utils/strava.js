const activityType = (type) => {
    switch (type) {
        case "Run":
            return "🏃‍♂️"
            break;
        case "Swim":
            return "🏊‍♀️"
            break;
        case "WeightTraining":
            return "🏋"
            break;
        case "Yoga":
            return "🧘‍♀️"
        case "Workout":
            return "💪"
            break;
        default:
            return "🌎";

    }
}




module.exports = {
    activityType
}