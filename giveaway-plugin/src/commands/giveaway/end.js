const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

module.exports = class EndGiveawayCommand extends Command {
    constructor() {
        super('endGiveaway', {
            description: {
                content: 'Ends a giveaway.',
                usage: '<messageID>'
            },
            category: 'invites',
            clientPermissions: ['EMBED_LINKS'],
            ratelimit: 2,
            args: [
                {
                    id: 'entry',
                    type: 'custom-GIVEAWAY',
                    prompt: {
                        start: 'Which giveaway would you like to end?',
                        retry: 'That\'s not a valid giveaway! Try again.'
                    }
                }
            ],
            userPermissions(message) {
                if(!message.member.roles.cache.some(role => role.name === 'Manage Giveaways') && !message.member.permissions.has(['BAN_MEMBERS', 'KICK_MEMBERS', 'MANAGE_GUILD', 'MANAGE_CHANNELS'])) return 'Manage Giveaways';
                return null;
            }
        });
    };
    async exec(message, {entry}) {
        const embed = new MessageEmbed()
            .setDescription('Successfully ended giveaway!')
            .setColor('GREEN')
            .setTimestamp();
        if(entry.deleteAt) {
            embed.setColor(this.client.config.colors.error)
                .setDescription(`This giveaway has already ended! If you would like new winners, please do \`${this.handler.prefix}giveaway reroll ${entry.message}\`!`);
            return message.channel.send(embed);
        };
        this.client.tools.endGiveaway(this.client, entry);
        message.channel.send(embed);
    };
};