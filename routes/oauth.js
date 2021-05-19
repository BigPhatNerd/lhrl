const router = require('express').Router();

const { slack } = require('../lib/keys');
const request = require('request');
const { url } = require('../lib/keys');
const urlString = process.env.NODE_ENV === "production" ? url.production : url.development;
const clientId = process.env.NODE_ENV === "production" ? slack.clientID : slack.dev_clientID;
const clientSecret = process.env.NODE_ENV === "production" ? slack.clientSecret : slack.dev_clientSecret;
const { OAuth, User } = require('../models');




router.route("/")
    .get((req, res) => {
     console.log("\n\n\nI am being hit in routes/oauth\n\n\n")
        if(!req.query.code) {
            res.status(500);
            res.send({ "Error": "Looks like we're not getting code." });
            console.log("Looks like we are not getting code.");
        } else {
 
            request({
                url: 'https://slack.com/api/oauth.v2.access',
                qs: { code: req.query.code, client_id: clientId, client_secret: clientSecret, redirect_uri: `${urlString}/oauth/` },
                method: 'GET',
            }, async function(error, response, body) {
                console.log("Let's see hat we have going on here!")
                console.log("\n\nbody: ", JSON.parse(body));
                if(error) {
                    console.log(error);
                } else {
                    body = JSON.parse(body);
                    // const createUser = await User.findOneAndUpdate({ user_id: user_id }, { $set: { team_id: team_id, user_name: user_name } }, { upsert: true, new: true });
                    if(body.is_enterprise_install === false) {
                         const createToken = await OAuth.findOneAndUpdate({ team_id: body.team.id }, {
                            $set: {
                                app_id: body.app_id,
                                authed_user_id: body.authed_user.id,
                                authed_user_access_token: body.authed_user.access_token,
                                bot_user_id: body.bot_user_id,
                                access_token: body.access_token,
                                team_id: body.team.id,
                                webhook_channel: body.incoming_webhook.channel,
                                webhook_channel_id: body.incoming_webhook.channel_id,
                                webhook: body.incoming_webhook.url
                            }
                        }, { upsert: true, new: true });
                   
                        const addToUser = await User.findOneAndUpdate({ user_id: body.authed_user.id }, { $set: { oauth: createToken } }, { upsert: true, new: true })
                       
                        //     const user_id = params.user_id;
                        //  const weeklyGoal = await WeeklyGoal.create(body);
                        // const addGoal = await User.findOneAndUpdate({ user_id: user_id }, { $push: { weeklyGoals: weeklyGoal } }, { new: true });
                    } else {
                         const createToken = await OAuth.findOneAndUpdate({ team_id: body.team.id }, {
                            $set: {
                                app_id: body.app_id,
                                authed_user_id: body.authed_user.id,
                                authed_user_access_token: body.authed_user.access_token,
                                bot_user_id: body.bot_user_id,
                                access_token: body.access_token,
                                team_id: body.team.id,
                                enterprise_id: body.enterprise.id,
                                webhook_channel: body.incoming_webhook.channel,
                                webhook_channel_id: body.incoming_webhook.channel_id,
                                webhook: body.incoming_webhook.url
                            }
                        }, { upsert: true, new: true });
                   
                        const addToUser = await User.findOneAndUpdate({ user_id: body.authed_user.id }, { $set: { oauth: createToken } }, { upsert: true, new: true })
                      

                    }
                    res.json({ msg: "Successfully installed LHRL® App" });
                }
            })
        }
    })

module.exports = router;