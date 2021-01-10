var dayjs = require('dayjs');
const helpers = {

    dateHelper(start, numberOfDays) {
        return dayjs(start).add(numberOfDays, 'days').format('YYYY-MM-D');
    },


}

module.exports = helpers;