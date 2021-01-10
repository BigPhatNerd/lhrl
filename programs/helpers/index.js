var dayjs = require('dayjs');
const helpers = {

    dateHelper(start, numberOfDays) {

        return dayjs(start).add(numberOfDays, 'days').format('dddd MMMM D YYYY');
    },


}

module.exports = helpers;