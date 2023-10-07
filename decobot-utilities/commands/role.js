const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { embedColor, botIDs } = require('.../config');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('Get a role')
		.addStringOption((option) => 
			option
				.setName('role')
				.setDescription('The role you want to get/remove.')
				.setRequired(true)
                .addChoices(
                    { name: 'Game Night', value: 'gnite' },
                    { name: 'Giveaways', value: 'giveaway' },
                    { name: 'Announcement Pings', value: 'announcements' },
                )
		),
	async execute(interaction) {
            const role = interaction.options.getString('role')
            const user = interaction.user
            const member = interaction.member
            const guild = interaction.guild
            const client = interaction.client

            if(role === 'giveaway') {
                if(member.roles.has('763227657553969212')) {
                    member.roles.remove('763227657553969212')
                    interaction.reply({content: 'Done, you no longer have the Giveaway Role'})
                    const embed = new EmbedBuilder()
                        .setAuthor('Role Removed | '+user.username, user.avatarURL())
                        .addFields([
                            { name: "Role", value: "Giveaway", inline: true }
                        ])
                        .setTimestamp();
                    guild.channels.get("683458185763225617").send({embeds: [embed]})
                } else {
                    member.roles.add("763227657553969212")
                    interaction.reply('Done, you now have the Giveaway Role')
                    const embed = new EmbedBuilder()
                        .setAuthor("Role Given | "+user.username, user.avatarURL())
                        .addFields([
                            { name: "Role", value: "Giveaway", inline: true }
                        ])
                        .setTimestamp();
                    guild.channels.get("683458185763225617").send({embeds: [embed]})
                }
            }
            if(role === "gnite") {
                if(member.roles.has('757851094260121671')) {
                    member.roles.remove('757851094260121671')
                    interaction.reply({content: 'Done, you no longer have the Game Night Role'})
                    const embed = new EmbedBuilder()
                        .setAuthor('Role Removed | '+user.username, user.avatarURL())
                        .addFields([
                            { name: "Role", value: "Game Night", inline: true }
                        ])
                        .setTimestamp();
                    guild.channels.get("683458185763225617").send({embeds: [embed]})
                } else {
                    member.roles.add("757851094260121671")
                    interaction.reply('Done, you now have the Game Night Role')
                    const embed = new EmbedBuilder()
                        .setAuthor("Role Given | "+user.username, user.avatarURL())
                        .addFields([
                            { name: "Role", value: "Game Night", inline: true }
                        ])
                        .setTimestamp();
                    guild.channels.get("683458185763225617").send({embeds: [embed]})
                }
            }
            if(role === 'announcements') {
                if(member.roles.has('757851288577900554')) {
                    member.roles.remove('757851288577900554')
                    interaction.reply({content: 'Done, you no longer have the Announcements Role'})
                    const embed = new EmbedBuilder()
                        .setAuthor('Role Removed | '+user.username, user.avatarURL())
                        .addFields([
                            { name: "Role", value: "Announcements", inline: true }
                        ])
                        .setTimestamp();
                    guild.channels.get("683458185763225617").send({embeds: [embed]})
                } else {
                    member.roles.add("757851288577900554")
                    interaction.reply({content: 'Done, you now have the Announcements Role'})
                    const embed = new EmbedBuilder()
                        .setAuthor("Role Given | "+user.username, user.avatarURL())
                        .addFields([
                            { name: "Role", value: "Announcements", inline: true }
                        ])
                        .setTimestamp();
                    guild.channels.get("683458185763225617").send({embeds: [embed]})
                }
            }
		}
};