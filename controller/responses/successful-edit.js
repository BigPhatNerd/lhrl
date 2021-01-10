const editWorkoutResponse = (viewId) => {
    const modalView = {
        view_id: viewId,
        view: {
            type: 'modal',
            callback_id: 'view_identifier',
            title: {
                type: 'plain_text',
                text: 'Workout Modified'
            },
            blocks: [{
                type: 'section',
                text: {
                    type: 'plain_text',
                    text: '🎊 You have successfully updated your workout 🎊'
                }
            }]
        }
    }

    return modalView
}

module.exports = editWorkoutResponse;