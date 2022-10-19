const { CattoEmbed } = require("../../structure/functions");
const emoji = require('../../emojis.json')


module.exports.run = async (client, message, args) => {
    CattoEmbed(message.author, `${emoji.Sciences} Merci de m'ajouter dans votre serveur. [Cliquez-ici pour m'inviter](https://discord.com/api/oauth2/authorize?client_id=973354826798891058&permissions=8&scope=bot)`, message.channel, '')
}

module.exports.help = {
    name: "invite",
    aliases: ["inv"],
    description: "Inviter le bot"
}