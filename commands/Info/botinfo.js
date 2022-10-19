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
    .setDescription(`${emoji.Broadcast} Bienvenue sur la page Info du Bot **${client.user.tag}**.\n${emoji.Sciences} Ce bot a été crée pour participer à un **défis** de développer un bot Discord complet et puissant en **24h**.\nNous avons réaliser ce défis et nous vous proposons ce bot public, permettant d'écouter différents styles de radio **gratuitement**.\n\n${emoji.Shield} Quelques **informations** à propos de moi :\n\n${emoji.Fleche} **Développeurs** : \`> 𝒍’𝒆́𝒕𝒐𝒊𝒍𝒆✰#0001 & !">ЅLΔΨΣΓ"!'QLF#0001\` \n${emoji.Fleche} **Nombre de serveurs** :  \`${message.client.guilds.cache.size}\`\n${emoji.Fleche} **Nombre d'utilisateurs** : \`${client.guilds.cache.map(z => z.memberCount).reduce((x, y) => x + y)}\`\n${emoji.Fleche} **Bot Certifié** : \`Non\` \n\n${emoji.Beta} Je suis encore en **bêta**.\n${emoji.Sciences} Étant donné que j'ai été **développé en 19h**, il est possible que des **erreurs** se glissent dans mon corp électronique.\n${emoji.Education} Si vous trouvez un bug, n'hésitez pas à rejoindre notre serveur **support** en utilisant la commande : \`${prefix}support\`\n${emoji.Star} Si vous aimez le bot, ajoutez le dans votre serveur avec \`${prefix}invite\``)
    .setColor(DEFAULT_COLOR)
    .setFooter(`©️ RadioLabs`)
    await message.reply({embeds: [i]})
}

module.exports.help = {
    name: "botinfo",
    aliases: ["bi"],
    description: "Informations sur le Bot"
}