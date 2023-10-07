const { EmbedBuilder, SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js')
const { embedColor, ownerID, botIDs } = require('../config');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Force me (Decobot) to send a message.')
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addStringOption((option) => 
			option
				.setName('message')
				.setDescription('What message would you like to send?')
				.setRequired(true)
		)
		.addChannelOption((option) =>
			option.setName('channel')
			.setDescription('What channel to send this message?')
			.addChannelTypes(ChannelType.GuildText)
			.setRequired(false)
		)
		.addUserOption((option) =>
			option.setName('user')
			.setDescription('What user to send this message too?')
			.setRequired(false)
		),
	async execute(interaction) {
		const client = interaction.client
		const message = interaction.options.getString("message")
		const channel = interaction.options.getChannel("channel")
		const user = interaction.options.getUser("user")

		if(interaction.user.id === botIDs.owner) {
			if(user) {
				client.users.send(user.id, message)
			} else if(channel) {
				client.channels.cache.get(channel.id).send({ content: message })
			} else {
				interaction.channel.send({ content: message })
			}
		} else {
			interaction.reply("'Scuse you?\nhttps://tenor.com/view/elmo-stare-sesame-street-rocco-death-stare-gif-24438342")
		}
	}
};
