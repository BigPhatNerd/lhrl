const submitScore = (payload, wod, slashOrHome, publicChannels) => {
    const channelOptions = publicChannels.map(channel => {
        return {
            text: {
                type: 'plain_text',
                text: channel,
                emoji: true,
            },
            value: channel,
        }
    })

    const staticSelect = {
        type: 'section',
        block_id: 'type',
        text: {
            type: 'plain_text',
            text: 'Keep private 🤫 or post to channel 🔊',
            emoji: true,
        },
        accessory: {
            type: 'static_select',

            placeholder: {
                type: 'plain_text',
                text: 'Keep private 🤫',

                emoji: true,
            },
            options: channelOptions,
            action_id: 'public_private',
        },
    }

    const { trigger_id } = payload

    const { title, description, type, _id, name } = wod
    if (type === 'Rounds + Reps') {
        const roundsPlusReps = {
            trigger_id: trigger_id,
            // 'external_id': _id,
            view: {
                type: 'modal',
                callback_id: 'cf_daily',
                private_metadata: JSON.stringify({
                    home_or_slash: slashOrHome,
                    title: title,
                    description: description,
                    score_type: type,
                    id: _id,
                }),

                title: {
                    type: 'plain_text',
                    text: 'CF WOD',
                    emoji: true,
                },
                submit: {
                    type: 'plain_text',
                    text: 'Submit',
                    emoji: true,
                },
                close: {
                    type: 'plain_text',
                    text: 'Close',
                    emoji: true,
                },
                blocks: [
                    staticSelect,
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Title:* ${title}`,
                        },
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Description:* ${description}`,
                        },
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Score Type:* ${type}`,
                        },
                    },

                    {
                        type: 'input',
                        optional: false,
                        block_id: 'rounds',
                        element: {
                            type: 'plain_text_input',
                            action_id: 'rounds',
                        },
                        label: {
                            type: 'plain_text',
                            text: 'Enter Rounds',
                            emoji: true,
                        },
                    },
                    {
                        type: 'input',
                        block_id: 'reps',
                        element: {
                            type: 'plain_text_input',
                            action_id: 'reps',
                        },
                        label: {
                            type: 'plain_text',
                            text: 'Reps',
                            emoji: true,
                        },
                    },
                    {
                        type: 'input',
                        block_id: 'notes',
                        element: {
                            type: 'plain_text_input',
                            multiline: true,
                            action_id: 'notes',
                        },
                        label: {
                            type: 'plain_text',
                            text: 'Notes',
                            emoji: true,
                        },
                    },
                    {
                        type: 'divider',
                    },
                ],
            },
        }
        return roundsPlusReps
    } else if (type === 'Reps') {
        const roundsPlusReps = {
            trigger_id: trigger_id,
            // 'external_id': _id,
            view: {
                type: 'modal',
                callback_id: 'cf_daily',
                private_metadata: JSON.stringify({
                    home_or_slash: slashOrHome,
                    title: title,
                    description: description,
                    score_type: type,
                    id: _id,
                }),

                title: {
                    type: 'plain_text',
                    text: 'CF WOD',
                    emoji: true,
                },
                submit: {
                    type: 'plain_text',
                    text: 'Submit',
                    emoji: true,
                },
                close: {
                    type: 'plain_text',
                    text: 'Close',
                    emoji: true,
                },
                blocks: [
                    staticSelect,
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Title:* ${title}`,
                        },
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Description:* ${description}`,
                        },
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Score Type:* ${type}`,
                        },
                    },

                    {
                        type: 'input',
                        block_id: 'reps',
                        element: {
                            type: 'plain_text_input',
                            action_id: 'reps',
                        },
                        label: {
                            type: 'plain_text',
                            text: 'Reps',
                            emoji: true,
                        },
                    },
                    {
                        type: 'input',
                        block_id: 'notes',
                        element: {
                            type: 'plain_text_input',
                            multiline: true,
                            action_id: 'notes',
                        },
                        label: {
                            type: 'plain_text',
                            text: 'Notes',
                            emoji: true,
                        },
                    },
                    {
                        type: 'divider',
                    },
                ],
            },
        }
        return roundsPlusReps
    } else if (type === 'Time') {
        const time = {
            trigger_id: trigger_id,

            // "response_action": "errors",
            // "errors": {
            //     "minutes": "what the fuck do i do here"
            // },

            view: {
                type: 'modal',
                callback_id: 'cf_daily',
                private_metadata: JSON.stringify({
                    title: title,
                    description: description,
                    score_type: type,
                    home_or_slash: slashOrHome,
                    id: _id,
                }),

                title: {
                    type: 'plain_text',
                    text: 'CF WOD',
                    emoji: true,
                },
                submit: {
                    type: 'plain_text',
                    text: 'Submit',
                    emoji: true,
                },
                close: {
                    type: 'plain_text',
                    text: 'Close',
                    emoji: true,
                },
                blocks: [
                    staticSelect,
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Title:* ${title}`,
                        },
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Description:* ${description}`,
                        },
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Score Type:* ${type}`,
                        },
                    },

                    {
                        type: 'input',
                        optional: false,
                        block_id: 'minutes',
                        element: {
                            type: 'plain_text_input',
                            action_id: 'minutes',
                        },
                        label: {
                            type: 'plain_text',
                            text: 'Enter Minutes',
                            emoji: true,
                        },
                    },
                    {
                        type: 'input',
                        block_id: 'seconds',
                        element: {
                            type: 'plain_text_input',
                            action_id: 'seconds',
                        },
                        label: {
                            type: 'plain_text',
                            text: 'Enter Seconds',
                            emoji: true,
                        },
                    },
                    {
                        type: 'input',
                        optional: true,
                        block_id: 'notes',
                        element: {
                            type: 'plain_text_input',
                            multiline: true,
                            action_id: 'notes',
                        },
                        label: {
                            type: 'plain_text',
                            text: 'Notes',
                            emoji: true,
                        },
                    },
                    {
                        type: 'divider',
                    },
                ],
            },
        }
        return time
    } else if (type === 'Load') {
        const load = {
            trigger_id: trigger_id,
            // 'external_id': _id,
            view: {
                type: 'modal',
                callback_id: 'cf_daily',
                private_metadata: JSON.stringify({
                    title: title,
                    description: description,
                    score_type: type,
                    home_or_slash: slashOrHome,
                    id: _id,
                }),

                title: {
                    type: 'plain_text',
                    text: 'CF WOD',
                    emoji: true,
                },
                submit: {
                    type: 'plain_text',
                    text: 'Submit',
                    emoji: true,
                },
                close: {
                    type: 'plain_text',
                    text: 'Close',
                    emoji: true,
                },
                blocks: [
                    staticSelect,
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Title:* ${title}`,
                        },
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Description:* ${description}`,
                        },
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Score Type:* ${type}`,
                        },
                    },

                    {
                        type: 'input',
                        optional: false,
                        block_id: 'weight',
                        element: {
                            type: 'plain_text_input',
                            action_id: 'weight',
                        },
                        label: {
                            type: 'plain_text',
                            text: 'Enter Max Weight',
                            emoji: true,
                        },
                    },
                    {
                        type: 'input',
                        block_id: 'notes',
                        element: {
                            type: 'plain_text_input',
                            multiline: true,
                            action_id: 'notes',
                        },
                        label: {
                            type: 'plain_text',
                            text: 'Notes',
                            emoji: true,
                        },
                    },
                ],
            },
        }
        return load
    } else if (type === 'Other / Text') {
        const load = {
            trigger_id: trigger_id,
            // 'external_id': _id,
            view: {
                type: 'modal',
                callback_id: 'cf_daily',
                private_metadata: JSON.stringify({
                    title: title,
                    description: description,
                    score_type: type,
                    home_or_slash: slashOrHome,
                    id: _id,
                }),

                title: {
                    type: 'plain_text',
                    text: 'CF WOD',
                    emoji: true,
                },
                submit: {
                    type: 'plain_text',
                    text: 'Submit',
                    emoji: true,
                },
                close: {
                    type: 'plain_text',
                    text: 'Close',
                    emoji: true,
                },
                blocks: [
                    staticSelect,
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Title:* ${title}`,
                        },
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Description:* ${description}`,
                        },
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Score Type:* ${type}`,
                        },
                    },

                    {
                        type: 'input',
                        block_id: 'notes',
                        element: {
                            type: 'plain_text_input',
                            multiline: true,
                            action_id: 'notes',
                        },
                        label: {
                            type: 'plain_text',
                            text: 'Notes',
                            emoji: true,
                        },
                    },
                ],
            },
        }
        return load
    } else if (type === 'Meters') {
        const load = {
            trigger_id: trigger_id,
            // 'external_id': _id,
            view: {
                type: 'modal',
                callback_id: 'cf_daily',
                private_metadata: JSON.stringify({
                    title: title,
                    description: description,
                    score_type: type,
                    home_or_slash: slashOrHome,
                    id: _id,
                }),

                title: {
                    type: 'plain_text',
                    text: 'CF WOD',
                    emoji: true,
                },
                submit: {
                    type: 'plain_text',
                    text: 'Submit',
                    emoji: true,
                },
                close: {
                    type: 'plain_text',
                    text: 'Close',
                    emoji: true,
                },
                blocks: [
                    staticSelect,
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Title:* ${title}`,
                        },
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Description:* ${description}`,
                        },
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Score Type:* ${type}`,
                        },
                    },

                    {
                        type: 'input',
                        optional: false,
                        block_id: 'meters',
                        element: {
                            type: 'plain_text_input',
                            action_id: 'meters',
                        },
                        label: {
                            type: 'plain_text',
                            text: 'Meters',
                            emoji: true,
                        },
                    },
                    {
                        type: 'input',
                        block_id: 'notes',
                        element: {
                            type: 'plain_text_input',
                            multiline: true,
                            action_id: 'notes',
                        },
                        label: {
                            type: 'plain_text',
                            text: 'Notes',
                            emoji: true,
                        },
                    },
                ],
            },
        }
        return load
    }
}

module.exports = submitScore
