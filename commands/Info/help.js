const { MessageEmbed } = require("discord.js")
const {DEFAULT_COLOR} = require('../../config.json')
const emoji = require("../../emojis.json")
const db = require('quick.db')
const {DEFAULT_PREFIX} = require('../../config.json')

module.exports.run = async (client, message, args) => {
    let prefix = await db.get(`config.${message.guild.id}.prefix`)

    if (prefix == undefined || prefix == null) prefix = DEFAULT_PREFIX
    const i = new MessageEmbed()
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`${emoji.Broadcast} Bienvenue sur la page d'aide du Bot **${client.user.tag}**.\n${emoji.Sciences} Ce bot permet d'écouter la radio de votre choix sur une liste de **8 radios**.\n${emoji.Fusee} N'hésitez pas à rejoindre notre **serveur support** en utilisant la commande : \`${prefix}support\` ainsi qu'inviter le bot avec \`${prefix}invite\`.\n${emoji.Tools} Si vous souhaitez proposer des radios à ajouter au bot, envoyez un **message privé** à un Développeur ou allez sur le serveur support.\n\n${emoji.Shield} **Mes commandes** :\n\n${emoji.Education} **Informations** :\n\`invite, support, botinfo, help\`\n\n:radio: **Radio** :\n\`radio\``)
    .setColor(DEFAULT_COLOR)
    .setFooter(`©️ RadioLabs`)
    await message.reply({embeds: [i]})
}

module.exports.help = {
    name: "help",
    aliases: ["h"],
    description: "Page d'aide du bot"
}