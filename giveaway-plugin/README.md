# Giveaway Plugin
This plugin allows you to do giveaways using your bot. If you find any issues with any of these commands, report them to Anonymous on the support server.
## Instalation
* Open the bot terminal/repl.it shell.
* Run `bash <(curl -s https://raw.githubusercontent.com/theshadowgamer/invite-manager-plugins/master/giveaway-plugin/installer.sh)`
* Restart the bot.
## How to use
Read below to know how to use the commands.
### Terms
* \<item> A string of what you are giving away 
* \<messageID> A valid giveaway message ID
* \<prefix> What you have as your prefix in config.js
* \[winners] The amount of winners you want to have. The default is one. To specify an ammount, do `winners: AMOUNT` anywhere.
### Usage
* \<prefix>giveaway start \<duration> \<item> \[winners] - Starts a giveaway
* \<prefix>giveaway end \<messageID> - Ends a giveaway manually
* \<prefix>giveaway reroll \<messageID> - Rerolls the winner(s) of a giveaway