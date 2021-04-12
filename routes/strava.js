const router = require("express").Router();
const { User, Strava, Session, FinishedWorkout, OAuth } = require("../models");
const passport = require("../config/authentication");
const { slack, strava, url } = require("../lib/keys");
const axios = require("axios");
const config = { "Content-Type": "application/json" };
const hook = slack.webHook;
const open = require("open");
const stravaToken = strava.accessToken;
const { refreshToken } = require("../controller/strava-controller");
const stravaAuth = require("../config/authentication");
const passUser = require("../config/middleware/passUser");
const urlString =
    process.env.NODE_ENV === "production" ? url.production : url.development;
const webAddress = "https://www.strava.com/api/v3/athlete";
const puppeteer = require("puppeteer");
const {
    stravaHook,
    testSlackBlock,
} = require("../slack-templates/strava-templates");
const post = { text: "booga booga" };

router.get("/find", async (req, res) => {
    const findUser = await User.findOne({ email: req.query.email });
    res.json(findUser);
});

//deauthorize strava by removing access and refresh tokens
router.put("/deauth/:stravaId", async (req, res) => {
    const stravaId = req.params.stravaId;
    const update = {
        stravaAccessToken: "",
        stravaRefreshToken: "",
        authorizeStrava: false,
    };
    let user = await User.findOneAndUpdate(stravaId, update, {
        new: false,
    });

    const { team_id, api_app_id } = user;

    res.json(user);
});

//Create route for STRAVA webhook to go to Slack

router.post("/webhook", async (req, res) => {
    try {
        
        const { aspect_type, object_id, owner_id, object_type } = req.body;
        if (aspect_type === "delete") {
            console.log(`${owner_id} deleted an activity`);
            return;
        }
        //Refresh User's token:
        const accessToken = await refreshToken(owner_id);
        //GET the data of the activity from Strava
        const stravaData = await axios.get(
            `https://www.strava.com/api/v3/athlete/activities?per_page=1`,
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );
        console.log("About to map through the Strava data")
        const stravaArray = [];
        const stravaBody = {};
     
     const insertData =  () =>{

        stravaData.data.map(data =>{
        stravaBody = {
            type: data.type,
            distance: data.distance,
            seconds: data.elapsed_time,
            stravaId: data.owner_id,
}
        stravaArray.push(stravaBody)   
        })
      return stravaArray
  }

 const addData = insertData();

 console.log({addData})

        //Destructure informationreturned from stravaData:
        // const {
        //     type,
        //     athlete,
        //     distance,
        //     elapsed_time,
        //     start_date,
        //     average_temp,
        //     average_speed,
        //     max_speed,
        //     map,
        // } = stravaData.data[0];
        // const stravaBody = {
        //     type: type,
        //     distance: distance,
        //     seconds: elapsed_time,
        //     stravaId: owner_id,
        // };
        console.log("stravaData: ", stravaData.data[0]);
        // const finishedWorkouts = await FinishedWorkout.create(stravaBody);
        const finishedWorkouts = await FinishedWorkout.collection.insertMany(addData);
        console.log({finishedWorkouts})
        const addFinishedWorkout = await User.findOneAndUpdate(
            { stravaId: owner_id },
            { $push: { finishedWorkouts: finishedWorkouts } },
            { new: true }
        );
        //Save the information to mongoose by searching for stravaId
        console.log("addFinished workout: ", addFinishedWorkout);
        console.log(
            "Take the user and search OAuth based on addFinishedWorkout.team_id...or whatever"
        );

        const differentArray = [];
        const differentBody = {};

        const insertDifferentData = () =>{
              stravaData.data.map(data =>{
        differentBody = {
            type: data.type,
            owner_id: data.athlete.id,
            distance: data.distance,
            elapsed_time: data.elapsed_time,
            start_date: data.start_date,
            average_temp: data.average_temp,
            average_speed: data.average_speed,
            max_speed: data.max_speed,
            stravaMap: data.map.summary_polyline,
}
        differentArray.push(body)   
        })
      return differentArray
        }

        console.log({insertDifferentData})
        console.log({ stravaData });
     const testData = () =>{
            stravaData.map(data =>{
                console.log("Console.logging stravaData")
                console.log({data})
            })
        }
        testData();

const createStrava = await Strava.collection.insertMany(insertDifferentData);
console.log({createStrava});
const returnArray = () =>{
    const array = [];
    createStrava.map(data =>{
        array.push(data._id);
    })
    return array;
}

console.log({returnArray})

const addToUser = await User.findOneAndUpdate(
    {stravaId: stravaData.data[0].owner_id},
    {$push: {stravaWorkouts: returnArray() }},
    { new: true });

console.log({ addToUser });
//Find the webhook for the particular team
const oauth = await OAuth.findOne({
    team_id: addFinishedWorkout.team_id
});
console.log({oauth})
const postToChannel = await axios.post( oauth.webhook, stravaHook(stravaData, addToUser.name, addToUser.stravaAvatar), config)



        // Strava.create(body)
        //     .then(({ _id }) => {
        //         return User.findOneAndUpdate(
        //             { stravaId: owner_id },
        //             { $addToSet: { stravaWorkouts: _id } },
        //             { new: true }
        //         );
        //     })
        //     .then((activityData) => {
        //         if (!stravaData) {
        //             res.status(404).json({
        //                 message: "No user found with that id!",
        //             });
        //             return;
        //         }

        //         const { name, stravaAvatar } = activityData;
        //         //Trying to find the webhook from the users team_id but not sure If I am calling it right
        //         OAuth.findOne({ team_id: addFinishedWorkout.team_id }).then(
        //             (response) => {
        //                 console.log({ response });
        //                 //I think that stravaHook would be where I could map through however many workouts were added.
        //                 axios.post(
        //                     response.webhook,
        //                     stravaHook(stravaData.data[0], name, stravaAvatar),
        //                     config
        //                 );
        //             }
        //         );
        //     });

        res.status(200).send("EVENT_RECEIVED");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Adds support for GET requests to STRAVA webhook
router.get("/webhook", (req, res) => {
    const VERIFY_TOKEN = "STRAVA";
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    if (mode && token) {
        if (mode === "subscribe" && token === VERIFY_TOKEN) {
            //Responds with the challenge token from the request
            console.log("WEBHOOK RECEIVED");
            res.json({ "hub.challenge": challenge });
        } else {
            res.sendStatus(403);
        }
    }
});

router.route("/loginfromslack").post(async (req, res) => {
    try {
        //First I need to get the user requesting the login from slack and store it.
        const { team_id, user_id, user_name, api_app_id } = req.body;
        req.session.userId = user_id;
        const deleteSessions = await Session.deleteMany({});
        const createSession = await Session.create({
            userId: user_id,
            team_id: team_id,
            api_app_id: api_app_id,
        });
        const createUser = await User.findOneAndUpdate(
            { user_id: user_id },
            { $set: { team_id: team_id, user_name: user_name } },
            { upsert: true, new: true }
        );
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`${urlString}/strava/login`);
        await browser.close();
        return createUser;
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get(
    "/login",
    passport.authenticate("strava", {
        scope: "activity:read_all",
    })
);

router.get("/redirect", passport.authenticate("strava"), async (req, res) => {
    const session = await Session.find({});
    const { team_id, api_app_id } = session[0];
    res.redirect(`${urlString}/auth`);
    return;
});

module.exports = router;
