const Discord = require('discord.js');
const {DEFAULT_COLOR} = require('../config.json');
const db = require('quick.db');
const emoji = require('../emojis.json');


//Cooldown 
const timeoutDelete = (message, time = 10) => {
    if (!message) return
    let t = time*1000
    setTimeout(() => message.delete(), t)
}

// Embed Automatique
const CattoEmbed = (author, desc, channel, title = '', timeout = undefined, thumbnail='') => {
    if (!channel) return;
    let e = new Discord.MessageEmbed()
        .setAuthor(author.tag, author.displayAvatarURL({dynamic : true}))
        .setDescription(desc)
        .setColor(DEFAULT_COLOR)
        .setFooter(`©️ RadioLabs`)
        .setThumbnail(author.displayAvatarURL({dynamic:true}))
    return channel.send({embeds : [e]}).then(m => {
        if (timeout !== undefined) {
            timeoutDelete(m, timeout)
        }
    })
}

module.exports = {
    timeoutDelete,
    CattoEmbed
}