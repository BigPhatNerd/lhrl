const router = require('express').Router();

const {
    getEverything
} = require('../../controller/getEverything');

router.route('/:username')
    .get(getEverything);

module.exports = router;