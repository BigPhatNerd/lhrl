const mongoose = require('mongoose');
const axios = require('axios');

const { sugarwod } = require('../../../lib/keys.js');
const sugarWodConfig = { 'Authorization': sugarwod.sugarwodKey };
const { CrossFit } = require('../../../models');

const array = [];
const getEverything = (apiCall) => {
    apiCall.data.map(wod => {
        const { title, description, score_type } = wod.attributes;
        const data = {
            name: title,
            description: description,
            type: score_type
        }
        array.push(data);
    })
    return array
}
const cfFunction = async () => {
    try {
        const getCFWod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
        const getObcfWod = await axios.get('http://lhrlslacktest.ngrok.io/sugarwod/obcf-wod', { headers: sugarWodConfig });
        getEverything(getCFWod.data);
        getEverything(getObcfWod.data);
        console.log("ARRAY: ", array);
        //Have run once a day and save all of these to database. 
        const addCFWods = await CrossFit.collection.insertMany(array);
        console.log('addCFWod: ', addCFWods);
    } catch (err) {

        console.error(err.message);

    }

}

// cfFunction();