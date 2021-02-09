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
    },
    timeOfWorkout: (seconds) => {
        var hours = Math.floor(seconds / 3600);
        seconds = seconds - hours * 3600;
        var minutes = Math.floor(seconds / 60);
        var seconds = seconds - minutes * 60;

        if(hours > 0) {
            return `${hours}h ${minutes}m ${seconds}s`
        }
        return `${minutes}m ${seconds}s`
    },
    avgMile: (seconds, meters) => {
        var avgMinutes = Math.floor(seconds / 60 / (meters / 1609.34));
        var avgSeconds = Math.floor((seconds / 60 / (meters / 1609.34) - avgMinutes) * 60);
        if(avgSeconds < 10) {
            return `${avgMinutes}:0${avgSeconds} /mi`
        }
        return `${avgMinutes}:${avgSeconds} /mi`;

    }

}



module.exports = stravaHelpers;