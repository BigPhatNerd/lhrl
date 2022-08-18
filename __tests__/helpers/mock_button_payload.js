 const buttonPayload = {
  type: 'block_actions',
  user: {
    id: 'U012ZRTR2P8',
    username: 'wilsonhorrell',
    name: 'wilsonhorrell',
    team_id: 'T012RRU3P3R'
  },
  api_app_id: 'A015X5NC2QY',
  token: '6icyrnLaulEmbCIpzUPmk8NA',
  container: { type: 'view', view_id: 'V034DG9JEKZ' },
  trigger_id: '3177632777169.1093878125127.7e13c9339b1f028bdeea87463d10d51a',
  team: { id: 'T012RRU3P3R', domain: 'mytestbot-workspace' },
  enterprise: null,
  is_enterprise_install: false,
  view: {
    id: 'V034DG9JEKZ',
    team_id: 'T012RRU3P3R',
    type: 'home',
    blocks: [
      {
        type: 'header',
        block_id: 'FWRl',
        text: {
          type: 'plain_text',
          text: 'Lift Heavy Run Long®',
          emoji: true
        }
      },
      {
        type: 'image',
        block_id: 'MWhzI',
        image_url: 'https://www.liftheavyrunlong.com/wp-content/uploads/2020/05/icon-e1590360608988.png',
        alt_text: 'logo',
        image_width: 150,
        image_height: 150,
        image_bytes: 12061,
        fallback: '150x150px image'
      },
      {
        type: 'header',
        block_id: '2nMA=',
        text: {
          type: 'plain_text',
          text: 'Welcome Wilson Horrell',
          emoji: true
        }
      },
      {
        type: 'section',
        block_id: 'type',
        text: {
          type: 'plain_text',
          text: 'Post activities to channel or keep private:question:\n' +
            '(currently set to private)',
          emoji: true
        },
        accessory: {
          type: 'static_select',
          action_id: 'public_private',
          placeholder: { type: 'plain_text', text: 'Keep Private', emoji: true },
          options: [
            {
              text: { type: 'plain_text', text: 'Keep Private', emoji: true },
              value: 'Keep Private'
            },
            {
              text: { type: 'plain_text', text: 'random', emoji: true },
              value: 'random'
            },
            {
              text: { type: 'plain_text', text: 'general', emoji: true },
              value: 'general'
            },
            {
              text: { type: 'plain_text', text: 'test', emoji: true },
              value: 'test'
            },
            {
              text: { type: 'plain_text', text: 'strava', emoji: true },
              value: 'strava'
            },
            {
              text: { type: 'plain_text', text: 'sugarwod', emoji: true },
              value: 'sugarwod'
            },
            {
              text: { type: 'plain_text', text: 'cf_wod', emoji: true },
              value: 'cf_wod'
            },
            {
              text: { type: 'plain_text', text: '5k', emoji: true },
              value: '5k'
            },
            {
              text: { type: 'plain_text', text: 'lhrl', emoji: true },
              value: 'lhrl'
            }
          ]
        }
      },
      {
        type: 'actions',
        block_id: 'alE',
        elements: [
          {
            type: 'button',
            action_id: 'Authorize Strava',
            text: {
              type: 'plain_text',
              text: ':runner: Authorize Strava :runner:',
              emoji: true
            },
            value: 'Authorize Strava',
            url: 'https://lhrlslacktest.ngrok.io/strava/login'
          }
        ]
      },
      { type: 'divider', block_id: '7qR' },
      {
        type: 'header',
        block_id: 't1Ls',
        text: { type: 'plain_text', text: 'Activity Calendar', emoji: true }
      },
      {
        type: 'actions',
        block_id: 'calendar',
        elements: [
          {
            type: 'datepicker',
            action_id: 'calendar',
            placeholder: { type: 'plain_text', text: 'Select a date', emoji: true }
          }
        ]
      },
      { type: 'divider', block_id: 'wbs' },
      {
        type: 'header',
        block_id: 'f7J',
        text: {
          type: 'plain_text',
          text: 'Here is your goal summary for this week',
          emoji: true
        }
      },
      {
        type: 'section',
        block_id: 'h1R',
        text: {
          type: 'mrkdwn',
          text: '*You currently have no goals set*',
          verbatim: false
        },
        accessory: {
          type: 'button',
          action_id: 'weekly_goal',
          text: {
            type: 'plain_text',
            text: ':dart: Set Weekly Goals :dart:',
            emoji: true
          },
          value: 'weekly_goal'
        }
      },
      {
        type: 'section',
        block_id: 'RdE5k',
        text: {
          type: 'mrkdwn',
          text: ' *Enter weekly goals above*\n' +
            'Weekly goals begin on _*Sunday*_ and reset at the end of the day on _*Saturday*_. ',
          verbatim: false
        }
      },
      { type: 'divider', block_id: 'UKH' },
      {
        type: 'header',
        block_id: 'iqT',
        text: { type: 'plain_text', text: 'Workout of the Day', emoji: true }
      },
      {
        type: 'section',
        block_id: '/Zm4f',
        text: {
          type: 'mrkdwn',
          text: '\n' +
            '*Title:* Deadlift 5x5\n' +
            '\n' +
            '*Description:* Deadlift for load:\n' +
            ' #1: 5 reps @ 50% (3111)\n' +
            ' #2: 5 reps @ 50% (3111)\n' +
            ' #3: 5 reps @ 50% (3111)\n' +
            ' #4: 5 reps @ 60% (1111)\n' +
            ' #5: 5 reps @ 60% (1111)\n' +
            '\n' +
            '*Score Type:* Load\n',
          verbatim: false
        },
        accessory: {
          type: 'button',
          action_id: 'cf_wod_score',
          text: {
            type: 'plain_text',
            text: ':weight_lifter: Enter Score :weight_lifter:',
            emoji: true
          },
          value: 'cf_wod_score'
        }
      },
      { type: 'divider', block_id: 'qEJT' },
      {
        type: 'header',
        block_id: 'L43y',
        text: {
          type: 'plain_text',
          text: 'Latest Strava Workout',
          emoji: true
        }
      },
      {
        type: 'section',
        block_id: 'BjR',
        text: {
          type: 'mrkdwn',
          text: 'No Strava workouts have been completed.',
          verbatim: false
        }
      },
      { type: 'divider', block_id: 'pCK' },
      {
        type: 'header',
        block_id: 'Bv9',
        text: {
          type: 'plain_text',
          text: 'Subscribe to Program',
          emoji: true
        }
      },
      {
        type: 'section',
        block_id: 'rkeVL',
        text: { type: 'mrkdwn', text: 'Choose a plan:', verbatim: false },
        accessory: {
          type: 'static_select',
          action_id: 'choose_plan',
          placeholder: { type: 'plain_text', text: 'Select an item', emoji: true },
          options: [
            {
              text: {
                type: 'plain_text',
                text: '6-Weeks to 5K',
                emoji: true
              },
              value: '5K'
            },
            {
              text: {
                type: 'plain_text',
                text: '6-Weeks to 10K',
                emoji: true
              },
              value: '10K'
            },
            {
              text: {
                type: 'plain_text',
                text: '12-Weeks to Half-Marathon',
                emoji: true
              },
              value: 'halfMarathon'
            },
            {
              text: {
                type: 'plain_text',
                text: '12-Weeks to Marathon',
                emoji: true
              },
              value: 'marathon'
            }
          ]
        }
      },
      { type: 'divider', block_id: 'cja' },
      {
        type: 'section',
        block_id: '/dUPR',
        text: {
          type: 'mrkdwn',
          text: 'You are currently not subscribed to any programs.',
          verbatim: false
        }
      },
      { type: 'divider', block_id: 'A+QDK' },
      {
        type: 'section',
        block_id: 'miN',
        text: {
          type: 'plain_text',
          text: 'You have no scheduled workouts.',
          emoji: true
        }
      },
      { type: 'divider', block_id: 'N6xz' },
      {
        type: 'section',
        block_id: '5TI0',
        text: {
          type: 'mrkdwn',
          text: 'Select *_Choose a plan_*  above to subscribe to training plan.',
          verbatim: false
        }
      },
      { type: 'divider', block_id: 'GVM' },
      {
        type: 'header',
        block_id: 'M/25e',
        text: { type: 'plain_text', text: 'Workouts Section', emoji: true }
      },
      { type: 'divider', block_id: 'U/+fr' },
      {
        type: 'section',
        block_id: 'gaZmC',
        text: { type: 'mrkdwn', text: 'Create a Workout:', verbatim: false },
        accessory: {
          type: 'static_select',
          action_id: 'create',
          placeholder: {
            type: 'plain_text',
            text: 'Select workout type',
            emoji: true
          },
          options: [
            {
              text: { type: 'plain_text', text: 'Reps', emoji: true },
              value: 'reps'
            },
            {
              text: {
                type: 'plain_text',
                text: 'Rounds + Reps',
                emoji: true
              },
              value: 'rounds_plus_reps'
            },
            {
              text: { type: 'plain_text', text: 'Time', emoji: true },
              value: 'time'
            },
            {
              text: { type: 'plain_text', text: 'Load', emoji: true },
              value: 'load'
            },
            {
              text: { type: 'plain_text', text: 'Distance', emoji: true },
              value: 'distance'
            }
          ]
        }
      },
      {
        type: 'section',
        block_id: 'oWEvM',
        text: {
          type: 'mrkdwn',
          text: 'View or Complete a Workout:',
          verbatim: false
        },
        accessory: {
          type: 'static_select',
          action_id: 'create_edit_view',
          placeholder: { type: 'plain_text', text: 'Select an item', emoji: true },
          options: [
            {
              text: {
                type: 'plain_text',
                text: 'View Created Workouts',
                emoji: true
              },
              value: 'view_workout'
            },
            {
              text: {
                type: 'plain_text',
                text: 'View Completed Workouts',
                emoji: true
              },
              value: 'completed_workouts'
            }
          ]
        }
      },
      { type: 'divider', block_id: 'PZCUj' },
      {
        type: 'actions',
        block_id: 'acWx',
        elements: [
          {
            type: 'button',
            action_id: 'faqs',
            text: {
              type: 'plain_text',
              text: ':question: FAQs :question:',
              emoji: true
            },
            value: 'faqs',
            url: 'http://www.lhrlapp.com/support'
          },
          {
            type: 'button',
            action_id: 'contact',
            text: {
              type: 'plain_text',
              text: ':mega: Contact Us :mega:',
              emoji: true
            },
            value: 'contact'
          },
          {
            type: 'button',
            action_id: 'podcast',
            text: {
              type: 'plain_text',
              text: ':headphones: Follow Podcast :headphones:',
              emoji: true
            },
            value: 'podcast',
            url: 'https://podcasts.apple.com/us/podcast/lift-heavy-run-long-podcast-inspire-be-inspired/id785714991'
          },
          {
            type: 'button',
            action_id: 'community',
            text: {
              type: 'plain_text',
              text: ':link: Join Community :link:',
              emoji: true
            },
            value: 'community',
            url: 'https://www.facebook.com/groups/LiftHeavyRunLong'
          }
        ]
      }
    ],
    private_metadata: '{"home_or_slash":"home"}',
    callback_id: 'homepage_menu',
    state: {
      values: {
        type: {
          public_private: { type: 'static_select', selected_option: null }
        },
        calendar: { calendar: { type: 'datepicker', selected_date: null } },
        rkeVL: {
          choose_plan: { type: 'static_select', selected_option: null }
        },
        gaZmC: { create: { type: 'static_select', selected_option: null } },
        oWEvM: {
          create_edit_view: { type: 'static_select', selected_option: null }
        }
      }
    },
    hash: '1645933417.6kCnrXqK',
    title: { type: 'plain_text', text: 'View Title', emoji: true },
    clear_on_close: false,
    notify_on_close: false,
    close: null,
    submit: null,
    previous_view_id: null,
    root_view_id: 'V034DG9JEKZ',
    app_id: 'A015X5NC2QY',
    external_id: '',
    app_installed_team_id: 'T012RRU3P3R',
    bot_id: 'B014SJDJQQ7'
  },
  actions: [
    {
      action_id: 'weekly_goal',
      block_id: 'h1R',
      text: {
        type: 'plain_text',
        text: ':dart: Set Weekly Goals :dart:',
        emoji: true
      },
      value: 'weekly_goal',
      type: 'button',
      action_ts: '1645990506.194552'
    }
  ]
}

module.exports = {buttonPayload}

