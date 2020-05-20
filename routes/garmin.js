const router = require('express').Router();
const axios = require('axios');
const config = { 'Content-Type': 'application / json' }

const url = process.env.WEBHOOK;

const post = { "text": "booga booga" }

router.route('/')
    .post((req, res) => {
        const request = axios.post(url, post, config)
        res.json(request);
    })


function test() {
    axios.post(url, post, config).then(function(response) {
            console.log(response)
        })
        .catch(function(error) {
            console.log(error)
        })
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