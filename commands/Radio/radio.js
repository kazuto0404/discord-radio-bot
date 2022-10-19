// by > 𝒍’𝒆́𝒕𝒐𝒊𝒍𝒆✰#0001
const { 
    joinVoiceChannel, createAudioResource, createAudioPlayer, getVoiceConnection
} = require('@discordjs/voice');
const { 
    MessageEmbed, MessageActionRow, MessageSelectMenu
} = require('discord.js');
const emoji = require('../../emojis.json');
const { DEFAULT_COLOR, DEFAULT_PREFIX } = require('../../config.json');
const {CattoEmbed, timeoutDelete} = require('../../structure/functions');
const db = require('quick.db');

module.exports.run = async (client, message, args) => {
        let prefix = await db.get(`config.${message.guild.id}.prefix`)

        if (prefix == undefined || prefix == null) prefix = DEFAULT_PREFIX
        let isVoc = message.guild.channels.cache.find((channel) => channel.type == 'GUILD_VOICE' && !channel.members.has(message.author.id) && channel.members.has(client.user.id))
        const member = message.guild.members.cache.get(message.author.id).voice
        try {
            if(!member.channel) return CattoEmbed(message.author, `${emoji.Warn} Vous devez être dans un salon vocal pour écouter de la radio.`, message.channel, '')
        } catch (error) {
            console.log("Une erreur est survenue" + error)
        }
        try {
            if (isVoc) return CattoEmbed(message.author, `${emoji.Warn} Quelqu'un d'autre utilise déjà le bot dans le serveur.`, message.channel, '')
        } catch (error) {
            console.log("Une erreur est survenue" + error)
        }
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId("select")
            .setPlaceholder("📻 Choisissez Votre Radio")
            .addOptions([
                {
                    label: "RADIO NRJ",
                    description: "Permet d'écouter la Radio NRJ.",
                    value: "first",       
                    emoji: "<:NRJ:909010843604250624>"       
                },
                {
                    label: "RADIO SKYROCK",
                    description: "Permet d'écouter la radio SKYROCK.",
                    value: "second",
                    emoji: "<:SKYROCK:909010950873567274>"
                },
                {
                    label: "RADIO RFM",
                    description: "Permet d'écouter la radio RFM.",
                    value: "third",
                    emoji: "<:RFM:909017828944920576>"
                },
                {
                    label: "RADIO BLUES",
                    description: "Permet d'écouter la radio BLUES.",
                    value: "fourth",
                    emoji: "<:BLUES:909012068210970644>"
                },
                {
                    label: "RADIO RAP",
                    description: "Permet d'écouter la radio RAP.",
                    value: "fifth",
                    emoji: "<:RAP:909017947060699176>"
                },
                {
                    label: "RADIO JAZZ",
                    description: "Permet d'écouter la radio JAZZ.",
                    value: "jazz",
                    emoji: "<:JAZZ:909011378411544586>"
                },
                {
                    label: "RADIO CLASSIQUE",
                    description: "Permet d'écouter la radio CLASSIQUE.",
                    value: "sixth",
                    emoji: "<:RadioClassique:909016337253277766>"
                },
                {
                    label: "RADIO MOUV",
                    description: "Permet d'écouter la radio MOUV.",
                    value: "seventh",
                    emoji: "<:MOUV:909011032071077948>"
                }
    
            ])
        )
 
        const embed = new MessageEmbed()
        .setColor(DEFAULT_COLOR)
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${emoji.Beta} Bienvenue sur la Bêta de RadioLabs.\n${emoji.Tools} Utilisez le menu déroulant ci-dessous pour choisir votre radio.\n${emoji.Broadcast} S'il n'y a plus de personne dans le salon vocal, le bot se déconnectera automatiquement.\n\n${emoji.Config} Si vous souhaitez m'inviter gratuitement utilisez : \`${prefix}invite\`\n${emoji.Sciences} Vous avez un choix de **8** radios.\n${emoji.Star} Si vous souhaitez en proposer de nouvelles, rejoingnez notre Support : \`${prefix}support\``)
        .setThumbnail(message.author.displayAvatarURL({dynamic:true}))
        try {
            message.reply({ embeds: [embed], components: [row] })
        } catch (error) {
            console.log("Une erreur est survenue" + error);
        }
        const collector = message.channel.createMessageComponentCollector({
            componentType: "SELECT_MENU"
        })

        collector.on("collect", async (c) => {
            
            try {
                if(c.user.id !== message.author.id) return c.reply({ content: `${emoji.Warn} Vous ne pouvez pas modifier la radio de quelqu'un d'autre.`, ephemeral: true })
            } catch (error) {
                console.log("Une erreur est survenue" + error);
            }
            
            let links = { jazz: "http://jazzradio.ice.infomaniak.ch/jazzradio-high.mp3", first: "http://cdn.nrjaudio.fm/audio1/fr/30001/aac_64.mp3", second: "http://www.skyrock.fm/stream.php/tunein16_128mp3.mp3", third: "https://ais-live.cloud-services.paris:8443/rfm.mp3", fourth: "http://radios.rtbf.be/wr-c21-blues-128.mp3", fifth: "http://generationfm-underground.ice.infomaniak.ch/generationfm-underground-high.mp3", sixth: "http://radioclassique.ice.infomaniak.ch/radioclassique-high.mp3", seventh: "http://direct.mouv.fr/live/mouv-midfi.mp3" }
            let thislive = links[c.values[0]]
        
            const VoiceConnection = joinVoiceChannel({
                channelId: member.channelId,
                guildId: member.channel.guild.id,
                adapterCreator: member.channel.guild.voiceAdapterCreator
            });
            const live = createAudioResource(`${thislive}`, {
                inlineVolume: true
            }); 
            try {
                live.volume.setVolume(0.2)
                const player = createAudioPlayer()
                VoiceConnection.subscribe(player)
                player.play(live)
                await c.reply({content: `${emoji.Broadcast} Lancement de la radio.`, ephemeral: true})
            } catch (error) {
                console.log("Une erreur est survenue" + error);
            }
            let int = setInterval(() => {
                if(member?.channel?.members?.size === (0 || undefined)){
                    clearInterval(int)
                    getVoiceConnection(`${message.guild.id}`).disconnect();
                    return CattoEmbed(message.author, `${emoji.Warn} Il n'y a plus personne dans le salon vocal, j'ai donc décidé de le quitter.`, message.channel, '')
                }
            }, 5000);
        })                
}
 
module.exports.help = {
    name: "radio",
    aliases: ["r"],
    description: "Radio complète pour RadioLabs"
}