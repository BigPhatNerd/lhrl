const ngrokController = {
    sendMessage(req, res) {
        console.log("req.body: ", req.body);
        res.send("Your ngrok tunnel is up and running");
    },

}

module.exports = ngrokController