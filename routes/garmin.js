const router = require('express').Router();
const axios = require('axios');
const config = { header: { 'Content-Type': 'application/json' } }

const url = 'https://hooks.slack.com/services/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';
const post = { "text": "wassup, bitches" }
router.route('/')
    .post(test)







 function test() {
    axios.post(url, post, config)

}
/*const requestOptions = {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      }
    };
    axios.post(url)
*/

module.exports = router;