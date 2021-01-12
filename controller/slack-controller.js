const { User, Workout } = require('../models');
const createWorkout = require('./forms/createWorkout.js');
const { slack, sugarwod, url } = require('../lib/keys.js');
const { botToken, verificationToken, } = slack;
const web = require('./../config/slack-web-api.js');
const homepage = require('./homepage/homeview.js');
const axios = require('axios');
const sugarWodConfig = { 'Authorization': sugarwod.sugarwodKey }

const urlString = process.env.NODE_ENV === "production" ? url.production : url.development
console.log("urlString: ", urlString);
const slackController = {
    async editWorkout({ body, params }, res) {
        try {
            const workoutId = params.workoutId
            const workout = await Workout.findByIdAndUpdate(workoutId, body, { new: true, runValidators: true });
            res.json(workout)
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    },
    getWorkouts(req, res) {
        const user_id = req.params.user_id
        User.find({ user_id })
            .populate({
                path: 'workouts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbRes => {
                res.json(dbRes)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    async saveWorkout({ params, body }, res) {
        Workout.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate({ user_id: params.user_id }, { $addToSet: { workouts: _id } }, { new: true })
            })
            .then(workoutData => {
                if(!workoutData) {
                    res.status(404).json({ message: "No user found with that id!" })
                    return
                }
                res.json(workoutData);
            })
            .catch(err => {
                console.error(err.message);
                res.status(500).send('Server Error');
            })
    },
    async deleteWorkout({ params, body }, res) {
        try {
            const id = params.workoutId;
            const deletedWorkout = await Workout.findByIdAndDelete(id);
            res.json("Workout Deleted")
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    },
    async publishHomepage(req, res) {
        try {
            
             res.send(req.body);

            const { user } = req.body.event;
            console.log("user (in slack controller): ", user);
const api_app_id = req.body.api_app_id;
            const userInfo = await web.users.info({ user: user });
            const passUser = userInfo.user;


            const team_id = userInfo.user.team_id
            const createUser = await User.findOneAndUpdate({ user_id: passUser.id }, { $set: { team_id: team_id, user_name: passUser.name, api_app_id: api_app_id } }, { upsert: true, new: true });
            //Add axios call to get user's finished workouts and add the call to the homepage() function
            const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
            //OBCF WOD url http://lhrlslacktest.ngrok.io/sugarwod/obcf-wod
            //CF WOD url https://api.sugarwod.com/v2/workoutshq
            // const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });

            web.views.publish(homepage(passUser, allWorkouts));
        } catch (err) {

            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },



}

module.exports = slackController;