const { MessageEmbed } = require("discord.js")
const {DEFAULT_COLOR} = require('../../config.json')
const emoji = require("../../emojis.json")
const db = require('quick.db')
const {DEFAULT_PREFIX} = require('../../config.json')
const {
owner,
owner2
} = require('../../config.json');

module.exports.run = async (client, message, args) => {
    let prefix = await db.get(`config.${message.guild.id}.prefix`)
    if (prefix == undefined || prefix == null) prefix = DEFAULT_PREFIX
    if (message.author.id === owner2|| message.author.id === owner || message.author.id === owner3) {
        if (!args[0]) {
            return message.channel.send(`vous devez faire : \n \`setavatar + <lien>\``)
        }
        let newavatar = args[0]
        if (!/(http|https|www):\/\/[^"]+?\.(jpg|png|gif|webp)/.test(args[0])) {
            return message.channel.send(`le lien doit être en .jpg , .png , .gif ou .webp`)
            message.delete();
        }
      

        client.user.setAvatar(newavatar)
    await message.reply('le photo de profil de votre bot a été changez')
    }}
    
    module.exports.help = {
        name: "setavatar",
        aliases: ["setpic"],
        description: "Informations sur le Bot"
    }