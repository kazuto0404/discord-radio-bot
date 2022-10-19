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
    let newusername = args.join(" ")
    if (newusername.length > 32) {
        return message.channel.send(`le nom de votre bot doit contenir moins de 32 carractere`)
    }
    if (newusername.length < 2) {
        return message.channel.send(`le nom de votre bot doit contenir plus de 2 carractere`)
    }
    client.user.setUsername(newusername) 
    await message.reply('le pseudo de votre bot a été changez')
    }}
    
    module.exports.help = {
        name: "setname",
        aliases: ["setusername"],
        description: "Informations sur le Bot"
    }