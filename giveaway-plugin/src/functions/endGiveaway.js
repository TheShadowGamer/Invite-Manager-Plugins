const { MessageEmbed } = require('discord.js');

module.exports = async (client, entry) => {
    let channel
    try {
        channel = await client.channels.fetch(entry.channel);
    } catch (error) {}
    if(!channel) return entry.destroy({
        where: {
            guild: entry.guildid,
            channel: entry.channel,
            message: entry.message
        }
    });
    let message;
    try {
        message = await channel.messages.fetch(entry.message);
    } catch (error) {}
    if(!message) return entry.destroy({
        where: {
            guild: entry.guildid,
            channel: entry.channel,
            message: entry.message
        }
    });
    let reaction = message.reactions.cache.get('🎉');
    await reaction.users.fetch();
    let embed = new MessageEmbed(message.embeds[0]);
    let member = reaction.users.cache.filter(user => !user.bot);
    member = member.randomKey(entry.winners);
    if(members) await message.channel.send(`:tada: Congratulations ${member.map(member => `<@${member}>`).join(' ') || `<@${member}>`}, you won **${embed.title}** <${message.url}>`);
    if(entry.winners === 1 && members) {
        embed.setDescription(`Giveaway has ended!\n\n**Winner**: ${member.map(member => `<@${member}>`).join(' ') || `<@${member}>`}\nHost: <@${entry.host}>`);
    } else {
        embed.setDescription(`Giveaway has ended!\n\n**Winners**: ${member.map(member => `<@${member}>`).join(' ') || `<@${member}>`}\nHost: <@${entry.host}>`);
    };
    embed.setColor('RED')
    .setFooter(`${embed.footer.text.split('|')[0]} | Ended at`);
    if(members) await message.edit(embed);
    if(!members) message.channel.send(`The **${embed.title}** <${message.url}> giveaway has ended but no one won!`);
    entry.update({
        deleteAt: new Date(Date.now() + 172800000),
    }, {
        where: {
            guild: entry.guildid,
            channel: entry.channel,
            message: entry.message
        }
    });
};