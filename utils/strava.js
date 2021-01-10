const stravaHelpers = {
    activityType: (type) => {
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
    },
    getMiles: (meters) => {
        var miles = meters * 0.000621371192;
        return miles.toFixed(2);
    },
    getKilometers: (meters) => {
        var kilometers = meters / 1000;
        return kilometers.toFixed(2);
    }
}



module.exports = stravaHelpers;