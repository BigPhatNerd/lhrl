const axios = require('axios')
const static_select = require('./../../config/slack-interactions.js')
const web = require('../../config/slack-web-api.js')
const view5KProgram = require('../modals/fiveK/viewProgram')
const view10KProgram = require('../modals/tenK/viewProgram')
const viewHalfMarathon = require('../modals/halfMarathon/viewProgram')
const viewMarathon = require('../modals/marathon/viewProgram')

const createWorkoutModal = require('../modals/createWorkout/createWorkoutModal')
const viewWorkouts = require('../modals/createWorkout/viewWorkouts.js')
const viewFinishedWorkouts = require('../modals/completedWorkouts/viewCompletedWorkouts')
const {
    User,
    Workout,
    Program,
    WeeklyGoal,
    FinishedWorkout,
    Session,
    CrossFit,
    OAuth,
} = require('../../models/')
const { url } = require('../../lib/keys')
const urlString =
    process.env.NODE_ENV === 'production'
        ? 'https://www.lhrlapp.com'
        : url.development

static_select.action({ type: 'static_select' }, async (payload, respond) => {
    try {
        console.log('payload.actions: ', payload.actions)
        const findToken = await OAuth.findOne({ team_id: payload.team.id })
        const webAPI = web(findToken.access_token)
        var user_id = payload.user.id

        const value = payload.actions[0].selected_option.value
        if (payload.actions[0].action_id === 'public_private') {
            const userInfo = await webAPI.users.info({ user: user_id })
            const passUser = userInfo.user
            const channel = payload.actions[0].selected_option.value
            const user = await User.updateOne(
                { user_id },
                { $set: { channel_to_post: channel } }
            )

            return
        }

        //SELECT WORKOUT TYPE  to create a workout
        if (
            value === 'reps' ||
            value === 'rounds_plus_reps' ||
            value === 'time' ||
            value === 'load' ||
            value === 'distance' ||
            value === 'meters'
        ) {
            if (payload.view.callback_id === 'homepage_modal') {
                console.log('\n\n\ntrigger_id in static select: ', payload)
                const create = await createWorkoutModal(payload, value, 'slash')
                webAPI.views.push(create)
                return
            }

            const create = await createWorkoutModal(payload, value, 'home')
            webAPI.views.open(create)
            return
        }
        //VIEW CREATED WORKOUTS to view or create a workout
        else if (value === 'view_workout') {
            const workouts = await axios.get(
                `${urlString}/slack/get-workouts/${user_id}`
            )
            console.log('payload: ', payload)
            if (payload.view.callback_id === 'homepage_modal') {
                const workoutIndex = await viewWorkouts(
                    payload,
                    workouts,
                    'slash'
                )
                webAPI.views.push(workoutIndex)
                return
            }

            const workoutIndex = await viewWorkouts(payload, workouts, 'home')
            webAPI.views.open(workoutIndex)
            return
        }

        // VIEW COMPLETED WORKOUTS to view or complete a workout
        else if (value === 'completed_workouts') {
            const finishedWorkouts = await axios.get(
                `${urlString}/finishedWorkouts/${user_id}`
            )
            console.log('payload: ', payload)
            if (payload.view.callback_id === 'homepage_modal') {
                const finishedWorkoutIndex = await viewFinishedWorkouts(
                    payload,
                    finishedWorkouts,
                    'slash'
                )
                webAPI.views.push(finishedWorkoutIndex)
                return
            }
            const finishedWorkoutIndex = await viewFinishedWorkouts(
                payload,
                finishedWorkouts,
                'home'
            )
            webAPI.views.open(finishedWorkoutIndex)
        }

        //  5K Choose a plan
        else if (value === '5K') {
            const workouts = await axios.get(
                `${urlString}/programs/selectedProgram/view-program/${value}`
            )

            if (payload.view.callback_id === 'homepage_modal') {
                const fiveKIndex = await view5KProgram(
                    payload,
                    workouts,
                    'slash'
                )
                webAPI.views.push(fiveKIndex)
                return
            }
            const fiveKIndex = await view5KProgram(payload, workouts, 'home')
            webAPI.views.open(fiveKIndex)
        }

        // 10K Choose a plan
        else if (value === '10K') {
            const workouts = await axios.get(
                `${urlString}/programs/selectedProgram/view-program/${value}`
            )

            if (payload.view.callback_id === 'homepage_modal') {
                const tenKIndex = await view10KProgram(
                    payload,
                    workouts,
                    'slash'
                )
                webAPI.views.push(tenKIndex)
                return
            }
            const tenKIndex = await view10KProgram(payload, workouts, 'home')
            webAPI.views.open(tenKIndex)
        }
        // Half-Marathon Choose a plan
        else if (value === 'halfMarathon') {
            const workouts = await axios.get(
                `${urlString}/programs/selectedProgram/view-program/${value}`
            )

            if (payload.view.callback_id === 'homepage_modal') {
                const tenKIndex = await viewHalfMarathon(
                    payload,
                    workouts,
                    'slash'
                )
                webAPI.views.push(tenKIndex)
                return
            }
            const tenKIndex = await viewHalfMarathon(payload, workouts, 'home')
            webAPI.views.open(tenKIndex)
        }
        // Half-Marathon Choose a plan
        else if (value === 'marathon') {
            const workouts = await axios.get(
                `${urlString}/programs/selectedProgram/view-program/${value}`
            )

            if (payload.view.callback_id === 'homepage_modal') {
                const tenKIndex = await viewMarathon(payload, workouts, 'slash')
                webAPI.views.push(tenKIndex)
                return
            }
            const tenKIndex = await viewMarathon(payload, workouts, 'home')
            webAPI.views.open(tenKIndex)
        }
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = {
    middleware: static_select.expressMiddleware(),
}

//
