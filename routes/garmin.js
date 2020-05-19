const router = require('express').Router();
const axios = require('axios');


router.route('/')
    .post((req, res) => {
        res.send({ text: 'joeblow' });

    });

function test() {
    axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=Qc34ZiQff5svU6MOiAumx5JMevW5mDKb')
        .then(res => {
            console.log(res.data.response.docs[0].abstract);
return res.data.response.docs[0].abstract
        })
}


module.exports = router;