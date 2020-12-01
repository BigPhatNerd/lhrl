const homeViewHelper = {
    test(something) {

        const response = {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": something,
                "emoji": true
            }
        }
        return response


    }
}

module.exports = homeViewHelper;