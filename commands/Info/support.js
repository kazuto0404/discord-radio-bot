const { CattoEmbed } = require("../../structure/functions");
const emoji = require('../../emojis.json')


module.exports.run = async (client, message, args) => {
    CattoEmbed(message.author, `${emoji.Sciences} Pour rejoindre le serveur support, [Cliquez-ici](https://discord.gg/VcG8SxYX6s)`, message.channel, '')
}

module.exports.help = {
    name: "support",
    aliases: ["sup"],
    description: "Rejoindre le serveur support"
}
