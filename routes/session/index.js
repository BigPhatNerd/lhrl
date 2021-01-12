const router = require('express').Router();
const { Session } = require('../../models');

router.get('/', async(req, res) =>{
try {
	const session = await Session.find();
	res.json(session);
} catch(err) {
	
	console.error(err.message);
	res.status(500).send('Server Error');
}

});

module.exports = router;