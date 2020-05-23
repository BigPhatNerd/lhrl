const router = require('express').Router();
const axios = require('axios');
const config = { 'Content-Type': 'application / json' }

const url = process.env.GARMIN_WEBHOOK;
const nyTimesKey = process.env.NYTIMES_KEY;
const webAddress = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=' + nyTimesKey;

const post = { "text": "booga booga" }

router.route('/')
    .post((req, res) => {
        const input = req.body.text;
        res.send((req.body.response_url, { "text": "Fetching Garmin Data" }));
        axios.get(webAddress).then(response => {
            const listing = (response.data.response.docs).map(url => url.web_url)
            const test = listing.join();
            console.log(listing);

            axios.post(url, {
                mkdwn: true,
                text: test,
                attachments: ''
            }, config)

        }).catch((e) => console.log(e))
    })




function getSlackBody(res) {
    const slackBody = {
        mkdwn: true,
        text: res.data.response.docs[0].web_url,
        attachments: '',
    }
    return slackBody
}


async function test() {
    const test = await getArticle()
    await axios.post(url, test, config)
}

// const slackBody = {
//                 mkdwn: true,
//                 text: response.data.response.docs[0].web_url,
//                 attachments: '',


//             }

// send a POST request
// axios({
//   method: 'post',
//   url: '/login',
//   data: {
//     firstName: 'Finn',
//     lastName: 'Williams'
//   }
// });
// {
//   // `data` is the response that was provided by the server
//   data: {},

//   // `status` is the HTTP status code from the server response
//   status: 200,

//   // `statusText` is the HTTP status message from the server response
//   statusText: 'OK',

//   // `headers` the headers that the server responded with
//   // All header names are lower cased
//   headers: {},

//   // `config` is the config that was provided to `axios` for the request
//   config: {},

//   // `request` is the request that generated this response
//   // It is the last ClientRequest instance in node.js (in redirects)
//   // and an XMLHttpRequest instance the browser
//   request: {}
// }


module.exports = router;