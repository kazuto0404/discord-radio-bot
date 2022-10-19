// Made By > 𝒍’𝒆́𝒕𝒐𝒊𝒍𝒆✰#0001
const {Collection, Client, Intents} = require('discord.js')
const {loadCommands, loadEvents} = require('./structure/loader.js')
const {TOKEN} = require('./config.json')
const inte = new Intents()

inte.add([
   Intents.FLAGS.GUILDS,
   Intents.FLAGS.GUILD_MEMBERS,
   Intents.FLAGS.GUILD_BANS,
   Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
   Intents.FLAGS.GUILD_INTEGRATIONS,
   Intents.FLAGS.GUILD_WEBHOOKS,
   Intents.FLAGS.GUILD_INVITES,
   Intents.FLAGS.GUILD_VOICE_STATES,
   Intents.FLAGS.GUILD_PRESENCES,
   Intents.FLAGS.GUILD_MESSAGES,
   Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
   Intents.FLAGS.GUILD_MESSAGE_TYPING,
   Intents.FLAGS.DIRECT_MESSAGES,
   Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
   Intents.FLAGS.DIRECT_MESSAGE_TYPING
]);

const client = new Client({
  intents: inte
});


client.commands = new Collection();
client.cooldowns = new Collection();
client.aliases = new Collection();
loadCommands(client);
loadEvents(client);

client.login(TOKEN);