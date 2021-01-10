const router = require('express').Router();

const {
    getEverything
} = require('../../controller/getEverything');

router.route('/:user_id')
    .get(getEverything);

module.exports = router;