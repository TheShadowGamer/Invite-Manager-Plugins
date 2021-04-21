module.exports = [
    {
        name: 'giveaways',
        description: 'Start, end, or reroll giveaways.',
        options: [
            {
                name: 'start',
                description: 'Starts a giveaway.',
                type: 1,
                options: [
                    {
                        name: 'duration',
                        description: 'How long the giveaway should last.',
                        type: 3,
                        required: true
                    },
                    {
                        name: 'item',
                        description: 'What you would like to giveaway.',
                        type: 3,
                        required: true
                    },
                    {
                        name: 'winners',
                        description: 'The amount of winners there should be.',
                        type: 4,
                        required: false
                    }
                ]
            },
            {
                name: 'end',
                description: 'Ends a giveaway.',
                type: 1,
                options: [
                    {
                        name: 'message',
                        description: 'The message ID of the giveaway you want to end.',
                        type: 3,
                        required: true
                    }
                ]
            },
            {
                name: 'reroll',
                description: 'Rerolls a giveaway.',
                type: 1,
                options: [
                    {
                        name: 'message',
                        description: 'The message ID of the giveaway you want to reroll.',
                        type: 3,
                        required: true
                    }
                ]
            }
        ]
    }
]