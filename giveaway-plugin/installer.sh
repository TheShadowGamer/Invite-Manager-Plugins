echo Installing giveaway plugin...

if [ ! -d "./commands" ]
then
    mkdir commands
fi

if [ ! -d "./commands/giveaway" ]
then
    mkdir commands/giveaway
fi

if [ ! -d "./licenses" ]
then
    mkdir licenses
fi

wget -q -O commands/giveaway/end.js https://raw.githubusercontent.com/theshadowgamer/invite-manager-plugins/master/giveaway-plugin/src/commands/giveaway/end.js
wget -q -O commands/giveaway/giveaways.js https://raw.githubusercontent.com/theshadowgamer/invite-manager-plugins/master/giveaway-plugin/src/commands/giveaway/giveaways.js
wget -q -O commands/giveaway/reroll.js https://raw.githubusercontent.com/theshadowgamer/invite-manager-plugins/master/giveaway-plugin/src/commands/giveaway/reroll.js
wget -q -O commands/giveaway/start.js https://raw.githubusercontent.com/theshadowgamer/invite-manager-plugins/master/giveaway-plugin/src/commands/giveaway/start.js
wget -q -O functions/endGiveaway.js https://raw.githubusercontent.com/theshadowgamer/invite-manager-plugins/master/giveaway-plugin/src/functions/endgiveaway.js
wget -q -O listeners/giveaways-ready.js https://raw.githubusercontent.com/theshadowgamer/invite-manager-plugins/master/giveaway-plugin/src/listeners/giveaways-ready.js
wget -q -O types/custom-DURATION.js https://raw.githubusercontent.com/theshadowgamer/invite-manager-plugins/master/giveaway-plugin/src/types/custom-duration.js
wget -q -O types/custom-GIVEAWAY.js https://raw.githubusercontent.com/theshadowgamer/invite-manager-plugins/master/giveaway-plugin/src/types/custom-giveaway.js
wget -q -O licenses/giveaway_plugin_LICENSE https://raw.githubusercontent.com/theshadowgamer/invite-manager-plugins/master/giveaway-plugin/license
npm install --quiet --no-progress human-ms

echo Installed plugin!