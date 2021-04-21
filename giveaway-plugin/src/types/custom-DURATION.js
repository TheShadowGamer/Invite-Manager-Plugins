const { parseHuman } = require('human-ms');

module.exports = async (message, phrase, client) => {
    if(!phrase) return null;
    let time = parseHuman(phrase);
    if(!time) return null;
    let date = Date.now();
    return new Date(date += time);
};