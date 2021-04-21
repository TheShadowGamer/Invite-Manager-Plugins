const { Op: { lte }, DATE, STRING, NUMBER } = require('sequelize');
const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { parseMS } = require('human-ms');

module.exports = class GiveawayReadyListener extends Listener {
    constructor() {
        super('giveawayReady', {
            emitter: 'client',
            event: 'ready'
        });
    };
    async exec() {
        this.client.giveaways = this.client.sequelize.define('giveaway', {
            end: DATE,
            guild: STRING,
            channel: STRING,
            message: STRING,
            host: STRING,
            winners: NUMBER,
            deleteAt: DATE
        });
        this.client.giveaways.sync();
        setInterval(() => endGiveaway(this.client), 30000);
        setInterval(() => updateTimes(this.client), 150000);
        setInterval(() => endOverdate(this.client), 300000);
    };
};

async function endGiveaway (client) {
    let past = await client.giveaways.findAll({
        where: {
            end: {
                [lte]: Date.now()
            }
        }
    });
    past.forEach(async entry => {
        if(!entry.deleteAt) client.tools.endGiveaway(client, entry);
    });
};

async function updateTimes (client) {
    let giveaways = await client.giveaways.findAll();
    giveaways.forEach(async (entry) => {
        let channel;
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
        let embed = new MessageEmbed(message.embeds[0])
        .setDescription(`Click the reaction below to enter!\n\nTime Left: ${parseMS(entry.end - Date.now(), {verbose: true})}\nHost: <@${entry.host}>`);
        message.edit(embed);
    });
};

async function endOverdate (client) {
    let expired = await client.giveaways.findAll({
        where: {
            deleteAt: {
                [lte]: Date.now()
            }
        }
    });
    expired.forEach(async entry => {
        entry.destroy({
            where: {
                message: entry.message,
                channel: entry.channel,
                guild: entry.guild
            }
        });
    });
};