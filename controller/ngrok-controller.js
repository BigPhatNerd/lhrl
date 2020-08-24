const ngrokController = {
    sendMessage(req, res) {
        res.send("Your ngrok tunnel is up and running");
    },

}

module.exports = ngrokController