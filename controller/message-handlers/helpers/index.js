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
    }
}