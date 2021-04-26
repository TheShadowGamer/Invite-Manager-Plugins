const { Command, Flag } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { parseMS } = require('human-ms');

module.exports = class giveawayCommand extends Command {
    constructor() {
        super('giveaways', {
            aliases: ['giveaways', 'giveaway'],
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

module.exports.slashCommand = async (client, interaction, args, respond) => {
    let usage = args[0].name;
    args = args[0].options;
    if(usage === 'start') {
        interaction.member = await interaction.guild.members.fetch(interaction.member.user.id);
        if(!interaction.member.roles.cache.some(role => role.name === 'Manage Giveaways') && !interaction.member.permissions.has(['BAN_MEMBERS', 'KICK_MEMBERS', 'MANAGE_GUILD', 'MANAGE_CHANNELS'])) client.handler.emit('missingPermissions', respond, client.handler.findCommand('giveaways'), 'user', 'Manage Giveaways');
        let duration = args[0].value;
        let item = args[1].value;
        let winners = 1;
        if(args[2]) winners = args[2].value
        duration = await client.handler.resolver.type('custom-DURATION')(interaction, duration, client);
        if(!duration) return respond('That\'s not a valid duration! Please try again!');
        if(winners == 0) return message.channel.send('You cannot have 0 winners! Please run the command again!');
        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(item)
            .setDescription(`Click the reaction below to enter!\n\nTime Left: ${parseMS(duration - Date.now())}\nHost: ${interaction.member.user.toString()}`)
            .setTimestamp(duration);
        if(winners == 1) { embed.setFooter(`${winners} winner | Ends at`) } else { embed.setFooter(`${winners} winner | Ends at`) };
        let msg = await interaction.channel.send(embed);
        client.giveaways.create({
            end: duration,
            guild: interaction.guild.id,
            channel: interaction.channel.id,
            message: msg.id,
            host: interaction.member.id,
            winners: winners
        });
        respond({content: 'Giveaway started!', flags: 64});
        msg.react('🎉');
    };
    if(usage === 'end') {
        interaction.member = await interaction.guild.members.fetch(interaction.member.user.id);
        if(!interaction.member.roles.cache.some(role => role.name === 'Manage Giveaways') && !interaction.member.permissions.has(['BAN_MEMBERS', 'KICK_MEMBERS', 'MANAGE_GUILD', 'MANAGE_CHANNELS'])) client.handler.emit('missingPermissions', respond, client.handler.findCommand('giveaways'), 'user', 'Manage Giveaways');
        let entry = args[0].value;
        entry = await client.handler.resolver.type('custom-GIVEAWAY')(interaction, entry, client);
        const embed = new MessageEmbed()
            .setDescription('Successfully ended giveaway!')
            .setColor('GREEN')
            .setTimestamp();
        if(entry.deleteAt) {
            embed.setColor(client.config.colors.error)
                .setDescription(`This giveaway has already ended! If you would like new winners, please do \`${client.handler.prefix}giveaway reroll ${entry.message}\`!`);
            return respond({embeds: [embed]});
        };
        client.tools.endGiveaway(client, entry);
        respond({embeds: [embed]});
    };
    if(usage === 'reroll') {
        interaction.member = await interaction.guild.members.fetch(interaction.member.user.id);
        if(!interaction.member.roles.cache.some(role => role.name === 'Manage Giveaways') && !interaction.member.permissions.has(['BAN_MEMBERS', 'KICK_MEMBERS', 'MANAGE_GUILD', 'MANAGE_CHANNELS'])) client.handler.emit('missingPermissions', respond, client.handler.findCommand('giveaways'), 'user', 'Manage Giveaways');
        let entry = args[0].value;
        entry = await client.handler.resolver.type('custom-GIVEAWAY')(interaction, entry, client);
        const embed = new MessageEmbed()
            .setDescription('Successfully rerolled giveaway!')
            .setColor('GREEN')
            .setTimestamp();
        if(!entry.deleteAt) {
            embed.setColor('RED')
                .setDescription(`This giveaway hasn't ended yet! If you would like to end it, please do \`${client.handler.prefix}giveaway end ${entry.message}\`!`);
            return respond({embeds: [embed]});
        };
        client.tools.endGiveaway(client, entry);
        respond({embeds: [embed]});
    };
};
