const crypto = require('crypto')
const qs = require('qs')

const slackSigningSecret =
	process.env.NODE_ENV === 'production'
		? process.env.SLACK_SIGNING_SECRET
		: process.env.DEV_SLACK_SIGNING_SECRET

let signVerification = (req, res, next) => {
console.log("\n\n\n\nsignVerification is running\n\n\n")
	let slackSignature = req.headers['x-slack-signature']
	let requestBody = qs.stringify(req.body, { format: 'RFC1738' })
	let timestamp = req.headers['x-slack-request-timestamp']
console.log({slackSignature})
	let time = Math.floor(new Date().getTime() / 1000)

	if (Math.abs(time - timestamp) > 300) {
		return res.status(400).send('Ignore this request')
	}
	if (!slackSigningSecret) {
		console.log("signing secret empty")
		return res.status(400).send('Slack signing secret is empty.')
	}

	let sigBasestring = 'v0:' + timestamp + ':' + requestBody
	let mySignature =
		'v0=' +
		crypto
			.createHmac('sha256', slackSigningSecret)
			.update(sigBasestring, 'utf8')
			.digest('hex')
console.log("\n\ncrypto.timingSafeEqual(Buffer.from(mySignature, 'utf8'):", Buffer.from(mySignature, 'utf8'));
	console.log("\n\nBuffer.from(slackSignature, 'utf8'): ", Buffer.from(slackSignature, 'utf8'));
			if(crypto.timingSafeEqual(Buffer.from(mySignature, 'utf8'), Buffer.from(slackSignature, 'utf8'))){
			console.log("Signing secret working")
				next();
			} else {
				console.log("Signing secret failed")
				return res.status(400).send('Verification failed');
			}
} 

module.exports = signVerification;













//
