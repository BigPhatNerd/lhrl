const { User, Workout, CrossFit, OAuth } = require('../../models');
const { slack, sugarwod, url } = require('../../lib/keys.js');
const { botToken, verificationToken, } = slack;
const web = require('../../config/slack-web-api.js');
const homepage = require('../homepage/homeview.js');
const axios = require('axios');
const sugarWodConfig = { 'Authorization': sugarwod.sugarwodKey };
const welcome = require('../modals/welcome');

const urlString = process.env.NODE_ENV === "production" ? url.production : url.development

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
                options: { sort: { 'date': -1 } },
                select: '-__v'
            })
            .select('-__v')
            // .sort({ _id: -1 })
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

            //I think I just comment this out since the url has already been registered?
            // res.send(req.body)
          
            var { user } = req.body.event;
          res.send(200);
            
             const findToken = await OAuth.findOne({ team_id: req.body.team_id });
             //WHEN GETTING invalid_auth do the script below
            // const findToken = await OAuth.findOneAndUpdate({ team_id: 'T012RRU3P3R' }, {
            //                 $set: {
            //                     app_id: 'A015X5NC2QY',
            //                     authed_user_id: 'U012ZRTR2P8',
            //                     authed_user_access_token: "xoxp-Look up my other token ",
            //                     bot_user_id: 'U0157GYHGBD',
            //                     access_token: "xoxb-loop up my token!!",
            //                     team_id: "T012RRU3P3R",
            //                     webhook_channel: "#lhrl",
            //                     webhook_channel_id: "Set channel id",
            //                     webhook: "lookup my dev webhook"
            //                 }
            //             }, { upsert: true, new: true });
            //^^ RUN THE SCRIPT ABOVE FOR INVALID AUTHS WHEN REINSTALLING IN DEV SPACE
           
            const webAPI = web(findToken.access_token);
            const api_app_id = req.body.api_app_id;
            user = user.trim();
            const userInfo = await webAPI.users.info({ user: user });
            
            const passUser = userInfo.user;


            const team_id = userInfo.user.team_id;


            const createUser = await User.findOneAndUpdate({ user_id: passUser.id }, { $set: { team_id: team_id, user_name: passUser.name, api_app_id: api_app_id } }, { upsert: true, new: true });

            //Add axios call to get user's finished workouts and add the call to the homepage() function
            const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);

            const wod = await CrossFit.find().limit(1).sort({ date: -1 });
            const showHomepage = await homepage(passUser, allWorkouts, wod[0])

const secondWebAPI = web(findToken.authed_user_access_token);

if(!req.body.event.view){
const confirm = await secondWebAPI.chat.postMessage({
    channel: findToken.webhook_channel_id,
    user: req.body.event.user,
   
    "blocks": [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": ":tada: Welcome to the LHRL® App! :tada:\n Make yourself at :house_with_garden:\n\nFeel free to use the app either from the homepage or open the app by using the `/lhrl` command.\nWe hope that this app serves as fun way to stay motivated inside your Slack workspace. Be sure to invite everyone to the channel you chose for the LHRL® App to post. \n If you are a public person, you can share your workouts with the group by selecting the :loud_sound: option. If you like to keep things private, be sure and keep the selection set to :shushing_face: each time that you submit or create a workout.",
                
            }
        },
            {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "If you would like to suggestion an 💡, report a 🐞 or just say 👋, feel free to shoot us an email."
            },
           
        },
{
    "type": "actions",
         "elements": [{
                "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "📣 Contact Us 📣",
                        "emoji": true,
                    },
                    "value": "contact",
                    "action_id": "contact",
            }
            ]
        },
         {
            "type": "section",
            "text": {
                 "type": "plain_text",
                "text": "If you have any questions about the functionality of the app, checkout our ❓FAQ❓ section on our site (We plan to continuously keep this updated).",
                "emoji": true,
            }
           
        },
        {
    "type": "actions",
         "elements": [{
                "type": "button",
                    "text": {
                        "type": "plain_text",
                        text: "❓ FAQs ❓",
                        "emoji": true,
                    },
                    value: "faqs",
                    url: `http://www.lhrlapp.com/support`,
                    action_id: "faqs",
            }
            ]
        },
        {
            "type": "section",
            "text": {
                "type": "plain_text",
                "text": "One more 💡, please come be a part of the most supportive and encouraging fitness community in the 🌎. Join the LHRL® Community FB Page.",
                "emoji": true,
            }
           
        },
          {
    "type": "actions",
         "elements": [{
                "type": "button",
                    "text": {
                        "type": "plain_text",
                       text: "🔗 Join Community 🔗",
                        "emoji": true,
                    },
                   value: "community",
                    url: `https://www.facebook.com/groups/LiftHeavyRunLong`,
                    action_id: "community",
            }
            ]
        },

        
    
        
    ]

})
}
            webAPI.views.publish(showHomepage)
            return
        } catch (err) {

            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },



}

module.exports = slackController;