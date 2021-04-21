const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { parseMS } = require('human-ms');

module.exports = class StartGiveawayCommand extends Command {
    constructor() {
        super('startGiveaway', {
            description: {
                content: 'Starts a giveaway for the specified item.',
                usage: '<duration> [winners] <items>'
            },
            category: 'invites',
            clientPermissions: ['EMBED_LINKS'],
            ratelimit: 2,
            args: [
                {
                    id: 'duration',
                    type: 'custom-DURATION',
                    prompt: {
                        start: 'How long should this giveaway last?',
                        retry: 'That\'s not a valid duration! Please try again!'
                    }
                },
                {
                    id: 'winners',
                    type: 'number',
                    flag: 'winners:',
                    match: 'option',
                    default: 1
                },
                {
                    id: 'item',
                    match: 'rest',
                    prompt: {
                        start: 'What would you like to giveaway?'
                    }
                }
            ],
            userPermissions(message) {
                if(!message.member.roles.cache.some(role => role.name === 'Manage Giveaways') && !message.member.permissions.has(['BAN_MEMBERS', 'KICK_MEMBERS', 'MANAGE_GUILD', 'MANAGE_CHANNELS'])) return 'Manage Giveaways';
                return null;
            }
        });
    };
    
    async exec(message, {duration, winners, item}) {
        if(winners == 0) return message.channel.send('You cannot have 0 winners! Please run the command again!');
        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(item)
            .setDescription(`Click the reaction below to enter!\n\nTime Left: ${parseMS(duration - Date.now())}\nHost: ${message.author.toString()}`)
            .setTimestamp(duration);
        if(winners == 1) { embed.setFooter(`${winners} winner | Ends at`) } else { embed.setFooter(`${winners} winner | Ends at`) };
        let msg = await message.channel.send(embed);
        this.client.giveaways.create({
            end: duration,
            guild: message.guild.id,
            channel: message.channel.id,
            message: msg.id,
            host: message.author.id,
            winners: winners
        });
        msg.react('🎉');
    };
};