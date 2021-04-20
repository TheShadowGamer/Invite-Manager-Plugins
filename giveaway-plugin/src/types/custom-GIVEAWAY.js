module.exports = async (message, phrase, client) => {
    if(!phrase) return null;
    let find = await client.giveaways.findOne({
        where: {
            message: phrase,
            guild: message.guild.id
        }
    });
    if(!find) return null;
    let channel;
    try {
        channel = await client.channels.fetch(find.channel);
    } catch (error) {
        find.destroy({
            where: {
                message: phrase,
                guild: message.guild.id
            }
        });
    };
    if(!channel) return null;
    let msg;
    try {
        msg = await channel.messages.fetch(phrase);
    } catch (error) {
        find.destroy({
            where: {
                message: phrase,
                guild: message.guild.id
            }
        });
    };
    if(!msg) return null;
    return find || null;
}