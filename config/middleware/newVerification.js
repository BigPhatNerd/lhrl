
            const qs = require('querystring');
const crypto = require('crypto');


const secret = process.env.NODE_ENV === 'production' ? process.env.SLACK_SIGNING_SECRET : process.env.DEV_SLACK_SIGNING_SECRET;
const verifySignature = function(req) {
    const signature = req.headers['x-slack-signature'];
    const timestamp = req.headers['x-slack-request-timestamp'];
    const hmac = crypto.createHmac('sha256', secret );
    const [version, hash] = signature.split('=');
    hmac.update(`${version}:${timestamp}:${req.rawBody}`);

const left = hmac.digest('hex');
const right = hash;

    return left === right
}

let newVerification = (req, res, next) =>{
	const signature = req.headers['x-slack-signature'];
    const timestamp = req.headers['x-slack-request-timestamp'];
    const hmac = crypto.createHmac('sha256', secret );
    const [version, hash] = signature.split('=');
    hmac.update(`${version}:${timestamp}:${req.rawBody}`);

const left = hmac.digest('hex');
const right = hash;
console.log({right, left})
if(right === left) {
	console.log("Verification success");
	next();
} else {
	
				console.log("Signing secret failed")
				return res.status(400).send('Verification failed');
			
}

}

module.exports = newVerification