const { Command, Flag } = require('discord-akairo');

module.exports = class inviteCommand extends Command {
    constructor() {
        super('giveaways', {
            aliases: ['giveaways'],
            category: 'giveaways',
            description: {
                content: "Lets you start or stop giveaways. \n\nstart <duration> [winners] <item> - Starts a giveaway for the specified item. To specify the ammount of winners, add \`winners:\` anywhere in your command\nend <messageID> - Ends a giveaway.\nreroll <messageID> - Rerolls a giveaway.",
                usage: "<start/end> [duration/message] [winners:] [item]"
            },
            *args() {
                const method = yield {
                    type: [ 
                        ['startGiveaway', 'start'],
                        ['endGiveaway', 'end', 'stop'],
                        ['rerollGiveaway', 'reroll']
                    ],
                    otherwise: "That is not a valid subcommand!"
                };
                return Flag.continue(method);
            }
        });
    };
};