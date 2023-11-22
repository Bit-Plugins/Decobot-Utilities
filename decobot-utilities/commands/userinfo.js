const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Message, ButtonStyle } = require('discord.js')
const SQLite = require("better-sqlite3");
const sql = new SQLite('./bot.sqlite');
const { embedColours, botIDs } = require('./config');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Get user information.')
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('The user you want information on (Optional)')
                .setRequired(false)
        ),
	async execute(interaction) {
        const client = interaction.client
        var lan = 'en'
        client.getUsSett = sql.prepare("SELECT * FROM userSettings WHERE userID = ?");
        let userset = client.getUsSett.get(interaction.user.id)

        if(userset) {
            if(userset.language) {
                lan = userset.language;
            }
        }
        const locale = require('../locale/'+lan+'.json')
        const membera = interaction.user
        const usra = interaction.options.getUser('user');
        var user
        var usAcc

        if(!usra) {
            user = membera
            usAcc = "true"
        } else {
            user = usra
            client.getUsSett = sql.prepare("SELECT * FROM userSettings WHERE userID = ?");
            let userset = client.getUsSett.get(user.id)

            if(userset) {
                usAcc = "false"
            } else if(userset.userAccess === "false") {
                usAcc = "false"
            } else {
                usAcc = "true"
            }
        }
        const member = interaction.guild.members.cache.get(user.id);

        const embed = new EmbedBuilder()
            .setTitle('User Info')
            .setColor(embedColours.main)
            .setThumbnail(user.avatarURL())
            .addFields({ name: 'Username', value: user.username, inline:  true })
            if(member.nickname != null) {
                embed.addFields({ name: 'Nickname', value: member.nickname, inline: true})
            }
            embed.addFields({ name: 'Roles', value: member.roles.cache.map(r => r.toString()).join(' | ')})
            embed.setTimestamp()
        interaction.reply({ embeds: [embed] });
	}
};
